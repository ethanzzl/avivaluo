import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "app", "site-data.ts");
const source = await readFile(dataPath, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2022,
  },
  fileName: dataPath,
}).outputText;
const dataModule = await import(
  `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
);
const { copy, projectCatalog, projects } = dataModule;

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function requireLocalizedText(value, field, slug) {
  for (const locale of ["zh", "en"]) {
    requireCondition(
      typeof value?.[locale] === "string" && value[locale].trim().length > 0,
      `${slug}: ${field}.${locale} must be non-empty`,
    );
  }
}

requireCondition(Array.isArray(projectCatalog), "projectCatalog must be an array");
requireCondition(Array.isArray(projects), "projects must be an array");

const slugs = new Set();
const imageSources = new Set();
let checkedImages = 0;

for (const project of projectCatalog) {
  requireCondition(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug), `${project.slug}: invalid slug`);
  requireCondition(!slugs.has(project.slug), `${project.slug}: duplicate slug`);
  slugs.add(project.slug);
  requireCondition(typeof project.featured === "boolean", `${project.slug}: featured must be boolean`);
  requireCondition(typeof project.draft === "boolean", `${project.slug}: draft must be boolean`);
  requireCondition(
    typeof project.rightsConfirmed === "boolean",
    `${project.slug}: rightsConfirmed must be boolean`,
  );

  for (const legacySlug of project.legacySlugs ?? []) {
    requireCondition(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(legacySlug), `${project.slug}: invalid legacy slug`);
    requireCondition(!slugs.has(legacySlug), `${project.slug}: duplicate or conflicting legacy slug ${legacySlug}`);
    slugs.add(legacySlug);
  }

  for (const field of ["title", "category", "services", "summary", "projectInfo"]) {
    requireLocalizedText(project[field], field, project.slug);
  }

  for (const image of [project.cover, ...project.gallery]) {
    requireCondition(!imageSources.has(image.src), `${project.slug}: duplicate image reference ${image.src}`);
    imageSources.add(image.src);
    requireCondition(
      image.src.startsWith("/images/projects/protected/"),
      `${project.slug}: image must use a protected derivative: ${image.src}`,
    );
    requireCondition(Number.isInteger(image.width) && image.width > 0, `${image.src}: invalid width`);
    requireCondition(Number.isInteger(image.height) && image.height > 0, `${image.src}: invalid height`);
    requireLocalizedText(image.alt, "alt", image.src);

    const filePath = path.join(root, "public", image.src.replace(/^\//, ""));
    await access(filePath);
    const metadata = await sharp(filePath).metadata();
    requireCondition(metadata.width && metadata.height, `${image.src}: unreadable image dimensions`);
    const declaredRatio = image.width / image.height;
    const actualRatio = metadata.width / metadata.height;
    requireCondition(
      Math.abs(declaredRatio - actualRatio) < 0.01,
      `${image.src}: declared and actual aspect ratios differ`,
    );
    checkedImages += 1;
  }
}

const expectedPublished = projectCatalog.filter(
  (project) => !project.draft && project.rightsConfirmed,
);
requireCondition(
  projects.length === expectedPublished.length &&
    projects.every((project, index) => project === expectedPublished[index]),
  "projects must contain only non-draft projects with confirmed rights",
);
requireCondition(projects.some((project) => project.featured), "at least one published project must be featured");

for (const locale of ["zh", "en"]) {
  requireCondition(copy?.[locale], `missing ${locale} site copy`);
  for (const item of copy[locale].services.items) {
    requireCondition(item.title.trim(), `${locale} service title must be non-empty`);
    requireCondition(typeof item.translation === "string", `${locale} service translation must be a string`);
    requireCondition(item.body.trim(), `${locale} service body must be non-empty`);
  }
}

console.log(`Validated ${projectCatalog.length} projects and ${checkedImages} published image references.`);

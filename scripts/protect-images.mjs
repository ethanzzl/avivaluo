import { mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceRoot = path.resolve("source-assets/projects");
const outputRoot = path.resolve("public/images/projects/protected");
const sourceFolders = ["curated", "recovered"];
const maxEdge = 1800;
const copyright = "Copyright Aviva Dashuang / Luo Jing. All rights reserved.";
const signOnly = process.argv.includes("--sign-only");
const onlyPath = process.argv.find((argument) => argument.startsWith("--only="))?.slice("--only=".length);

const visibleSignatures = new Map([
  ["curated/christmas-stories-a17.webp", { corner: "southeast", tone: "dark" }],
  ["curated/everyday-observations-a20.webp", { corner: "southeast", tone: "light" }],
  ["curated/everyday-observations-a42.webp", { corner: "southeast", tone: "dark" }],
  ["curated/paris-printemps-a13.webp", { corner: "southwest", tone: "dark" }],
  ["curated/paris-printemps-a14.webp", { corner: "southwest", tone: "dark" }],
  ["recovered/instagram-breakfast-gouache.webp", { corner: "southwest", tone: "light" }],
  ["recovered/instagram-orange-trees.webp", { corner: "southwest", tone: "dark" }],
  ["recovered/instagram-tulips-detail.webp", { corner: "southeast", tone: "light" }],
]);

function signatureOverlay(width, height, { corner, tone }) {
  const fontSize = Math.round(Math.max(17, Math.min(30, width * 0.018)));
  const padding = Math.round(fontSize * 1.05);
  const x = corner.endsWith("east") ? width - padding : padding;
  const y = height - padding;
  const anchor = corner.endsWith("east") ? "end" : "start";
  const fill = tone === "light" ? "rgba(255,254,250,0.78)" : "rgba(29,27,25,0.72)";
  const stroke = tone === "light" ? "rgba(29,27,25,0.48)" : "rgba(255,254,250,0.72)";
  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <text x="${x}" y="${y}" text-anchor="${anchor}"
        font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="500"
        letter-spacing="0.3" fill="${fill}" stroke="${stroke}" stroke-width="1.5"
        paint-order="stroke">© Aviva Dashuang</text>
    </svg>
  `);
}

if (!signOnly && !onlyPath) await rm(outputRoot, { recursive: true, force: true });

let generated = 0;
let signed = 0;

for (const folder of sourceFolders) {
  const sourceFolder = path.join(sourceRoot, folder);
  const outputFolder = path.join(outputRoot, folder);
  await mkdir(outputFolder, { recursive: true });

  const entries = await readdir(sourceFolder, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile() || path.extname(entry.name).toLowerCase() !== ".webp") continue;

    const relativePath = `${folder}/${entry.name}`;
    const signature = visibleSignatures.get(relativePath);
    if (onlyPath && relativePath !== onlyPath) continue;
    if (signOnly && !signature) continue;

    const image = sharp(path.join(sourceFolder, entry.name));
    const metadata = await image.metadata();
    if (!metadata.width || !metadata.height) throw new Error(`Missing dimensions for ${relativePath}`);
    const scale = Math.min(1, maxEdge / Math.max(metadata.width, metadata.height));
    const outputWidth = Math.round(metadata.width * scale);
    const outputHeight = Math.round(metadata.height * scale);
    image.resize({ width: maxEdge, height: maxEdge, fit: "inside", withoutEnlargement: true });

    if (signature) {
      image.composite([{ input: signatureOverlay(outputWidth, outputHeight, signature) }]);
      signed += 1;
    }

    await image
      .withMetadata({
        exif: {
          IFD0: {
            Artist: "Aviva Dashuang / Luo Jing",
            Copyright: copyright,
          },
        },
      })
      .webp({ quality: 80, effort: 4 })
      .toFile(path.join(outputFolder, entry.name));

    generated += 1;
  }
}

console.log(`Generated ${generated} protected web images with a ${maxEdge}px maximum edge; ${signed} include a visible signature.`);

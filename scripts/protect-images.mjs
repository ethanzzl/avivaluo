import { mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceRoot = path.resolve("source-assets/projects");
const outputRoot = path.resolve("public/images/projects/protected");
const sourceFolders = ["curated", "recovered"];
const maxEdge = 1800;
const copyright = "Copyright Aviva Dashuang / Luo Jing. All rights reserved.";

await rm(outputRoot, { recursive: true, force: true });

let generated = 0;

for (const folder of sourceFolders) {
  const sourceFolder = path.join(sourceRoot, folder);
  const outputFolder = path.join(outputRoot, folder);
  await mkdir(outputFolder, { recursive: true });

  const entries = await readdir(sourceFolder, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile() || path.extname(entry.name).toLowerCase() !== ".webp") continue;

    await sharp(path.join(sourceFolder, entry.name))
      .resize({ width: maxEdge, height: maxEdge, fit: "inside", withoutEnlargement: true })
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

console.log(`Generated ${generated} protected web images with a ${maxEdge}px maximum edge.`);

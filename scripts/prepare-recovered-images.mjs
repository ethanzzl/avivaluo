import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const recoveredRoot = path.join(root, "recovered-assets", "xiaohongshu");
const outputRoot = path.join(root, "source-assets", "projects", "recovered");

const selections = [
  ["clay-plates/raw/09.webp", "illustrated-objects-cover.webp"],
  ["clay-plates/raw/02.webp", "illustrated-objects-plates-group.webp"],
  ["clay-plates/raw/03.webp", "illustrated-objects-plate-dove.webp"],
  ["clay-plates/raw/05.webp", "illustrated-objects-green-plate.webp"],
  ["clay-wine-stoppers/raw/01.webp", "illustrated-objects-wine-stoppers.webp"],
  ["clay-wine-stoppers/raw/02.webp", "illustrated-objects-small-objects.webp"],
  ["embroidered-bag/raw/04.webp", "illustrated-objects-embroidery-sketch.webp"],
  ["embroidered-bag/raw/05.webp", "illustrated-objects-embroidery-process.webp"],
  ["embroidered-bag/raw/07.webp", "illustrated-objects-embroidered-bag.webp"],
  ["brooch-rings/raw/02.webp", "illustrated-objects-brooch-collection.webp"],
  ["brooch-rings/raw/03.webp", "illustrated-objects-brooches.webp"],
  ["brooch-rings/raw/01.webp", "illustrated-objects-ring.webp"],
  ["clay-life-scenes/raw/01.webp", "illustrated-objects-fruit-relief.webp"],
  ["clay-life-scenes/raw/03.webp", "illustrated-objects-parrot-relief.webp"],
  ["paris-bookshop-shanghai/raw/05.webp", "paris-bookshop-framed-work.webp"],
  ["paris-bookshop-shanghai/raw/03.webp", "paris-bookshop-making.webp"],
  ["paris-bookshop-shanghai/raw/02.webp", "paris-bookshop-large-print.webp"],
  ["paris-bookshop-shanghai/raw/01.webp", "paris-bookshop-gallery-wall.webp"],
];

await mkdir(outputRoot, { recursive: true });

const manifest = [];

for (const [sourceName, outputName] of selections) {
  const source = path.join(recoveredRoot, sourceName);
  const output = path.join(outputRoot, outputName);

  const result = await sharp(source)
    .rotate()
    .toColourspace("srgb")
    .resize({
      width: 1800,
      height: 1800,
      fit: "inside",
      withoutEnlargement: true,
    })
    .modulate({ brightness: 1.01, saturation: 1.02 })
    .sharpen({ sigma: 0.45, m1: 0.25, m2: 0.55 })
    .webp({ quality: 86, smartSubsample: true })
    .toFile(output);

  manifest.push({
    source: sourceName,
    publishedOutput: `/images/projects/protected/recovered/${outputName}`,
    width: result.width,
    height: result.height,
    format: result.format,
    rightsConfirmed: true,
    treatment: "sRGB, longest edge max 1800px, subtle tonal and clarity correction",
  });
}

await writeFile(
  path.join(outputRoot, "manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);

console.log(`Prepared ${manifest.length} web images in ${outputRoot}`);

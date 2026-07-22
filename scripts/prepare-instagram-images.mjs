import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const recoveredRoot = path.join(root, "recovered-assets", "instagram", "raw");
const outputRoot = path.join(root, "public", "images", "projects", "recovered");

const selections = [
  ["tulips-gouache-01.jpg", "instagram-tulips-process.webp"],
  ["tulips-gouache-02.jpg", "instagram-tulips-detail.webp"],
  ["colorful-weekend.jpg", "instagram-colorful-weekend.webp"],
  ["smile-character.jpg", "instagram-smile-character.webp"],
  ["lantern-festival.jpg", "instagram-lantern-festival.webp"],
  ["christmas-eve.jpg", "instagram-christmas-eve.webp"],
  ["nutcracker-market.jpg", "instagram-nutcracker-market.webp"],
  ["little-candlestick-02.jpg", "instagram-candlestick.webp"],
  ["orange-tree-gouache-01.jpg", "instagram-orange-trees.webp"],
  ["orange-tree-gouache-02.jpg", "instagram-orange-tree-detail.webp"],
  ["painted-spoon.jpg", "instagram-painted-spoon.webp"],
  ["breakfast-gouache.jpg", "instagram-breakfast-gouache.webp"],
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
    .sharpen({ sigma: 0.35, m1: 0.2, m2: 0.45 })
    .webp({ quality: 88, smartSubsample: true })
    .toFile(output);

  manifest.push({
    source: sourceName,
    instagramProfile: "https://www.instagram.com/jingluo_/",
    output: `/images/projects/recovered/${outputName}`,
    width: result.width,
    height: result.height,
    format: result.format,
    rightsConfirmed: true,
    treatment: "sRGB, longest edge max 1800px, subtle clarity correction",
  });
}

await writeFile(
  path.join(outputRoot, "instagram-manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);

console.log(`Prepared ${manifest.length} Instagram images in ${outputRoot}`);

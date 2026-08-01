import path from "node:path";
import sharp from "sharp";

const sourceRoot = path.resolve("source-assets/about");
const outputRoot = path.resolve("public/images/about");
const copyright = "Copyright Aviva Dashuang / Luo Jing. All rights reserved.";

const images = [
  {
    source: "today-at-apple-shanghai-iapm-presentation-original.jpg",
    output: "today-at-apple-shanghai-iapm-presentation.webp",
  },
  {
    source: "today-at-apple-fluffy-workflow-original.jpg",
    output: "today-at-apple-fluffy-workflow.webp",
  },
];

for (const image of images) {
  await sharp(path.join(sourceRoot, image.source))
    .rotate()
    .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
    .withMetadata({
      exif: {
        IFD0: {
          Artist: "Aviva Dashuang / Luo Jing",
          Copyright: copyright,
        },
      },
    })
    .webp({ quality: 82, effort: 4 })
    .toFile(path.join(outputRoot, image.output));
}

console.log(`Prepared ${images.length} About page images.`);

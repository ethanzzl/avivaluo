import type { MetadataRoute } from "next";
import { projects } from "./site-data";
import { localizedPath } from "./site-metadata";
import { CONTENT_LAST_MODIFIED, SITE_URL } from "./site-config";

const staticPaths = ["", "work", "about", "contact", "privacy"];

function absolute(path: string) {
  return new URL(path, SITE_URL).toString();
}

function entry(locale: "zh" | "en", path: string): MetadataRoute.Sitemap[number] {
  return {
    url: absolute(localizedPath(locale, path)),
    lastModified: CONTENT_LAST_MODIFIED,
    alternates: {
      languages: {
        "zh-CN": absolute(localizedPath("zh", path)),
        en: absolute(localizedPath("en", path)),
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = staticPaths.flatMap((path) => [entry("zh", path), entry("en", path)]);
  const work = projects.flatMap((project) => {
    const path = `work/${project.slug}`;
    return [entry("zh", path), entry("en", path)];
  });
  return [...pages, ...work];
}

import type { Metadata } from "next";
import type { Locale, Project } from "./site-data";
import { SITE_URL } from "./site-config";

const descriptions: Record<Locale, string> = {
  zh: "为餐饮、饮品与生活方式品牌创作有温度、有记忆点的插画与周边视觉。",
  en: "Warm, characterful illustration for food, drink, and lifestyle brands.",
};

const pageTitles = {
  home: { zh: "Aviva大双｜插画创作与品牌视觉", en: "Aviva Dashuang｜Illustration & Brand Visuals" },
  work: { zh: "作品", en: "Work" },
  styles: { zh: "插画风格参考", en: "Illustration Lookbook" },
  about: { zh: "关于", en: "About" },
  contact: { zh: "发起合作", en: "Start a Project" },
  privacy: { zh: "隐私说明", en: "Privacy" },
} as const;

type PageKey = keyof typeof pageTitles;

export function localizedPath(locale: Locale, path = "") {
  const normalized = path ? `/${path.replace(/^\/+|\/+$/g, "")}` : "";
  return locale === "en" ? `/en${normalized}` : normalized || "/";
}

function alternates(path: string) {
  const zh = localizedPath("zh", path);
  const en = localizedPath("en", path);
  return {
    canonical: zh,
    languages: {
      "zh-CN": zh,
      en,
      "x-default": zh,
    },
  };
}

function localizedAlternates(locale: Locale, path: string) {
  const values = alternates(path);
  return { ...values, canonical: localizedPath(locale, path) };
}

export function layoutMetadata(locale: Locale): Metadata {
  const title = pageTitles.home[locale];
  const description = descriptions[locale];
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s｜${locale === "zh" ? "Aviva大双" : "Aviva Dashuang"}`,
    },
    description,
    authors: [{ name: locale === "zh" ? "Aviva大双" : "Aviva Dashuang" }],
    creator: locale === "zh" ? "Aviva大双" : "Aviva Dashuang",
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
    },
    openGraph: {
      title,
      description,
      siteName: locale === "zh" ? "Aviva大双" : "Aviva Dashuang",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: locale === "zh" ? "Aviva大双插画作品集" : "Aviva Dashuang illustration portfolio" }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

export function pageMetadata(locale: Locale, page: PageKey): Metadata {
  const title = pageTitles[page][locale];
  const description = page === "styles"
    ? locale === "zh"
      ? "从十五个真实作品中浏览五种画面方向，为人物、品牌与故事找到接近的感觉。"
      : "Browse five visual directions through fifteen real works for portraits, brands, and visual stories."
    : page === "home"
    ? descriptions[locale]
    : locale === "zh"
      ? "Aviva大双插画作品与商业合作网站。"
      : "Illustration portfolio and commercial collaboration site for Aviva Dashuang.";
  const path = page === "home" ? "" : page;
  return {
    title: page === "home" ? { absolute: title } : title,
    description,
    alternates: localizedAlternates(locale, path),
    openGraph: { title, description, url: localizedPath(locale, path) },
    twitter: { title, description },
  };
}

export function projectMetadata(locale: Locale, project: Project): Metadata {
  const path = `work/${project.slug}`;
  const title = project.title[locale];
  const description = project.summary[locale];
  return {
    title,
    description,
    alternates: localizedAlternates(locale, path),
    openGraph: {
      title,
      description,
      url: localizedPath(locale, path),
      images: [{
        url: project.cover.src,
        width: project.cover.width,
        height: project.cover.height,
        alt: project.cover.alt[locale],
      }],
    },
    twitter: {
      title,
      description,
      images: [project.cover.src],
    },
  };
}

export function notFoundMetadata(locale: Locale): Metadata {
  return {
    title: locale === "zh" ? "页面未找到" : "Page Not Found",
    robots: { index: false, follow: false },
  };
}

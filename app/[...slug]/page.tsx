import type { Metadata } from "next";
import { SitePage } from "../site";
import { projects } from "../site-data";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = slug[0] === "en" ? "en" : "zh";
  const path = locale === "en" ? slug.slice(1) : slug;
  const routePath = path.join("/");
  const canonical = locale === "en" ? `/en/${routePath}` : `/${routePath}`;
  const zhPath = `/${routePath}`;
  const enPath = `/en/${routePath}`;
  const key = path[0] ?? "";
  const labels: Record<string, { zh: string; en: string }> = {
    work: { zh: "作品", en: "Work" },
    about: { zh: "关于", en: "About" },
    contact: { zh: "发起合作", en: "Start a project" },
    privacy: { zh: "隐私说明", en: "Privacy" },
  };
  if (key === "work" && path[1]) {
    const project = projects.find((item) => item.slug === path[1]);
    if (project) {
      return {
        title: project.title[locale],
        description: project.summary[locale],
        alternates: {
          canonical,
          languages: { "zh-CN": zhPath, en: enPath },
        },
      };
    }
  }
  return {
    title: labels[key]?.[locale] ?? "Aviva大双",
    description:
      locale === "zh"
        ? "Aviva大双插画作品与商业合作网站。"
        : "Illustration portfolio and commercial collaboration site for Aviva Dashuang.",
    alternates: {
      canonical,
      languages: { "zh-CN": zhPath, en: enPath },
    },
  };
}

export default async function CatchAllPage({ params }: PageProps) {
  const { slug } = await params;
  return <SitePage path={slug} />;
}

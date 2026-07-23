import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { projects } from "../../../site-data";
import { projectMetadata } from "../../../site-metadata";
import { ProjectPage } from "../../../site";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.flatMap((project) => [
    { slug: project.slug },
    ...(project.legacySlugs ?? []).map((slug) => ({ slug })),
  ]);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(
    (item) => item.slug === slug || item.legacySlugs?.includes(slug),
  );
  return project ? projectMetadata("zh", project) : { robots: { index: false, follow: false } };
}

export default async function ChineseProject({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (project) return <ProjectPage locale="zh" project={project} />;

  const legacyProject = projects.find((item) => item.legacySlugs?.includes(slug));
  if (legacyProject) redirect(`/work/${legacyProject.slug}`);
  notFound();
}

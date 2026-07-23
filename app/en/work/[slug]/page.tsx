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
  return project ? projectMetadata("en", project) : { robots: { index: false, follow: false } };
}

export default async function EnglishProject({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (project) return <ProjectPage locale="en" project={project} />;

  const legacyProject = projects.find((item) => item.legacySlugs?.includes(slug));
  if (legacyProject) redirect(`/en/work/${legacyProject.slug}`);
  notFound();
}

import { projects } from "../site-data";

export function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const routes = ["", "work", "about", "contact", "privacy"];
  const localized = routes.flatMap((route) => {
    const suffix = route ? `/${route}` : "";
    return [`${origin}${suffix || "/"}`, `${origin}/en${suffix || "/"}`];
  });
  const projectUrls = projects.flatMap((project) => [
    `${origin}/work/${project.slug}`,
    `${origin}/en/work/${project.slug}`,
  ]);
  const urls = [...localized, ...projectUrls]
    .map((url) => `<url><loc>${url}</loc></url>`)
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
  return new Response(xml, {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
}

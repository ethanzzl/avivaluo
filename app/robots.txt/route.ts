export function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const body = `User-agent: *
Allow: /
Sitemap: ${origin}/sitemap.xml
`;
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

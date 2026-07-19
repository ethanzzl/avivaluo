import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished portfolio homepage", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Aviva大双/);
  assert.match(html, /为品牌画出被记住的温度/);
  assert.match(html, /Gegelato 品牌视觉/);
  assert.match(html, /柠檬茶包装/);
  assert.match(html, /巴黎与 Printemps 插画系列/);
  assert.match(html, /餐饮与空间插画精选/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("work page lists the seven curated projects", async () => {
  const response = await render("/work");
  assert.equal(response.status, 200);
  const html = await response.text();
  const slugs = [
    "gegelato-brand",
    "lemon-tea-packaging",
    "paris-printemps",
    "food-hospitality",
    "christmas-stories",
    "portraits-family",
    "everyday-observations",
  ];
  for (const slug of slugs) {
    assert.match(html, new RegExp(`/work/${slug}`));
  }
});

test("project detail renders its curated gallery and confirmed publication note", async () => {
  const response = await render("/work/gegelato-brand");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /联合创始人项目/);
  assert.match(html, /作品公开展示已确认/);
  assert.match(html, /gegelato-brand-a24\.webp/);
  assert.match(html, /gegelato-brand-a28\.webp/);
  assert.match(html, /gegelato-brand-a27\.webp/);
  assert.match(html, /gegelato-brand-a23\.webp/);
});

test("English project route uses rewritten English content", async () => {
  const response = await render("/en/work/everyday-observations");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Everyday Observations/);
  assert.match(html, /Personal work collection/);
  assert.match(html, /Publication is confirmed/);
});

test("legacy project URLs redirect to the curated project structure", async () => {
  const response = await render("/work/corner-cafe");
  assert.ok([307, 308].includes(response.status));
  assert.equal(response.headers.get("location"), "http://localhost/work/food-hospitality");
});

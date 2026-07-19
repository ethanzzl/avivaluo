import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import test, { after, before } from "node:test";

const port = 43119;
const origin = `http://127.0.0.1:${port}`;
let server;
let serverOutput = "";

before(async () => {
  server = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "-H", "127.0.0.1", "-p", String(port)],
    {
      cwd: new URL("..", import.meta.url),
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  server.stdout.on("data", (chunk) => {
    serverOutput += chunk;
  });
  server.stderr.on("data", (chunk) => {
    serverOutput += chunk;
  });

  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(origin);
      if (response.ok) return;
    } catch {
      // The production server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  throw new Error(`Next.js production server did not start.\n${serverOutput}`);
}, { timeout: 25_000 });

after(() => {
  server?.kill("SIGTERM");
});

function render(path = "/") {
  return fetch(`${origin}${path}`, { redirect: "manual" });
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
  const location = response.headers.get("location");
  assert.ok(location);
  assert.equal(new URL(location, origin).pathname, "/work/food-hospitality");
});

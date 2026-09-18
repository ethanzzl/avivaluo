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
  assert.match(html, /<html lang="zh-CN">/);
  assert.match(html, /Aviva大双/);
  assert.match(html, /为品牌画出被记住的温度/);
  assert.match(html, /餐饮与空间插画精选/);
  assert.match(html, /Gegelato 品牌视觉/);
  assert.match(html, /插画周边与手作/);
  assert.match(html, /甜蜜灵感，进入真实品牌场景/);
  assert.match(html, /小物件，也能承载大感受/);
  assert.match(html, /class="editorial-home"/);
  assert.match(html, /class="site-footer site-footer-home"/);
  assert.match(html, /avivaluojing@163\.com/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});

test("homepage serves responsive optimized artwork to mobile browsers", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /srcSet="[^\"]*\/_next\/image\?url=%2Fimages%2Fprojects%2Fprotected%2Fcurated%2Ffood-hospitality-a35\.webp/);
  assert.match(html, /sizes="\(max-width: 720px\) 100vw, 62vw"/);
  assert.match(html, /imageSrcSet="[^\"]*w=480&amp;q=75 480w/);
  assert.doesNotMatch(html, /<img[^>]+src="\/images\/projects\/protected\//);
});

test("desktop navigation includes a current Home link", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /class="desktop-nav"[\s\S]*href="\/" aria-current="page"[\s\S]*首页/);
});

test("style menu is reachable from both homepages and keeps the locale", async () => {
  for (const [home, styles, label, switchTo] of [
    ["/", "/styles", "顾客肖像", "/en/styles"],
    ["/en", "/en/styles", "Personal Portraits", "/styles"],
  ]) {
    const homeResponse = await render(home);
    assert.equal(homeResponse.status, 200);
    assert.match(await homeResponse.text(), new RegExp(`href="${styles}"`));

    const stylesResponse = await render(styles);
    assert.equal(stylesResponse.status, 200);
    const html = await stylesResponse.text();
    assert.match(html, new RegExp(label));
    assert.match(html, /Night Metaphor/);
    assert.match(html, new RegExp(`href="${switchTo}"`));
    assert.match(html, /href="(?:\/en)?\/contact"/);
    assert.match(html, new RegExp(home === "/" ? "特别专题 / 顾客肖像" : "Special feature / Personal Portraits"));
    assert.match(html, new RegExp(home === "/" ? "四种创作方向" : "Four creative directions"));
    assert.doesNotMatch(html, new RegExp(home === "/" ? "有一个想一起完成的项目" : "Have a project in mind"));
  }
});

test("work page lists the eight curated projects", async () => {
  const response = await render("/work");
  assert.equal(response.status, 200);
  const html = await response.text();
  const slugs = [
    "gegelato-brand",
    "illustrated-objects",
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
  assert.ok(html.indexOf("/work/food-hospitality") < html.indexOf("/work/illustrated-objects"));
  assert.ok(html.indexOf("/work/illustrated-objects") < html.indexOf("/work/lemon-tea-packaging"));
  assert.match(html, /class="work-card-heading"/);
  assert.match(html, /class="page-intro-count">8/);
  assert.match(html, /个精选项目/);
  assert.match(html, /\/images\/projects\/protected\/curated\//);
  assert.match(html, /draggable="false"/);
  assert.match(html, /class="mobile-panel"[\s\S]*href="\/"[\s\S]*首页/);
});

test("published artwork uses protected derivatives while previous public paths are unavailable", async () => {
  const protectedImage = await render("/images/projects/protected/curated/gegelato-brand-a24.webp");
  assert.equal(protectedImage.status, 200);
  assert.match(protectedImage.headers.get("content-type") ?? "", /^image\/webp\b/i);

  const previousImage = await render("/images/projects/curated/gegelato-brand-a24.webp");
  assert.equal(previousImage.status, 404);
});

test("interior pages use the unified editorial sections", async () => {
  const aboutResponse = await render("/about");
  assert.equal(aboutResponse.status, 200);
  const aboutHtml = await aboutResponse.text();
  assert.match(aboutHtml, /class="about-story"/);
  assert.match(aboutHtml, /class="about-portrait"/);
  assert.match(aboutHtml, /\/images\/about\/aviva-paris-portrait\.webp/);
  assert.match(aboutHtml, /Aviva大双站在河畔桥上/);
  assert.match(aboutHtml, /class="about-talk"/);
  assert.match(aboutHtml, /2022年，受邀参与 Today at Apple 上海环贸 iapm 设计实验室/);
  assert.match(aboutHtml, /today-at-apple-shanghai-iapm-presentation\.webp/);
  assert.match(aboutHtml, /today-at-apple-fluffy-workflow\.webp/);
  assert.match(aboutHtml, /class="about-process"/);

  const englishAboutResponse = await render("/en/about");
  assert.equal(englishAboutResponse.status, 200);
  const englishAboutHtml = await englishAboutResponse.text();
  assert.match(englishAboutHtml, /Aviva Dashuang standing on a riverside bridge/);
  assert.match(englishAboutHtml, /Talks &amp; Workshops/);
  assert.match(englishAboutHtml, /Today at Apple Design Lab at Apple Shanghai iapm/);

  const contactResponse = await render("/contact");
  assert.equal(contactResponse.status, 200);
  const contactHtml = await contactResponse.text();
  assert.match(contactHtml, /class="contact-heading"/);
  assert.match(contactHtml, /class="contact-intro"/);
});

test("unknown routes return a styled 404 with noindex metadata", async () => {
  const response = await render("/not-a-real-page");
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /not-found-page/);
  assert.match(html, /页面未找到｜Aviva大双/);
  assert.match(html, /name="robots" content="noindex"/);
});

test("English mobile navigation includes a Home link", async () => {
  const response = await render("/en/work");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<html lang="en">/);
  assert.match(html, /class="mobile-panel"[\s\S]*href="\/en"[\s\S]*Home/);
});

test("metadata uses the fixed production domain and project artwork", async () => {
  const response = await render("/en/work/paris-printemps");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /rel="canonical" href="https:\/\/www\.avivaluo\.com\/en\/work\/paris-printemps"/);
  assert.match(html, /property="og:url" content="https:\/\/www\.avivaluo\.com\/en\/work\/paris-printemps"/);
  assert.match(html, /property="og:image" content="https:\/\/www\.avivaluo\.com\/images\/projects\/protected\/curated\/paris-printemps-a13\.webp"/);
  assert.doesNotMatch(html, /127\.0\.0\.1:43119/);
});

test("robots and sitemap publish only the canonical production domain", async () => {
  const robotsResponse = await render("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /Host: https:\/\/www\.avivaluo\.com/);
  assert.match(robots, /Sitemap: https:\/\/www\.avivaluo\.com\/sitemap\.xml/);
  assert.doesNotMatch(robots, /127\.0\.0\.1/);

  const sitemapResponse = await render("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /https:\/\/www\.avivaluo\.com\/work\/gegelato-brand/);
  assert.match(sitemap, /https:\/\/www\.avivaluo\.com\/en\/work\/gegelato-brand/);
  assert.match(sitemap, /hreflang="zh-CN"/);
  assert.match(sitemap, /hreflang="en"/);
  assert.match(sitemap, /<lastmod>2026-08-10T16:00:00\.000Z<\/lastmod>/);
  assert.doesNotMatch(sitemap, /127\.0\.0\.1/);
});

test("English unknown routes return an English-only 404", async () => {
  const response = await render("/en/not-a-real-page");
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /\\"lang\\":\\"en\\"/);
  assert.match(html, /Nothing here yet\./);
  assert.match(html, /Return home to explore the work\./);
  assert.match(html, /name="robots" content="noindex"/);
  assert.doesNotMatch(html, /这里还没有内容|返回首页继续浏览作品/);
});

test("illustrated objects project renders the selected handmade collection", async () => {
  const response = await render("/work/illustrated-objects");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /个人创作系列/);
  assert.match(html, /instagram-candlestick\.webp/);
  assert.match(html, /illustrated-objects-cover\.webp/);
  assert.match(html, /illustrated-objects-wine-stoppers\.webp/);
  assert.match(html, /illustrated-objects-embroidered-bag\.webp/);
  assert.match(html, /illustrated-objects-brooches\.webp/);
  assert.match(html, /instagram-painted-spoon\.webp/);
});

test("Instagram selections strengthen the bilingual lifestyle and seasonal projects", async () => {
  const everydayResponse = await render("/work/everyday-observations");
  assert.equal(everydayResponse.status, 200);
  const everydayHtml = await everydayResponse.text();
  assert.match(everydayHtml, /水粉与日常观察/);
  assert.match(everydayHtml, /instagram-breakfast-gouache\.webp/);
  assert.match(everydayHtml, /instagram-tulips-detail\.webp/);
  assert.match(everydayHtml, /instagram-orange-trees\.webp/);

  const seasonalResponse = await render("/en/work/christmas-stories");
  assert.equal(seasonalResponse.status, 200);
  const seasonalHtml = await seasonalResponse.text();
  assert.match(seasonalHtml, /Seasonal Character Stories/);
  assert.match(seasonalHtml, /instagram-lantern-festival\.webp/);
  assert.match(seasonalHtml, /instagram-christmas-eve\.webp/);
});

test("portrait collection uses the revised cover and character studies", async () => {
  const response = await render("/work/portraits-family");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /portraits-family-a37\.webp/);
  assert.match(html, /portraits-family-a33\.webp/);
  assert.doesNotMatch(html, /portraits-family-a54\.webp/);

  const removedArtwork = await render("/images/projects/protected/curated/portraits-family-a54.webp");
  assert.equal(removedArtwork.status, 404);
});

test("contact page uses the canonical Instagram profile URL", async () => {
  const response = await render("/contact");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /https:\/\/www\.instagram\.com\/jingluo_\//);
  assert.doesNotMatch(html, /igsh=|utm_source=qr/);
});

test("project detail renders its curated gallery without internal publication notes", async () => {
  const response = await render("/work/gegelato-brand");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /联合创始人项目/);
  assert.doesNotMatch(html, /作品公开展示已确认/);
  assert.doesNotMatch(html, /缺少的客户、年份或合作信息/);
  assert.match(html, /gegelato-brand-a24\.webp/);
  assert.match(html, /gegelato-brand-a28\.webp/);
  assert.match(html, /gegelato-brand-a27\.webp/);
  assert.match(html, /gegelato-brand-a23\.webp/);
  assert.match(html, /作品仅供浏览，未经授权不得复制、转载或用于商业用途/);
});

test("English project route uses rewritten English content", async () => {
  const response = await render("/en/work/everyday-observations");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Everyday Observations/);
  assert.match(html, /Personal work collection/);
  assert.match(html, /Artwork is presented for viewing only/);
  assert.doesNotMatch(html, /Publication is confirmed/);
  assert.doesNotMatch(html, /missing client, date, or collaboration details/);
});

test("legacy project URLs redirect to the curated project structure", async () => {
  const response = await render("/work/corner-cafe");
  assert.ok([307, 308].includes(response.status));
  const location = response.headers.get("location");
  assert.ok(location);
  assert.equal(new URL(location, origin).pathname, "/work/food-hospitality");
});

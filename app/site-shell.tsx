import { SiInstagram, SiXiaohongshu } from "react-icons/si";
import { copy, type Locale } from "./site-data";

export function localePath(locale: Locale, path = "") {
  const normalized = path ? `/${path.replace(/^\/+/, "")}` : "";
  return locale === "en" ? `/en${normalized}` : normalized || "/";
}

function languagePath(locale: Locale, path: string[]) {
  const suffix = path.length > 0 ? `/${path.join("/")}` : "";
  if (locale === "zh") return `/en${suffix}`;
  return suffix || "/";
}

function Header({ locale, path }: { locale: Locale; path: string[] }) {
  const c = copy[locale].nav;
  const current = path[0] ?? "";
  const items = [
    { key: "work", label: c.work, href: localePath(locale, "work") },
    { key: "services", label: c.services, href: `${localePath(locale)}#services` },
    { key: "about", label: c.about, href: localePath(locale, "about") },
    { key: "contact", label: c.contact, href: localePath(locale, "contact") },
  ];

  return (
    <header className="site-header">
      <a className="brand" href={localePath(locale)} aria-label="Aviva大双">Aviva大双</a>
      <nav className="desktop-nav" aria-label={locale === "zh" ? "主导航" : "Primary navigation"}>
        <a className="nav-link" href={localePath(locale)} aria-current={current === "" ? "page" : undefined}>
          {c.home}
        </a>
        {items.map((item) => (
          <a
            className="nav-link"
            href={item.href}
            key={item.key}
            aria-current={item.key !== "services" && current === item.key ? "page" : undefined}
          >
            {item.label}
          </a>
        ))}
        <a className="nav-link" href={languagePath(locale, path)} lang={locale === "zh" ? "en" : "zh-CN"}>
          {c.language}
        </a>
        <a className="outline-cta" href={localePath(locale, "contact")}>{copy[locale].footer.cta}</a>
      </nav>
      <details className="mobile-nav">
        <summary>{c.menu}</summary>
        <nav className="mobile-panel" aria-label={locale === "zh" ? "移动导航" : "Mobile navigation"}>
          <a href={localePath(locale)} aria-current={current === "" ? "page" : undefined}>{c.home}</a>
          {items.map((item) => <a href={item.href} key={item.key}>{item.label}</a>)}
          <a href={languagePath(locale, path)} lang={locale === "zh" ? "en" : "zh-CN"}>{c.language}</a>
        </nav>
      </details>
    </header>
  );
}

function Footer({ locale, home = false, showPrompt = true }: { locale: Locale; home?: boolean; showPrompt?: boolean }) {
  const c = copy[locale].footer;
  return (
    <footer className={`site-footer${home ? " site-footer-home" : ""}${showPrompt ? "" : " site-footer-compact"}`}>
      <div className="site-footer-inner">
        {showPrompt && <div className="footer-prompt">
          <div>
            <h2>{c.title}</h2>
            {home && (
              <p className="footer-intro">
                {locale === "zh"
                  ? "从一个想法开始，把它变成被记住的画面。"
                  : "Start with an idea, then turn it into something memorable."}
              </p>
            )}
          </div>
          <a className={home ? "solid-cta" : "outline-cta"} href={localePath(locale, "contact")}>
            {c.cta} <span aria-hidden="true">↗</span>
          </a>
        </div>}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Aviva大双</p>
          <div className="footer-socials">
            {home ? (
              <a className="footer-email" href="mailto:avivaluojing@163.com">avivaluojing@163.com</a>
            ) : (
              <p>{c.note}</p>
            )}
            <a
              className="social-link social-link-light"
              href="https://xhslink.com/m/7SoyMlHCsdd"
              target="_blank"
              rel="noreferrer"
              aria-label={locale === "zh" ? "访问 Aviva大双的小红书" : "Visit Aviva Dashuang on Xiaohongshu"}
              title={locale === "zh" ? "小红书" : "Xiaohongshu"}
            >
              <SiXiaohongshu aria-hidden="true" />
            </a>
            <a
              className="social-link social-link-light"
              href="https://www.instagram.com/jingluo_/"
              target="_blank"
              rel="noreferrer"
              aria-label={locale === "zh" ? "访问 Aviva大双的 Instagram" : "Visit Aviva Dashuang on Instagram"}
              title="Instagram"
            >
              <SiInstagram aria-hidden="true" />
            </a>
          </div>
          <a className="text-link" href={localePath(locale, "privacy")}>{c.privacy}</a>
        </div>
      </div>
    </footer>
  );
}

export function PageShell({
  locale,
  path,
  children,
}: {
  locale: Locale;
  path: string[];
  children: React.ReactNode;
}) {
  return (
    <>
      <a className="skip-link" href="#main">{locale === "zh" ? "跳到主要内容" : "Skip to main content"}</a>
      <Header locale={locale} path={path} />
      <main className="site-main" id="main">{children}</main>
      <Footer locale={locale} home={(path[0] ?? "") === ""} showPrompt={path[0] !== "styles" && path[0] !== "about"} />
    </>
  );
}

export function NotFoundPage({ locale }: { locale: Locale }) {
  const home = localePath(locale);
  return (
    <main className="not-found-page">
      <a className="brand" href={home} aria-label="Aviva大双">Aviva大双</a>
      <section className="not-found-content">
        <p className="eyebrow">404 / Page not found</p>
        <h1>{locale === "zh" ? "这里还没有内容。" : "Nothing here yet."}</h1>
        <div>
          <p>{locale === "zh" ? "返回首页继续浏览作品。" : "Return home to explore the work."}</p>
          <a className="solid-cta" href={home}>
            {locale === "zh" ? "返回首页" : "Return home"} <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}

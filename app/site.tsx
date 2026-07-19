/* eslint-disable @next/next/no-img-element -- source artwork uses prepared static derivatives */
import { notFound } from "next/navigation";
import { SiInstagram, SiXiaohongshu } from "react-icons/si";
import { copy, type Locale, type Project, projects } from "./site-data";

type SitePageProps = {
  path: string[];
};

function localePath(locale: Locale, path = "") {
  const normalized = path ? `/${path.replace(/^\/+/, "")}` : "";
  return locale === "en" ? `/en${normalized || "/"}` : normalized || "/";
}

function languagePath(locale: Locale, path: string[]) {
  if (locale === "zh") return `/en/${path.join("/")}`.replace(/\/$/, "/");
  return `/${path.join("/")}`.replace(/\/$/, "/");
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
      <a className="brand" href={localePath(locale)} aria-label="Aviva大双">
        Aviva大双
      </a>
      <nav className="desktop-nav" aria-label={locale === "zh" ? "主导航" : "Primary navigation"}>
        {items.map((item) => (
          <a
            className="nav-link"
            href={item.href}
            key={item.key}
            aria-current={current === item.key ? "page" : undefined}
          >
            {item.label}
          </a>
        ))}
        <a className="nav-link" href={languagePath(locale, path)} lang={locale === "zh" ? "en" : "zh-CN"}>
          {c.language}
        </a>
        <a className="outline-cta" href={localePath(locale, "contact")}>
          {copy[locale].footer.cta}
        </a>
      </nav>
      <details className="mobile-nav">
        <summary>{c.menu}</summary>
        <nav className="mobile-panel" aria-label={locale === "zh" ? "移动导航" : "Mobile navigation"}>
          {items.map((item) => (
            <a href={item.href} key={item.key}>
              {item.label}
            </a>
          ))}
          <a href={languagePath(locale, path)} lang={locale === "zh" ? "en" : "zh-CN"}>
            {c.language}
          </a>
        </nav>
      </details>
    </header>
  );
}

function Footer({ locale }: { locale: Locale }) {
  const c = copy[locale].footer;
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-prompt">
          <h2>{c.title}</h2>
          <a className="outline-cta" href={localePath(locale, "contact")}>
            {c.cta}
          </a>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Aviva大双</p>
          <div className="footer-socials">
            <p>{c.note}</p>
            <span
              className="social-placeholder social-placeholder-light"
              aria-label={locale === "zh" ? "小红书链接待补充" : "Xiaohongshu link to be confirmed"}
              title={locale === "zh" ? "小红书链接待补充" : "Xiaohongshu link to be confirmed"}
            >
              <SiXiaohongshu aria-hidden="true" />
            </span>
            <span
              className="social-placeholder social-placeholder-light"
              aria-label={locale === "zh" ? "Instagram 链接待补充" : "Instagram link to be confirmed"}
              title={locale === "zh" ? "Instagram 链接待补充" : "Instagram link to be confirmed"}
            >
              <SiInstagram aria-hidden="true" />
            </span>
          </div>
          <a className="text-link" href={localePath(locale, "privacy")}>
            {c.privacy}
          </a>
        </div>
      </div>
    </footer>
  );
}

function WorkCard({ project, locale }: { project: Project; locale: Locale }) {
  return (
    <a className={`work-card ${project.className ?? ""}`} href={localePath(locale, `work/${project.slug}`)}>
      <div className="work-card-image">
        <img
          src={project.image}
          width={project.width}
          height={project.height}
          alt={project.alt[locale]}
          loading="lazy"
        />
      </div>
      <div className="work-card-copy">
        <h3>{project.title[locale]}</h3>
        <p>{project.services[locale]}</p>
      </div>
    </a>
  );
}

function SectionHeading({
  title,
  secondary,
  services,
}: {
  title: string;
  secondary: string;
  services: string;
}) {
  return (
    <div className="section-heading">
      <h2>
        {title} <small>/ {secondary}</small>
      </h2>
      <p>{services}</p>
    </div>
  );
}

function Home({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{c.hero.eyebrow}</p>
          <h1>{c.hero.title}</h1>
          <div className="hero-rule" />
          <p>{c.hero.body}</p>
          <a className="text-link" href="#services">
            {c.hero.link}
          </a>
        </div>
        <div className="hero-art">
          <img
            src={projects[0].image}
            width={projects[0].width}
            height={projects[0].height}
            alt={projects[0].alt[locale]}
            fetchPriority="high"
          />
        </div>
      </section>

      <section className="work-section">
        <SectionHeading
          title={c.groups.food}
          secondary={c.groups.foodEn}
          services={c.groups.foodServices}
        />
        <div className="work-grid">
          <WorkCard project={projects[1]} locale={locale} />
          <WorkCard project={projects[2]} locale={locale} />
        </div>
      </section>

      <section className="work-section">
        <SectionHeading
          title={c.groups.package}
          secondary={c.groups.packageEn}
          services={c.groups.packageServices}
        />
        <WorkCard project={projects[3]} locale={locale} />
      </section>

      <section className="work-section">
        <SectionHeading
          title={c.groups.brand}
          secondary={c.groups.brandEn}
          services={c.groups.brandServices}
        />
        <WorkCard project={projects[0]} locale={locale} />
      </section>

      <section className="services" id="services">
        <p className="eyebrow">{c.services.eyebrow}</p>
        <div className="section-heading">
          <h2>{c.services.title}</h2>
          <p>{c.services.intro}</p>
        </div>
        <div className="services-list">
          {c.services.items.map(([title, body]) => (
            <div className="service-row" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Work({ locale }: { locale: Locale }) {
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">{locale === "zh" ? "作品" : "Selected work"}</p>
        <div className="page-intro-copy">
          <h1>{locale === "zh" ? "插画如何进入品牌与日常。" : "Illustration made for brands and everyday life."}</h1>
          <div className="section-rule" />
          <p>
            {locale === "zh"
              ? "从餐饮场景、产品图形到包装与周边，以真实作品展示不同的应用可能。"
              : "From food scenes and product graphics to packaging and illustrated objects, explore how the work can live in the real world."}
          </p>
        </div>
      </section>
      <section className="project-list" aria-label={locale === "zh" ? "作品列表" : "Project list"}>
        {projects.map((project) => (
          <WorkCard project={project} locale={locale} key={project.slug} />
        ))}
      </section>
    </>
  );
}

function ProjectDetail({ locale, project }: { locale: Locale; project: Project }) {
  return (
    <>
      <section className="detail-header">
        <div>
          <p className="project-kicker">{project.category[locale]}</p>
          <h1>{project.title[locale]}</h1>
        </div>
        <dl className="detail-meta">
          <div>
            <dt className="meta-label">{locale === "zh" ? "服务" : "Services"}</dt>
            <dd>{project.services[locale]}</dd>
          </div>
          <div>
            <dt className="meta-label">{locale === "zh" ? "项目信息" : "Project info"}</dt>
            <dd>{locale === "zh" ? "待确认" : "To be confirmed"}</dd>
          </div>
        </dl>
      </section>
      <div className="detail-hero">
        <img
          src={project.image}
          width={project.width}
          height={project.height}
          alt={project.alt[locale]}
          fetchPriority="high"
        />
      </div>
      <section className="project-body">
        <h2>{locale === "zh" ? "作品说明" : "About the work"}</h2>
        <div>
          <p>{project.summary[locale]}</p>
          <p>
            {locale === "zh"
              ? "客户、年份、职责与公开授权信息将在确认后补充。"
              : "Client, date, role, and publication permissions will be added after confirmation."}
          </p>
          <a className="text-link" href={localePath(locale, "work")}>
            {locale === "zh" ? "返回全部作品" : "Back to all work"}
          </a>
        </div>
      </section>
    </>
  );
}

function About({ locale }: { locale: Locale }) {
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">{locale === "zh" ? "关于" : "About"}</p>
        <div className="page-intro-copy">
          <h1>{locale === "zh" ? "用细腻的观察，画出轻松而有温度的故事。" : "Warm stories drawn from thoughtful observation."}</h1>
        </div>
      </section>
      <section className="content-section">
        <h2>{locale === "zh" ? "Aviva大双" : "Aviva Dashuang"}</h2>
        <p>
          {locale === "zh"
            ? "Aviva大双是一位插画创作者，关注人物、食物、城市和日常生活中的细小情绪。完整个人经历、所在地与可合作地区待补充。"
            : "Aviva Dashuang is an illustrator interested in people, food, cities, and the small emotions of everyday life. Full biography, location, and collaboration regions are to be confirmed."}
        </p>
        <h2>{locale === "zh" ? "合作方式" : "How we can work together"}</h2>
        <ol>
          <li>{locale === "zh" ? "了解品牌与实际使用场景" : "Understand the brand and where the work will live"}</li>
          <li>{locale === "zh" ? "确认概念与视觉方向" : "Align on concept and visual direction"}</li>
          <li>{locale === "zh" ? "完成插画与应用延展" : "Create the illustration and its applications"}</li>
          <li>{locale === "zh" ? "交付文件并配合落地" : "Deliver files and support production"}</li>
        </ol>
      </section>
    </>
  );
}

function Contact({ locale }: { locale: Locale }) {
  return (
    <section className="contact-panel">
      <p className="eyebrow">{locale === "zh" ? "发起合作" : "Start a project"}</p>
      <h1>{locale === "zh" ? "聊聊你想一起完成的项目。" : "Let’s talk about what we could make together."}</h1>
      <p className="contact-lead">
        {locale === "zh"
          ? "欢迎通过邮箱介绍品牌、使用场景、期望交付物和大致时间。"
          : "Email me about your brand, where the work will be used, the deliverables you need, and your broad timing."}
      </p>
      <dl className="contact-methods">
        <div className="contact-method">
          <dt>{locale === "zh" ? "邮箱" : "Email"}</dt>
          <dd>
            <a className="contact-value-link" href="mailto:avivaluojing@163.com">
              avivaluojing@163.com
            </a>
          </dd>
        </div>
        <div className="contact-method">
          <dt className="social-label">
            <SiXiaohongshu aria-hidden="true" />
            <span>{locale === "zh" ? "小红书" : "Xiaohongshu"}</span>
          </dt>
          <dd>{locale === "zh" ? "链接待补充" : "Link to be confirmed"}</dd>
        </div>
        <div className="contact-method">
          <dt className="social-label">
            <SiInstagram aria-hidden="true" />
            <span>Instagram</span>
          </dt>
          <dd>{locale === "zh" ? "链接待补充" : "Link to be confirmed"}</dd>
        </div>
      </dl>
    </section>
  );
}

function Privacy({ locale }: { locale: Locale }) {
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">{locale === "zh" ? "隐私说明" : "Privacy"}</p>
        <div className="page-intro-copy">
          <h1>{locale === "zh" ? "只收集合作沟通所必需的信息。" : "Only the information needed for project conversations."}</h1>
        </div>
      </section>
      <section className="content-section">
        <p>
          {locale === "zh"
            ? "当前网站没有联系表单、账号、支付或分析追踪功能，因此不会主动收集访客提交的个人信息。未来增加联系表单或统计工具前，将先更新本说明并明确数据用途与保存期限。"
            : "This website currently has no contact form, accounts, payments, or analytics tracking, so it does not actively collect personal information submitted by visitors. This notice will be updated before any contact form or analytics tool is introduced."}
        </p>
      </section>
    </>
  );
}

export function SitePage({ path }: SitePageProps) {
  const locale: Locale = path[0] === "en" ? "en" : "zh";
  const route = locale === "en" ? path.slice(1) : path;
  const key = route[0] ?? "";
  let content: React.ReactNode;

  if (key === "") content = <Home locale={locale} />;
  else if (key === "work" && route.length === 1) content = <Work locale={locale} />;
  else if (key === "work" && route.length === 2) {
    const project = projects.find((item) => item.slug === route[1]);
    if (!project) notFound();
    content = <ProjectDetail locale={locale} project={project} />;
  } else if (key === "about" && route.length === 1) content = <About locale={locale} />;
  else if (key === "contact" && route.length === 1) content = <Contact locale={locale} />;
  else if (key === "privacy" && route.length === 1) content = <Privacy locale={locale} />;
  else notFound();

  return (
    <>
      <a className="skip-link" href="#main">
        {locale === "zh" ? "跳到主要内容" : "Skip to main content"}
      </a>
      <Header locale={locale} path={route} />
      <main className="site-main" id="main">
        {content}
      </main>
      <Footer locale={locale} />
    </>
  );
}

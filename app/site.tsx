/* eslint-disable @next/next/no-img-element -- source artwork uses prepared static derivatives */
import { notFound, redirect } from "next/navigation";
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
        <a
          className="nav-link"
          href={localePath(locale)}
          aria-current={current === "" ? "page" : undefined}
        >
          {c.home}
        </a>
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
          <a href={localePath(locale)} aria-current={current === "" ? "page" : undefined}>
            {c.home}
          </a>
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

function Footer({ locale, home = false }: { locale: Locale; home?: boolean }) {
  const c = copy[locale].footer;
  return (
    <footer className={`site-footer ${home ? "site-footer-home" : ""}`}>
      <div className="site-footer-inner">
        <div className="footer-prompt">
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
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Aviva大双</p>
          <div className="footer-socials">
            {home ? (
              <a className="footer-email" href="mailto:avivaluojing@163.com">
                avivaluojing@163.com
              </a>
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
          <a className="text-link" href={localePath(locale, "privacy")}>
            {c.privacy}
          </a>
        </div>
      </div>
    </footer>
  );
}

function WorkCard({ project, locale, index }: { project: Project; locale: Locale; index: number }) {
  const cover = project.cover;
  return (
    <a className={`work-card ${project.className ?? ""}`} href={localePath(locale, `work/${project.slug}`)}>
      <div className="work-card-image">
        <img
          src={cover.src}
          width={cover.width}
          height={cover.height}
          alt={cover.alt[locale]}
          loading="lazy"
        />
      </div>
      <div className="work-card-copy">
        <div className="work-card-heading">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <p className="work-card-category">{project.category[locale]}</p>
            <h3>{project.title[locale]}</h3>
          </div>
        </div>
        <div className="work-card-services">
          <p>{project.services[locale]}</p>
          <span aria-hidden="true">→</span>
        </div>
      </div>
    </a>
  );
}

function Home({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const projectBySlug = (slug: string) => {
    const project = projects.find((item) => item.slug === slug);
    if (!project) throw new Error(`Missing homepage project: ${slug}`);
    return project;
  };
  const gegelato = projectBySlug("gegelato-brand");
  const illustratedObjects = projectBySlug("illustrated-objects");
  const parisStories = projectBySlug("paris-printemps");
  const heroProject = parisStories;
  const heroCover = heroProject.gallery[0] ?? heroProject.cover;

  const highlights = [
    {
      project: gegelato,
      eyebrow: locale === "zh" ? "餐饮与饮品" : "Food & Drink",
      title: locale === "zh" ? "让品牌被看见，\n也被记住。" : "Make a brand visible—\nand memorable.",
      detail:
        locale === "zh"
          ? "餐饮与饮品插画\n图案设计 · 场景开发"
          : "Food & drink illustration\nMotif design · Spatial applications",
      tone: "home-feature-paper",
    },
    {
      project: illustratedObjects,
      eyebrow: locale === "zh" ? "包装与周边" : "Packaging & Objects",
      title: locale === "zh" ? "把插画带进\n真实生活。" : "Bring illustration\ninto everyday life.",
      detail:
        locale === "zh"
          ? "包装插画 · 视觉延展\n生活物件 · 手作周边"
          : "Packaging illustration · Visual extension\nObjects · Handmade pieces",
      tone: "home-feature-warm",
    },
  ];

  return (
    <>
      <section className="home-hero">
        <div className="home-hero-copy">
          <h1>{c.hero.title}</h1>
          <div className="hero-rule" />
          <p>{c.hero.body}</p>
          <a className="text-link" href="#services">
            {c.hero.link} <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="home-hero-art">
          <a
            href={localePath(locale, `work/${heroProject.slug}`)}
            aria-label={heroProject.title[locale]}
          >
            <img
              src={heroCover.src}
              width={heroCover.width}
              height={heroCover.height}
              alt={heroCover.alt[locale]}
              fetchPriority="high"
            />
          </a>
        </div>
      </section>

      {highlights.map(({ project, eyebrow, title, detail, tone }) => (
        <section className={`home-feature ${tone}`} key={project.slug}>
          <div className="home-feature-inner">
            <div className="home-feature-copy">
              <p className="home-feature-eyebrow">{eyebrow}</p>
              <h2>{title}</h2>
              <div className="hero-rule" />
              <p className="home-feature-project">{project.title[locale]}</p>
              <p className="home-feature-detail">{detail}</p>
              <a className="text-link" href={localePath(locale, `work/${project.slug}`)}>
                {locale === "zh" ? "查看项目" : "View project"} <span aria-hidden="true">→</span>
              </a>
            </div>
            <a className="home-feature-art" href={localePath(locale, `work/${project.slug}`)}>
              <img
                src={project.cover.src}
                width={project.cover.width}
                height={project.cover.height}
                alt={project.cover.alt[locale]}
                loading="lazy"
              />
            </a>
          </div>
        </section>
      ))}

      <section className="services home-services" id="services">
        <div className="services-list">
          {c.services.items.map(([title, body]) => (
            <div className="service-row" key={title}>
              <h3>{title}</h3>
              <p className="service-en" lang={locale === "zh" ? "en" : "zh-CN"}>
                {locale === "zh"
                  ? title === "品牌插画系统"
                    ? "Brand Illustration"
                    : title === "包装与餐饮视觉"
                      ? "Packaging & Food Visuals"
                      : "Illustration & Objects"
                  : ""}
              </p>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Work({ locale }: { locale: Locale }) {
  const workOrder = [
    "gegelato-brand",
    "food-hospitality",
    "illustrated-objects",
    "lemon-tea-packaging",
    "paris-printemps",
    "everyday-observations",
    "christmas-stories",
    "portraits-family",
  ];
  const orderedProjects = workOrder.map((slug) => {
    const project = projects.find((item) => item.slug === slug);
    if (!project) throw new Error(`Missing work page project: ${slug}`);
    return project;
  });

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
          <p className="page-intro-count">{orderedProjects.length} {locale === "zh" ? "个精选项目" : "curated projects"}</p>
        </div>
      </section>
      <section className="project-list" aria-label={locale === "zh" ? "作品列表" : "Project list"}>
        {orderedProjects.map((project, index) => (
          <WorkCard project={project} locale={locale} index={index} key={project.slug} />
        ))}
      </section>
    </>
  );
}

function ProjectDetail({ locale, project }: { locale: Locale; project: Project }) {
  const cover = project.cover;
  return (
    <>
      <section className="detail-header">
        <div className="detail-title">
          <p className="project-kicker">{project.category[locale]}</p>
          <h1>{project.title[locale]}</h1>
          <a className="detail-back" href={localePath(locale, "work")}>
            <span aria-hidden="true">←</span> {locale === "zh" ? "全部作品" : "All work"}
          </a>
        </div>
        <dl className="detail-meta">
          <div>
            <dt className="meta-label">{locale === "zh" ? "服务" : "Services"}</dt>
            <dd>{project.services[locale]}</dd>
          </div>
          <div>
            <dt className="meta-label">{locale === "zh" ? "项目信息" : "Project info"}</dt>
            <dd>{project.projectInfo[locale]}</dd>
          </div>
        </dl>
      </section>
      <div className="detail-hero">
        <img
          src={cover.src}
          width={cover.width}
          height={cover.height}
          alt={cover.alt[locale]}
          fetchPriority="high"
        />
      </div>
      <section className="project-body">
        <div>
          <p className="eyebrow">{locale === "zh" ? "作品说明" : "About the work"}</p>
          <h2>{locale === "zh" ? "从画面到真实应用。" : "From image to real-world application."}</h2>
        </div>
        <div>
          <p>{project.summary[locale]}</p>
          <a className="text-link" href={localePath(locale, "work")}>
            {locale === "zh" ? "返回全部作品" : "Back to all work"}
          </a>
        </div>
      </section>
      {project.gallery.length > 0 && (
        <section className="project-gallery" aria-label={locale === "zh" ? "项目图片" : "Project images"}>
          {project.gallery.map((image) => {
            const orientation =
              image.width > image.height * 1.22
                ? "gallery-wide"
                : image.height > image.width * 1.22
                  ? "gallery-portrait"
                  : "gallery-square";
            return (
              <div className={orientation} key={image.src}>
                <img
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={image.alt[locale]}
                  loading="lazy"
                />
              </div>
            );
          })}
        </section>
      )}
    </>
  );
}

function About({ locale }: { locale: Locale }) {
  const steps = locale === "zh"
    ? ["了解品牌与实际使用场景", "确认概念与视觉方向", "完成插画与应用延展", "交付文件并配合落地"]
    : ["Understand the brand and where the work will live", "Align on concept and visual direction", "Create the illustration and its applications", "Deliver files and support production"];

  return (
    <>
      <section className="page-intro about-intro">
        <p className="eyebrow">{locale === "zh" ? "关于" : "About"}</p>
        <div className="page-intro-copy">
          <h1>{locale === "zh" ? "用细腻的观察，画出轻松而有温度的故事。" : "Warm stories drawn from thoughtful observation."}</h1>
          <div className="section-rule" />
          <p>{locale === "zh" ? "插画设计师、创意工作室主理人，也是理解品牌真实经营场景的联合创始人。" : "An illustrator and creative studio lead with first-hand experience building hospitality brands."}</p>
        </div>
      </section>
      <section className="about-story">
        <p className="about-story-label">Aviva Dashuang<br />Luo Jing</p>
        <div className="about-story-copy">
          <article>
            <p className="eyebrow">{locale === "zh" ? "创作与生活" : "Practice & life"}</p>
            <h2>{locale === "zh" ? "Aviva大双" : "Aviva Dashuang"}</h2>
            <p>{locale === "zh"
              ? "Aviva大双（罗经）是一名插画设计师与创意工作室主理人，也拥有餐饮及冰淇淋品牌的联合创业经验。她在法国学习生活八年，现工作与生活于上海和天津，关注人物、食物、城市和日常生活中的细小情绪。"
              : "Aviva Dashuang (Luo Jing) is an illustrator and creative studio lead with hands-on experience co-founding food and gelato brands. After eight years of study and life in France, she now works between Shanghai and Tianjin, drawing inspiration from people, food, cities, and the small emotions of everyday life."}</p>
          </article>
          <article>
            <p className="eyebrow">{locale === "zh" ? "品牌经验" : "Brand experience"}</p>
            <h2>{locale === "zh" ? "理解画面，也理解经营。" : "Creative thinking grounded in real business."}</h2>
            <p>{locale === "zh"
              ? "作为 Fluffy、Gegelato、丛欢酒饭与丛欢意大利小酒馆的联合创始人，她参与品牌的设计规划与运营，也因此更了解插画如何真正进入产品、包装、菜单、空间与顾客体验。"
              : "As a co-founder of Fluffy, Gegelato, 丛欢酒饭, and 丛欢意大利小酒馆, she has contributed to brand planning, design, and operations. This experience shapes a practical understanding of how illustration can live across products, packaging, menus, spaces, and customer experiences."}</p>
            <p>{locale === "zh"
              ? "2023年，她曾现场向 Tim Cook 介绍 Fluffy 的创意，以及 iPad 在品牌设计与日常创作中的使用方式。"
              : "In 2023, she shared Fluffy’s creative approach with Tim Cook and demonstrated how the iPad supported the brand’s design and everyday creative work."}</p>
          </article>
        </div>
      </section>
      <section className="about-process">
        <div className="about-process-heading">
          <p className="eyebrow">{locale === "zh" ? "合作方式" : "How we work"}</p>
          <h2>{locale === "zh" ? "让创意清楚地落到真实场景。" : "A clear path from idea to application."}</h2>
        </div>
        <ol>
          {steps.map((step, index) => (
            <li key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>
          ))}
        </ol>
      </section>
    </>
  );
}

function Contact({ locale }: { locale: Locale }) {
  return (
    <section className="contact-panel">
      <div className="contact-heading">
        <p className="eyebrow">{locale === "zh" ? "发起合作" : "Start a project"}</p>
        <h1>{locale === "zh" ? "聊聊你想一起完成的项目。" : "Let’s talk about what we could make together."}</h1>
      </div>
      <div className="contact-intro">
        <div className="section-rule" />
        <p className="contact-lead">
          {locale === "zh"
            ? "欢迎通过邮箱介绍品牌、使用场景、期望交付物和大致时间。"
            : "Email me about your brand, where the work will be used, the deliverables you need, and your broad timing."}
        </p>
      </div>
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
          <dd>
            <a
              className="contact-value-link"
              href="https://xhslink.com/m/7SoyMlHCsdd"
              target="_blank"
              rel="noreferrer"
            >
              {locale === "zh" ? "访问小红书主页" : "View Xiaohongshu profile"}
            </a>
          </dd>
        </div>
        <div className="contact-method">
          <dt className="social-label">
            <SiInstagram aria-hidden="true" />
            <span>Instagram</span>
          </dt>
          <dd>
            <a
              className="contact-value-link"
              href="https://www.instagram.com/jingluo_/"
              target="_blank"
              rel="noreferrer"
            >
              {locale === "zh" ? "访问 Instagram 主页" : "View Instagram profile"}
            </a>
          </dd>
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
      <section className="privacy-content">
        <p className="privacy-index">01</p>
        <div>
          <p className="eyebrow">{locale === "zh" ? "当前说明" : "Current notice"}</p>
          <p>
            {locale === "zh"
              ? "当前网站没有联系表单、账号、支付或分析追踪功能，因此不会主动收集访客提交的个人信息。未来增加联系表单或统计工具前，将先更新本说明并明确数据用途与保存期限。"
              : "This website currently has no contact form, accounts, payments, or analytics tracking, so it does not actively collect personal information submitted by visitors. This notice will be updated before any contact form or analytics tool is introduced."}
          </p>
        </div>
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
    if (!project) {
      const legacyProject = projects.find((item) => item.legacySlugs?.includes(route[1]));
      if (legacyProject) redirect(localePath(locale, `work/${legacyProject.slug}`));
      notFound();
    }
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
      <Footer locale={locale} home={key === ""} />
    </>
  );
}

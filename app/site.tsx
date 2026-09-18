import Image from "next/image";
import { PiArrowRight } from "react-icons/pi";
import { SiInstagram, SiXiaohongshu } from "react-icons/si";
import { aboutTalk, copy, type Locale, type Project, projects } from "./site-data";
import { PageShell, localePath } from "./site-shell";

function WorkCard({ project, locale, index }: { project: Project; locale: Locale; index: number }) {
  const cover = project.cover;
  return (
    <a className={`work-card ${project.className ?? ""}`} href={localePath(locale, `work/${project.slug}`)}>
      <div className="work-card-image">
        <Image
          src={cover.src}
          width={cover.width}
          height={cover.height}
          alt={cover.alt[locale]}
          sizes="(max-width: 720px) 100vw, (max-width: 1100px) 56vw, 50vw"
          loading="lazy"
          draggable={false}
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
  const foodHospitality = projectBySlug("food-hospitality");
  const gegelato = projectBySlug("gegelato-brand");
  const illustratedObjects = projectBySlug("illustrated-objects");
  const heroProject = foodHospitality;

  return (
    <>
      <section className="editorial-home" aria-labelledby="home-title">
        <div className="editorial-intro">
          <p className="editorial-note" lang={locale === "zh" ? "en" : "zh-CN"}>
            {locale === "zh" ? "Draw a warmer everyday" : "让日常更温暖"}
          </p>
          <div className="editorial-copy">
            <h1 id="home-title">{c.hero.title}</h1>
            <div className="hero-rule" />
            <p>{c.hero.body}</p>
            <a className="editorial-link" href="#services">
              {c.hero.link} <PiArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <a
          className="editorial-hero-art"
          href={localePath(locale, `work/${heroProject.slug}`)}
          aria-label={heroProject.title[locale]}
        >
          <Image
            src={heroProject.cover.src}
            width={heroProject.cover.width}
            height={heroProject.cover.height}
            alt={heroProject.cover.alt[locale]}
            sizes="(max-width: 720px) 100vw, 62vw"
            preload
            draggable={false}
          />
        </a>

        <a className="editorial-project editorial-project-hero" href={localePath(locale, `work/${heroProject.slug}`)}>
          <span className="editorial-number">01</span>
          <span className="editorial-project-rule" />
          <strong>{heroProject.title[locale]}</strong>
          <small>{heroProject.category[locale]}</small>
          <span className="editorial-project-note">
            {locale === "zh" ? "人物、餐桌与城市日常" : "People, tables, and city life"}
          </span>
        </a>

        <a className="editorial-project editorial-project-gegelato" href={localePath(locale, `work/${gegelato.slug}`)}>
          <span className="editorial-number">02</span>
          <span className="editorial-project-rule" />
          <strong>{gegelato.title[locale]}</strong>
          <small>{gegelato.category[locale]}</small>
          <span className="editorial-project-note">
            {locale === "zh" ? "甜蜜灵感，进入真实品牌场景。" : "Sweet ideas for a sweeter day."}
          </span>
        </a>

        <a className="editorial-secondary-art editorial-gegelato-art" href={localePath(locale, `work/${gegelato.slug}`)}>
          <Image
            src={gegelato.cover.src}
            width={gegelato.cover.width}
            height={gegelato.cover.height}
            alt={gegelato.cover.alt[locale]}
            sizes="(max-width: 720px) 100vw, 43vw"
            loading="eager"
            draggable={false}
          />
        </a>

        <a className="editorial-secondary-art editorial-objects-art" href={localePath(locale, `work/${illustratedObjects.slug}`)}>
          <Image
            src={illustratedObjects.cover.src}
            width={illustratedObjects.cover.width}
            height={illustratedObjects.cover.height}
            alt={illustratedObjects.cover.alt[locale]}
            sizes="(max-width: 720px) 100vw, 24vw"
            loading="lazy"
            draggable={false}
          />
        </a>

        <a className="editorial-project editorial-project-objects" href={localePath(locale, `work/${illustratedObjects.slug}`)}>
          <span className="editorial-number">03</span>
          <span className="editorial-project-rule" />
          <strong>{illustratedObjects.title[locale]}</strong>
          <small>{illustratedObjects.category[locale]}</small>
          <span className="editorial-project-note">
            {locale === "zh" ? "小物件，也能承载大感受。" : "Small objects, big feelings."}
          </span>
        </a>

        <div className="editorial-folio" aria-hidden="true">
          <span>AVIVA DASHUANG</span>
          <span>DRAW / PEOPLE / FOOD / DAILY LIFE</span>
        </div>
      </section>

      <section className="editorial-services services home-services" id="services">
        <header className="editorial-services-heading">
          <p className="eyebrow">{c.services.eyebrow}</p>
          <h2>
            {c.services.title.split("\n").map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p>{c.services.intro}</p>
        </header>
        <div className="services-list">
          {c.services.items.map(({ title, translation, body }, index) => (
            <div className="service-row" key={title}>
              <span className="service-index">0{index + 1}</span>
              <h3>{title}</h3>
              <p className="service-en" lang={locale === "zh" ? "en" : "zh-CN"}>
                {translation}
              </p>
              <p>{body}</p>
            </div>
          ))}
        </div>
        <a className="style-menu-home-link" href={localePath(locale, "styles")}>
          <span>{locale === "zh" ? "还不确定从哪种画面开始？" : "Not sure where to begin?"}</span>
          <strong>{locale === "zh" ? "浏览插画风格与顾客肖像" : "Explore styles and personal portraits"} <span aria-hidden="true">↗</span></strong>
        </a>
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
        <Image
          src={cover.src}
          width={cover.width}
          height={cover.height}
          alt={cover.alt[locale]}
          sizes="100vw"
          preload
          draggable={false}
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
                <Image
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={image.alt[locale]}
                  sizes={orientation === "gallery-wide" ? "100vw" : "(max-width: 720px) 100vw, 62vw"}
                  loading="lazy"
                  draggable={false}
                />
              </div>
            );
          })}
        </section>
      )}
      <p className="project-rights">
        {locale === "zh"
          ? "© Aviva大双。作品仅供浏览，未经授权不得复制、转载或用于商业用途。"
          : "© Aviva Dashuang. Artwork is presented for viewing only and may not be copied, republished, or used commercially without permission."}
      </p>
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
        <figure className="about-portrait">
          <Image
            src="/images/about/aviva-paris-portrait.webp"
            width="1440"
            height="1800"
            alt={locale === "zh" ? "Aviva大双站在河畔桥上，背景为城市建筑" : "Aviva Dashuang standing on a riverside bridge with city architecture behind her"}
            sizes="(max-width: 720px) 100vw, 36vw"
            loading="lazy"
            draggable={false}
          />
          <figcaption>Aviva Dashuang<br />Luo Jing</figcaption>
        </figure>
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
      <section className="about-talk">
        <div className="about-talk-copy">
          <p className="eyebrow">{aboutTalk.eyebrow[locale]}</p>
          <h2>{aboutTalk.title[locale]}</h2>
          <p>{aboutTalk.description[locale]}</p>
          <p className="about-talk-meta">
            <span>{aboutTalk.year}</span>
            <span>{aboutTalk.event}</span>
            <span>{aboutTalk.venue[locale]}</span>
          </p>
        </div>
        <div className="about-talk-images">
          {aboutTalk.images.map((image, index) => (
            <figure className={index === 0 ? "about-talk-main" : "about-talk-support"} key={image.src}>
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt[locale]}
                sizes={index === 0 ? "(max-width: 720px) 100vw, 66vw" : "(max-width: 720px) 100vw, 32vw"}
                loading="lazy"
                draggable={false}
              />
            </figure>
          ))}
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

export function HomePage({ locale }: { locale: Locale }) {
  return <PageShell locale={locale} path={[]}><Home locale={locale} /></PageShell>;
}

export function WorkPage({ locale }: { locale: Locale }) {
  return <PageShell locale={locale} path={["work"]}><Work locale={locale} /></PageShell>;
}

export function ProjectPage({ locale, project }: { locale: Locale; project: Project }) {
  return (
    <PageShell locale={locale} path={["work", project.slug]}>
      <ProjectDetail locale={locale} project={project} />
    </PageShell>
  );
}

export function AboutPage({ locale }: { locale: Locale }) {
  return <PageShell locale={locale} path={["about"]}><About locale={locale} /></PageShell>;
}

export function ContactPage({ locale }: { locale: Locale }) {
  return <PageShell locale={locale} path={["contact"]}><Contact locale={locale} /></PageShell>;
}

export function PrivacyPage({ locale }: { locale: Locale }) {
  return <PageShell locale={locale} path={["privacy"]}><Privacy locale={locale} /></PageShell>;
}

export { NotFoundPage } from "./site-shell";

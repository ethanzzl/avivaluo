import Image from "next/image";
import { PiArrowRight } from "react-icons/pi";
import { SiInstagram, SiXiaohongshu } from "react-icons/si";
import { aboutFluffyMoment, aboutTalk, copy, type Locale, type Project, projects } from "./site-data";
import { PageShell, localePath } from "./site-shell";

function WorkCard({ project, locale }: { project: Project; locale: Locale }) {
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
          <div>
            <p className="work-card-category">{project.category[locale]}</p>
            <h3>{project.title[locale]}</h3>
          </div>
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
          <div className="editorial-copy">
            <h1 id="home-title">
              {locale === "zh" ? (
                <><span>为品牌画出</span><span>被记住的温度。</span></>
              ) : c.hero.title}
            </h1>
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
          <strong>{locale === "zh" ? "餐饮与空间插画" : "Food & hospitality illustration"}</strong>
        </a>

        <a className="editorial-project editorial-project-gegelato" href={localePath(locale, `work/${gegelato.slug}`)}>
          <strong>{gegelato.title[locale]}</strong>
          <small>{locale === "zh" ? "冰激凌品牌里的角色与店铺" : "Characters and a gelato shop"}</small>
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
          <strong>{illustratedObjects.title[locale]}</strong>
        </a>
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
          {c.services.items.map(({ title, body }) => (
            <div className="service-row" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
        <a className="style-menu-home-link" href={localePath(locale, "styles")}>
          <span>{locale === "zh" ? "如果你还不确定从哪里开始，也没关系。" : "If you are not sure where to begin, that's okay."}</span>
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
        {orderedProjects.map((project) => (
          <WorkCard project={project} locale={locale} key={project.slug} />
        ))}
      </section>
    </>
  );
}

function ProjectDetail({ locale, project }: { locale: Locale; project: Project }) {
  const cover = project.cover;
  const isGegelato = project.slug === "gegelato-brand";
  const gegelatoSections = isGegelato ? [
    {
      image: project.gallery[0],
      className: "gegelato-wordmark",
      title: locale === "zh" ? "LOGO" : "Logo",
    },
    {
      image: project.gallery[1],
      className: "gegelato-character",
      title: locale === "zh" ? "角色" : "Character",
      description: locale === "zh"
        ? "厨师与冰淇淋角色，和 LOGO 一起出现在贴纸图形里。"
        : "The chef and gelato character appear alongside the logo in a sticker graphic.",
    },
    {
      image: project.gallery[2],
      className: "gegelato-in-use",
      title: locale === "zh" ? "在店里" : "In the shop",
      description: locale === "zh"
        ? "角色也被做成刺绣标牌。"
        : "The character also became an embroidered sign.",
    },
  ] : [];
  if (isGegelato && gegelatoSections.some(({ image }) => !image)) {
    throw new Error("Gegelato gallery is missing an artwork");
  }
  return (
    <>
      <section className={`detail-header${isGegelato ? " gegelato-header" : ""}`}>
        <div className="detail-title">
          <p className="project-kicker">{project.category[locale]}</p>
          <h1>{project.title[locale]}</h1>
          <a className="detail-back" href={localePath(locale, "work")}>
            <span aria-hidden="true">←</span> {locale === "zh" ? "全部作品" : "All work"}
          </a>
        </div>
        {isGegelato ? (
          <p className="gegelato-services">{project.services[locale]}</p>
        ) : (
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
        )}
      </section>
      <div className={`detail-hero${isGegelato ? " gegelato-hero" : ""}`}>
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
      {isGegelato ? (
        <>
          <section className="gegelato-intro" aria-labelledby="gegelato-intro-title">
            <h2 id="gegelato-intro-title">{locale === "zh" ? "关于这个项目" : "About the project"}</h2>
            <p>{project.summary[locale]}</p>
          </section>
          <section className="gegelato-gallery" aria-label={locale === "zh" ? "Gegelato 项目图片" : "Gegelato project images"}>
            {gegelatoSections.map(({ image, className, title, description }) => (
              <figure className={className} key={image.src}>
                <figcaption>
                  <h2>{title}</h2>
                  {description && <p>{description}</p>}
                </figcaption>
                <Image
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={image.alt[locale]}
                  sizes="(max-width: 720px) 100vw, (max-width: 1100px) 65vw, 55vw"
                  loading="lazy"
                  draggable={false}
                />
              </figure>
            ))}
          </section>
          <div className="gegelato-end">
            <a className="text-link" href={localePath(locale, "work")}>
              {locale === "zh" ? "返回全部作品" : "Back to all work"}
            </a>
          </div>
        </>
      ) : (
        <>
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
        </>
      )}
      <p className={`project-rights${isGegelato ? " gegelato-rights" : ""}`}>
        {locale === "zh"
          ? "© Aviva大双。作品仅供浏览，未经授权不得复制、转载或用于商业用途。"
          : "© Aviva Dashuang. Artwork is presented for viewing only and may not be copied, republished, or used commercially without permission."}
      </p>
    </>
  );
}

function About({ locale }: { locale: Locale }) {
  return (
    <>
      <section className="page-intro about-intro">
        <p className="eyebrow">{locale === "zh" ? "关于" : "About"}</p>
        <div className="page-intro-copy">
          <h1>{locale === "zh" ? "Aviva 大双" : "Aviva Dashuang"}</h1>
          <p>{locale === "zh" ? "插画设计师，也在做自己的品牌和小店。" : "I’m an illustrator. I also help run a few brands and small shops of my own."}</p>
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
        </figure>
        <div className="about-story-copy">
          <p>{locale === "zh"
            ? "我是罗经，也叫 Aviva 大双，平时做插画和品牌相关的设计。"
            : "I’m Luo Jing, also known as Aviva Dashuang. I make illustrations and work on visual ideas for brands."}</p>
          <p>{locale === "zh"
            ? "我曾在法国学习和生活八年，现在主要在上海和天津之间工作和生活。走在街上、看人吃饭、留意一座城市的日常，都是我画画时会带回来的东西。"
            : "I spent eight years studying and living in France. These days, I mainly work and live between Shanghai and Tianjin. People, food, and the small details of city life often find their way into my drawings."}</p>
          <p>{locale === "zh"
            ? "除了插画项目，这些年我也参与创立和经营过几家餐饮与生活方式品牌，包括 Fluffy、Gegelato、丛欢酒饭和丛欢意大利小酒馆。这些经历让我更清楚，一幅画最后会怎样出现在包装、菜单、店铺和客人真正会接触到的东西里。"
            : "Alongside illustration, I’ve helped start and run a few food and lifestyle brands, including Fluffy, Gegelato, 丛欢酒饭, and 丛欢意大利小酒馆. It has shown me how a drawing becomes part of a package, a menu, a shop, or something a customer actually holds."}</p>
        </div>
      </section>
      <section className="about-talk">
        <div className="about-talk-copy">
          <h2>{aboutTalk.event}</h2>
          <p className="about-talk-meta">
            {aboutTalk.year} · {aboutTalk.venue[locale]}
          </p>
          <p>{aboutTalk.description[locale]}</p>
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
      <section className="about-moment">
        <div className="about-moment-copy">
          <h2>{aboutFluffyMoment.heading}</h2>
          <p>{aboutFluffyMoment.description[locale]}</p>
        </div>
        <figure className="about-moment-photo">
          <Image
            src={aboutFluffyMoment.image.src}
            width={aboutFluffyMoment.image.width}
            height={aboutFluffyMoment.image.height}
            alt={aboutFluffyMoment.image.alt[locale]}
            sizes="(max-width: 900px) 100vw, 52vw"
            loading="lazy"
            draggable={false}
          />
          <figcaption>{aboutFluffyMoment.image.caption[locale]}</figcaption>
        </figure>
      </section>
      <section className="about-closing">
        <p>{locale === "zh"
          ? "合作通常从了解品牌和使用场景开始，再慢慢确认画面方向和最后会出现在哪里。"
          : "A project usually starts with getting to know the brand and where the work will live. From there, we find the visual direction together."}</p>
        <p>{locale === "zh" ? "如果你有一个想一起完成的项目，可以给我写信。" : "If you have a project in mind, I’d love to hear about it."}</p>
        <a href={localePath(locale, "contact")}>{locale === "zh" ? "联系我" : "Get in touch"} <PiArrowRight aria-hidden="true" /></a>
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

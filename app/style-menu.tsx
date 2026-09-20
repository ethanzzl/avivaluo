import Image from "next/image";
import type { Locale } from "./site-data";
import { PageShell, localePath } from "./site-shell";

const styleCards = [
  {
    id: "01",
    english: "Customer Portrait",
    title: { zh: "顾客肖像", en: "Customer Portrait" },
    description: {
      zh: "保留人物真实特征，也保留彼此之间的关系感。",
      en: "Keeping each person recognisable while preserving the feeling between them.",
    },
    use: { zh: "头像 / 婚礼 / 家庭 / 纪念肖像", en: "Avatars / Weddings / Families / Keepsake portraits" },
    note: {
      zh: "我会从真实照片重新观察，不套统一的头像模板。",
      en: "I look again from the real photographs rather than applying a fixed portrait template.",
    },
    images: [
      { id: "01-A", src: "/images/style-menu/cards/01-A.webp", width: 1350, height: 1800, alt: { zh: "父母与孩子的三人家庭肖像", en: "Three-person family portrait" } },
      { id: "01-B", src: "/images/style-menu/cards/01-B.webp", width: 1350, height: 1800, alt: { zh: "相互依偎的新婚伴侣肖像", en: "Newlywed couple portrait" } },
      { id: "01-C", src: "/images/style-menu/cards/01-C.webp", width: 1350, height: 1800, alt: { zh: "卷发人物的个人肖像", en: "Individual portrait with curly hair" } },
    ],
  },
  {
    id: "02",
    english: "Paper Observation",
    title: { zh: "纸上观察", en: "Paper Observation" },
    description: {
      zh: "从一个日常动作和少量细节出发，留住安静、松弛的纸上空间。",
      en: "Begins with an everyday action and a few details, leaving quiet, relaxed space on the page.",
    },
    images: [
      { id: "02-A", src: "/images/style-menu/cards/02-A.jpg", width: 690, height: 1055, alt: { zh: "戴耳机阅读杂志的人物", en: "Reader wearing headphones" } },
      { id: "02-B", src: "/images/style-menu/cards/02-B.jpg", width: 723, height: 1024, alt: { zh: "站在绿色书店橱窗前的两个人", en: "Two people at a green bookshop window" } },
      { id: "02-C", src: "/images/style-menu/cards/02-C.jpg", width: 653, height: 924, alt: { zh: "坐在巴黎街边红桌旁的人物", en: "Figure seated at a red table on a Paris street" } },
    ],
  },
  {
    id: "03",
    english: "Life Theater",
    title: { zh: "生活剧场", en: "Life Theater" },
    description: {
      zh: "让人物、店铺、食物和物件共同组成一个正在发生的生活故事。",
      en: "Brings people, shops, food, and objects together in one unfolding story.",
    },
    use: { zh: "品牌主视觉 / 餐厅与城市场景 / 活动画面", en: "Brand visuals / Restaurant and city scenes / Events" },
    images: [
      { id: "03-A", src: "/images/style-menu/cards/03-A.jpg", width: 1163, height: 823, alt: { zh: "街角餐厅、顾客与象角色组成的生活场景", en: "Corner restaurant scene with guests and elephant characters" } },
      { id: "03-B", src: "/images/style-menu/cards/03-B.jpg", width: 454, height: 312, alt: { zh: "巴黎城市背景中的餐桌与用餐人物", en: "Dining table and figure against a Paris city view" } },
      { id: "03-C", src: "/images/style-menu/cards/03-C.jpg", width: 805, height: 907, alt: { zh: "咖啡馆入口与多组顾客的场景", en: "Café entrance scene with several groups of guests" } },
    ],
  },
  {
    id: "04",
    english: "Bright Brand",
    title: { zh: "明快品牌", en: "Bright Brand" },
    description: {
      zh: "把品牌特有的动作、物件和图案，慢慢发展成可以反复使用的视觉语言。",
      en: "Growing a brand's own gestures, objects, and patterns into a visual language that can be used again and again.",
    },
    use: { zh: "品牌识别 / 包装 / 菜单 / 贴纸与周边", en: "Identity / Packaging / Menus / Stickers and merchandise" },
    note: {
      zh: "这些作品来自不同品牌，新的画面不会混用它们的标志、角色和配色。",
      en: "These works come from different brands; a new project will not mix their marks, characters, or colours.",
    },
    images: [
      { id: "04-A", src: "/images/style-menu/cards/04-A.webp", width: 1557, height: 1800, alt: { zh: "Gegelato 厨师亲吻冰淇淋的角色字标", en: "Gegelato character wordmark with a chef kissing a gelato" } },
      { id: "04-B", src: "/images/style-menu/cards/04-B.webp", width: 1800, height: 1306, alt: { zh: "柠檬图案与信息层级组成的茶包装展开图", en: "Lemon tea packaging combining pattern and information hierarchy" } },
      { id: "04-C", src: "/images/style-menu/cards/04-C.webp", width: 1709, height: 1644, alt: { zh: "蓝色杯子与勺子组成的 Be-Wave 角色图形", en: "Blue Be-Wave cup character with a spoon" } },
    ],
  },
  {
    id: "05",
    english: "Night Metaphor",
    title: { zh: "黑夜隐喻", en: "Night Metaphor" },
    description: {
      zh: "用深色空间、熟悉物件和少量亮色，去画失眠、音乐和那些不容易直接说出的情绪。",
      en: "Using dark space, familiar objects, and small flashes of colour to draw insomnia, music, and feelings that are hard to say directly.",
    },
    images: [
      { id: "05-A", src: "/images/style-menu/cards/05-A.jpg", width: 447, height: 630, alt: { zh: "黑夜中的人物沙漏", en: "Figure held inside an hourglass at night" } },
      { id: "05-B", src: "/images/style-menu/cards/05-B.jpg", width: 447, height: 632, alt: { zh: "黑夜中双手握住掌上装置的隐喻画面", en: "Hands holding a device in a dark metaphorical scene" } },
      { id: "05-C", src: "/images/style-menu/cards/05-C.jpg", width: 447, height: 632, alt: { zh: "坐在收音机上的人物", en: "Figure seated on a radio" } },
    ],
  },
] as const;

export function StyleMenuPage({ locale }: { locale: Locale }) {
  const zh = locale === "zh";

  return (
    <PageShell locale={locale} path={["styles"]}>
      <div className="style-menu">
        <section className="style-menu-intro" aria-labelledby="style-menu-title">
          <p className="eyebrow">{zh ? "风格参考" : "VISUAL REFERENCES"}</p>
          <div>
            <h1 id="style-menu-title">{zh ? <>五种画面方向，<br />看看哪一种更接近你。</> : <>Five visual directions.<br />See which one feels closest to you.</>}</h1>
            <p>{zh ? <>这里放了 15 个真实作品。你可以记下喜欢的编号，<br className="desktop-only-break" />真正开始时，我会根据人物、场景和用途重新画。</> : <>Here are fifteen real works. Note the numbers you like; when we begin, I will draw again from your people, setting, and purpose.</>}</p>
          </div>
        </section>

        <section className="style-cards" aria-label={zh ? "五种画面方向" : "Five visual directions"}>
          <div className="style-card-list">
            {styleCards.map((card) => (
              <article className={`style-card style-card-${card.id}`} key={card.id}>
                <header className="style-card-header">
                  <div>
                    <p className="style-menu-index">{card.id}</p>
                    <h2>{card.title[locale]}</h2>
                    {zh ? <p className="style-card-english">{card.english}</p> : null}
                  </div>
                  <div className="style-card-copy">
                    <p>{card.description[locale]}</p>
                    {"use" in card ? <p className="style-card-use">{card.use[locale]}</p> : null}
                  </div>
                </header>

                <div className="style-card-gallery">
                  {card.images.map((work) => (
                    <figure className="style-card-work" key={work.id}>
                      <Image
                        src={work.src}
                        width={work.width}
                        height={work.height}
                        alt={work.alt[locale]}
                        sizes="(max-width: 720px) 100vw, (max-width: 1200px) 45vw, 520px"
                        loading={work.id === "04-C" ? "eager" : "lazy"}
                      />
                      <figcaption>{work.id}</figcaption>
                    </figure>
                  ))}
                </div>

                {"note" in card ? <p className="style-card-note">{card.note[locale]}</p> : null}
              </article>
            ))}
          </div>
        </section>

        <section className="style-menu-close" aria-labelledby="style-menu-close-title">
          <div>
            <h2 id="style-menu-close-title">{zh ? "还不确定喜欢哪一种？" : "Not sure which one you like?"}</h2>
            <p>{zh ? "告诉我画给谁、会用在哪里，以及你希望它留下什么感觉。这些参考只是开始，真正的画面会从你的项目重新出发。" : "Tell me who it is for, where it will be used, and what you want it to leave behind. These references are only a beginning; the real image will start again from your project."}</p>
          </div>
          <a className="solid-cta" href={localePath(locale, "contact")}>{zh ? "发起合作" : "Start a Project"} <span aria-hidden="true">↗</span></a>
        </section>
      </div>
    </PageShell>
  );
}

import Image from "next/image";
import type { Locale } from "./site-data";
import { PageShell, localePath } from "./site-shell";

const directions = [
  {
    id: "01", english: "Paper Observation", title: { zh: "纸上观察", en: "Paper Observation" },
    description: { zh: "从人物的姿态、表情与日常小动作开始，让留白替情绪说话。", en: "Starting with gestures, expressions, and quiet everyday details, with room for feeling to breathe." },
    use: { zh: "肖像、编辑插画与生活叙事", en: "Portraits, editorial illustration, and everyday stories" },
    image: "/images/projects/protected/curated/portraits-family-a22.webp", width: 1800, height: 1350,
    alt: { zh: "不同年龄人物组成的手绘群像", en: "Hand-drawn group portrait of people across generations" },
  },
  {
    id: "02", english: "Life Theater", title: { zh: "生活剧场", en: "Life Theater" },
    description: { zh: "让人物、店铺、食物和城市细节产生关系，把场景画成正在发生的故事。", en: "People, places, food, and city details become scenes with stories unfolding inside them." },
    use: { zh: "品牌主视觉、餐饮空间与活动画面", en: "Brand visuals, hospitality spaces, and campaigns" },
    image: "/images/projects/protected/curated/food-hospitality-a34.webp", width: 1273, height: 1800,
    alt: { zh: "书店橱窗前阅读的两个人物场景", en: "Illustrated scene of two readers at a bookshop window" },
  },
  {
    id: "03", english: "Bright Brand", title: { zh: "明快品牌", en: "Bright Brand" },
    description: { zh: "把一个有记忆点的动作，发展为能进入包装、店面和社交内容的视觉语言。", en: "A memorable character or gesture grows into a visual language across packaging, spaces, and content." },
    use: { zh: "餐饮品牌、包装、菜单与周边", en: "Food brands, packaging, menus, and merchandise" },
    image: "/images/projects/protected/curated/gegelato-brand-a27.webp", width: 1557, height: 1800,
    alt: { zh: "Gegelato 厨师冰淇淋角色与字标", en: "Gegelato chef character with the brand wordmark" },
  },
  {
    id: "04", english: "Night Metaphor", title: { zh: "黑夜隐喻", en: "Night Metaphor" },
    description: { zh: "让日常物件成为情绪线索，在深色空间里留下克制而奇异的一瞬。", en: "Everyday objects become emotional clues, holding a restrained, slightly uncanny moment in the dark." },
    use: { zh: "展览、音乐与概念主题", en: "Exhibitions, music, and conceptual themes" },
    image: "/images/style-menu/night-metaphor.jpg", width: 447, height: 632,
    alt: { zh: "深色背景中的隐喻性插画作品", en: "Metaphorical illustration against a dark background" },
  },
] as const;

export function StyleMenuPage({ locale }: { locale: Locale }) {
  const zh = locale === "zh";
  return (
    <PageShell locale={locale} path={["styles"]}>
      <div className="style-menu">
        <section className="style-menu-intro" aria-labelledby="style-menu-title">
          <p className="eyebrow">AVIVA / STYLE MENU</p>
          <div>
            <h1 id="style-menu-title">{zh ? "从一个人开始，画出你的故事。" : "Start with a person. Find the story."}</h1>
            <p>{zh ? "先看看顾客肖像，或从四种创作方向里找到更接近你故事的表达。这里展示的是创作方法，不是可以直接套用的滤镜。" : "Begin with a personal portrait or explore four ways of drawing a story. These are creative approaches, not ready-made filters."}</p>
          </div>
        </section>

        <section className="style-portrait" aria-labelledby="style-portrait-title">
          <div className="style-portrait-copy">
            <p className="style-menu-index">01-A / {zh ? "重点入口" : "Featured"}</p>
            <h2 id="style-portrait-title">{zh ? "顾客肖像" : "Personal Portraits"}</h2>
            <p className="style-portrait-subtitle">A portrait that still feels like you</p>
            <p>{zh ? "画你、画你们，或画想留住的人。以照片中的真实特征为起点，用大双的人物语言重新组织姿态、表情与情绪。" : "A portrait of you, your loved ones, or someone you want to remember. Real features are the starting point; gesture, expression, and feeling make the image personal."}</p>
            <p className="style-portrait-input">{zh ? "开始需要：人物照片、使用场景、想保留的特征与感受" : "To begin: reference photos, where it will be used, and the details you want to keep"}</p>
            <a className="style-menu-link" href={localePath(locale, "contact")}>{zh ? "聊聊肖像需求" : "Discuss a portrait"} <span aria-hidden="true">↗</span></a>
          </div>
          <Image className="style-portrait-image" src="/images/projects/protected/curated/portraits-family-a05.webp" width={1350} height={1800} alt={zh ? "父母与孩子的三人家庭肖像" : "Illustrated portrait of two parents and their child"} sizes="(max-width: 720px) 100vw, 44vw" priority />
        </section>

        <section className="style-directions" aria-labelledby="style-directions-title">
          <div className="style-directions-heading">
            <h2 id="style-directions-title">{zh ? "更多创作方向" : "More ways to tell your story"}</h2>
            <p>{zh ? "顾客肖像是“纸上观察”的专项应用。每个项目都会重新设计。" : "Personal Portraits is a focused application of Paper Observation. Every project is designed anew."}</p>
          </div>
          <div className="style-directions-grid">
            {directions.map((direction) => (
              <article className="style-direction" key={direction.id}>
                <div className={`style-direction-image style-direction-image-${direction.id}`}>
                  <Image src={direction.image} width={direction.width} height={direction.height} alt={direction.alt[locale]} sizes="(max-width: 720px) 100vw, 48vw" loading="lazy" />
                </div>
                <div className="style-direction-body">
                  <p className="style-menu-index">{direction.id} / {direction.english}</p>
                  <h3>{direction.title[locale]}</h3>
                  <p>{direction.description[locale]}</p>
                  <p className="style-direction-use">{zh ? "适合" : "For"} · {direction.use[locale]}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="style-menu-close" aria-labelledby="style-menu-close-title">
          <div>
            <h2 id="style-menu-close-title">{zh ? "还不确定选哪一种？" : "Not sure where to begin?"}</h2>
            <p>{zh ? "告诉我画给谁、用在哪里、想留下什么感受。选方向只是开始，画面会从你的真实需求出发。" : "Tell me who it is for, where it will live, and how you want it to feel. The direction is only a starting point."}</p>
          </div>
          <a className="solid-cta" href={localePath(locale, "contact")}>{zh ? "发起合作" : "Start a Project"} <span aria-hidden="true">↗</span></a>
        </section>
      </div>
    </PageShell>
  );
}

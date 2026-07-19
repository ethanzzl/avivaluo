export type Locale = "zh" | "en";

export type Project = {
  slug: string;
  title: Record<Locale, string>;
  category: Record<Locale, string>;
  services: Record<Locale, string>;
  summary: Record<Locale, string>;
  alt: Record<Locale, string>;
  image: string;
  width: number;
  height: number;
  className?: string;
};

export const projects: Project[] = [
  {
    slug: "corner-cafe",
    title: { zh: "街角咖啡馆", en: "Corner Café" },
    category: { zh: "品牌插画", en: "Brand Illustration" },
    services: {
      zh: "场景插画 · 角色叙事",
      en: "Scene Illustration · Character Storytelling",
    },
    summary: {
      zh: "一幅围绕街角咖啡馆展开的生活场景插画，以角色、招牌和用餐片段建立温暖而轻松的品牌氛围。",
      en: "A warm street-corner café scene built through characters, signage, and small moments of everyday dining.",
    },
    alt: {
      zh: "街角咖啡馆、用餐顾客与象角色组成的生活场景插画",
      en: "Illustrated street-corner café scene with diners and elephant characters",
    },
    image: "/images/projects/corner-cafe.jpg",
    width: 2400,
    height: 1697,
    className: "narrative-project",
  },
  {
    slug: "gelato-motif",
    title: { zh: "Gelato 图案", en: "Gelato Motif" },
    category: { zh: "餐饮与饮品", en: "Food & Drink" },
    services: {
      zh: "插画设计 · 图案开发",
      en: "Illustration · Motif Development",
    },
    summary: {
      zh: "以冰淇淋角色和刺绣质感构成的餐饮主题图案，探索插画在织物、礼赠和品牌周边中的应用。",
      en: "A food-themed motif combining an ice-cream character with an embroidered texture, suitable for fabric and illustrated objects.",
    },
    alt: {
      zh: "红色线迹绘制的冰淇淋角色刺绣图案",
      en: "Red stitched gelato character embroidery motif",
    },
    image: "/images/projects/gelato-embroidery.jpg",
    width: 1080,
    height: 1340,
  },
  {
    slug: "be-wave-gelato",
    title: { zh: "Be-Wave Gelato", en: "Be-Wave Gelato" },
    category: { zh: "餐饮与饮品", en: "Food & Drink" },
    services: {
      zh: "角色图形 · 产品视觉",
      en: "Character Graphic · Product Visual",
    },
    summary: {
      zh: "以简洁线条和蓝白配色塑造的 Gelato 杯形角色图形，呈现轻松、友好且便于延展的餐饮视觉。",
      en: "A friendly gelato cup character built with simple lines and a blue-and-cream palette for an easygoing product presence.",
    },
    alt: {
      zh: "蓝色 Gelato 杯与勺子的角色图形",
      en: "Blue gelato cup character graphic with spoon",
    },
    image: "/images/projects/be-wave-gelato.png",
    width: 1709,
    height: 1644,
  },
  {
    slug: "lemon-tea-packaging",
    title: { zh: "柠檬茶包装", en: "Lemon Tea Packaging" },
    category: { zh: "包装与周边", en: "Packaging & Objects" },
    services: {
      zh: "包装插画 · 视觉延展",
      en: "Packaging Illustration · Visual Extension",
    },
    summary: {
      zh: "以手绘柠檬与叶片建立清爽、明亮的茶饮包装视觉，并将重复图案延展到完整包装结构。",
      en: "A bright tea package built from hand-painted lemons and leaves, extended as a repeating pattern across the full pack.",
    },
    alt: {
      zh: "带有手绘柠檬和叶片图案的柠檬茶包装展开图",
      en: "Lemon tea packaging dieline with hand-painted lemons and leaves",
    },
    image: "/images/projects/lemon-tea-packaging.jpg",
    width: 2400,
    height: 1742,
    className: "wide-project",
  },
];

export const copy = {
  zh: {
    nav: {
      work: "作品",
      services: "合作方向",
      about: "关于",
      contact: "联系",
      language: "EN",
      menu: "菜单",
    },
    hero: {
      eyebrow: "插画创作与品牌视觉",
      title: "为品牌画出被记住的温度。",
      body: "用细腻的观察和温暖的角色，把故事、情绪与风格融入品牌，让插画在日常中被看见、被记住。",
      link: "了解合作方向",
    },
    groups: {
      food: "餐饮与饮品",
      foodEn: "Food & Drink",
      foodServices: "插画设计 · 图案开发",
      package: "包装与周边",
      packageEn: "Packaging & Objects",
      packageServices: "包装插画 · 视觉延展",
      brand: "品牌插画",
      brandEn: "Brand Illustration",
      brandServices: "场景插画 · 氛围表达",
    },
    services: {
      eyebrow: "合作方向",
      title: "从一幅画，到完整的品牌应用。",
      intro: "根据品牌目标和实际使用场景，选择合适的插画语言与延展方式。",
      items: [
        ["品牌插画系统", "品牌人物、主视觉、节日与社交传播插画。"],
        ["包装与餐饮视觉", "包装、菜单、杯套、外带物料与空间应用。"],
        ["插画周边开发", "礼盒、文创、服饰、印刷品与联名产品。"],
      ],
    },
    footer: {
      title: "有一个想一起完成的项目？",
      cta: "发起合作",
      note: "邮箱已开放，电话与社交链接待补充",
      privacy: "隐私说明",
    },
  },
  en: {
    nav: {
      work: "Work",
      services: "Services",
      about: "About",
      contact: "Contact",
      language: "中文",
      menu: "Menu",
    },
    hero: {
      eyebrow: "Illustration & Brand Visuals",
      title: "Illustration with warmth that stays in mind.",
      body: "Thoughtful characters and everyday observations become memorable visual stories for food, drink, and lifestyle brands.",
      link: "Explore services",
    },
    groups: {
      food: "Food & Drink",
      foodEn: "餐饮与饮品",
      foodServices: "Illustration · Motif Development",
      package: "Packaging & Objects",
      packageEn: "包装与周边",
      packageServices: "Packaging Illustration · Visual Extension",
      brand: "Brand Illustration",
      brandEn: "品牌插画",
      brandServices: "Scene Illustration · Visual Storytelling",
    },
    services: {
      eyebrow: "Services",
      title: "From one illustration to a complete brand application.",
      intro: "The visual language and deliverables are shaped around your brand goal and the places the work needs to live.",
      items: [
        ["Brand illustration systems", "Characters, key visuals, seasonal campaigns, and social illustration."],
        ["Packaging & food visuals", "Packaging, menus, cup sleeves, takeaway materials, and spatial applications."],
        ["Illustrated objects", "Gift boxes, merchandise, apparel, printed matter, and collaborations."],
      ],
    },
    footer: {
      title: "Have a project in mind?",
      cta: "Start a project",
      note: "Email available; phone and social links to be confirmed",
      privacy: "Privacy",
    },
  },
} as const;

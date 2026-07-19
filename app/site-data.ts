export type Locale = "zh" | "en";

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: Record<Locale, string>;
};

export type Project = {
  slug: string;
  legacySlugs?: string[];
  title: Record<Locale, string>;
  category: Record<Locale, string>;
  services: Record<Locale, string>;
  summary: Record<Locale, string>;
  projectInfo: Record<Locale, string>;
  cover: ProjectImage;
  gallery: ProjectImage[];
  className?: string;
};

function artwork(
  project: string,
  id: string,
  width: number,
  height: number,
  zh: string,
  en: string,
): ProjectImage {
  return {
    src: `/images/projects/curated/${project}-${id.toLowerCase()}.webp`,
    width,
    height,
    alt: { zh, en },
  };
}

export const projects: Project[] = [
  {
    slug: "gegelato-brand",
    legacySlugs: ["gelato-motif"],
    title: { zh: "Gegelato 品牌视觉", en: "Gegelato Brand Visuals" },
    category: { zh: "餐饮与饮品", en: "Food & Drink" },
    services: {
      zh: "品牌插画 · 标志图形 · 应用延展",
      en: "Brand Illustration · Lettering · Visual Extension",
    },
    summary: {
      zh: "围绕意式 Gelato 品牌建立轻松、亲切的视觉语言，将冰淇淋角色、字标和场景图形延展到品牌应用中。",
      en: "A warm and approachable visual language for an Italian gelato brand, extending character illustration, lettering, and playful graphics across brand applications.",
    },
    projectInfo: {
      zh: "联合创始人项目 · 年份待补充",
      en: "Co-founder project · Date to be confirmed",
    },
    cover: artwork(
      "gegelato-brand",
      "A24",
      1840,
      1530,
      "Gegelato户外空间与冰淇淋角色品牌应用图",
      "Gegelato outdoor setting with gelato character brand application",
    ),
    gallery: [
      artwork("gegelato-brand", "A28", 2400, 2400, "红色Gegelato英文字标", "Red Gegelato wordmark"),
      artwork("gegelato-brand", "A27", 2036, 2354, "厨师冰淇淋角色与Gegelato字标贴纸图形", "Chef gelato character and Gegelato sticker graphic"),
      artwork("gegelato-brand", "A23", 1080, 1340, "Gegelato厨师冰淇淋角色刺绣标牌", "Embroidered Gegelato chef character sign"),
    ],
  },
  {
    slug: "lemon-tea-packaging",
    title: { zh: "柠檬茶包装", en: "Lemon Tea Packaging" },
    category: { zh: "包装与周边", en: "Packaging & Objects" },
    services: {
      zh: "包装插画 · 图案开发 · 视觉延展",
      en: "Packaging Illustration · Pattern Design · Visual Extension",
    },
    summary: {
      zh: "以手绘柠檬、叶片和重复图案建立清爽明亮的茶饮包装视觉，并延展到完整包装结构。",
      en: "A bright tea packaging concept built from hand-drawn lemons, leaves, and a repeating pattern across the full packaging structure.",
    },
    projectInfo: {
      zh: "品牌与年份待补充",
      en: "Brand and date to be confirmed",
    },
    cover: artwork(
      "lemon-tea-packaging",
      "A53",
      2400,
      1697,
      "黄色柠檬图案的茶饮包装盒展开设计",
      "Tea package dieline covered in a yellow lemon pattern",
    ),
    gallery: [
      artwork(
        "lemon-tea-packaging",
        "A52",
        2400,
        1742,
        "柠檬与叶片图案的茶饮包装展开图",
        "Tea packaging dieline with lemons and leaves",
      ),
    ],
    className: "wide-project",
  },
  {
    slug: "paris-printemps",
    title: { zh: "巴黎与 Printemps 插画系列", en: "Paris & Printemps Illustration Series" },
    category: { zh: "品牌插画", en: "Brand Illustration" },
    services: {
      zh: "城市叙事 · 人物角色 · 场景插画",
      en: "City Storytelling · Characters · Scene Illustration",
    },
    summary: {
      zh: "以巴黎建筑、人物、动物角色与日常生活片段组成的插画系列，在城市识别与轻松叙事之间建立丰富的视觉世界。",
      en: "A character-led illustration series combining Parisian architecture, people, animals, and everyday moments into a lively visual world.",
    },
    projectInfo: {
      zh: "合作信息与年份待补充",
      en: "Collaboration details and date to be confirmed",
    },
    cover: artwork(
      "paris-printemps",
      "A13",
      2400,
      1697,
      "粉色室内场景中正在试婚纱的人物插画",
      "Illustrated bridal fitting scene in a pink interior",
    ),
    gallery: [
      artwork("paris-printemps", "A14", 2400, 1697, "巴黎餐桌与城市窗景插画", "Paris dining table and city window scene"),
      artwork("paris-printemps", "A15", 1697, 2400, "巴黎人物、美食与城市元素图集", "Collection of Paris characters, food, and city motifs"),
      artwork("paris-printemps", "A16", 1105, 1787, "Je suis Paris人物与城市图案", "Je suis Paris character and city motif"),
      artwork("paris-printemps", "A50", 2224, 1668, "巴黎建筑、动物角色与街区元素图案", "Paris buildings, animal characters, and neighborhood motifs"),
      artwork("paris-printemps", "A57", 2400, 1697, "巴黎露台上人物与象角色的城市线稿", "Paris terrace line drawing with a woman and elephant character"),
      artwork("paris-printemps", "A07", 2048, 2048, "巴黎圆顶建筑与秋色植物插画", "Paris domed building with autumn foliage"),
      artwork("paris-printemps", "A08", 2224, 1668, "巴黎圆顶建筑、花叶与蓝黄图形", "Paris dome with flowers and blue-and-yellow graphic shapes"),
    ],
  },
  {
    slug: "food-hospitality",
    legacySlugs: ["corner-cafe", "be-wave-gelato"],
    title: { zh: "餐饮与空间插画精选", en: "Food & Hospitality Illustration Studies" },
    category: { zh: "餐饮与饮品", en: "Food & Drink" },
    services: {
      zh: "餐饮场景 · 角色图形 · 产品视觉",
      en: "Hospitality Scenes · Character Graphics · Product Visuals",
    },
    summary: {
      zh: "从街角 Bistro、餐桌和书店场景，到食品字形与 Gelato 角色，探索插画如何进入餐饮品牌、空间与产品。",
      en: "A selection of hospitality scenes, food lettering, and gelato characters exploring how illustration can live across brands, spaces, and products.",
    },
    projectInfo: {
      zh: "精选作品合集",
      en: "Curated work collection",
    },
    cover: artwork(
      "food-hospitality",
      "A35",
      2400,
      1697,
      "街角Bistro咖啡馆、顾客与象角色的生活场景",
      "Street-corner bistro scene with diners and elephant characters",
    ),
    gallery: [
      artwork("food-hospitality", "A45", 2400, 1800, "Holybelly早餐、咖啡与植物餐桌图形", "Holybelly breakfast, coffee, and plant graphics"),
      artwork("food-hospitality", "A25", 2098, 1563, "Ugly Bao餐饮中英文字形设计", "Ugly Bao Chinese and English food lettering"),
      artwork("food-hospitality", "A26", 1709, 1644, "蓝色Be-Wave Gelato杯与勺子角色图形", "Blue Be-Wave gelato cup and spoon character"),
      artwork("food-hospitality", "A34", 1697, 2400, "书店橱窗前阅读的两个人物场景", "Two readers standing at a bookshop window"),
    ],
  },
  {
    slug: "christmas-stories",
    title: { zh: "圣诞故事", en: "Christmas Stories" },
    category: { zh: "节日品牌插画", en: "Seasonal Illustration" },
    services: {
      zh: "节日传播 · 人物场景 · 品牌内容",
      en: "Seasonal Campaigns · Character Scenes · Brand Content",
    },
    summary: {
      zh: "以礼物、骑行和节日人物组成的圣诞插画，适合品牌节日传播、包装与社交内容。",
      en: "Festive characters, gifts, and city moments designed for seasonal brand storytelling, packaging, and social content.",
    },
    projectInfo: {
      zh: "节日插画合集",
      en: "Seasonal illustration collection",
    },
    cover: artwork(
      "christmas-stories",
      "A17",
      2400,
      1697,
      "圣诞礼物、人物与节日工作场景插画",
      "Christmas gifts, characters, and festive work scenes",
    ),
    gallery: [
      artwork("christmas-stories", "A46", 2400, 1697, "骑自行车的人物与圣诞树节日场景", "Cycling characters and Christmas tree scene"),
    ],
  },
  {
    slug: "portraits-family",
    title: { zh: "人物肖像与家庭故事", en: "Portraits & Family Stories" },
    category: { zh: "人物与个人创作", en: "Characters & Personal" },
    services: {
      zh: "定制肖像 · 人物设计 · 家庭纪念",
      en: "Portraits · Character Design · Family Keepsakes",
    },
    summary: {
      zh: "以简洁造型和柔和色彩记录人物、情侣与家庭关系，让个人特征和亲密情绪自然进入画面。",
      en: "Personal portraits and family stories captured through simple forms, gentle color, and warm observation.",
    },
    projectInfo: {
      zh: "人物插画合集",
      en: "Portrait illustration collection",
    },
    cover: artwork(
      "portraits-family",
      "A54",
      1668,
      1668,
      "父亲肩上坐着孩子与长颈鹿玩偶的家庭插画",
      "Family illustration of a child, parent, and giraffe toy",
    ),
    gallery: [
      artwork("portraits-family", "A04", 1800, 2400, "相互亲吻的新婚伴侣肖像", "Portrait of a newlywed couple kissing"),
      artwork("portraits-family", "A05", 1800, 2400, "父母与孩子的三人家庭肖像", "Portrait of two parents and their child"),
      artwork("portraits-family", "A06", 1800, 2400, "卷发人物的半身肖像", "Portrait of a person with curly hair"),
      artwork("portraits-family", "A22", 2400, 1800, "不同年龄人物组成的群像", "Group portrait of people across generations"),
      artwork("portraits-family", "A37", 1668, 2224, "戴眼镜的伴侣双人肖像", "Portrait of a couple wearing glasses"),
      artwork("portraits-family", "A55", 2224, 1668, "父亲亲吻孩子的家庭场景", "Family scene of a father kissing his child"),
      artwork("portraits-family", "A56", 2224, 1668, "风扇前吹风的孩子生活场景", "Child sitting in front of a fan"),
    ],
  },
  {
    slug: "everyday-observations",
    title: { zh: "日常观察与编辑插画", en: "Everyday Observations" },
    category: { zh: "编辑与生活方式", en: "Editorial & Lifestyle" },
    services: {
      zh: "编辑插画 · 人物观察 · 图案与标志",
      en: "Editorial Illustration · Everyday Characters · Motifs",
    },
    summary: {
      zh: "从独处、阅读、植物、宠物到城市片段，以轻松的线条记录日常生活中的情绪和幽默。",
      en: "Everyday moments of solitude, reading, plants, pets, and city life, observed with gentle humor and expressive linework.",
    },
    projectInfo: {
      zh: "个人创作合集",
      en: "Personal work collection",
    },
    cover: artwork(
      "everyday-observations",
      "A39",
      2400,
      1800,
      "橙色背景中人物、猫与高大植物的插画",
      "Person, cat, and tall plants against an orange background",
    ),
    gallery: [
      artwork("everyday-observations", "A20", 2400, 1800, "坐在橙色椅子上阅读的人物与黑猫", "Person reading in an orange chair beside a black cat"),
      artwork("everyday-observations", "A31", 1697, 2400, "蓝色圆形背景中的橙色角色", "Orange character inside a blue circular field"),
      artwork("everyday-observations", "A33", 1697, 2400, "不同人物发型与表情的灰色线稿练习", "Character studies with varied hair and expressions"),
      artwork("everyday-observations", "A36", 2400, 1697, "半句文字与人物花草组成的图案", "Pattern of characters, flowers, and Chinese lettering"),
      artwork("everyday-observations", "A40", 2224, 1668, "人物与狗的生活动作草图", "Everyday character and dog gesture studies"),
      artwork("everyday-observations", "A41", 2224, 1668, "手掌、花朵与Cheerful Atelier标志", "Hands, flower, and Cheerful Atelier mark"),
      artwork("everyday-observations", "A42", 2400, 1800, "雨天窗边床铺与花朵被单插画", "Bed by a rainy window with floral bedding"),
      artwork("everyday-observations", "A47", 2029, 2029, "集市的小木马斑马角色", "Striped wooden zebra market character"),
      artwork("everyday-observations", "A51", 2400, 1800, "彩色人物服装与造型图形研究", "Colorful character clothing and shape study"),
    ],
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
      note: "邮箱与社交主页已开放",
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
      note: "Email and social profiles available",
      privacy: "Privacy",
    },
  },
} as const;

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
  featured: boolean;
  draft: boolean;
  rightsConfirmed: boolean;
  title: Record<Locale, string>;
  category: Record<Locale, string>;
  services: Record<Locale, string>;
  summary: Record<Locale, string>;
  projectInfo: Record<Locale, string>;
  cover: ProjectImage;
  gallery: ProjectImage[];
  className?: string;
};

export const aboutTalk = {
  year: 2022,
  event: "Today at Apple",
  venue: {
    zh: "Apple 上海环贸 iapm",
    en: "Apple Shanghai iapm",
  },
  eyebrow: {
    zh: "公开分享",
    en: "Talks & Workshops",
  },
  title: {
    zh: "把品牌实践带进公开课堂。",
    en: "Sharing brand practice in a public workshop.",
  },
  description: {
    zh: "2022年，受邀参与 Today at Apple 上海环贸 iapm 设计实验室，分享 Fluffy 的品牌实践，内容涵盖品牌 IP、限定视觉系统、产品与空间应用，以及 iPad 在品牌设计与日常创作中的使用方式。",
    en: "In 2022, Aviva was invited to present Fluffy’s brand-building practice in a Today at Apple Design Lab at Apple Shanghai iapm, covering character IP, seasonal visual systems, product and spatial applications, and an iPad-based creative workflow.",
  },
  images: [
    {
      src: "/images/about/today-at-apple-shanghai-iapm-presentation.webp",
      width: 1707,
      height: 1280,
      alt: {
        zh: "Aviva大双在 Apple 上海环贸 iapm 的 Today at Apple 设计实验室向现场观众分享 Fluffy 品牌设计",
        en: "Aviva Dashuang presenting Fluffy’s brand design to an audience at a Today at Apple Design Lab in Apple Shanghai iapm",
      },
    },
    {
      src: "/images/about/today-at-apple-fluffy-workflow.webp",
      width: 1800,
      height: 1012,
      alt: {
        zh: "Today at Apple 现场屏幕展示使用 iPad 创作并应用于 Fluffy 品牌移动空间的过程",
        en: "A Today at Apple presentation showing an iPad illustration workflow applied to a Fluffy mobile brand space",
      },
    },
  ],
} as const;

function artwork(
  project: string,
  id: string,
  width: number,
  height: number,
  zh: string,
  en: string,
): ProjectImage {
  return {
    src: `/images/projects/protected/curated/${project}-${id.toLowerCase()}.webp`,
    width,
    height,
    alt: { zh, en },
  };
}

function recoveredArtwork(
  file: string,
  width: number,
  height: number,
  zh: string,
  en: string,
): ProjectImage {
  return {
    src: `/images/projects/protected/recovered/${file}`,
    width,
    height,
    alt: { zh, en },
  };
}

export const projectCatalog: Project[] = [
  {
    slug: "gegelato-brand",
    legacySlugs: ["gelato-motif"],
    featured: true,
    draft: false,
    rightsConfirmed: true,
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
    slug: "illustrated-objects",
    featured: true,
    draft: false,
    rightsConfirmed: true,
    title: { zh: "插画周边与手作", en: "Illustrated Objects & Handmade Pieces" },
    category: { zh: "包装与周边", en: "Packaging & Objects" },
    services: {
      zh: "产品概念 · 角色开发 · 手作与周边",
      en: "Product Concepts · Character Design · Handmade Objects",
    },
    summary: {
      zh: "把手绘角色从纸面延展到餐盘、酒塞、胸针、戒指与刺绣布袋。系列保留手工制作的触感和细微差异，也展示了插画如何转化为餐饮用品、品牌礼赠与限量周边。",
      en: "Hand-drawn characters translated into plates, wine stoppers, brooches, rings, and an embroidered tote. The series keeps the tactile irregularity of handmade work while showing how illustration can become tableware, brand gifts, and limited-edition objects.",
    },
    projectInfo: {
      zh: "个人创作系列 · 可用于品牌定制开发",
      en: "Personal series · Available for brand commissions",
    },
    cover: recoveredArtwork(
      "instagram-candlestick.webp",
      1440,
      1794,
      "植物前摆放着带人物造型的手作陶土烛台",
      "Handmade clay character candlestick displayed in front of plants",
    ),
    gallery: [
      recoveredArtwork(
        "illustrated-objects-cover.webp",
        1080,
        1440,
        "酒瓶、植物与手作人物餐盘组成的静物场景",
        "Still life with wine bottles, plants, and handmade character plates",
      ),
      recoveredArtwork(
        "instagram-painted-spoon.webp",
        1440,
        1800,
        "薄荷植物间插着绘有人物头像的手绘木勺",
        "Hand-painted wooden spoon with a character face among mint plants",
      ),
      recoveredArtwork(
        "illustrated-objects-plates-group.webp",
        1080,
        1440,
        "不同人物表情的手作餐盘、胸针与挂饰组合",
        "Collection of handmade character plates, brooches, and charms",
      ),
      recoveredArtwork(
        "illustrated-objects-plate-dove.webp",
        1080,
        1440,
        "带有白色小鸟浮雕的人物手作餐盘",
        "Handmade character plate with a small white bird relief",
      ),
      recoveredArtwork(
        "illustrated-objects-green-plate.webp",
        1080,
        1440,
        "悬挂在窗边的绿色边框人物餐盘",
        "Green-rimmed character plate hanging by a window",
      ),
      recoveredArtwork(
        "illustrated-objects-wine-stoppers.webp",
        1280,
        960,
        "制作中的人物粘土酒塞与小型饰物",
        "Clay character wine stoppers and small objects in progress",
      ),
      recoveredArtwork(
        "illustrated-objects-small-objects.webp",
        1280,
        960,
        "花纹餐盘中的人物粘土饰物与酒塞",
        "Small clay characters and a wine stopper arranged on a patterned plate",
      ),
      recoveredArtwork(
        "illustrated-objects-embroidery-sketch.webp",
        1080,
        1440,
        "绣绷中的人物草图与刺绣起针细节",
        "Character drawing and first stitches inside an embroidery hoop",
      ),
      recoveredArtwork(
        "illustrated-objects-embroidery-process.webp",
        1080,
        1439,
        "刺绣布袋人物图案的制作过程",
        "Embroidered character tote in progress",
      ),
      recoveredArtwork(
        "illustrated-objects-embroidered-bag.webp",
        1080,
        1439,
        "放在座椅上的人物刺绣布袋成品",
        "Finished embroidered character tote displayed on a seat",
      ),
      recoveredArtwork(
        "illustrated-objects-brooch-collection.webp",
        1080,
        1441,
        "手持展示的一组人物胸针与戒指",
        "Hand-held collection of character brooches and rings",
      ),
      recoveredArtwork(
        "illustrated-objects-brooches.webp",
        1080,
        1441,
        "四枚不同人物造型的手作胸针",
        "Four handmade character brooches",
      ),
      recoveredArtwork(
        "illustrated-objects-ring.webp",
        1080,
        1421,
        "佩戴在手上的人物造型手作戒指",
        "Handmade character ring worn on a hand",
      ),
      recoveredArtwork(
        "illustrated-objects-fruit-relief.webp",
        1080,
        1184,
        "手持水果静物粘土浮雕的创作过程",
        "Hand-held clay fruit relief during the making process",
      ),
      recoveredArtwork(
        "illustrated-objects-parrot-relief.webp",
        1080,
        1183,
        "工作台前手持鹦鹉粘土浮雕",
        "Hand-held parrot clay relief in front of the studio desk",
      ),
    ],
    className: "objects-project",
  },
  {
    slug: "lemon-tea-packaging",
    featured: false,
    draft: false,
    rightsConfirmed: true,
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
    featured: true,
    draft: false,
    rightsConfirmed: true,
    title: { zh: "巴黎书店与城市插画", en: "Paris Bookshops & City Stories" },
    category: { zh: "品牌插画", en: "Brand Illustration" },
    services: {
      zh: "城市叙事 · 人物角色 · 场景插画",
      en: "City Storytelling · Characters · Scene Illustration",
    },
    summary: {
      zh: "以巴黎建筑、人物、动物角色与书店日常组成的插画系列，并在2021年的上海线下展陈中放大为纸本作品进入真实空间，呈现插画从城市观察到展览应用的完整过程。",
      en: "A character-led series of Parisian architecture, people, animals, and bookshop life. In 2021, selected works were enlarged and displayed in a Shanghai exhibition, extending the illustrations from city observation into a physical space.",
    },
    projectInfo: {
      zh: "个人创作与线下展陈 · 2021",
      en: "Personal work and exhibition display · 2021",
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
      recoveredArtwork(
        "paris-bookshop-framed-work.webp",
        1080,
        1441,
        "上海展览空间中装裱展示的巴黎书店插画",
        "Framed Paris bookshop illustration displayed in a Shanghai exhibition space",
      ),
      recoveredArtwork(
        "paris-bookshop-making.webp",
        1441,
        1080,
        "Aviva大双在书店空间中绘制放大版插画",
        "Aviva Dashuang drawing an enlarged illustration in a bookshop setting",
      ),
      recoveredArtwork(
        "paris-bookshop-large-print.webp",
        1080,
        1441,
        "窗边桌面上展开的巴黎书店大型纸本插画",
        "Large-format Paris bookshop illustration unrolled on a table by the window",
      ),
      recoveredArtwork(
        "paris-bookshop-gallery-wall.webp",
        1441,
        1080,
        "白色砖墙上并列展出的两幅巴黎书店插画",
        "Two framed Paris bookshop illustrations shown on a white brick wall",
      ),
    ],
  },
  {
    slug: "food-hospitality",
    featured: false,
    draft: false,
    rightsConfirmed: true,
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
      recoveredArtwork(
        "instagram-colorful-weekend.webp",
        1440,
        1080,
        "工作台上的蓝色手绘杯、插画稿与柔和配色色卡",
        "Blue hand-painted cup, illustration studies, and a soft color palette on the worktable",
      ),
      artwork("food-hospitality", "A25", 2098, 1563, "Ugly Bao餐饮中英文字形设计", "Ugly Bao Chinese and English food lettering"),
      artwork("food-hospitality", "A26", 1709, 1644, "蓝色Be-Wave Gelato杯与勺子角色图形", "Blue Be-Wave gelato cup and spoon character"),
      artwork("food-hospitality", "A34", 1697, 2400, "书店橱窗前阅读的两个人物场景", "Two readers standing at a bookshop window"),
    ],
  },
  {
    slug: "christmas-stories",
    featured: false,
    draft: false,
    rightsConfirmed: true,
    title: { zh: "节日与角色故事", en: "Seasonal Character Stories" },
    category: { zh: "节日品牌插画", en: "Seasonal Illustration" },
    services: {
      zh: "节日传播 · 人物场景 · 品牌内容",
      en: "Seasonal Campaigns · Character Scenes · Brand Content",
    },
    summary: {
      zh: "从元宵餐桌、胡桃夹子到圣诞角色，以温暖的手绘场景回应不同节日，适合品牌节日传播、包装与限定周边。",
      en: "Warm, character-led scenes for the Lantern Festival, Christmas, and other seasonal moments, created for brand storytelling, packaging, and limited-edition objects.",
    },
    projectInfo: {
      zh: "节日插画合集",
      en: "Seasonal illustration collection",
    },
    cover: recoveredArtwork(
      "instagram-lantern-festival.webp",
      1440,
      1606,
      "红色格纹餐桌上摆放鲜花、汤圆与节日小物的元宵插画",
      "Lantern Festival table illustration with flowers, tangyuan, and festive objects",
    ),
    gallery: [
      artwork(
        "christmas-stories",
        "A17",
        2400,
        1697,
        "圣诞礼物、人物与节日工作场景插画",
        "Christmas gifts, characters, and festive work scenes",
      ),
      artwork("christmas-stories", "A46", 2400, 1697, "骑自行车的人物与圣诞树节日场景", "Cycling characters and Christmas tree scene"),
      recoveredArtwork(
        "instagram-christmas-eve.webp",
        1440,
        1800,
        "由人物角色组成的圣诞树与雪地节日插画",
        "Christmas tree formed by character figures in a snowy festive scene",
      ),
      recoveredArtwork(
        "instagram-nutcracker-market.webp",
        1440,
        1800,
        "花瓶、花草与胡桃夹子人物组成的手绘角色画面",
        "Hand-drawn nutcracker character with a flower vase and small botanical details",
      ),
    ],
  },
  {
    slug: "portraits-family",
    featured: false,
    draft: false,
    rightsConfirmed: true,
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
    featured: false,
    draft: false,
    rightsConfirmed: true,
    title: { zh: "水粉与日常观察", en: "Gouache & Everyday Observations" },
    category: { zh: "编辑与生活方式", en: "Editorial & Lifestyle" },
    services: {
      zh: "水粉插画 · 编辑插画 · 生活方式图像",
      en: "Gouache Illustration · Editorial Work · Lifestyle Imagery",
    },
    summary: {
      zh: "从早餐、花卉和植物，到独处、阅读与城市片段，以水粉、线条和鲜明色彩记录日常生活中的温度与幽默，也为餐饮及生活方式品牌提供可延展的图像语言。",
      en: "Breakfast tables, flowers, plants, quiet interiors, and city moments observed through gouache, expressive linework, and vivid color—an adaptable image language for food and lifestyle brands.",
    },
    projectInfo: {
      zh: "个人创作合集",
      en: "Personal work collection",
    },
    cover: recoveredArtwork(
      "instagram-breakfast-gouache.webp",
      1440,
      1080,
      "蓝色桌面上人物、咖啡、鸡蛋与面包组成的早餐水粉插画",
      "Gouache breakfast scene with a figure, coffee, egg, and bread on a blue table",
    ),
    gallery: [
      recoveredArtwork(
        "instagram-tulips-process.webp",
        1440,
        1800,
        "颜料工作台上正在绘制的深绿色郁金香水粉作品",
        "Dark green tulip gouache painting in progress on the studio table",
      ),
      recoveredArtwork(
        "instagram-tulips-detail.webp",
        1440,
        1800,
        "深绿色背景上的白色郁金香水粉画局部",
        "Close view of white gouache tulips against a deep green ground",
      ),
      recoveredArtwork(
        "instagram-orange-trees.webp",
        1440,
        1440,
        "橘子树、果实与藏在枝叶间的人物水粉插画",
        "Gouache orange trees with fruit and a character hidden among the leaves",
      ),
      recoveredArtwork(
        "instagram-orange-tree-detail.webp",
        1440,
        1440,
        "橘子树枝叶与人物的水粉画细节",
        "Close gouache detail of orange-tree foliage and a character",
      ),
      recoveredArtwork(
        "instagram-smile-character.webp",
        1440,
        1800,
        "七个红色笑脸达摩角色上下叠放的插画",
        "Seven smiling red daruma characters stacked in a playful vertical composition",
      ),
      artwork("everyday-observations", "A20", 2400, 1800, "坐在橙色椅子上阅读的人物与黑猫", "Person reading in an orange chair beside a black cat"),
      artwork("everyday-observations", "A31", 1697, 2400, "蓝色圆形背景中的橙色角色", "Orange character inside a blue circular field"),
      artwork("everyday-observations", "A41", 2224, 1668, "手掌、花朵与Cheerful Atelier标志", "Hands, flower, and Cheerful Atelier mark"),
      artwork("everyday-observations", "A42", 2400, 1800, "雨天窗边床铺与花朵被单插画", "Bed by a rainy window with floral bedding"),
      artwork("everyday-observations", "A47", 2029, 2029, "集市的小木马斑马角色", "Striped wooden zebra market character"),
    ],
  },
];

export const projects = projectCatalog.filter(
  (project) => !project.draft && project.rightsConfirmed,
);

export const copy = {
  zh: {
    nav: {
      home: "首页",
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
        { title: "品牌插画系统", translation: "Brand Illustration", body: "品牌人物、主视觉、节日与社交传播插画。" },
        { title: "包装与餐饮视觉", translation: "Packaging & Food Visuals", body: "包装、菜单、杯套、外带物料与空间应用。" },
        { title: "插画周边开发", translation: "Illustration & Objects", body: "礼盒、文创、服饰、印刷品与联名产品。" },
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
      home: "Home",
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
        { title: "Brand illustration systems", translation: "", body: "Characters, key visuals, seasonal campaigns, and social illustration." },
        { title: "Packaging & food visuals", translation: "", body: "Packaging, menus, cup sleeves, takeaway materials, and spatial applications." },
        { title: "Illustrated objects", translation: "", body: "Gift boxes, merchandise, apparel, printed matter, and collaborations." },
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

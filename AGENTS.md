# Aviva大双网站开发规则

本文件约束本项目后续所有设计、内容整理、代码实现和上线工作。任何改动都应先阅读 `DESIGN.md` 与本文件。

## 1. 项目目标

- 建设 Aviva大双的中英双语插画师作品集网站。
- 主要服务餐饮、饮品、食品、生活方式品牌及插画周边合作。
- 首要转化目标是“发起合作 / Start a Project”。
- 作品是主要内容，界面必须保持克制，不与插画争夺注意力。
- 当前阶段只允许完善规划、内容和设计规则；没有用户明确指令时，不得开始搭建页面或安装依赖。

## 2. 信息真实性

- 不得编造客户、项目背景、职责、成果、数字、奖项、报价或评价。
- 不确定事实统一标记为“待确认 / To be confirmed”。
- 邮箱使用用户已确认的 `avivaluojing@163.com`；小红书使用已确认的 `https://xhslink.com/m/7SoyMlHCsdd`；Instagram 使用已确认的 `https://www.instagram.com/jingluo_?igsh=NXc4bW9kd2o5OGlj&utm_source=qr`；微信与电话入口不显示。
- 已确认背景：Aviva大双本名罗经，是插画设计师与创意工作室主理人；曾在法国学习生活八年，现工作与生活于上海和天津；是 Fluffy、Gegelato、丛欢酒饭及丛欢意大利小酒馆的联合创始人。
- 用户已确认作品自动分组一致，现有 57 个图片文件均可公开；首版按商业价值整理为 7 个项目/合集并精选展示 39 张图片，重复文件不重复引用，未入选素材继续保留。
- 没有真实接收端时，不得制作看似可提交的联系表单。
- 客户 Logo、品牌项目和商业图片发布前必须确认公开与使用授权。

## 3. 内容与语言

- 中文为默认语言，英文使用 `/en/` 路径。
- 所有核心页面必须维护中英双语版本及一致的项目关系。
- 英文内容按英文读者习惯重写，不逐字硬译。
- 语言切换必须保持在当前页面或当前项目。
- 内容使用结构化数据或 Astro Content Collections，不把长篇作品信息散落在组件中。
- 文案先说明客户价值和作品应用，再说明个人经历。

推荐项目字段：

```ts
type Project = {
  slug: string;
  title: { zh: string; en: string };
  summary: { zh: string; en: string };
  year?: number;
  client?: string;
  categories: string[];
  services: string[];
  role?: { zh: string; en: string };
  cover: string;
  coverAlt: { zh: string; en: string };
  images: Array<{
    src: string;
    alt: { zh: string; en: string };
    caption?: { zh: string; en: string };
  }>;
  featured: boolean;
  draft: boolean;
  rightsConfirmed: boolean;
};
```

- `draft: true` 或 `rightsConfirmed: false` 的项目不得进入生产站点。
- 缺少 alt、标题或语言版本时，构建应给出错误或明确警告。

## 4. 技术默认方案

除非需求出现账号、支付、后台或复杂动态数据，默认使用：

- Astro + TypeScript
- 静态优先输出
- Markdown/MDX + Astro Content Collections
- CSS Variables 作为设计令牌
- 原生 HTML/CSS 完成主要结构与交互
- 只有确有必要时才添加 React/Vue 小组件
- Cloudflare Pages 或 Vercel 部署

不得为了技术展示引入不必要的客户端框架、数据库、CMS 或大量 JavaScript。

## 5. 推荐目录

```text
public/
  fonts/
  images/
    originals-manifest/
    projects/
src/
  components/
    ui/
    sections/
  content/
    projects/
  data/
  i18n/
  layouts/
  pages/
    en/
  styles/
    tokens.css
    global.css
tests/
```

- 组件按内容意图命名，例如 `FeaturedProjects`，不得使用 `HomepageSection3`。
- UI 原子、业务区块、页面布局分层维护。
- 中英文共享组件和项目数据，不复制两套视觉实现。

## 6. 设计实现规则

- 以 `DESIGN.md` 为视觉与体验的唯一方向来源。
- 已确认的首页视觉参考为 `design-references/homepage-direction-v3.png`；它用于校准布局与气质，不得直接作为页面背景或切片实现。
- 所有颜色、间距、字号、圆角、阴影与动效来自设计令牌。
- 不新增未经确认的主色、字体或装饰风格。
- 不使用紫蓝渐变、玻璃拟态、重阴影、过量圆角和模板化功能卡。
- 不用 emoji、ASCII、CSS 绘图或临时 SVG 代替可见图标和作品素材。
- 网站不得使用随机图库或 AI 图片冒充 Aviva大双的作品。
- 真实作品比例优先，封面裁切必须设置并检查焦点。
- 作品页面保持编辑感和留白，不把所有图片强制装进相同比例卡片。

## 7. 图片处理

- 保留原始母版；网页只使用生成的衍生文件。
- 建立图片清单，记录原文件、项目归属、尺寸、色彩模式、alt、版权和发布状态。
- 删除已确认的重复文件引用，但不要破坏母版归档。
- CMYK 文件必须转换为 sRGB 后再用于网页。
- 为常用显示尺寸生成 AVIF/WebP，必要时提供 JPEG/PNG 回退。
- 明确图片宽高，防止 CLS。
- 首屏关键图可预加载，其余按需懒加载。
- 不得上传未压缩的多兆原图作为页面资源。
- 不得为了统一网格而裁掉插画主体、文字或签名。

## 8. 响应式与可访问性

- 移动优先，从 360px 宽度设计和验证。
- 至少检查 360、768、1024 和 1440px 附近布局。
- 所有关键操作仅使用键盘即可完成。
- 触控目标至少 44 x 44 CSS px。
- 使用语义化标题、导航、主内容、按钮和表单标签。
- 可见焦点不得被移除或遮挡。
- 文字和控件目标为 WCAG 2.2 AA。
- 图片提供准确的中英文 alt；纯装饰图片使用空 alt。
- 动效支持 `prefers-reduced-motion`，且不得阻碍浏览与操作。

## 9. 性能与 SEO

性能目标按真实用户第 75 百分位：

- LCP <= 2.5s
- INP <= 200ms
- CLS <= 0.1

同时要求：

- 非必要 JavaScript 不进入首屏。
- 每页有唯一的中英文 title 与 description。
- 配置 canonical、hreflang、sitemap、robots、favicon 与分享图。
- 作品与作者结构化数据只描述页面真实存在的内容。
- URL 稳定、简洁；修改 slug 时提供重定向。
- 404 返回正确状态，并提供作品与联系入口。

## 10. 联系与隐私

- 联系页支持邮箱、小红书和 Instagram；微信与电话入口已取消。小红书与 Instagram 链接均已确认。
- 如果未来增加表单，必须先确认接收方式、字段、隐私说明和保存期限。
- 表单必须包含服务端验证、防垃圾、成功、失败、等待和重复提交状态。
- 不得将密钥、邮箱凭据或第三方 Secret 写入客户端或仓库。
- 数据只收集完成合作沟通所必需的信息。

## 11. 验证流程

每个页面完成后依次检查：

1. 内容是否真实、双语是否完整
2. 主要 CTA 是否清楚且可用
3. 360px 移动端是否自然，无横向溢出
4. 图片比例、焦点、色彩和加载是否正确
5. 键盘、焦点、对比度和 reduced-motion 是否合格
6. title、description、canonical、hreflang 和分享信息是否正确
7. 构建、类型检查、Lint 和相关测试是否通过

正式交付前必须在本地浏览器实际打开，检查桌面与移动端截图；视觉问题应对照 `DESIGN.md` 逐项修正，不得以通过构建代替视觉验收。

## 12. 范围控制

首版只包含：首页、作品列表、作品详情、关于、联系、隐私和 404。

以下功能默认推迟：

- 博客与文章系统
- CMS 编辑后台
- 在线支付与预约
- 账号与会员功能
- 复杂筛选和站内搜索
- 重型动画、3D 与自动播放媒体

任何新增需求先回答：它是否帮助目标品牌理解作品、建立信任或发起合作；如果不能，默认不进入首版。

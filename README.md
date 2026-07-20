# Aviva大双插画作品集

Aviva大双的中英双语插画师作品集与商业合作网站，面向餐饮、饮品、食品、生活方式品牌及插画周边合作。

- 正式网站：https://www.avivaluo.com
- GitHub：https://github.com/ethanzzl/avivaluo
- 完整项目文档：[docs/Aviva大双网站项目文档.md](docs/Aviva大双网站项目文档.md)
- 设计规范：[DESIGN.md](DESIGN.md)
- 开发规则：[AGENTS.md](AGENTS.md)

## 当前技术方案

- Next.js 16 + React 19 + TypeScript
- 原生 CSS 与响应式布局
- GitHub 版本管理
- Vercel 自动构建、部署与域名托管

网站为公开作品集，不使用账号、数据库、CMS、在线支付或联系表单。

## 本地运行

要求 Node.js `>=22.13.0`。

```bash
npm install
npm run dev
```

验证正式构建：

```bash
npm run lint
npm test
```

## 内容维护

- 网站内容与中英文项目资料集中在 `app/site-data.ts`。
- 页面结构集中在 `app/site.tsx`。
- 全局样式集中在 `app/globals.css`。
- 精选网页图片位于 `public/images/projects/curated/`。
- 新项目发布前必须确认标题、中英文内容、图片 alt、版权和公开授权。
- 不显示微信和电话；联系入口为邮箱、小红书和 Instagram。

## 发布流程

1. 明确本次修改范围和“不应改变”的内容。
2. 本地修改并运行 `npm run lint` 与 `npm test`。
3. 检查中英文页面以及 360px、桌面端布局。
4. 提交并推送到 GitHub 的 `master` 分支。
5. Vercel 自动部署后检查正式域名。

旧网站保存在 Git 分支 `archive/old-site-2026-07-19`，需要时可以回溯。

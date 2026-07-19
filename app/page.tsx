import type { Metadata } from "next";
import { SitePage } from "./site";

export const metadata: Metadata = {
  title: "Aviva大双｜插画创作与品牌视觉",
  description: "为餐饮、饮品与生活方式品牌创作有温度、有记忆点的插画与周边视觉。",
  alternates: {
    canonical: "/",
    languages: {
      "zh-CN": "/",
      en: "/en/",
    },
  },
};

export default function Home() {
  return <SitePage path={[]} />;
}

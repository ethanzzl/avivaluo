import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: {
      default: "Aviva大双｜插画创作与品牌视觉",
      template: "%s｜Aviva大双",
    },
    description:
      "为餐饮、饮品与生活方式品牌创作有温度、有记忆点的插画与周边视觉。",
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.png",
    },
    openGraph: {
      title: "Aviva大双｜插画创作与品牌视觉",
      description: "为餐饮、饮品与生活方式品牌创作有温度、有记忆点的插画与周边视觉。",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Aviva大双插画作品集" }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Aviva大双｜插画创作与品牌视觉",
      description: "为餐饮、饮品与生活方式品牌创作有温度、有记忆点的插画与周边视觉。",
      images: ["/og.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

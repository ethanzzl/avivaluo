import type { Metadata } from "next";
import "../globals.css";
import { layoutMetadata } from "../site-metadata";

export const metadata: Metadata = layoutMetadata("zh");

export default function ChineseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

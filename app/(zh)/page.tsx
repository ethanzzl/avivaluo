import type { Metadata } from "next";
import { HomePage } from "../site";
import { pageMetadata } from "../site-metadata";

export const metadata: Metadata = pageMetadata("zh", "home");

export default function ChineseHome() {
  return <HomePage locale="zh" />;
}

import type { Metadata } from "next";
import { AboutPage } from "../../site";
import { pageMetadata } from "../../site-metadata";

export const metadata: Metadata = pageMetadata("zh", "about");

export default function ChineseAbout() {
  return <AboutPage locale="zh" />;
}

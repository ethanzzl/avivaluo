import type { Metadata } from "next";
import { StyleMenuPage } from "../../style-menu";
import { pageMetadata } from "../../site-metadata";

export const metadata: Metadata = pageMetadata("zh", "styles");

export default function ChineseStyles() {
  return <StyleMenuPage locale="zh" />;
}

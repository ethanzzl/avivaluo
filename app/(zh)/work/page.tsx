import type { Metadata } from "next";
import { WorkPage } from "../../site";
import { pageMetadata } from "../../site-metadata";

export const metadata: Metadata = pageMetadata("zh", "work");

export default function ChineseWork() {
  return <WorkPage locale="zh" />;
}

import type { Metadata } from "next";
import { PrivacyPage } from "../../site";
import { pageMetadata } from "../../site-metadata";

export const metadata: Metadata = pageMetadata("zh", "privacy");

export default function ChinesePrivacy() {
  return <PrivacyPage locale="zh" />;
}

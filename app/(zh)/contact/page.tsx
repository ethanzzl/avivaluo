import type { Metadata } from "next";
import { ContactPage } from "../../site";
import { pageMetadata } from "../../site-metadata";

export const metadata: Metadata = pageMetadata("zh", "contact");

export default function ChineseContact() {
  return <ContactPage locale="zh" />;
}

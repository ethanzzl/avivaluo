import type { Metadata } from "next";
import { PrivacyPage } from "../../site";
import { pageMetadata } from "../../site-metadata";

export const metadata: Metadata = pageMetadata("en", "privacy");

export default function EnglishPrivacy() {
  return <PrivacyPage locale="en" />;
}

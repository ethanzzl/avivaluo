import type { Metadata } from "next";
import { AboutPage } from "../../site";
import { pageMetadata } from "../../site-metadata";

export const metadata: Metadata = pageMetadata("en", "about");

export default function EnglishAbout() {
  return <AboutPage locale="en" />;
}

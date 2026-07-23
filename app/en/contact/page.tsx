import type { Metadata } from "next";
import { ContactPage } from "../../site";
import { pageMetadata } from "../../site-metadata";

export const metadata: Metadata = pageMetadata("en", "contact");

export default function EnglishContact() {
  return <ContactPage locale="en" />;
}

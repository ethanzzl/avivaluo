import type { Metadata } from "next";
import { HomePage } from "../site";
import { pageMetadata } from "../site-metadata";

export const metadata: Metadata = pageMetadata("en", "home");

export default function EnglishHome() {
  return <HomePage locale="en" />;
}

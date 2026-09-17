import type { Metadata } from "next";
import { StyleMenuPage } from "../../style-menu";
import { pageMetadata } from "../../site-metadata";

export const metadata: Metadata = pageMetadata("en", "styles");

export default function EnglishStyles() {
  return <StyleMenuPage locale="en" />;
}

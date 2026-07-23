import type { Metadata } from "next";
import { WorkPage } from "../../site";
import { pageMetadata } from "../../site-metadata";

export const metadata: Metadata = pageMetadata("en", "work");

export default function EnglishWork() {
  return <WorkPage locale="en" />;
}

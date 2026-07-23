import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { notFoundMetadata } from "../../site-metadata";

export const metadata: Metadata = notFoundMetadata("en");

export default function UnknownEnglishRoute() {
  notFound();
}

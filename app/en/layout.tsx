import type { Metadata } from "next";
import "../globals.css";
import { layoutMetadata } from "../site-metadata";

export const metadata: Metadata = layoutMetadata("en");

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

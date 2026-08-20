import type { Metadata } from "next";
import { ReactLenis } from "lenis/react";
import "./globals.css";
import PreFooter from "@/components/PreFooter";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Farid Karimi — ML Systems & Bioinformatics",
  description:
    "ML systems end-to-end — recommenders, LLM agents, bioinformatics pipelines. CS @ Shahid Beheshti University, B.Sc. 2026.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="starboy">
      <body className="is-disabled" suppressHydrationWarning>
        <ReactLenis root options={{ anchors: true }}>
          <div id="site" className="theme-starboy">
            <SiteHeader />
            <SiteNav />
            {children}
            <PreFooter />
            <SiteFooter />
          </div>
        </ReactLenis>
      </body>
    </html>
  );
}

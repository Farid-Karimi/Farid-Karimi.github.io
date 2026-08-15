import type { Metadata } from "next";
import { ReactLenis } from "lenis/react";
import "./globals.css";
import PreFooter from "@/components/PreFooter";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Dragonfly",
  description:
    "Dragonfly is a leading crypto investment fund. We back the best researchers and builders who will push the entire crypto ecosystem forward.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="is-disabled">
        <ReactLenis root options={{ anchors: true }}>
          <div id="site" className="theme-orange">
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

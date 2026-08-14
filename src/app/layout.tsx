import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dragonfly",
  description:
    "Dragonfly is a leading crypto investment fund. We back the best researchers and builders who will push the entire crypto ecosystem forward.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="site" className="theme-orange">
          {children}
        </div>
      </body>
    </html>
  );
}

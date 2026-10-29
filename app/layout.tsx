import type { Metadata } from "next";
import Link from "next/link";
import { BackgroundRibbons } from "@/components/BackgroundRibbons";
import { GlassFilter } from "@/components/GlassFilter";
import { instagramUrl } from "@/lib/catalog";
import { DRUMKITS_PAGE_ENABLED } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: "DVGZ",
  description: "Le drop de vêtements DVGZ.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <BackgroundRibbons />
        <GlassFilter />
        <nav>
          <Link href="/" className="logo">DVGZ</Link>
          <div className="nav-links">
            <Link href="/">Le drop</Link>
            {DRUMKITS_PAGE_ENABLED && <Link href="/drumkits">Drumkits</Link>}
          </div>
        </nav>
        {children}
        <footer>
          <div>&copy; {new Date().getFullYear()} DVGZ</div>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>
        </footer>
      </body>
    </html>
  );
}

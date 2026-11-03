import type { Metadata } from "next";
import Link from "next/link";
import { BackgroundRibbons } from "@/components/BackgroundRibbons";
import { GlassFilter } from "@/components/GlassFilter";
import { instagramUrl } from "@/lib/catalog";
import { brand, drop } from "@/lib/drop";
import { DRUMKITS_PAGE_ENABLED } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${brand} — ${drop.name}`,
  description: `${drop.name}, le drop ${brand}. Précommande, remise en main propre à Paris et en banlieue.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <BackgroundRibbons />
        <GlassFilter />
        <nav>
          <Link href="/" className="logo">{brand}</Link>
          <div className="nav-links">
            <Link href="/shop">Shop</Link>
            {DRUMKITS_PAGE_ENABLED && <Link href="/drumkits">Drumkits</Link>}
          </div>
        </nav>
        {children}
        <footer>
          <div>&copy; {new Date().getFullYear()} {brand}</div>
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a>
        </footer>
      </body>
    </html>
  );
}

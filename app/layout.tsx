import type { Metadata } from "next";
import Link from "next/link";
import { BackgroundRibbons } from "@/components/BackgroundRibbons";
import { GlassFilter } from "@/components/GlassFilter";
import { instagramUrl } from "@/lib/catalog";
import "./globals.css";

export const metadata: Metadata = {
  title: "DVGZ — La Mallette Drumkit",
  description: "Les sons derrière les productions de DVGZ, réunis dans une seule mallette.",
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
            <a href="#malette">La mallette</a>
            <a href="#pads">Le kit</a>
            <a href="#bio">À propos</a>
            <a href="#specs">Contenu</a>
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

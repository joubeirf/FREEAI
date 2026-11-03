import type { Metadata } from "next";
import { FlipPiece } from "@/components/FlipPiece";
import { drop, garments } from "@/lib/drop";

export const metadata: Metadata = {
  title: `${drop.name} — DVGZ`,
  description: drop.tagline,
};

export default function ShopPage() {
  return (
    <main>
      <header className="shop-intro">
        <div className="eyebrow">DVGZ — {drop.name}</div>
        <p className="shop-intro-line mono">{garments.length} pièces · livraison offerte en France · scrolle pour retourner</p>
      </header>
      {garments.map((g) => <FlipPiece key={g.handle} garment={g} />)}
    </main>
  );
}

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { FlipPiece } from "@/components/FlipPiece";
import { hasShopAccess } from "@/lib/access";
import { drop, garments } from "@/lib/drop";

export const metadata: Metadata = {
  title: `${drop.name} — DVGZ`,
  description: drop.tagline,
};

// Before the drop opens, only visitors who entered the password get in.
export default async function ShopPage() {
  if (!(await hasShopAccess())) redirect("/");

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

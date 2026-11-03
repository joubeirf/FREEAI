/* eslint-disable @next/next/no-img-element -- lookbook photos are pre-sized WebP, served as-is */
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { FlipPiece } from "@/components/FlipPiece";
import { Reveal } from "@/components/Reveal";
import { hasShopAccess } from "@/lib/access";
import { brand, drop, garments, lookbook } from "@/lib/drop";

export const metadata: Metadata = {
  title: `${drop.name} — ${brand}`,
  description: drop.tagline,
};

// Before the drop opens, only visitors who entered the password get in.
export default async function ShopPage() {
  await connection(); // read the password and clock per request, not at build time
  if (!(await hasShopAccess())) redirect("/");

  return (
    <main>
      <header className="shop-intro">
        <div className="eyebrow">{brand} — {drop.name}</div>
        <p className="shop-intro-line mono">Précommande · {drop.delivery} · scrolle pour retourner</p>
      </header>
      {garments.map((g) => <FlipPiece key={g.handle} garment={g} />)}
      <Reveal className="lookbook" id="lookbook">
        <div className="section-label lookbook-label">Lookbook</div>
        <div className="lookbook-grid">
          {lookbook.map((p) => (
            <img key={p.src} src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" />
          ))}
        </div>
      </Reveal>
    </main>
  );
}

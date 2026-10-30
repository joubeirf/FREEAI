/* eslint-disable @next/next/no-img-element -- product photos are pre-sized WebP, served as-is */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SizePicker } from "@/components/SizePicker";
import { drop, findGarment, formatPrice, garments } from "@/lib/drop";

type Props = { params: Promise<{ handle: string }> };

export function generateStaticParams() {
  return garments.map((g) => ({ handle: g.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const garment = findGarment((await params).handle);
  return garment ? { title: `${garment.name} — DVGZ`, description: drop.tagline } : {};
}

export default async function ProductPage({ params }: Props) {
  const garment = findGarment((await params).handle);
  if (!garment) notFound();

  return (
    <main>
      <section className="product-page">
        <div className="shot front"><img src={garment.front} alt={`${garment.name}, face`} /></div>
        <div className="product-info">
          <div className="section-label">DVGZ — {drop.name}</div>
          <h1 className="product-title">{garment.name}</h1>
          <p className="product-page-price mono">{formatPrice(garment.priceCents)}</p>
          <SizePicker stock={garment.stock} />
          <ul className="product-details">
            {garment.details.map((d) => <li key={d}>{d}</li>)}
            <li>Livraison offerte en France</li>
          </ul>
        </div>
        <div className="shot back"><img src={garment.back} alt={`${garment.name}, dos`} loading="lazy" /></div>
      </section>
    </main>
  );
}

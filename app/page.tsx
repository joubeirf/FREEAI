/* eslint-disable @next/next/no-img-element -- product photos are pre-sized WebP, served as-is */
import Link from "next/link";
import { Countdown } from "@/components/Countdown";
import { Reveal } from "@/components/Reveal";
import { drop, formatPrice, garments } from "@/lib/drop";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="eyebrow">DVGZ — {drop.name}</div>
        <h1>{drop.name}<br /><span className="thin">LE DROP.</span></h1>
        <p className="hero-sub">{drop.tagline}</p>
        <Countdown launchAt={drop.launchAt} />
        <div className="hero-cta">
          <a href="#collection" className="btn-primary">Voir la collection</a>
          <span className="price mono">Livraison offerte en France</span>
        </div>
      </section>

      <Reveal className="collection" id="collection">
        <div className="section-label">{drop.name} — {garments.length} pièces</div>
        <h2 className="section-title">La collection.</h2>
        <div className="product-grid">
          {garments.map((g) => (
            <Link key={g.handle} href={`/products/${g.handle}`} className="product-card">
              <div className="product-media">
                <img src={g.front} alt={`${g.name}, face`} className="product-img front" />
                <img src={g.back} alt={`${g.name}, dos`} className="product-img back" loading="lazy" />
              </div>
              <div className="product-meta">
                <span className="product-name">{g.name}</span>
                <span className="product-price mono">{formatPrice(g.priceCents)}</span>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>
    </main>
  );
}

/* eslint-disable @next/next/no-img-element -- covers are served as-is, like on the Shopify theme */
import { Fragment } from "react";
import { Mallette } from "@/components/Mallette";
import { PadGrid } from "@/components/PadGrid";
import { Reveal } from "@/components/Reveal";
import { collaborators, credits, drumkit, formatPrice, kitContents } from "@/lib/catalog";

export default function Home() {
  const price = formatPrice(drumkit.priceCents);

  return (
    <main>
      <section className="hero">
        <div className="eyebrow">DVGZ — SOUND DESIGN</div>
        <h1>LA MALLETTE<br /><span className="thin">DRUMKIT.</span></h1>
        <p className="hero-sub">{drumkit.summary}</p>
        <div className="hero-cta">
          {/* TODO: brancher le paiement Stripe (étape suivante). */}
          <a href="#specs" className="btn-primary">Découvrir le kit</a>
          <span className="price mono">{price}</span>
          <a href="#bio" className="btn-ghost">En savoir plus</a>
        </div>
        <div className="cover-art"><img src={drumkit.cover} alt={drumkit.title} /></div>
      </section>

      <Mallette />

      <Reveal className="pads-section" id="pads">
        <div className="section-label">Aperçu — 16 sons sur 69</div>
        <h2 className="section-title">Chaque son a sa place. Chaque pad a son caractère.</h2>
        <PadGrid />
        <p className="pads-caption">Un extrait des 69 sons — le kit complet est dans la mallette.</p>
      </Reveal>

      <Reveal className="bio" id="bio">
        <h2 className="bio-title">Le beatmaker</h2>
        <div className="bio-text">
          <p>
            DVGZ, le compositeur belge qui a bossé avec{" "}
            {collaborators.map((name, i) => (
              <Fragment key={name}>
                <strong>{name}</strong>
                {i < collaborators.length - 2 ? ", " : i === collaborators.length - 2 ? " et " : "."}
              </Fragment>
            ))}
          </p>
          <div className="tag-row">
            {credits.map((c) => <span key={c} className="tag">{c}</span>)}
          </div>
        </div>
      </Reveal>

      <Reveal className="specs" id="specs">
        <div className="section-label">Contenu du kit</div>
        <h2 className="section-title" style={{ marginBottom: 0 }}>69 sons, format professionnel, prêt à l&apos;emploi.</h2>
        <div className="specs-layout">
          <div className="specs-cover"><img src={drumkit.backCover} alt={drumkit.title} loading="lazy" /></div>
          <div className="specs-grid">
            {kitContents.map((s) => (
              <div key={s.label} className="spec-item">
                <div className="spec-value">{s.value}</div>
                <div className="spec-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <p className="specs-note">{`// 69 sons au total · 24-bit WAV 44.1kHz · ${price}`}</p>
      </Reveal>
    </main>
  );
}

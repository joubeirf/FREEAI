"use client";

/* eslint-disable @next/next/no-img-element -- product photos are pre-sized WebP, served as-is */
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SizePicker } from "@/components/SizePicker";
import { formatPrice, type Garment } from "@/lib/drop";

// Share of each step spent holding the current view before moving on.
const HOLD = 0.3;

// A garment pinned on screen while the user scrolls through its section:
// it turns from front to back, then fades into photos of it being worn.
// The name, price and sizes stay pinned below the whole time.
// Tapping the garment also flips it.
export function FlipPiece({ garment }: { garment: Garment }) {
  const worn = garment.worn ?? [];
  const steps = 1 + worn.length; // front→back, then one fade per worn photo

  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const wornRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [flipped, setFlipped] = useState(false);
  const [scrollDriven, setScrollDriven] = useState(true);

  useEffect(() => {
    const section = sectionRef.current!;
    const card = cardRef.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0;
      // How far through step i (0..1), after a short hold at its start.
      const stepAmount = (i: number) => Math.min(Math.max((progress * steps - i - HOLD) / (1 - 2 * HOLD), 0), 1);
      card.style.setProperty("--turn", `${stepAmount(0) * 180}deg`);
      wornRefs.current.forEach((img, i) => {
        if (img) img.style.opacity = String(stepAmount(i + 1));
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [steps]);

  const toggle = () => {
    setScrollDriven(false);
    setFlipped((f) => !f);
  };

  return (
    <section
      ref={sectionRef}
      className="flip-section"
      id={garment.handle}
      style={{ "--steps": steps } as CSSProperties}
    >
      <div className="flip-sticky">
        <span className="flip-word" aria-hidden="true">{garment.kind}</span>
        <div className="flip-stage" style={{ "--ratio": garment.ratio } as CSSProperties}>
          <div
            ref={cardRef}
            className={`flip-card${scrollDriven ? "" : " manual"}${flipped ? " flipped" : ""}`}
            role="button"
            tabIndex={0}
            aria-label={`Retourner ${garment.name}`}
            onClick={toggle}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle();
              }
            }}
          >
            <img className="flip-face" src={garment.front} alt={`${garment.name}, face`} />
            <img className="flip-face flip-back" src={garment.back} alt={`${garment.name}, dos`} loading="lazy" />
          </div>
          {worn.map((photo, i) => (
            <img
              key={photo.src}
              ref={(el) => { wornRefs.current[i] = el; }}
              className="flip-worn"
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
            />
          ))}
        </div>
        <div className="flip-info">
          <div className="flip-head">
            <h2 className="flip-name">{garment.name}</h2>
            <span className="flip-price mono">{formatPrice(garment.priceCents)}</span>
          </div>
          <p className="flip-note mono">Précommande · toutes tailles</p>
          <SizePicker />
        </div>
      </div>
    </section>
  );
}

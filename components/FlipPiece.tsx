"use client";

/* eslint-disable @next/next/no-img-element -- product photos are pre-sized WebP, served as-is */
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SizePicker } from "@/components/SizePicker";
import { formatPrice, type Garment } from "@/lib/drop";

// A garment pinned on screen that turns from front to back as the user scrolls
// through its section. Tapping the garment also flips it.
export function FlipPiece({ garment }: { garment: Garment }) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
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
      // Hold the front, turn through the middle of the section, then hold the back.
      const turn = Math.min(Math.max((progress - 0.2) / 0.6, 0), 1);
      card.style.setProperty("--turn", `${turn * 180}deg`);
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const toggle = () => {
    setScrollDriven(false);
    setFlipped((f) => !f);
  };

  return (
    <section ref={sectionRef} className="flip-section" id={garment.handle}>
      <div className="flip-sticky">
        <span className="flip-word" aria-hidden="true">{garment.kind}</span>
        <div
          ref={cardRef}
          className={`flip-card${scrollDriven ? "" : " manual"}${flipped ? " flipped" : ""}`}
          style={{ "--ratio": garment.ratio } as CSSProperties}
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
        <div className="flip-info">
          <div className="flip-head">
            <h2 className="flip-name">{garment.name}</h2>
            <span className="flip-price mono">{formatPrice(garment.priceCents)}</span>
          </div>
          <SizePicker stock={garment.stock} />
        </div>
      </div>
    </section>
  );
}

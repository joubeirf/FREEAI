"use client";

/* eslint-disable @next/next/no-img-element -- product photos are pre-sized WebP, served as-is */
import { useState } from "react";

export function ProductGallery({ name, front, back }: { name: string; front: string; back: string }) {
  const views = [
    { src: front, label: "Face" },
    { src: back, label: "Dos" },
  ];
  const [active, setActive] = useState(0);

  return (
    <div className="gallery">
      <div className="gallery-main">
        <img src={views[active].src} alt={`${name}, ${views[active].label.toLowerCase()}`} />
      </div>
      <div className="gallery-thumbs">
        {views.map((v, i) => (
          <button
            key={v.label}
            type="button"
            className={i === active ? "gallery-thumb active" : "gallery-thumb"}
            onClick={() => setActive(i)}
            aria-label={`Voir ${v.label.toLowerCase()}`}
          >
            <img src={v.src} alt="" />
            <span className="mono">{v.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

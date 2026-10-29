"use client";

import { useState } from "react";
import { useLaunchCountdown } from "@/components/useLaunch";
import { SIZES, type Size } from "@/lib/drop";

export function SizePicker({ stock }: { stock: Record<Size, number> }) {
  const [size, setSize] = useState<Size | null>(null);
  const remaining = useLaunchCountdown();
  const open = remaining === 0;
  const soldOut = SIZES.every((s) => stock[s] === 0);

  let label = "Bientôt disponible";
  if (soldOut) label = "Épuisé";
  else if (open) label = size ? "Paiement bientôt disponible" : "Choisis ta taille";

  return (
    <div className="size-picker">
      <div className="size-label mono">Taille</div>
      <div className="size-row">
        {SIZES.map((s) => (
          <button
            key={s}
            type="button"
            className={s === size ? "size-btn selected" : "size-btn"}
            aria-pressed={s === size}
            disabled={stock[s] === 0}
            title={stock[s] === 0 ? "Épuisé" : undefined}
            onClick={() => setSize(s)}
          >
            {s}
          </button>
        ))}
      </div>
      {/* TODO: brancher le panier et le paiement Stripe. */}
      <button type="button" className="btn-primary buy-btn" disabled>
        {label}
      </button>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useLaunchCountdown } from "@/components/useLaunch";
import { SIZES, type Size } from "@/lib/drop";

export function SizePicker() {
  const [size, setSize] = useState<Size | null>(null);
  const remaining = useLaunchCountdown();
  const open = remaining === 0;

  let label = "Précommandes bientôt ouvertes";
  if (open) label = size ? "Précommande bientôt disponible" : "Choisis ta taille";

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
            onClick={() => setSize(s)}
          >
            {s}
          </button>
        ))}
      </div>
      {/* TODO: brancher la précommande et le paiement Stripe. */}
      <button type="button" className="btn-primary buy-btn" disabled>
        {label}
      </button>
    </div>
  );
}

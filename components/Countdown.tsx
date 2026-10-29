"use client";

import { useLaunchCountdown } from "@/components/useLaunch";

const launchLabel = (iso: string) =>
  new Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })
    .format(new Date(iso));

export function Countdown({ launchAt }: { launchAt: string }) {
  const remaining = useLaunchCountdown();

  if (remaining === 0) {
    return <p className="countdown-open mono">LE DROP EST OUVERT</p>;
  }

  const total = Math.floor((remaining ?? 0) / 1000);
  const parts = [
    { value: Math.floor(total / 86400), label: "jours" },
    { value: Math.floor((total % 86400) / 3600), label: "heures" },
    { value: Math.floor((total % 3600) / 60), label: "min" },
    { value: total % 60, label: "sec" },
  ];

  return (
    <div className="countdown" aria-live="off">
      <div className="countdown-grid">
        {parts.map((p) => (
          <div key={p.label} className="countdown-cell">
            <span className="countdown-value mono">{remaining === null ? "--" : String(p.value).padStart(2, "0")}</span>
            <span className="countdown-label">{p.label}</span>
          </div>
        ))}
      </div>
      <p className="countdown-date mono">Ouverture le {launchLabel(launchAt)}</p>
    </div>
  );
}

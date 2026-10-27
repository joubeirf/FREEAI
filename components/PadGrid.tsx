"use client";

import { useEffect, useRef, useState } from "react";
import { padSounds } from "@/lib/catalog";

// 4x4 sampler: each pad plays a preview sound; the grid ripples while visible.
export function PadGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const padRefs = useRef<(HTMLDivElement | null)[]>([]);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const [lit, setLit] = useState<Set<number>>(() => new Set());

  const flash = (i: number) => {
    setLit((s) => new Set(s).add(i));
    setTimeout(() => setLit((s) => { const n = new Set(s); n.delete(i); return n; }), 260);
  };

  const play = (i: number) => {
    flash(i);
    const audio = audioRefs.current[i];
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      // Randomised per pad, so set on the client only to avoid hydration mismatches.
      for (const pad of padRefs.current) {
        const duration = 4.5 + Math.random() * 3;
        pad?.style.setProperty("--breathe-duration", `${duration}s`);
        pad?.style.setProperty("--breathe-delay", `${-Math.random() * duration}s`);
      }
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const ripple = () => padSounds.forEach((_, i) => timers.push(setTimeout(() => flash(i), i * 70)));
    let interval: ReturnType<typeof setInterval> | null = null;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          ripple();
          if (!reduced && !interval) interval = setInterval(ripple, 13000);
        } else if (interval) {
          clearInterval(interval);
          interval = null;
        }
      }
    }, { threshold: 0.5 });
    io.observe(gridRef.current!);
    return () => {
      io.disconnect();
      if (interval) clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="pad-grid" ref={gridRef}>
      {padSounds.map((sound, i) => (
        <div
          key={sound.audio}
          className={lit.has(i) ? "pad lit" : "pad"}
          ref={(el) => { padRefs.current[i] = el; }}
          role="button"
          tabIndex={0}
          aria-label={`${sound.cat} by ${sound.producer}`}
          onClick={() => play(i)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              play(i);
            }
          }}
        >
          <span className="pad-index">{String(i + 1).padStart(2, "0")}</span>
          <span className="pad-label">
            <span className="pad-cat">{sound.cat}</span>
            <span className="pad-producer">{sound.producer}</span>
          </span>
          <audio ref={(el) => { audioRefs.current[i] = el; }} src={sound.audio} preload="none" />
        </div>
      ))}
    </div>
  );
}

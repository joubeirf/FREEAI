"use client";

import { useEffect, useRef } from "react";

const ribbons = [
  { baseY: 0.22, amp1: 60, amp2: 22, freq1: 0.0016, freq2: 0.004, speed1: 0.00028, speed2: 0.0006, width: 1.4, alpha: 0.1 },
  { baseY: 0.48, amp1: 80, amp2: 26, freq1: 0.0012, freq2: 0.003, speed1: 0.00022, speed2: 0.0005, width: 1.6, alpha: 0.09 },
  { baseY: 0.74, amp1: 55, amp2: 20, freq1: 0.0019, freq2: 0.0045, speed1: 0.0003, speed2: 0.00065, width: 1.3, alpha: 0.08 },
];

// Animated sine-wave ribbons drawn behind the page.
export function BackgroundRibbons() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    let frame = 0;
    const draw = (time: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalCompositeOperation = "lighter";
      const step = Math.max(8, Math.floor(w / 140));
      for (const r of ribbons) {
        const baseYpx = h * r.baseY;
        ctx.beginPath();
        for (let x = 0; x <= w; x += step) {
          const y = baseYpx + Math.sin(x * r.freq1 + time * r.speed1) * r.amp1 + Math.sin(x * r.freq2 + time * r.speed2) * r.amp2;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(255,255,255,${r.alpha})`;
        ctx.lineWidth = r.width;
        ctx.stroke();
      }
      frame = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) frame = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVisibility);
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas id="bg-canvas" ref={canvasRef} />;
}

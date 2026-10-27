"use client";

import { useEffect, useRef } from "react";

// Briefcase whose lid opens as the user scrolls through the section.
export function Mallette() {
  const sectionRef = useRef<HTMLElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const contentsRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const lid = lidRef.current!;
    const sheen = sheenRef.current!;
    const contents = contentsRef.current!;
    const hint = hintRef.current!;

    const render = (progress: number) => {
      lid.style.transform = `rotateX(${progress * -120}deg)`;
      sheen.style.backgroundPosition = `${progress * 130}% 50%`;
      const contentOpacity = Math.min(Math.max((progress - 0.35) / 0.5, 0), 1);
      contents.style.opacity = String(contentOpacity);
      contents.style.transform = `translateY(${10 - contentOpacity * 10}px)`;
      hint.style.opacity = String(Math.max(1 - progress * 4, 0));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      render(1);
      hint.style.display = "none";
      return;
    }

    const update = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable > 0 ? -rect.top / scrollable : 0;
      render(Math.min(Math.max(progress, 0), 1));
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="malette-scroll" id="malette" ref={sectionRef}>
      <div className="malette-sticky">
        <div className="malette-case">
          <div className="case-shadow" />
          <div className="case-body">
            <div className="case-contents" ref={contentsRef}>
              <div className="mini-grid">
                {Array.from({ length: 16 }, (_, i) => <div key={i} className="mini-pad" />)}
              </div>
              <p className="case-caption mono">69 SONS À L&apos;INTÉRIEUR</p>
            </div>
          </div>
          <div className="case-lid" ref={lidRef}>
            <div className="lid-sheen" ref={sheenRef} />
            <div className="case-handle" />
            <div className="case-latch left" />
            <div className="case-latch right" />
          </div>
        </div>
        <p className="malette-hint mono" ref={hintRef}>↓ SCROLL POUR OUVRIR LA MALLETTE</p>
      </div>
    </section>
  );
}

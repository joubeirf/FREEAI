"use client";

import { useEffect, useRef, useState } from "react";

// Section that fades up the first time it scrolls into view.
export function Reveal({ className, id, children }: { className: string; id: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) setVisible(true);
    // A ratio threshold never fires on sections much taller than the screen,
    // so trigger once the top edge is 15% into the viewport instead.
    }, { rootMargin: "0px 0px -15% 0px" });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id={id} className={`${className} reveal${visible ? " visible" : ""}`}>
      {children}
    </section>
  );
}

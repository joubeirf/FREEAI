"use client";

import { useEffect, useRef, useState } from "react";

// Section that fades up the first time it scrolls into view.
export function Reveal({ className, id, children }: { className: string; id: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) setVisible(true);
    }, { threshold: 0.15 });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id={id} className={`${className} reveal${visible ? " visible" : ""}`}>
      {children}
    </section>
  );
}

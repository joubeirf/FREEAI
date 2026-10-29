"use client";

import { useEffect, useState } from "react";
import { drop } from "@/lib/drop";

const launchTime = new Date(drop.launchAt).getTime();

// Milliseconds left before the drop opens, ticking every second.
// `null` until mounted, so server and client render the same markup.
export function useLaunchCountdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, launchTime - Date.now()));
    const id = setInterval(tick, 1000);
    const first = setTimeout(tick, 0);
    return () => {
      clearInterval(id);
      clearTimeout(first);
    };
  }, []);

  return remaining;
}

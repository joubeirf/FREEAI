"use client";

import { useState } from "react";

export function UnlockForm() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    }).catch(() => null);
    if (res?.ok) {
      // Full navigation: a client-side push could reuse a /shop prefetch
      // made while locked, which the proxy answered with a redirect.
      window.location.assign("/shop");
    } else {
      setStatus("error");
    }
  };

  return (
    <form className="unlock" onSubmit={submit}>
      <input
        type="password"
        className="unlock-input mono"
        placeholder="MOT DE PASSE"
        aria-label="Mot de passe"
        autoComplete="current-password"
        value={password}
        onChange={(e) => { setPassword(e.target.value); setStatus("idle"); }}
      />
      <button type="submit" className="btn-primary unlock-btn" disabled={status === "loading" || !password}>
        Entrer
      </button>
      {status === "error" && <p className="unlock-error mono">Mot de passe incorrect</p>}
    </form>
  );
}

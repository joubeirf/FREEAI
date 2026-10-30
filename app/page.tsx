import { Countdown } from "@/components/Countdown";
import { UnlockForm } from "@/components/UnlockForm";
import { instagramUrl } from "@/lib/catalog";
import { drop } from "@/lib/drop";

// Page d'attente avant l'ouverture. Après le lancement, proxy.ts redirige vers /shop.
export default function Home() {
  return (
    <main className="landing">
      <div className="eyebrow">DVGZ — LE DROP</div>
      <h1 className="landing-title">{drop.name}</h1>
      <p className="landing-quote">{drop.tagline}</p>
      <Countdown launchAt={drop.launchAt} />
      <UnlockForm />
      <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="landing-link mono">Instagram ↗</a>
    </main>
  );
}

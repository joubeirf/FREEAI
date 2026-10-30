import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Countdown } from "@/components/Countdown";
import { UnlockForm } from "@/components/UnlockForm";
import { instagramUrl } from "@/lib/catalog";
import { isLaunched } from "@/lib/access";
import { drop } from "@/lib/drop";

// Page d'attente avant l'ouverture ; une fois le drop ouvert, on file à la boutique.
export default async function Home() {
  await connection(); // check the clock per request, not at build time
  if (isLaunched()) redirect("/shop");

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

import { instagramUrl } from "@/lib/catalog";

// Page d'accueil provisoire, en attendant les visuels et produits du drop.
export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="eyebrow">DVGZ — DROP 01</div>
        <h1>LE DROP<br /><span className="thin">ARRIVE.</span></h1>
        <p className="hero-sub">La première collection de vêtements DVGZ. Bientôt disponible ici.</p>
        <div className="hero-cta">
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">Suivre sur Instagram</a>
        </div>
      </section>
    </main>
  );
}

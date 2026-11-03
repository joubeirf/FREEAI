// Configuration du drop : marque, date d'ouverture, pièces, prix, tailles.

export const brand = "ACTIF";

export const drop = {
  name: "La Mallette",
  tagline: "Don't nothing come to a sleeper but a dream.",
  // Ouverture des précommandes (heure de Paris). Date provisoire, à confirmer.
  launchAt: "2026-11-15T19:00:00+01:00",
  delivery: "Remise en main propre à Paris et en banlieue",
};

// Précommande : pas de stock limité, toutes les tailles sont disponibles.
export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
export type Size = (typeof SIZES)[number];

export type Garment = {
  handle: string;
  name: string;
  kind: string;
  priceCents: number;
  front: string;
  back: string;
  // Largeur / hauteur des photos (face et dos ont le même cadrage).
  ratio: number;
};

export const garments: Garment[] = [
  {
    handle: "hoodie-actif",
    name: "Hoodie Actif",
    kind: "Hoodie",
    priceCents: 5000,
    front: "/images/drop/hoodie-front.webp",
    back: "/images/drop/hoodie-back.webp",
    ratio: 1282 / 1400,
  },
  {
    handle: "long-sleeve-actif",
    name: "Long Sleeve Actif",
    kind: "Long sleeve",
    priceCents: 3000,
    front: "/images/drop/longsleeve-front.webp",
    back: "/images/drop/longsleeve-back.webp",
    ratio: 1400 / 1038,
  },
];

export const lookbook = [
  { src: "/images/lookbook/look-3.webp", alt: "Hoodie Actif porté, capuche sur la tête", width: 1600, height: 1066 },
  { src: "/images/lookbook/look-1.webp", alt: "Hoodie Actif porté, assise sur un canapé", width: 1104, height: 1600 },
  { src: "/images/lookbook/look-2.webp", alt: "Hoodie Actif porté, logo violet de face", width: 1600, height: 1066 },
  { src: "/images/lookbook/look-4.webp", alt: "Deux personnes en Hoodie Actif sous lumière violette", width: 1600, height: 1200 },
];

export function formatPrice(cents: number) {
  return (cents / 100).toFixed(2).replace(".", ",") + " €";
}

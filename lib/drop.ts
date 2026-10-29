// Configuration du drop : date d'ouverture, pièces, prix, tailles.

export const drop = {
  name: "ACTIF",
  tagline: "Don't nothing come to a sleeper but a dream.",
  // Ouverture automatique des ventes (heure de Paris). Date provisoire, à confirmer.
  launchAt: "2026-11-15T19:00:00+01:00",
};

export const SIZES = ["S", "M", "L", "XL"] as const;
export type Size = (typeof SIZES)[number];

export type Garment = {
  handle: string;
  name: string;
  kind: string;
  priceCents: number;
  // Stock de départ par taille. Le suivi en direct arrivera avec le paiement.
  stock: Record<Size, number>;
  front: string;
  back: string;
  details: string[];
};

export const garments: Garment[] = [
  {
    handle: "hoodie-actif",
    name: "Hoodie Actif",
    kind: "Hoodie",
    priceCents: 5000,
    stock: { S: 10, M: 10, L: 10, XL: 10 },
    front: "/images/drop/hoodie-front.webp",
    back: "/images/drop/hoodie-back.webp",
    details: ["Noir", "Logo Actif devant, citation sur la capuche", "Visuel 187 3050 au dos"],
  },
  {
    handle: "long-sleeve-actif",
    name: "Long Sleeve Actif",
    kind: "Long sleeve",
    priceCents: 3000,
    stock: { S: 10, M: 10, L: 10, XL: 10 },
    front: "/images/drop/longsleeve-front.webp",
    back: "/images/drop/longsleeve-back.webp",
    details: ["Noir", "Logo Actif devant", "Visuel 187 3050 et citation au dos"],
  },
];

export function findGarment(handle: string) {
  return garments.find((g) => g.handle === handle);
}

export function formatPrice(cents: number) {
  return (cents / 100).toFixed(2).replace(".", ",") + " €";
}

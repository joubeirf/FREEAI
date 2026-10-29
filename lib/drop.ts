// Configuration du drop : date d'ouverture, pièces, prix, tailles.

export const drop = {
  name: "DROP 01",
  tagline: "Don't nothing come to a sleeper but a dream.",
  // Ouverture automatique des ventes (heure de Paris). PROVISOIRE : à confirmer.
  launchAt: "2026-11-15T19:00:00+01:00",
};

export type Size = "S" | "M" | "L" | "XL";

export type Garment = {
  handle: string;
  name: string;
  kind: string;
  priceCents: number;
  sizes: Size[];
  front: string;
  back: string;
  details: string[];
};

export const garments: Garment[] = [
  {
    handle: "hoodie-187-3050",
    name: "Hoodie 187 3050",
    kind: "Hoodie",
    priceCents: 5000,
    sizes: ["S", "M", "L", "XL"],
    front: "/images/drop/hoodie-front.webp",
    back: "/images/drop/hoodie-back.webp",
    details: ["Noir", "Logo DVGZ devant, citation sur la capuche", "Visuel 187 3050 au dos"],
  },
  {
    handle: "long-sleeve-187-3050",
    name: "Long Sleeve 187 3050",
    kind: "Long sleeve",
    priceCents: 3000,
    sizes: ["S", "M", "L", "XL"],
    front: "/images/drop/longsleeve-front.webp",
    back: "/images/drop/longsleeve-back.webp",
    details: ["Noir", "Logo DVGZ devant", "Visuel 187 3050 et citation au dos"],
  },
];

export function findGarment(handle: string) {
  return garments.find((g) => g.handle === handle);
}

export function formatPrice(cents: number) {
  return (cents / 100).toFixed(2).replace(".", ",") + " €";
}

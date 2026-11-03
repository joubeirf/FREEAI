# DVGZ — boutique

Site de vente des drumkits et t-shirts DVGZ, recréé hors Shopify (Next.js).

## Lancer le site en local

```bash
npm install
npm run dev
```

Puis ouvrir http://127.0.0.1:3000. Le serveur n'écoute que sur ta machine (`127.0.0.1`), pas sur le réseau.

## Mise en ligne (Cloudflare Workers)

Même montage que Geeko Guard : l'offre gratuite de Cloudflare autorise la vente,
contrairement à Vercel Hobby.

- `npm run cf:preview` : teste le site dans le moteur Cloudflare, en local.
- `npm run cf:deploy` : construit et publie le Worker `dvgz-shop`.

## Accès à la boutique avant l'ouverture

Avant `launchAt` (dans `lib/drop.ts`), `/` affiche le compte à rebours et `/shop`
demande un mot de passe. À l'heure d'ouverture, la boutique s'ouvre à tous.

Le mot de passe est le secret `SHOP_PASSWORD`, à définir dans Cloudflare (Workers ›
dvgz-shop › Settings › Variables and Secrets). En local : `.env.local`, voir `.env.example`.

## Où modifier quoi

- `lib/drop.ts` : nom du drop, date d'ouverture, pièces, prix, stock.
- `lib/catalog.ts` : page drumkits (contenu du kit, sons des pads, crédits).
- `app/page.tsx` : page d'attente ; `app/shop/page.tsx` : la boutique.
- `app/globals.css` : couleurs, polices et animations (repris du thème Shopify).
- `public/images`, `public/sounds` : visuels et extraits audio.

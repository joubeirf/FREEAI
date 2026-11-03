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

## Ouverture du drop

Avant `launchAt` (dans `lib/drop.ts`), la collection est visible sur `/shop` mais
l'achat est bloqué. À l'heure d'ouverture, `/` mène directement à la boutique.

## Où modifier quoi

- `lib/drop.ts` : nom du drop, date d'ouverture, pièces, prix, stock.
- `lib/catalog.ts` : page drumkits (contenu du kit, sons des pads, crédits).
- `app/page.tsx` : page d'attente ; `app/shop/page.tsx` : la boutique.
- `app/globals.css` : couleurs, polices et animations (repris du thème Shopify).
- `public/images`, `public/sounds` : visuels et extraits audio.

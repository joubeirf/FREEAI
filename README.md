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

## Où modifier quoi

- `lib/catalog.ts` : produit, prix, contenu du kit, sons des pads, crédits.
- `app/page.tsx` : textes et ordre des sections de la page d'accueil.
- `app/globals.css` : couleurs, polices et animations (repris du thème Shopify).
- `public/images`, `public/sounds` : visuels et extraits audio.

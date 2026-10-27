# DVGZ — boutique

Site de vente des drumkits et t-shirts DVGZ, recréé hors Shopify (Next.js).

## Lancer le site en local

```bash
npm install
npm run dev
```

Puis ouvrir http://127.0.0.1:3000. Le serveur n'écoute que sur ta machine (`127.0.0.1`), pas sur le réseau.

## Où modifier quoi

- `lib/catalog.ts` : produit, prix, contenu du kit, sons des pads, crédits.
- `app/page.tsx` : textes et ordre des sections de la page d'accueil.
- `app/globals.css` : couleurs, polices et animations (repris du thème Shopify).
- `public/images`, `public/sounds` : visuels et extraits audio.

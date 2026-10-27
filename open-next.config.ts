import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * Adaptation de la sortie Next.js pour le runtime Cloudflare.
 *
 * Aucun cache incrémental : les pages sont statiques (servies par le CDN) et
 * les futures routes de paiement ne doivent jamais être mises en cache.
 */
export default defineCloudflareConfig();

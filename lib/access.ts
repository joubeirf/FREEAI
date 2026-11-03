import { cookies } from "next/headers";
import { drop } from "@/lib/drop";

// Accès anticipé à la boutique avant l'ouverture du drop, par mot de passe.
// Le mot de passe vit dans la variable SHOP_PASSWORD (secret Cloudflare).

export const ACCESS_COOKIE = "dvgz_access";

export function isLaunched(now = Date.now()) {
  return now >= new Date(drop.launchAt).getTime();
}

// Cookie value derived from the password, so changing SHOP_PASSWORD
// invalidates every access granted with the old one.
export async function accessToken(password: string) {
  const bytes = new TextEncoder().encode(`dvgz-shop:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

// Whether the visitor may see /shop: the drop is open, no password is set, or
// they hold the cookie granted by /api/unlock for the current SHOP_PASSWORD.
export async function hasShopAccess() {
  if (isLaunched()) return true;
  const password = process.env.SHOP_PASSWORD;
  // No password configured: the shop stays open rather than locking everyone out.
  if (!password) return true;
  const cookie = (await cookies()).get(ACCESS_COOKIE)?.value;
  return cookie === (await accessToken(password));
}

export function passwordRequired() {
  return !isLaunched() && Boolean(process.env.SHOP_PASSWORD);
}

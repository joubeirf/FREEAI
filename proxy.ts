import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, accessToken, isLaunched } from "@/lib/access";

// Avant l'ouverture : "/" affiche le compte à rebours et "/shop" exige le mot
// de passe. Après l'ouverture : "/" renvoie directement vers la boutique.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isLaunched()) {
    return pathname === "/" ? NextResponse.redirect(new URL("/shop", request.url)) : NextResponse.next();
  }

  if (pathname === "/") return NextResponse.next();

  const password = process.env.SHOP_PASSWORD;
  const cookie = request.cookies.get(ACCESS_COOKIE)?.value;
  if (password && cookie && cookie === (await accessToken(password))) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/", "/shop/:path*"],
};

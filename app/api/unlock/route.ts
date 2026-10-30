import { NextResponse, type NextRequest } from "next/server";
import { ACCESS_COOKIE, accessToken } from "@/lib/access";

export async function POST(request: NextRequest) {
  const password = process.env.SHOP_PASSWORD;
  const body = await request.json().catch(() => null);
  const attempt = typeof body?.password === "string" ? body.password : "";

  if (!password || !attempt || (await accessToken(attempt)) !== (await accessToken(password))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ACCESS_COOKIE, await accessToken(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}

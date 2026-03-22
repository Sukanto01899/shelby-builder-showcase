import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "sb_admin";

function sign(token: string, secret: string) {
  return createHmac("sha256", secret).update(token).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

function isValidCookie(value: string, secret: string) {
  const parts = value.split(".");
  if (parts.length !== 2) return false;
  const [token, sig] = parts;
  if (!token || !sig) return false;
  const expected = sign(token, secret);
  return safeEqual(sig, expected);
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (pathname.startsWith("/admin/login")) return NextResponse.next();
  if (pathname.startsWith("/admin/logout")) return NextResponse.next();

  const secret = process.env.ADMIN_ACCESS_KEY;
  if (!secret) {
    return new NextResponse("Admin access not configured.", { status: 503 });
  }

  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  if (!cookie || !isValidCookie(cookie, secret)) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

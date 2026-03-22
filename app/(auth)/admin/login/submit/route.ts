import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac, randomBytes, timingSafeEqual } from "crypto";

const COOKIE_NAME = "sb_admin";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function sign(token: string, secret: string) {
  return createHmac("sha256", secret).update(token).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

export async function POST(request: Request) {
  const secret = process.env.ADMIN_ACCESS_KEY;
  if (!secret) {
    return new Response("Admin access not configured.", { status: 503 });
  }

  const formData = await request.formData();
  const key = String(formData.get("key") || "");
  const next = String(formData.get("next") || "/admin");
  const nextPath = next.startsWith("/admin") ? next : "/admin";

  if (!safeEqual(key, secret)) {
    redirect(`/admin/login?error=1&next=${encodeURIComponent(nextPath)}`);
  }

  const token = randomBytes(32).toString("base64url");
  const sig = sign(token, secret);
  const value = `${token}.${sig}`;

  const cookieStore = await cookies();
  cookieStore.set({
    name: COOKIE_NAME,
    value,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/admin",
    maxAge: SESSION_TTL_SECONDS,
  });

  redirect(nextPath);
}

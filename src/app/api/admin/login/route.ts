import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function verifyPassword(input: string, expected: string): boolean {
  const hash = (s: string) => crypto.createHash("sha256").update(s).digest();
  return crypto.timingSafeEqual(hash(input), hash(expected));
}

function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// In-memory session store (resets on redeploy — acceptable for admin on a landing page)
export const adminSessions = new Map<string, number>(); // token → expiry timestamp

const SESSION_TTL = 60 * 60 * 1000; // 1 hour

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password || !process.env.ADMIN_PASSWORD || !verifyPassword(password, process.env.ADMIN_PASSWORD)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = generateSessionToken();
    adminSessions.set(token, Date.now() + SESSION_TTL);

    // Clean expired sessions
    for (const [t, expiry] of adminSessions) {
      if (Date.now() > expiry) adminSessions.delete(t);
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: SESSION_TTL / 1000,
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}

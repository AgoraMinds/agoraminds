import { NextRequest, NextResponse } from "next/server";
import { adminSessions } from "../login/route";

function isValidSession(req: NextRequest): boolean {
  const token = req.cookies.get("admin_session")?.value;
  if (!token) return false;
  const expiry = adminSessions.get(token);
  if (!expiry || Date.now() > expiry) {
    if (token) adminSessions.delete(token);
    return false;
  }
  return true;
}

export async function GET(req: NextRequest) {
  if (!isValidSession(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "No database configured" }, { status: 500 });
  }

  try {
    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.DATABASE_URL);

    const rows = await sql`
      SELECT id, name, email, entity_type, organization_name, contribution_type, message, referral_source, created_at
      FROM waitlist
      ORDER BY created_at DESC
    `;

    return NextResponse.json({ total: rows.length, entries: rows });
  } catch (error: unknown) {
    console.error("[admin waitlist error]", error);
    return NextResponse.json({ error: "Failed to fetch waitlist" }, { status: 500 });
  }
}

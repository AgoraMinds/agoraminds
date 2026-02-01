import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, role } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    // If DATABASE_URL is configured, save to Neon Postgres
    if (process.env.DATABASE_URL) {
      const { neon } = await import("@neondatabase/serverless");
      const sql = neon(process.env.DATABASE_URL);

      // Create table if not exists
      await sql`
        CREATE TABLE IF NOT EXISTS waitlist (
          id SERIAL PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          role TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `;

      // Insert (ignore duplicates)
      await sql`
        INSERT INTO waitlist (email, role)
        VALUES (${email}, ${role || null})
        ON CONFLICT (email) DO NOTHING
      `;
    } else {
      // Log to console if no DB configured (development)
      console.log(`[waitlist] ${email} (${role || "no role"})`);
    }

    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    console.error("[waitlist error]", error);
    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 500 }
    );
  }
}

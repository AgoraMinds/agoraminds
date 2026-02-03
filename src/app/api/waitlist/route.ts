import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, full_name, type, motivation, referral_source } = await req.json();

    // Email validation: trim whitespace, normalize to lowercase
    const normalizedEmail = email?.trim().toLowerCase();
    
    // Validate email format and length
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!normalizedEmail || !emailRegex.test(normalizedEmail) || normalizedEmail.length > 254) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (!full_name || !type) {
      return NextResponse.json({ error: "Full name and type required" }, { status: 400 });
    }

    // If DATABASE_URL is configured, save to Neon Postgres
    if (process.env.DATABASE_URL) {
      const { neon } = await import("@neondatabase/serverless");
      const sql = neon(process.env.DATABASE_URL);

      // Create table if not exists
      await sql`
        CREATE TABLE IF NOT EXISTS waitlist (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          full_name VARCHAR(255) NOT NULL,
          type VARCHAR(50) NOT NULL CHECK (type IN ('individual','nonprofit')),
          motivation TEXT,
          referral_source VARCHAR(255),
          created_at TIMESTAMPTZ DEFAULT NOW()
        )
      `;

      // Insert (ignore duplicates)
      await sql`
        INSERT INTO waitlist (email, full_name, type, motivation, referral_source)
        VALUES (${normalizedEmail}, ${full_name}, ${type}, ${motivation || null}, ${referral_source || null})
        ON CONFLICT (email) DO NOTHING
      `;
    } else {
      // Log to console if no DB configured (development)
      console.log(`[waitlist] ${normalizedEmail} - ${full_name} (${type})`);
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

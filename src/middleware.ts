import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiting (resets on redeploy — acceptable for landing page)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes in milliseconds
const MAX_REQUESTS = 3;

function getRateLimitKey(req: NextRequest): string {
  // Use X-Forwarded-For for proxied requests, fallback to "unknown"
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return ip;
}

export function middleware(req: NextRequest) {
  // Only apply rate limiting to /api/waitlist
  if (!req.nextUrl.pathname.startsWith("/api/waitlist")) {
    return NextResponse.next();
  }

  const key = getRateLimitKey(req);
  const now = Date.now();
  const limit = rateLimit.get(key);

  // Clean up expired entries
  if (limit && now > limit.resetTime) {
    rateLimit.delete(key);
  }

  const current = rateLimit.get(key);

  if (!current) {
    // First request
    rateLimit.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return NextResponse.next();
  }

  if (current.count >= MAX_REQUESTS) {
    // Rate limit exceeded
    const retryAfter = Math.ceil((current.resetTime - now) / 1000);
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": retryAfter.toString(),
        },
      }
    );
  }

  // Increment counter
  current.count += 1;
  rateLimit.set(key, current);

  return NextResponse.next();
}

export const config = {
  matcher: "/api/waitlist",
};

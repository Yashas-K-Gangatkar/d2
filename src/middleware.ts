import { NextRequest, NextResponse } from "next/server";

/**
 * Constant-time string comparison (pure JS, no Node.js `crypto` module).
 *
 * Why not `crypto.timingSafeEqual`: Next.js middleware runs in the Edge Runtime,
 * which does not support the Node.js `crypto` module. Importing it triggers a
 * build warning and may break in edge regions. This pure-JS implementation is
 * constant-time as long as both inputs have the same length (we enforce that
 * with an early length check that intentionally leaks only the length, which
 * is already public since the secret is server-side and fixed-length).
 */
function timingSafeEqualStr(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Middleware for route protection.
 *
 * Currently protects:
 *   - /api/admin/* → requires X-Admin-Secret header matching ADMIN_SECRET env var
 *
 * Why middleware (not per-route check):
 *   - Single source of truth for admin auth
 *   - Easier to audit
 *   - Avoids accidental exposure if a future admin route forgets the check
 *
 * Routes NOT protected here (protected elsewhere):
 *   - /dashboard/* → client-side auth check via useSession, redirects to /auth/signin
 *   - /api/notifications/* etc. → per-route authenticateRequest() helper
 *
 * Set ADMIN_SECRET in Vercel env vars. Generate with:
 *   openssl rand -base64 32
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /api/admin/*
  if (pathname.startsWith("/api/admin")) {
    const adminSecret = process.env.ADMIN_SECRET;
    if (!adminSecret) {
      // ADMIN_SECRET not configured — fail closed
      console.error("[middleware] ADMIN_SECRET env var is not set — refusing admin access");
      return NextResponse.json(
        { error: "Admin access not configured" },
        { status: 503 }
      );
    }
    const provided = request.headers.get("x-admin-secret");
    // v2.9.59 SECURITY FIX: Use timing-safe comparison to prevent timing attacks
    // v2.9.96: Switched to pure-JS implementation (Edge Runtime doesn't support node:crypto)
    if (!provided || !timingSafeEqualStr(provided, adminSecret)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*"],
};

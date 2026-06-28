import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Starts the GitHub OAuth flow for Sveltia CMS.
// The CMS opens this URL in a popup (base_url + auth_endpoint from admin/config.yml).
export function GET(req: NextRequest) {
  const url = new URL(req.url);
  const provider = url.searchParams.get("provider") || "github";
  const scope = url.searchParams.get("scope") || "public_repo";

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return new NextResponse("Missing GITHUB_OAUTH_CLIENT_ID env var.", {
      status: 500,
    });
  }

  // Callback runs on this same origin (works for both the vercel.app URL and tuucan.org).
  const redirectUri = `${url.origin}/api/callback`;
  const state = crypto.randomUUID().replace(/-/g, "");

  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", clientId);
  authorize.searchParams.set("redirect_uri", redirectUri);
  authorize.searchParams.set("scope", scope);
  authorize.searchParams.set("state", state);

  const res = NextResponse.redirect(authorize.toString());
  // CSRF guard — re-checked in the callback.
  res.cookies.set("sveltia-csrf", `${provider}_${state}`, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  return res;
}

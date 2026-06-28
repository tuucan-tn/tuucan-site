import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Renders the popup page that hands the token (or error) back to the CMS window
// using the Sveltia/Decap postMessage handshake.
function resultPage(
  provider: string,
  status: "success" | "error",
  content: Record<string, unknown>,
) {
  const payload = JSON.stringify(content);
  return `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8" /><title>Authorizing…</title></head>
  <body>
    <p>${status === "success" ? "Logged in — you can close this window." : "Login failed."}</p>
    <script>
      (function () {
        var content = ${payload};
        function send(e) {
          if (e.data !== "authorizing:${provider}") return;
          window.removeEventListener("message", send, false);
          window.opener.postMessage(
            "authorization:${provider}:${status}:" + JSON.stringify(content),
            e.origin
          );
        }
        window.addEventListener("message", send, false);
        // Announce readiness; the CMS replies with "authorizing:${provider}".
        window.opener && window.opener.postMessage("authorizing:${provider}", "*");
      })();
    </script>
  </body>
</html>`;
}

function html(body: string, status = 200) {
  return new NextResponse(body, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const provider = "github";
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return html(
      resultPage(provider, "error", {
        message: "Server is missing GitHub OAuth credentials.",
      }),
    );
  }

  // CSRF check: state must match the cookie set in /api/auth.
  const cookie = req.cookies.get("sveltia-csrf")?.value;
  if (!code || !state || cookie !== `${provider}_${state}`) {
    return html(
      resultPage(provider, "error", { message: "Invalid or expired login state." }),
    );
  }

  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });
    const data = (await tokenRes.json()) as {
      access_token?: string;
      error_description?: string;
      error?: string;
    };

    if (!data.access_token) {
      return html(
        resultPage(provider, "error", {
          message: data.error_description || data.error || "Token exchange failed.",
        }),
      );
    }

    const res = html(resultPage(provider, "success", { token: data.access_token, provider }));
    // Clear the one-time CSRF cookie.
    res.cookies.set("sveltia-csrf", "", { path: "/", maxAge: 0 });
    return res;
  } catch {
    return html(
      resultPage(provider, "error", { message: "Could not reach GitHub." }),
    );
  }
}

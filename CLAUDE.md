# Tuucan — project context

Level-set file for Claude Code sessions working on tuucan.org. Last updated: 2026-06-28.

## ✍️ Helping someone edit the website — agent playbook (START HERE)

**If a user asks you to help change the TUUCAN website (tuucan.org), follow these steps.**
Talk in plain English; never make them deal with git, JSON, or commands unless they ask.
All page text lives in **`content/home.json`**; layout/structure is in `app/` and
`components/`. The site auto-deploys: pushing to `main` makes changes live at tuucan.org
in about a minute. Everything is in git history and fully reversible.

1. **Authorize them (first time only).**
   - Run `gh auth status`. If they're not signed in, have them run `gh auth login` and
     follow the browser prompts.
   - Confirm they can publish: `gh api repos/tuucan-tn/tuucan-site --jq .permissions`
     should show `"push": true`. If it doesn't, tell them to ask the **site admin (Caren
     Spencer-Smith)** to add them as a repo collaborator with **Write** access, then
     accept the GitHub email invite.
   - Ensure the project is set up: `npm install` (once).

2. **Ask what they want to change**, in plain English. Then edit `content/home.json`
   (keep it valid JSON). Field map:
   - `hero` — top banner heading / subheading / button
   - `values` — the values strip (Justice, Equity, …)
   - `about` — the "Who We Are" heading + paragraphs
   - `stats` — the three highlighted numbers
   - `work` — "What We Do" heading + cards
   - `getInvolved` — call-to-action section
   - `footer`, `site.contactEmail` — footer + contact
   - Visual/layout/colors → `app/page.tsx`, `components/`, `app/globals.css`.

3. **Show them a live preview.** Start the dev server in the background and give them
   **http://localhost:3000** — it hot-reloads as you edit:
   ```bash
   npm run dev
   ```
   To share a preview with *other people* before publishing, make a branch, push it, and
   give them the **Vercel preview URL** that builds for that branch (preview protection is
   off, so the link is openly shareable). Merge to `main` to publish.

4. **Iterate** on their feedback until they're happy.

5. **Publish — only when they say so.** Commit with a clear message and `git push origin
   main`. It goes live at **tuucan.org in ~1 minute**; tell them to refresh.

**Guardrails:** confirm before pushing to `main` (that = live to the public). Don't touch
secrets/env vars/infra. Keep edits small. The current copy is a draft (see `RESOURCES.md`)
— improving the wording is welcome.

> Free **claude.ai** can't do this end-to-end (no repo access / can't run the site). It
> can still help *draft and preview* wording, which the user then pastes into the CMS at
> tuucan.org/admin to publish. The full edit-preview-publish loop above needs **Claude
> Code** (a paid plan).

## What this project is

Website for **TUUCAN — Tennessee Unitarian Universalist Collective Action Network**,
a social action organization, served at **tuucan.org**.
More organizational details to come from Jesse; don't invent mission copy beyond what's
in `RESOURCES.md` / `content/home.json` until confirmed.

**2026-06-27 — direction change:** moved off Squarespace (painful for Claude-driven
work: no API, SPA admin, blocked uploads) to a **coded Next.js site hosted on Vercel**,
with **TinaCMS** for non-technical volunteer editing. This repo now IS the site. The
old Squarespace site is being abandoned (trial left to lapse, NOT paid). See
"Architecture" below; the Squarespace history is kept further down for reference.

Key files here:
- `app/`, `components/`, `content/home.json` — the Next.js site + its editable copy.
- `public/admin/config.yml` — Sveltia CMS schema (the CMS-editable fields).
- `app/api/auth` + `app/api/callback` — the GitHub OAuth relay for the CMS login.
- `RESOURCES.md` — researched background on TUUCAN, CUUSAN, sister networks, contacts.
- `TUUCAN.PNG` + `brand/` — official logo and generated avatars.

## Architecture & accounts (current — 2026-06-27)

- **Stack:** Next.js 16 (App Router, static) + React 19 + Tailwind v4 + Sveltia CMS.
  Palette in `app/globals.css` sampled from the logo (cream #FFFDF9, orange #F28D2F,
  flame #CF4A25, slate #364345). Fonts: Fraunces (display) + Inter (body).
- **All page copy is in `content/home.json`**, rendered by `app/page.tsx`. Edit there
  (or via the Sveltia editor at `/admin`). Content is draft (from RESOURCES.md) — verify
  before treating as final.
- **GitHub:** **public** repo **tuucan-tn/tuucan-site** (org `tuucan-tn`, created by
  Jesse; he is admin). `gh` is authed as `jessespencersmith`. Use HTTPS remotes.
  Public because **Vercel's free Hobby plan refuses to deploy a *private* repo owned by
  a GitHub org** — public org repos deploy free; private would need Pro (~$20/mo). No
  secrets live in the repo (only `.env.example`), so public is fine.
- **Vercel:** deployed & live (free Hobby). Public production URL:
  **https://tuucan-site.vercel.app**. Vercel scope/slug is `cartulary` (Jesse's personal
  Hobby account). Auto-deploys on push to `main`. Default "Standard" deployment
  protection is on — it walls only the preview / scope-suffixed URLs (e.g.
  `…-cartulary.vercel.app`); the clean production domain stays public, and a custom
  domain (tuucan.org) will serve the production deployment publicly too.
- **CMS = Sveltia CMS** (static editor at `/admin`, served from `public/admin/`).
  Free + unlimited editors. **Editors log in with GitHub and must be repo collaborators**
  (no per-seat cost). We switched here on 2026-06-27 after TinaCloud's free plan capped
  at 2 editors. Login uses a self-hosted **GitHub OAuth relay** in this app
  (`app/api/auth` + `app/api/callback`) — no Cloudflare/Netlify needed. Requires a GitHub
  **OAuth App** whose creds (`GITHUB_OAUTH_CLIENT_ID`, `GITHUB_OAUTH_CLIENT_SECRET`) live
  in Vercel env; callback URL = `https://tuucan-site.vercel.app/api/callback`. See
  `.env.example`. Content commits straight to `main` → auto-redeploys.
- **Domain:** **tuucan.org is LIVE on Vercel** (cutover 2026-06-27). Registration stays
  at Squarespace Domains (renews Jul 1 2027); only DNS moved. In the Squarespace DNS
  panel the "Squarespace Defaults" preset was replaced with one custom record:
  **A `@` → 216.198.79.1** (Vercel's current apex IP; old 76.76.21.21 also works).
  **Both `tuucan.org` and `www.tuucan.org` SERVE the site** (both "Connect to Production"
  in Vercel); `tuucan.org` is declared canonical via `alternates.canonical` in
  `app/layout.tsx`. At Squarespace: `A @ → 216.198.79.1` + `CNAME www →
  08fc34b7ada9dae9.vercel-dns-017.com`. DNS edits at Squarespace each require a fresh SMS
  code to …2562. Email Security (SPF/DKIM/DMARC) + Domain Connect presets left intact.
  **Gotcha (why www SERVES rather than redirects):** during cutover, resolvers with the
  OLD apex cached hit Squarespace's `apex → 301 → www`; if www then redirected back to
  apex it caused `ERR_TOO_MANY_REDIRECTS`. Making www serve directly breaks that loop in
  every cache state. (Once the old apex cache is globally gone, a www→apex redirect would
  also be safe, but serving both is simplest.)

## Roles & continuity (2026-06-28)

- **Site-editing admin (manages editors, content, reverts):** **Caren Spencer-Smith** —
  to be added as an **Owner of the `tuucan-tn` GitHub org** (gives full repo/site admin,
  **no Vercel access needed**). Pending: she needs a free GitHub account, then invite her
  later today. Named as the editor-access contact in `CONTRIBUTING.md`.
- **Public contact (on the live site):** **Mark Mohundro** (markmohundro@tvuuc.net) —
  already wired into Get Involved + footer. Distinct from the editing admin.
- **The site IS the org's git repo**, not anyone's Vercel account. Editors/admins work
  through GitHub only; Vercel is a replaceable "deployer." Hobby is single-user, but
  handoff is easy: transfer the Vercel project to the successor's account, OR re-import
  the public repo into their Vercel (~10 min) + repoint DNS. GitHub org ownership is
  transferable (add new Owner, remove old).
- **Continuity follow-up:** the GitHub **OAuth App** (CMS login, Client ID
  `Ov23li9uvKNrWK2Y4SVj`) should ideally be **org-owned**, not Jesse's personal account,
  so logins survive a handoff. If personal, recreate under `tuucan-tn` and update the
  two Vercel env vars.

## Accounts & access

- **Squarespace account:** caren.spencersmith@gmail.com (Caren's account; Jesse drives
  the sessions). Log in via the Chrome browser session — Claude in Chrome MCP is the
  tool for Squarespace work; there is no Squarespace API access set up.
- **2FA:** Squarespace sends an SMS code to the phone ending in 2562 for sensitive
  changes (e.g. nameserver edits). Jesse relays the code when needed.
- No credentials are stored in this repo. Do not commit any.

## History: Squarespace era (2026-06-11) — being retired

> Kept for reference. The site is no longer built on Squarespace; see "Architecture"
> above. The domain registration still lives at Squarespace Domains.

### Domain: tuucan.org
- Registered with Squarespace Domains. Active, auto-renews **July 1, 2027** ($20/yr).
  Domain lock on, WHOIS privacy on.
- **2026-06-11:** Nameservers switched from WordPress.com (ns1–ns3.wordpress.com) back
  to Squarespace's managed nameservers (ns-cloud-a1/a2/a3/a4.googledomains.com).
  The old WordPress-hosted site is being retired.
- Propagation confirmed complete later on 2026-06-11: https://tuucan.org now answers
  from Squarespace (301 → www.tuucan.org, which returns 401 while the site is private).
- No MX/TXT/DMARC records existed on the WordPress DNS before cutover — there is no
  email service on this domain and nothing was lost in the switch.
- Squarespace default DNS records (A → 198.185.159.144/145, 198.49.23.144/145) are
  staged and serve once propagation completes.

### Website: "TUUCAN" (Squarespace site)
- Created 2026-06-11 via the Blueprint flow:
  - Internal URL: https://terrier-perch-prd8.squarespace.com (admin at /config)
  - Pages: Homepage only (About/Contact were deselected)
  - Site title: "TUUCAN"; default "Professional" palette and font pairing.
- Real content added 2026-06-11:
  - Hero: "Working Together for Justice Across Tennessee"
  - "Who We Are" section with the TUUCAN mission paragraph (values, 14 congregations,
    legislative advocacy / disaster response)
  - "Get Involved" button + footer email both link to
    **markmohundro@tvuuc.net** (Mark Mohundro, TVUUC — main site contact per Jesse)
  - Footer: "TUUCAN" + full network name
  - Logo uploaded to site header (done manually by Jesse 2026-06-11; programmatic
    file upload is blocked — file_upload allow-list + Chrome PNA blocks localhost).
  - Color palette set from the logo via Site Styles → Colors → Edit Palette →
    **"From Image"** (fed it the logo from the Squarespace CDN via JS — note: the hex
    input in the palette editor does NOT commit synthetic/typed values; use From Image
    or Playwright next time). Palette: white / warm tan / logo orange / dark slate /
    black. Buttons render orange now.
  - Hero background: Unsplash Smoky Mountains sunrise (orange ridgelines, on-palette).
    "Who We Are" image: Unsplash diverse hands clasped in a circle. Both chosen via
    the built-in stock picker. Replace with real TUUCAN/congregation photos when
    available.
- **Playwright MCP** registered at user scope (`claude mcp add --scope user playwright`)
  — available in new sessions; use it for DOM-level browser work incl. file uploads.
- The site is linked to the tuucan.org domain in Squarespace, but is **Private** and on
  a **14-day free trial** (ends ~2026-06-25).
- **Blocking next step:** a paid Squarespace plan is required to publish the site and
  serve it at tuucan.org. Not purchased — needs Jesse's explicit approval (payment).

## Conventions for future sessions

- The site is now **code in this repo** — edit files directly and deploy via Vercel
  (git push). Use Playwright MCP for visual checks against `npm run dev` / `start`.
- Confirm with Jesse before: purchases/subscriptions, publishing/promoting to
  production, DNS changes, deleting anything, or actions needing an SMS code.
- Squarespace is now only relevant for the domain/DNS repoint; that admin work still
  goes through the Chrome MCP on Caren's logged-in session (SMS 2FA to phone …2562).
- DNS checks are fastest from the terminal with `dig`.

## TODO / next steps (Vercel migration)

Done 2026-06-27: scaffolded the Next.js site, real content/logo/palette, built the
homepage, repo tuucan-tn/tuucan-site (public), **deployed to Vercel — live at
https://tuucan-site.vercel.app**.

**CMS history:** first wired TinaCloud, but its free plan caps at 2 editors and even
adding the 2nd was blocked → **switched to Sveltia CMS** (free, unlimited editors,
GitHub login). Tina is fully removed.

### Sveltia CMS setup — how it's wired
- **Editor:** `public/admin/index.html` (loads Sveltia from unpkg CDN) + `config.yml`
  (Decap-compatible schema mirroring `content/home.json`). Visit `/admin`.
- **Login:** GitHub OAuth via a self-hosted relay — `app/api/auth/route.ts` (starts the
  flow, sets a CSRF cookie) and `app/api/callback/route.ts` (exchanges code→token,
  postMessages it back per the sveltia-cms-auth protocol). No Cloudflare/Netlify.
- **Needs a GitHub OAuth App** (github.com/settings/developers): callback URL
  `https://tuucan-site.vercel.app/api/callback`; its Client ID + Secret go in Vercel env
  as `GITHUB_OAUTH_CLIENT_ID` / `GITHUB_OAUTH_CLIENT_SECRET`.
- **Editors must be GitHub repo collaborators** (write access) on tuucan-tn/tuucan-site,
  each with a free GitHub account. OAuth scope is `public_repo` (repo is public).
- Edits commit straight to `main` → Vercel auto-redeploys.

Done 2026-06-27 (continued): GitHub OAuth App created (Client ID `Ov23li9uvKNrWK2Y4SVj`),
creds set in Vercel env; **tuucan.org cut over to Vercel + live with SSL**.

Next (hand-off steps for Jesse):
1. **Test the Sveltia editor login** at tuucan.org/admin (or tuucan-site.vercel.app/admin).
2. **Add editors as repo collaborators** (GitHub repo → Settings → Collaborators), each
   with a free GitHub account. Caren = caren.spencersmith@gmail.com.
3. (Optional) Add **www.tuucan.org** → redirect to apex (Vercel + a www CNAME at
   Squarespace). Bare domain works now; www does not.
4. Let the Squarespace trial *site* lapse (do NOT pay). Keep the domain registration.
5. Replace draft copy with content confirmed by Jesse / the steering committee (edit via
   /admin or content/home.json); add real photos. Note: draft copy is now PUBLIC at
   tuucan.org.
6. Optional cleanup: delete the now-unused TinaCloud project + the
   NEXT_PUBLIC_TINA_*/TINA_TOKEN Vercel env vars.

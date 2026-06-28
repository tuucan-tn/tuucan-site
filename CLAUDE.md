# Tuucan — project context

Level-set file for Claude Code sessions working on tuucan.org. Last updated: 2026-06-27.

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
- `tina/config.ts` — TinaCMS schema (the CMS-editable fields).
- `RESOURCES.md` — researched background on TUUCAN, CUUSAN, sister networks, contacts.
- `TUUCAN.PNG` + `brand/` — official logo and generated avatars.

## Architecture & accounts (current — 2026-06-27)

- **Stack:** Next.js 16 (App Router, static) + React 19 + Tailwind v4 + TinaCMS.
  Palette in `app/globals.css` sampled from the logo (cream #FFFDF9, orange #F28D2F,
  flame #CF4A25, slate #364345). Fonts: Fraunces (display) + Inter (body).
- **All page copy is in `content/home.json`**, rendered by `app/page.tsx`. Edit there
  (or via Tina). Content is draft (from RESOURCES.md) — verify before treating as final.
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
- **TinaCMS:** local editing via `npm run dev:cms` (→ /admin). Production editing uses
  Tina Cloud (email logins for volunteers; they do NOT need GitHub accounts). Cloud keys
  (`NEXT_PUBLIC_TINA_CLIENT_ID`, `TINA_TOKEN`) go in Vercel env — see `.env.example`.
- **Domain:** tuucan.org stays registered at Squarespace Domains; only DNS will be
  repointed to Vercel (A `@`→76.76.21.21, CNAME `www`→cname.vercel-dns.com).

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

Done 2026-06-27: scaffolded the Next.js + Tina site, added real content/logo/palette,
built the homepage, created the repo tuucan-tn/tuucan-site (made public), pushed, and
**deployed to Vercel — live at https://tuucan-site.vercel.app**.

Next:
1. Create a free **Tina Cloud** project (Jesse's account) connected to the repo; add
   client ID + token to Vercel env; switch the Vercel build to `tina:build && build`;
   invite volunteer editors (email logins — no GitHub needed).
2. Repoint **tuucan.org** DNS from Squarespace to Vercel (add domain in Vercel →
   A `@`→76.76.21.21, CNAME `www`→cname.vercel-dns.com at Squarespace); verify end-to-end.
   Consider waiting until copy is signed off, since this makes the site public at the
   real domain.
3. Let the Squarespace trial lapse (do NOT pay). Keep the domain registration.
4. Replace draft copy with content confirmed by Jesse / the steering committee;
   add real photos to the hero / sections.

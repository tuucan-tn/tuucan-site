# tuucan-site

Website for **TUUCAN — Tennessee Unitarian Universalist Collective Action Network**
([tuucan.org](https://tuucan.org)). A statewide network of UU congregations working
together for justice across Tennessee.

## Stack

- **Next.js 16** (App Router, static) + **React 19**
- **Tailwind CSS v4** — brand palette sampled from the logo (`app/globals.css`)
- **Sveltia CMS** — free, git-based browser editor for non-technical editors
- **Vercel** — hosting (free Hobby tier)

All page copy lives in **`content/home.json`** and is rendered by `app/page.tsx`.
Editors change that copy either in code or through the Sveltia editor (no code needed).

## Develop

```bash
npm install
npm run dev        # Next dev server → http://localhost:3000
npm run build      # production build
```

## How to edit the website

There are two ways to change the site. Most edits use **Option A** (in the browser, no
code). Either way, every change is saved to git history, auto-deploys in ~1 minute, and
can be undone.

### Option A — Edit in the browser (no code needed)

This is how staff and volunteers change the words and pictures on the site.

**One-time setup for each new editor** (an admin/owner does this once per person):

1. The editor creates a free **GitHub account** at <https://github.com/signup>.
2. An admin adds them to the repo: GitHub → **`tuucan-tn/tuucan-site`** →
   **Settings → Collaborators → Add people** → enter their GitHub username →
   give **Write** access.
3. The editor accepts the email invitation from GitHub.

**Making an edit:**

1. Go to **<https://tuucan.org/admin>**.
2. Click **Sign in with GitHub** and approve (only asked the first time).
3. Click **Site Content → Homepage**.
4. Change any field — e.g. the hero heading and subheading, the **Who We Are**
   paragraphs, the stats, the **What We Do** cards, **Get Involved**, the footer, or the
   contact email.
5. Click **Save** (top of the editor). This commits your change to the site.
6. Wait about a minute for the site to rebuild, then refresh **tuucan.org** — your edit
   is live.

**Images:** use the image/upload button inside a field in the editor; uploaded files are
stored in the repo under `public/uploads/`.

> No files or command line required. If something looks wrong, an admin can revert any
> change from the repository's commit history.

### Option B — Edit in code (for developers)

All page copy lives in one file: **`content/home.json`** (the same data the browser
editor changes). Page layout/structure lives in `app/` and `components/`.

```bash
npm install
npm run dev          # preview at http://localhost:3000
# edit content/home.json (and/or app/, components/)
git add -A && git commit -m "Update homepage copy"
git push origin main # Vercel auto-deploys in ~1 min
```

- `content/home.json` — all the words and links.
- `app/page.tsx`, `components/` — page sections and layout.
- `public/admin/config.yml` — which fields show up in the browser editor; keep its field
  names in sync with `content/home.json`.

### How the browser login works (for maintainers)

The editor is **Sveltia CMS** (`public/admin/`). Sign-in uses GitHub OAuth via a
self-hosted relay in this app — `app/api/auth` (starts the flow) and
`app/api/callback` (exchanges the code for a token). It needs a GitHub **OAuth App**
whose `GITHUB_OAUTH_CLIENT_ID` / `GITHUB_OAUTH_CLIENT_SECRET` are set in the Vercel
project (see `.env.example`), with callback URL
`https://tuucan-site.vercel.app/api/callback`.

## Brand assets

`brand/` holds the source logo and generated avatars (`tuucan-avatar-bird.png` is the
GitHub org / social avatar). Site-served copies live in `public/`.

## Deploy

Pushes to `main` deploy to production on Vercel. The CMS login needs a GitHub OAuth App;
its `GITHUB_OAUTH_CLIENT_ID` / `GITHUB_OAUTH_CLIENT_SECRET` are configured in the Vercel
project — see `.env.example`.

> **Note:** Homepage copy is currently a draft derived from public sources
> (`RESOURCES.md`); verify with the steering committee before treating it as final.

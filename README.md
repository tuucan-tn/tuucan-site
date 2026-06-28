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

## Content editing

- **Source of truth:** `content/home.json` (committed to git, full history).
- **Visual editor:** **Sveltia CMS** at `/admin`. Editors **log in with GitHub** and
  must be **collaborators** on this repo (free, unlimited editors). Saving commits
  directly to `main`, which auto-redeploys.
- **Login:** GitHub OAuth handled by a self-hosted relay (`app/api/auth`,
  `app/api/callback`) — needs a GitHub OAuth App (creds in Vercel env, see below).
- **Schema:** `public/admin/config.yml` defines the editable fields.

## Brand assets

`brand/` holds the source logo and generated avatars (`tuucan-avatar-bird.png` is the
GitHub org / social avatar). Site-served copies live in `public/`.

## Deploy

Pushes to `main` deploy to production on Vercel. The CMS login needs a GitHub OAuth App;
its `GITHUB_OAUTH_CLIENT_ID` / `GITHUB_OAUTH_CLIENT_SECRET` are configured in the Vercel
project — see `.env.example`.

> **Note:** Homepage copy is currently a draft derived from public sources
> (`RESOURCES.md`); verify with the steering committee before treating it as final.

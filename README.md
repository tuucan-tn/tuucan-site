# tuucan-site

Website for **TUUCAN — Tennessee Unitarian Universalist Collective Action Network**
([tuucan.org](https://tuucan.org)). A statewide network of UU congregations working
together for justice across Tennessee.

## Stack

- **Next.js 16** (App Router, static) + **React 19**
- **Tailwind CSS v4** — brand palette sampled from the logo (`app/globals.css`)
- **TinaCMS** — browser-based content editing for non-technical editors
- **Vercel** — hosting (free Hobby tier)

All page copy lives in **`content/home.json`** and is rendered by `app/page.tsx`.
Editors change that copy either in code or through the Tina admin (no code needed).

## Develop

```bash
npm install
npm run dev        # plain Next dev server → http://localhost:3000
npm run dev:cms    # Next + Tina admin → http://localhost:3000/admin (edit content visually)
npm run build      # production build
```

## Content editing

- **Source of truth:** `content/home.json` (committed to git, full history).
- **Visual editor:** the Tina admin at `/admin`. Locally it runs against the
  filesystem; in production it uses **Tina Cloud** for email-based editor logins,
  committing changes back to this repo. Editors do **not** need GitHub accounts.
- **Schema:** `tina/config.ts` defines the editable fields.

## Brand assets

`brand/` holds the source logo and generated avatars (`tuucan-avatar-bird.png` is the
GitHub org / social avatar). Site-served copies live in `public/`.

## Deploy

Pushes to `main` deploy to production on Vercel. Tina Cloud env vars
(`NEXT_PUBLIC_TINA_CLIENT_ID`, `TINA_TOKEN`) are configured in the Vercel project —
see `.env.example`.

> **Note:** Homepage copy is currently a draft derived from public sources
> (`RESOURCES.md`); verify with the steering committee before treating it as final.

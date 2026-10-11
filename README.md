# Ananke Projects website

The website for **Ananke Projects** — *Because Art Must* — at https://anankeprojects.com.

Built with [Astro](https://astro.build) (static output), hosted on Cloudflare Pages, edited with Decap CMS.
See [.SITE-PLAN.md](.SITE-PLAN.md) for the full plan, sitemap and copy.

## Run it locally

Requires Node.js 22.12 or newer (pinned in `.node-version`, which Cloudflare Pages also reads).

```bash
npm install
npm run dev
```

Open http://localhost:4321.

| Command | What it does |
|---------|--------------|
| `npm run dev` | Local preview with live reload |
| `npm run build` | Builds the finished site into `dist/` |
| `npm run preview` | Serves the built `dist/` folder |
| `npm run cms` | Local CMS backend: run alongside `npm run dev`, then open http://localhost:4321/admin/ |

## Where things live

```
src/
├── pages/            one file per page (URL = folder path)
├── components/       Header, Footer, IssueCover, PersonCard, OpenCall…
├── layouts/          BaseLayout (head, header, footer)
├── styles/global.css colours, fonts, spacing
├── data/             navigation and the five Approach principles
├── content/          everything editors change
│   ├── issues/       one .md per Interstice issue
│   ├── people/       contributors, editors, founder
│   ├── works/        pieces within an issue
│   ├── exhibitions/  research/  community/
│   └── settings/     open-call.json, site.json
└── content.config.ts field definitions for the content above
public/
├── admin/            Decap CMS dashboard (index.html, config.yml)
└── images/uploads/   images uploaded through the CMS
functions/api/        GitHub login helper for the CMS (Cloudflare Pages Functions)
```

## Common edits

- **Open or close submissions:** change `status` in `src/content/settings/open-call.json`
  to `open`, `opening-soon` or `closed`, and fill in `theme` and `deadline`.
- **Add a contributor:** add a file to `src/content/people/` with `roles: [Contributor]`.
- **Add a piece to Issue I:** add a file to `src/content/works/` with `issue: issue-1-2026`.
- **Publish Issue II:** set `status: published` in `src/content/issues/issue-2-2027.md`.
- **Real cover artwork:** upload the image and set `cover:` on the issue. It replaces the typographic cover.

## Deploying (Cloudflare Pages)

| Setting | Value |
|---------|-------|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | read from `.node-version` (22.12.0) |

For the CMS login, add `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` as environment variables,
and keep `repo:` in `public/admin/config.yml` set to `seyramdesouza/ananke-website`.
# ananke-website

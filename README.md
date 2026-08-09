# Akshath O K — Portfolio

A production-focused personal portfolio for Akshath O K. It is a React single-page application with a Vercel serverless endpoint that retrieves and caches curated project data from GitHub.

## Stack

- React 18 and Vite 5
- Framer Motion 13
- Vercel Functions for server-side GitHub access
- Plain CSS with responsive, light/dark, touch, and reduced-motion behavior

## Local development

Requirements: Node.js 20 or 22 and npm.

```bash
npm run install:all
npm run dev
```

The Vite development server runs at `http://localhost:5173`. In development only, project data is requested from GitHub's public API. Production always uses the cached `/api/projects` serverless route.

## Production build

```bash
npm run build
```

The static output is written to `client/dist`.

## Environment variables

Copy `.env.example` to `.env.local` when values are needed. Never commit the resulting file.

| Variable | Required | Scope | Purpose |
| --- | --- | --- | --- |
| `VITE_SITE_URL` | Recommended | Public/build-time | Canonical production URL used by canonical and social metadata. Vercel's production project URL is used when this is omitted on Vercel. |
| `GITHUB_TOKEN` | No | Server only | Raises GitHub API limits. Public repository fetching works without it. |

`GITHUB_TOKEN` must never use a `VITE_` prefix because Vite-prefixed values are included in browser code.

## Deploying to Vercel

1. Push the repository to GitHub.
2. Import it into Vercel. The checked-in `vercel.json` supplies the install, build, output, SPA rewrite, and security-header configuration.
3. Set `VITE_SITE_URL` to the final canonical domain. Optionally set the server-only `GITHUB_TOKEN`.
4. Deploy. Preview deployments remain functional while canonical metadata continues to use `VITE_SITE_URL` when configured.

## Security headers

`vercel.json` sends `nosniff`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, and a Content Security Policy. The policy allows no inline scripts, so the pre-paint theme bootstrap lives in `client/public/theme-init.js` rather than in `index.html`. Any future inline `<script>` needs either the same treatment or a matching hash in the policy. `style-src` keeps `'unsafe-inline'` because React and Framer Motion write inline style attributes, and Google Fonts serves an external stylesheet.

The projects endpoint uses a one-hour CDN cache, serves stale responses during revalidation or upstream failure, and times out slow GitHub requests. The UI also keeps a stale browser cache and displays a GitHub fallback link when no project data is available.

## Content configuration

GitHub selection, ordering, featured state, descriptions, and manual status overrides are centralized in `client/src/data/projectConfig.js`. Status precedence is manual override, archived state, GitHub topics, then a conservative `In Progress` fallback.

The contact area intentionally uses reliable email and social links; it does not present a form unless a real delivery backend is configured.

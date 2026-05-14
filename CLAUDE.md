# PC4x4SAR - Pierce County 4x4 Search and Rescue

## Project
- Next.js 16 App Router + Tailwind CSS, static export (`output: 'export'`) to Cloudflare Pages
- Cloudflare Worker handles contact form API (`worker.js`) with KV storage
- Domain: pcsar4x4.org (current) | pc4x4sar.org coming online soon | Preview: pc4x4sar-preview.ryan-gray-210.workers.dev
- GitHub: lryangray/pc4x4sar

## Commands
- `npm run build` — static export to `out/`
- `npm run lint` — ESLint 9 flat config (eslint.config.mjs)
- `npx tsc --noEmit` — type check
- CI runs lint → typecheck → build → deploy (see .github/workflows/deploy.yml)

## Conventions
- Always use feature branches + PRs — never push directly to main
- Content lives in `lib/data/content.ts`, not inline in components
- All sections use `useScrollVisible` hook for scroll-triggered animations
- Structured data schemas in `lib/structured-data.ts`
- Images from Unsplash CDN (optimization via URL params, not Next.js — `unoptimized: true` is required for static export)

## Gotchas
- `next lint` is broken in Next.js 16 (looks for `lint` directory) — use `npm run lint` which calls eslint directly
- ESLint 9 requires flat config — do NOT create `.eslintrc.json`
- `gh` CLI needs PATH: `export PATH="$PATH:/c/Program Files/GitHub CLI"`
- Pushing workflow file changes requires `gh auth refresh -h github.com -s workflow`
- Font is self-hosted via `next/font` (Inter) — no Google Fonts CDN dependency

## Remaining Work
- Analytics (no tracking installed yet)
- Error tracking / observability
- PWA support (manifest, service worker)
- Stock photos → real team photos (user will handle)

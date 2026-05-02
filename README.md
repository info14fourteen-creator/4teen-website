# 4TEEN Website

Modern app-like website scaffold for the 4TEEN ecosystem.

## Stack

- Next.js 16 app router
- TypeScript
- Tailwind CSS v4
- OpenNext adapter for Cloudflare Workers
- Wrangler for local preview and deploy

## Commands

```bash
pnpm dev
pnpm lint
pnpm build
pnpm preview
pnpm run deploy
pnpm cf:deploy
pnpm cf-typegen
```

## Routes

- `/` marketing and ecosystem landing
- `/app` app shell placeholder
- `/api/health` health endpoint for runtime checks

## Cloudflare

The project is configured for Cloudflare Workers with:

- `open-next.config.ts`
- `wrangler.jsonc`
- `nodejs_compat` enabled
- preview and deploy scripts via `opennextjs-cloudflare`

## Deployment State

- `4teen.me` is served by the new Cloudflare Worker route
- `www.4teen.me` is attached to the Worker directly
- `https://4teen-website.stan-at.workers.dev` remains available for direct worker checks

## Next Steps

1. Bring over real wallet and ambassador flows from `4teen-wallet-app`.
2. Replace placeholder app cards with live wallet state and dashboard data.
3. Split the shell into production routes for landing, wallet, ambassadors, and activity.

OIDC remote runner verification: ✅ OIDC smoke test passed using the remote runner.

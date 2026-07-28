# 4TEEN localization rollout

The localization unit is one language and one page. A unit is never published
as complete merely because a model returned text.

## Planned languages

English is the canonical source. The rollout covers Russian, Uzbek, Turkish,
German, French, Spanish, Italian, Portuguese, Dutch, Polish, Arabic, Hindi,
Japanese, Simplified Chinese, and Korean.

## Planned page groups

| Order | Page id | Route / scope |
| --- | --- | --- |
| 1 | `global` | Header, navigation, search, footer, shared controls |
| 2 | `home` | `/` |
| 3 | `app` | `/app` |
| 4 | `buy` | `/buy` |
| 5 | `unlock` | `/unlock` |
| 6 | `liquidity` | `/liquidity` |
| 7 | `swap` | `/swap` |
| 8 | `airdrop` | `/airdrop` |
| 9 | `ambassadors` | `/ambassadors` |
| 10 | `verification` | `/verification` |
| 11 | `whitepaper` | `/whitepaper` |
| 12 | `one-pager` | `/one-pager` |
| 13 | `deck` | `/deck` |
| 14 | `privacy` | `/privacy` |
| 15 | `terms` | `/terms` |
| 16 | `support` | `/support` |
| 17 | `blog` | Blog interface; authored articles keep their source language |

This is a 15 × 17 matrix: 255 independently reviewable units.

## Unit lifecycle

1. Extract the canonical English content object.
2. Translate exactly one object into exactly one target language.
3. Validate key, array, URL, number, symbol, and string-path parity.
4. Reject empty or suspiciously unchanged English prose.
5. Run lint and production build.
6. Start the built site and smoke-test the localized route.
7. Commit the generated package change containing only that language/page unit.
8. Activate a language in the public switcher only after every required page is validated.

## Commands

```bash
pnpm localization:translate --locale ru --page home
pnpm localization:status
```

The translation command requires `OPENAI_API_KEY`. GitHub Actions obtains it
from the existing Heroku operations control plane through GitHub OIDC; the key
is not stored in the repository.

The queue runs every four hours and dispatches exactly one missing unit. Units
are ordered by language and then by page, so the site never runs a 255-job
translation burst. Failed units remain missing and are retried on the next
queue cycle. A language remains marked as upcoming until its full required
matrix is complete.

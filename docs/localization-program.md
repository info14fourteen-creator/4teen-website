# 4TEEN Localization Rollout

## Scope

Declared website locales:
- en
- ru
- uz
- tr
- de
- fr
- es
- it
- pt
- nl
- pl
- ar
- hi
- ja
- zh-CN
- ko

## Core architecture tasks

1. Locale routing
- Ensure every declared locale resolves through `src/lib/site-locale.ts`
- Keep default locale unprefixed and localized routes prefixed
- Keep RTL handling correct for Arabic

2. Locale switching
- Keep switcher inventory aligned with declared locales
- Expose only production-ready locales as `live`
- Preserve path when switching locale

3. Metadata and SEO
- Emit alternates for every declared locale
- Maintain locale-aware canonical URLs
- Maintain locale-aware Open Graph metadata
- Keep sitemap alternates aligned with declared locales

4. Translation content model
- Every content file must support fallback to English
- Real translation work must happen page-by-page, not by string dumping
- Navigation, search, footer, legal, and metadata must be translated with page content

## Page matrix

| Surface | Content file | Current state |
| --- | --- | --- |
| Home | `src/content/home-content.ts` | en complete, ru/uz fallback to en |
| App | `src/content/app-content.ts` | en only |
| Buy | `src/content/buy-content.ts` | en complete, ru partial/live candidate |
| Unlock | `src/content/unlock-content.ts` | en complete; ru/uz partial |
| Liquidity | `src/content/liquidity-content.ts` | en only |
| Swap | `src/content/swap-content.ts` | en only |
| Airdrop | `src/content/airdrop-content.ts` | en only |
| Ambassadors | `src/content/ambassadors-content.ts` | en content mapped to ru/uz fallback |
| Verification | `src/content/verification-content.ts` | en only |
| Deck | `src/content/genesis-content.ts` | en only |
| One-pager | `src/content/one-pager-content.ts` | en only |
| App chrome / shell copy | `src/content/chrome-content.ts` | en only |
| Search copy | `src/content/search-content.ts` | en only |
| Nav copy | `src/content/nav-content.ts` | en only |
| Privacy / Terms / Support / Blog shell | `src/content/public-pages-content.ts` | en only |
| Whitepaper shell | `src/content/whitepaper-content.ts` | en dominant, needs locale audit |

## Execution order

### Phase 1 — architecture and inventory
- Expand locale registry to all declared locales
- Expand intl formatting map to all declared locales
- Expand metadata locale map to all declared locales
- Keep fallback behavior deterministic
- Freeze the page-by-page localization matrix in repo

### Phase 2 — production-ready base locales
- Complete `ru` across nav, chrome, search, home, app, buy, unlock, liquidity, swap, airdrop, ambassadors, verification, deck, one-pager, legal pages, support, blog shell
- Complete `uz` across the same set
- Run mobile and desktop QA for both
- Keep `ru` and `uz` live in switchers while each page clearly uses deterministic English fallback until its local copy is ready

### Phase 3 — expansion locales
- tr
- de
- fr
- es
- it
- pt
- nl
- pl
- ar
- hi
- ja
- zh-CN
- ko

For each locale above:
- translate nav and chrome
- translate metadata and page hero copy
- translate all core route pages
- translate legal/support/blog shell
- run route QA and visual QA
- then mark locale `live`

## Per-locale checklist
- `src/lib/site-locale.ts`
- `src/lib/site-intl.ts`
- `src/lib/site-metadata.ts`
- `src/lib/site-config.ts`
- `src/content/nav-content.ts`
- `src/content/chrome-content.ts`
- `src/content/search-content.ts`
- `src/content/home-content.ts`
- `src/content/app-content.ts`
- `src/content/buy-content.ts`
- `src/content/unlock-content.ts`
- `src/content/liquidity-content.ts`
- `src/content/swap-content.ts`
- `src/content/airdrop-content.ts`
- `src/content/ambassadors-content.ts`
- `src/content/verification-content.ts`
- `src/content/genesis-content.ts`
- `src/content/one-pager-content.ts`
- `src/content/public-pages-content.ts`
- `src/content/whitepaper-content.ts`

## Automation cadence
- Heartbeat continuation: every 15 minutes
- Each run must do one concrete slice:
  - architecture
  - one page in one locale
  - QA and fix
  - or promote locale status after verification

## Current immediate slice
- Phase 1 architecture is complete: full declared locale registry, metadata locale mapping, Intl formatting mapping, deterministic fallback, and the repo-local rollout document.
- `ru` and `uz` are live in the switcher with localized navigation, site chrome, search metadata, homepage shell, public-page shell, and the `unlock` product route.
- Next slices: `liquidity`, `swap`, `airdrop`, then `app` and `ambassadors`; each slice includes typecheck and visual route QA.

# Christmas Eve at Westwoods

A single-page site for the three Christmas Eve services at [Westwoods Community
Church](https://westwoodscc.org), 7700 W Woodard Drive, Lakewood, CO — **Thursday, December 24,
2026**.

Deployed at **[lakewoodchristmas.org](https://lakewoodchristmas.org)**.

The site exists to be invited to. Most people come to a Christmas Eve service because someone asked
them, so the invite tool is the centre of the page rather than a footnote.

## The services

| Time     | Name                | Notes                                             |
| -------- | ------------------- | ------------------------------------------------- |
| 3:30 pm  | Daylight Service    | Same service as 5:00, while it is still light out |
| 5:00 pm  | Twilight Service    | Same service as 3:30, just after sunset           |
| 11:00 pm | Candlelight Service | Quieter, ends by candlelight                      |

Named for the light outside rather than who they are for, so nobody reads themselves out of one. On
December 24 in Lakewood the sun sets around 4:40 pm, so the names are also literally accurate.

## How the invite tool works

Pick a service, and every share channel rewrites itself to match:

- **Copy invite** — the message and the link together, ready to paste
- **Copy link only** — just the URL, for people who would rather write their own
- **Text it / Email it / Facebook / X** — each with its own wording for that service
- The preview bubbles show exactly what **Copy invite** puts on the clipboard

Each link carries `?service=330`, `500`, or `1100`, plus an `&s=` tag naming the channel it went out
through. When the invited person opens it, the page adapts for them:

- the `<title>` and social preview name their service
- a banner at the top says which one they were invited to
- their service card is outlined and flagged, and the hero chip lights up
- the invite tool pre-selects the same service, so forwarding keeps the chain intact

Without the parameter, the page presents all three times evenly.

## Editing the copy

Service names, times, blurbs and every share message live in
[`src/lib/services.ts`](src/lib/services.ts). That file is the single source of truth — the page, the
invite messages and the share images all read from it. Change a service name there and it updates
everywhere, including the generated cards.

The remaining prose lives with its section: [`VisitSection.svelte`](src/lib/components/VisitSection.svelte)
for Plan your visit, [`QuestionsSection.svelte`](src/lib/components/QuestionsSection.svelte) for the
FAQ.

### Still to confirm with the church

Noted at the top of `services.ts`. These are written as fact on the live site but were never verified:

1. That the 3:30 and 5:00 really are the same service
2. The runtime on Christmas Eve — the site says "about an hour", while Sunday services run 60–75 min
3. Whether kids' classes run on Christmas Eve, or kids stay in the service

Everything else was checked against westwoodscc.org: the address and cross street, casual dress, the
north and south entrances with greeters, worship and Bible teaching, and "belong before you believe".

## Share images

Four Open Graph cards live in `static/` — a default plus one per service, so an invite link previews
the exact service it points at. Regenerate after changing service names, times or the date:

```bash
pnpm og-images
```

[`scripts/generate-og-images.mjs`](scripts/generate-og-images.mjs) renders them at 1200×630 through
headless Chrome, pulling service data, the date and the address from `services.ts` so the cards
cannot drift from the site. It needs Google Chrome at the standard macOS path and **Node ≥ 23.6**
for native TypeScript imports — it will not run in CI as written, so regenerate locally and commit
the PNGs.

## Icons

The favicon is the same candle used in the header and on the share cards. The SVG is generated
rather than hand-kept, so the mark stays in one place:

```bash
pnpm icons
```

[`scripts/generate-icons.mjs`](scripts/generate-icons.mjs) writes `favicon.svg`, `favicon-96.png`
for browsers that ignore SVG icons, and a square-cornered `apple-touch-icon.png` at 180×180, since
iOS applies its own mask and would render rounded corners as black. Edit the mark in that script,
not in `static/`. It needs Chrome and `sips`.

## Development

```bash
pnpm install
```

```bash
pnpm dev
```

| Command        | Does                               |
| -------------- | ---------------------------------- |
| `pnpm dev`     | Dev server                         |
| `pnpm build`   | Production build (Netlify adapter) |
| `pnpm preview` | Preview the production build       |
| `pnpm check`   | `svelte-check` type and a11y pass  |
| `pnpm lint`    | Prettier check + ESLint            |
| `pnpm format`  | Write Prettier formatting          |

### Two things that will bite you

**Imports from `#lib` need the `.js` extension.** `import { SERVICES } from '#lib/services.js'` —
without it TypeScript cannot resolve the import map and `pnpm check` fails.

**Pushes carry ~1.5 MB of PNGs.** Git's `http.postBuffer` defaults to 1 MiB; past that it switches to
chunked transfer encoding, which can come back as `RPC failed; HTTP 400`. Already set for this repo:

```bash
git config http.postBuffer 524288000
```

## Design

The design follows [Love Lakewood Sunday](https://lovelakewoodsunday.org) — same Fraunces and Inter
pairing, spacing scale, pill buttons, card treatment and invite-tool layout — in an evergreen and
candlelight palette instead of teal and amber. Tokens are defined in
[`src/lib/styles/app.css`](src/lib/styles/app.css); components read from them and define nothing on
their own.

Fonts are self-hosted through `@fontsource-variable`, so there is no third-party font request.

## Stack

SvelteKit 3 and Svelte 5 (runes mode, enforced in `vite.config.ts`), TypeScript, and
`@sveltejs/adapter-netlify`. No CSS framework and no runtime dependencies — the site is static apart
from the per-request `?service=` rendering.

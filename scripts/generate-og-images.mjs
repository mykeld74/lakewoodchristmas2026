/**
 * Renders the Open Graph share cards into static/.
 *
 * One card per service plus a default, so an invite link shared to Facebook or
 * iMessage previews the exact service it points at.
 *
 *   node scripts/generate-og-images.mjs
 *
 * Service names, times, date and address come straight from src/lib/services.ts,
 * so the cards cannot drift out of sync with the site.
 *
 * Requires Google Chrome (headless) and Node >= 23.6 for native TypeScript stripping.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SERVICES, CHURCH, EVENT_DATE } from '../src/lib/services.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const WIDTH = 1200;
const HEIGHT = 630;

const fontFile = (pkg, file) =>
	readFileSync(
		join(
			root,
			'node_modules/.pnpm',
			pkg,
			'node_modules',
			pkg.split('@5.')[0].replace('+', '/'),
			'files',
			file
		)
	).toString('base64');

const fraunces = fontFile(
	'@fontsource-variable+fraunces@5.3.0',
	'fraunces-latin-full-normal.woff2'
);
const inter = fontFile('@fontsource-variable+inter@5.3.0', 'inter-latin-wght-normal.woff2');

const stars = [
	[70, 86, 2],
	[168, 44, 1.4],
	[262, 120, 1.8],
	[372, 62, 1.4],
	[486, 128, 2.2],
	[574, 52, 1.6],
	[96, 206, 1.5],
	[214, 268, 1.9],
	[438, 232, 1.4],
	[540, 196, 2],
	[42, 330, 1.7],
	[596, 318, 1.5],
	[150, 402, 1.5],
	[330, 448, 1.8],
	[500, 420, 1.6],
	[108, 500, 1.5],
	[268, 548, 1.7],
	[432, 560, 1.4],
	[588, 470, 1.8],
	[20, 180, 1.4]
];

function html({ headline, times, highlight }) {
	return `<!doctype html>
<html><head><meta charset="utf-8" />
<style>
@font-face{font-family:'Fraunces';src:url(data:font/woff2;base64,${fraunces}) format('woff2');font-weight:100 900;font-display:block}
@font-face{font-family:'Inter';src:url(data:font/woff2;base64,${inter}) format('woff2');font-weight:100 900;font-display:block}
*{margin:0;padding:0;box-sizing:border-box}
body{width:${WIDTH}px;height:${HEIGHT}px;overflow:hidden;display:flex;
 font-family:'Inter',sans-serif;background:#0b2019;color:#fcf8f2}
.art{position:absolute;inset:0}
.wrap{position:relative;display:flex;width:100%;height:100%;
 padding:64px 72px;flex-direction:column;justify-content:space-between}
.eyebrow{font-size:21px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#e0a533}
h1{font-family:'Fraunces',Georgia,serif;font-weight:600;letter-spacing:-.03em;
 line-height:1.02;font-size:${headline.length > 22 ? 84 : 104}px;max-width:760px}
.times{display:flex;gap:14px;flex-wrap:wrap;margin-top:6px}
.chip{display:flex;flex-direction:column;gap:2px;padding:14px 26px;border-radius:16px;
 border:1.5px solid rgba(255,255,255,.18);background:rgba(255,255,255,.06)}
.chip.on{border-color:#e0a533;background:rgba(224,165,51,.22)}
.chip b{font-family:'Fraunces',Georgia,serif;font-size:34px;font-weight:600;
 letter-spacing:-.02em;color:#fbe3ac}
.chip span{font-size:17px;color:rgba(255,255,255,.8)}
.foot{display:flex;align-items:baseline;gap:14px;font-size:22px;color:rgba(255,255,255,.82)}
.foot b{font-family:'Fraunces',Georgia,serif;font-weight:600;color:#fcf8f2;font-size:25px}
.dot{color:#2e6a53}
</style></head>
<body>
<svg class="art" viewBox="0 0 ${WIDTH} ${HEIGHT}">
 <defs><radialGradient id="g" cx="78%" cy="38%" r="42%">
  <stop offset="0%" stop-color="#fbe3ac" stop-opacity=".40"/>
  <stop offset="55%" stop-color="#e0a533" stop-opacity=".10"/>
  <stop offset="100%" stop-color="#e0a533" stop-opacity="0"/>
 </radialGradient>
 <linearGradient id="bg" x1="0" y1="0" x2="0.6" y2="1">
  <stop offset="0%" stop-color="#15362c"/><stop offset="100%" stop-color="#0b2019"/>
 </linearGradient></defs>
 <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
 <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#g)"/>
 ${stars.map(([x, y, r]) => `<circle cx="${x + 560}" cy="${y}" r="${r}" fill="#fbe3ac" opacity=".72"/>`).join('')}
 <g transform="translate(936 196)">
  <g transform="scale(2.3)">
   <path d="M0-38C8-21 12-11 12-4a12 12 0 0 1-24 0c0-7 4-17 12-34Z" fill="#e0a533"/>
   <path d="M0-20c4.6 8.4 6.6 12.4 6.6 16.4a6.6 6.6 0 0 1-13.2 0c0-4 2-8 6.6-16.4Z" fill="#fbe3ac"/>
  </g>
  <rect x="-2.5" y="22" width="5" height="18" rx="2.5" fill="#6b5a3a"/>
  <rect x="-34" y="38" width="68" height="186" rx="10" fill="#f4ebdd" opacity=".95"/>
  <ellipse cx="0" cy="38" rx="34" ry="10" fill="#ece0cd"/>
  <rect x="-34" y="38" width="22" height="186" rx="10" fill="#ffffff" opacity=".35"/>
 </g>
</svg>
<div class="wrap">
 <p class="eyebrow">${EVENT_DATE.weekday} &middot; ${EVENT_DATE.long}, 2026</p>
 <h1>${headline}</h1>
 <div class="times">
  ${times.map((t) => `<div class="chip${t.id === highlight ? ' on' : ''}"><b>${t.time}</b><span>${t.name}</span></div>`).join('')}
 </div>
 <p class="foot"><b>${CHURCH.name}</b><span class="dot">&#9679;</span><span>${CHURCH.street}, ${CHURCH.city}</span></p>
</div>
</body></html>`;
}

const variants = [
	{
		out: 'og-image.png',
		headline: 'Christmas Eve is better together',
		times: SERVICES,
		highlight: null
	},
	...SERVICES.map((s) => ({
		out: `og-image-${s.id}.png`,
		headline: s.id === '1100' ? 'Come for the candlelight' : 'Christmas Eve is better together',
		times: SERVICES,
		highlight: s.id
	}))
];

const tmp = mkdtempSync(join(tmpdir(), 'og-'));
mkdirSync(join(root, 'static'), { recursive: true });

try {
	for (const v of variants) {
		const page = join(tmp, `${v.out}.html`);
		writeFileSync(page, html(v));
		execFileSync(
			CHROME,
			[
				'--headless',
				'--disable-gpu',
				'--hide-scrollbars',
				'--force-device-scale-factor=1',
				`--window-size=${WIDTH},${HEIGHT}`,
				`--screenshot=${join(root, 'static', v.out)}`,
				`file://${page}`
			],
			{ stdio: 'pipe' }
		);
		console.log(`  static/${v.out}`);
	}
} finally {
	rmSync(tmp, { recursive: true, force: true });
}
console.log('Done.');

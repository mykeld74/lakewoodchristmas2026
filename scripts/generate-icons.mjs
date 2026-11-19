/**
 * Renders the site icons into static/.
 *
 *   node scripts/generate-icons.mjs
 *
 * The candle is the same mark used in the header and on the share cards. It is drawn
 * bold and full-bleed so it still reads at 16px in a browser tab.
 *
 * Writes:
 *   favicon.svg          — what modern browsers use
 *   favicon-96.png       — fallback for browsers that ignore SVG icons
 *   apple-touch-icon.png — 180x180, square corners (iOS applies its own mask)
 *
 * Requires Google Chrome (headless) and sips, both standard on macOS.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const RENDER = 512;

/** @param {number} rx corner radius on the 64-unit grid; 0 for the iOS icon */
const svg = (
	rx
) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" role="img" aria-label="Candle">
	<defs>
		<linearGradient id="bg" x1="0" y1="0" x2=".55" y2="1">
			<stop offset="0%" stop-color="#15362c"/>
			<stop offset="100%" stop-color="#0b2019"/>
		</linearGradient>
		<radialGradient id="glow" cx="50%" cy="32%" r="46%">
			<stop offset="0%" stop-color="#fbe3ac" stop-opacity=".75"/>
			<stop offset="100%" stop-color="#e0a533" stop-opacity="0"/>
		</radialGradient>
	</defs>
	<rect width="64" height="64" rx="${rx}" fill="url(#bg)"/>
	<rect width="64" height="64" rx="${rx}" fill="url(#glow)"/>
	<rect x="21" y="33" width="22" height="25" rx="4" fill="#fdf7ec"/>
	<rect x="21" y="33" width="7" height="25" rx="3.5" fill="#ffffff" opacity=".5"/>
	<g transform="translate(32 28) scale(.62)">
		<path d="M0-38C8-21 12-11 12-4a12 12 0 0 1-24 0c0-7 4-17 12-34Z" fill="#e0a533"/>
		<path d="M0-20c4.6 8.4 6.6 12.4 6.6 16.4a6.6 6.6 0 0 1-13.2 0c0-4 2-8 6.6-16.4Z" fill="#fbe3ac"/>
	</g>
</svg>`;

const page = (markup) =>
	`<!doctype html><meta charset="utf-8"><style>html,body{margin:0;width:${RENDER}px;height:${RENDER}px}svg{width:100%;height:100%;display:block}</style>${markup}`;

const tmp = mkdtempSync(join(tmpdir(), 'icons-'));

function render(markup, out, size) {
	const html = join(tmp, `${size}.html`);
	const big = join(tmp, `${size}.png`);
	writeFileSync(html, page(markup));
	execFileSync(
		CHROME,
		[
			'--headless',
			'--disable-gpu',
			'--hide-scrollbars',
			'--default-background-color=00000000',
			'--force-device-scale-factor=1',
			`--window-size=${RENDER},${RENDER}`,
			`--screenshot=${big}`,
			`file://${html}`
		],
		{ stdio: 'pipe' }
	);
	execFileSync('sips', ['-z', String(size), String(size), big, '--out', out], { stdio: 'pipe' });
	console.log(`  static/${out.split('/').pop()} (${size}x${size})`);
}

try {
	writeFileSync(join(root, 'static', 'favicon.svg'), svg(10) + '\n');
	console.log('  static/favicon.svg');
	render(svg(10), join(root, 'static', 'favicon-96.png'), 96);
	render(svg(0), join(root, 'static', 'apple-touch-icon.png'), 180);
} finally {
	rmSync(tmp, { recursive: true, force: true });
}
console.log('Done.');

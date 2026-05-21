// One-time placeholder photography generator (run: `node scripts/gen-placeholders.mjs`).
// Produces on-brand gradient JPEGs so the site builds and looks intentional before real
// photography is supplied. Replace the files in src/assets/ with real photos at launch.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

const grad = (w, h, c1, c2, c3, label) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="55%" stop-color="${c2}"/>
      <stop offset="100%" stop-color="${c3}"/>
    </linearGradient>
    <radialGradient id="moon" cx="78%" cy="24%" r="28%">
      <stop offset="0%" stop-color="#f6f1e7" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#f6f1e7" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#moon)"/>
  <polygon points="0,${h} ${w * 0.3},${h * 0.62} ${w * 0.55},${h * 0.8} ${w * 0.8},${h * 0.55} ${w},${h * 0.72} ${w},${h}" fill="#10131a" opacity="0.82"/>
  <polygon points="0,${h} ${w * 0.22},${h * 0.74} ${w * 0.45},${h * 0.88} ${w * 0.7},${h * 0.7} ${w},${h * 0.85} ${w},${h}" fill="#10131a" opacity="0.55"/>
  <text x="40" y="${h - 36}" font-family="Georgia, serif" font-size="${Math.round(h * 0.05)}" fill="#f6f1e7" opacity="0.16">${label}</text>
</svg>`;

const images = [
  ['src/assets/hero.jpg', 2200, 1300, '#2a3550', '#6b5a7a', '#c7a16b', 'Bubble · night'],
  ['src/assets/suites/aurora.jpg', 1600, 1100, '#1f3a4d', '#3f6f7a', '#9fc6c0', 'Aurora Suite'],
  ['src/assets/suites/forest.jpg', 1600, 1100, '#1c2e22', '#3b5e44', '#a7b98c', 'Forest Suite'],
  ['src/assets/suites/summit.jpg', 1600, 1100, '#2d2640', '#5a4a72', '#c7a16b', 'Summit Suite'],
  ['src/assets/experiences/dining.jpg', 1400, 1000, '#2a1d1d', '#5a3a30', '#c7a16b', 'Dining'],
  [
    'src/assets/experiences/stargazing.jpg',
    1400,
    1000,
    '#10131a',
    '#26304d',
    '#7c8bb0',
    'Stargazing',
  ],
  ['src/assets/experiences/spa.jpg', 1400, 1000, '#15302e', '#2f5a52', '#bcd6c8', 'Wellness'],
  ['src/assets/gallery/meadow.jpg', 1500, 1100, '#23351f', '#4a6b3f', '#c7d1a0', 'Meadow'],
  ['src/assets/gallery/dusk.jpg', 1500, 1100, '#2a2440', '#5e4e74', '#caa6c0', 'Dusk'],
  ['src/assets/gallery/interior.jpg', 1500, 1100, '#241e1a', '#4f4036', '#c7a16b', 'Interior'],
  ['public/og-default.jpg', 1200, 630, '#2a3550', '#6b5a7a', '#c7a16b', 'Bubble'],
];

for (const [path, w, h, c1, c2, c3, label] of images) {
  await mkdir(dirname(path), { recursive: true });
  await sharp(Buffer.from(grad(w, h, c1, c2, c3, label)))
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path);
  console.log('generated', path);
}

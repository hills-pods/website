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
  ['src/assets/suites/hoverla.jpg', 1600, 1100, '#1e3a34', '#3f6f64', '#a7c4a0', 'Hoverla'],
  ['src/assets/suites/fuji.jpg', 1600, 1100, '#0f3b46', '#1f7a82', '#8fd4cf', 'Fuji'],
  ['src/assets/suites/mont-blanc.jpg', 1600, 1100, '#243447', '#4a6b86', '#c3d4e0', 'Mont Blanc'],
  ['src/assets/suites/kilimanjaro.jpg', 1600, 1100, '#3a2a18', '#7a5a30', '#d8b271', 'Kilimanjaro'],
  ['src/assets/suites/everest.jpg', 1600, 1100, '#1b2440', '#3a4a78', '#aab6e0', 'Everest'],

  // Per-suite gallery placeholders — each suite has interior / terrace / detail shots.
  // Replace by dropping real photos at the same paths (and updating alt text in the
  // suite's frontmatter under src/content/suites/<lang>/<slug>.md).
  [
    'src/assets/suites/hoverla/interior.jpg',
    1400,
    1000,
    '#2a2520',
    '#5a4a35',
    '#c7a16b',
    'Hoverla · interior',
  ],
  [
    'src/assets/suites/hoverla/terrace.jpg',
    1400,
    1000,
    '#2a3a44',
    '#5a7884',
    '#b8d0c8',
    'Hoverla · terrace',
  ],
  [
    'src/assets/suites/hoverla/detail.jpg',
    1400,
    1000,
    '#3a4a40',
    '#5a7060',
    '#b0c4a0',
    'Hoverla · detail',
  ],
  [
    'src/assets/suites/fuji/interior.jpg',
    1400,
    1000,
    '#2a2218',
    '#6a4a32',
    '#c8a878',
    'Fuji · interior',
  ],
  [
    'src/assets/suites/fuji/terrace.jpg',
    1400,
    1000,
    '#0f3540',
    '#2f7884',
    '#9cd6cf',
    'Fuji · terrace',
  ],
  [
    'src/assets/suites/fuji/detail.jpg',
    1400,
    1000,
    '#1f2a30',
    '#3a5560',
    '#a8c4cc',
    'Fuji · detail',
  ],
  [
    'src/assets/suites/mont-blanc/interior.jpg',
    1400,
    1000,
    '#2a201a',
    '#6a4a35',
    '#d0a578',
    'Mont Blanc · interior',
  ],
  [
    'src/assets/suites/mont-blanc/terrace.jpg',
    1400,
    1000,
    '#20354a',
    '#4a6f8a',
    '#b8d4e8',
    'Mont Blanc · terrace',
  ],
  [
    'src/assets/suites/mont-blanc/detail.jpg',
    1400,
    1000,
    '#2a2820',
    '#5a5040',
    '#b0a890',
    'Mont Blanc · detail',
  ],
  [
    'src/assets/suites/kilimanjaro/interior.jpg',
    1400,
    1000,
    '#2e2010',
    '#6a4a25',
    '#d0a868',
    'Kilimanjaro · interior',
  ],
  [
    'src/assets/suites/kilimanjaro/terrace.jpg',
    1400,
    1000,
    '#3e2a18',
    '#82603a',
    '#e0bc7c',
    'Kilimanjaro · terrace',
  ],
  [
    'src/assets/suites/kilimanjaro/detail.jpg',
    1400,
    1000,
    '#2a2018',
    '#5a4530',
    '#b89060',
    'Kilimanjaro · detail',
  ],
  [
    'src/assets/suites/everest/interior.jpg',
    1400,
    1000,
    '#1a1818',
    '#5a4030',
    '#c8a070',
    'Everest · interior',
  ],
  [
    'src/assets/suites/everest/terrace.jpg',
    1400,
    1000,
    '#20283e',
    '#3e5078',
    '#b0c0e8',
    'Everest · terrace',
  ],
  [
    'src/assets/suites/everest/detail.jpg',
    1400,
    1000,
    '#181d30',
    '#303860',
    '#98a8d0',
    'Everest · detail',
  ],
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

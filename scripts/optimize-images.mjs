/**
 * optimize-images.mjs
 * Generates responsive WebP variants of key images for srcSet delivery.
 * Run: node scripts/optimize-images.mjs
 */

import sharp from 'sharp';
import { mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC = `${ROOT}/src/assets`;
const OUT = `${ROOT}/src/assets/optimized`;

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

/**
 * Each entry: [inputFile, outputBasename, widths[], quality]
 * widths are the responsive breakpoints to generate.
 */
const TASKS = [
  // Hero mascot — rendered up to 520px wide on desktop, 260px on mobile
  ['Maskot_Coding_For_Kids.webp', 'mascot', [260, 520, 780], 82],

  // Lesson card illustrations — rendered at 240x240 max
  ['Kawaii_Robot_and_Pastel_Signpost.webp', 'kawaii-robot', [240, 480], 80],
  ['Kawaii_Cat_Designing_a_Star.webp',       'kawaii-cat',   [240, 480], 80],
  ['Playful_Pink_Idea_Cube.webp',            'pink-cube',    [240, 480], 80],

  // AI mascot — rendered at 88x88 in FAB (176x176 device pixels on 2x)
  ['Maskot AI.webp', 'ai-mascot', [88, 176], 80],

  // Logo — rendered at 81x81 in navbar (162x162 @2x), 84x84 in footer
  ['Logo_Coding.webp', 'logo', [84, 162, 324], 80],
];

// Testimonial avatars — rendered at 60x60 (120x120 @2x)
const USER_AVATARS = Array.from({ length: 10 }, (_, i) => i + 1).map((n) => [
  `user${n}.webp`,
  `user${n}`,
  [60, 120],
  78,
]);

const FOOTER_ICONS = [
  ['Logo WA.webp', 'whatsapp', [72, 144], 82],
  ['Logo Insta.webp', 'instagram', [72, 144], 82],
  ['Logo LinkId.webp', 'linkedin', [72, 144], 82],
  ['IOS Star.webp', 'ios-star', [72, 144], 82],
];

const ALL_TASKS = [...TASKS, ...USER_AVATARS, ...FOOTER_ICONS];

async function processImage([filename, base, widths, quality]) {
  const input = `${SRC}/${filename}`;
  const meta = await sharp(input).metadata();

  await Promise.all(
    widths.map(async (w) => {
      // Don't upscale beyond original
      const width = Math.min(w, meta.width);
      const output = `${OUT}/${base}-${w}w.webp`;
      await sharp(input)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality, effort: 4, smartSubsample: true })
        .toFile(output);
      const { size } = await sharp(output).metadata();
      console.log(`  ✓ ${base}-${w}w.webp  (${Math.round((size || 0) / 1024)} KB)`);
    }),
  );
}

console.log('🔧 Optimizing images...\n');
for (const task of ALL_TASKS) {
  console.log(`→ ${task[0]}`);
  await processImage(task);
}
console.log('\n✅ Done! Optimized images written to src/assets/optimized/');

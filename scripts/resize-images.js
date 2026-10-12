/**
 * resize-images.js — Resize oversized hero/section images to their rendered dimensions.
 * Uses Sharp (already a devDependency).
 * Run: node scripts/resize-images.js
 *
 * Only resizes if the source image is larger than the target width.
 * Overwrites originals (backups are in git).
 */

import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.join(__dirname, '../src/assets');

// [filename, targetWidth, targetHeight or null to keep aspect ratio, quality]
const TARGETS = [
  // Hero mascot: rendered ~390×257, 2× for HiDPI = 780px wide max
  ['Maskot_Coding_For_Kids.webp', 780, null, 82],
  // LessonsSection illustrations: rendered ~330×235, 2× = 660px
  ['Playful_Pink_Idea_Cube.webp', 500, null, 80],
  ['Kawaii_Cat_Designing_a_Star.webp', 660, null, 80],
  ['Kawaii_Robot_and_Pastel_Signpost.webp', 566, null, 80], // already smaller, skip if smaller
  // AI Mascot: rendered ~264×264, 2× = 528px (also used as 42px avatar inside panel)
  ['Maskot AI.webp', 528, null, 82],
  // Logo: rendered ~162×162, 2× = 324px
  ['Logo_Coding.webp', 324, null, 82],
  // Testimonial avatars: rendered ~63×63, 2× = 126px — large savings here
  ['user1.webp', 126, null, 75],
  ['user2.webp', 126, null, 75],
  ['user3.webp', 126, null, 75],
  ['user4.webp', 126, null, 75],
  ['user5.webp', 126, null, 75],
  ['user6.webp', 126, null, 75],
  ['user7.webp', 126, null, 75],
  ['user8.webp', 126, null, 75],
  ['user9.webp', 126, null, 75],
  ['user10.webp', 126, null, 75],
];

async function run() {
  let totalSaved = 0;

  for (const [filename, w, h, quality] of TARGETS) {
    const filePath = path.join(ASSETS, filename);
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Not found, skipping: ${filename}`);
      continue;
    }

    const meta = await sharp(filePath).metadata();
    const originalSize = fs.statSync(filePath).size;

    if (meta.width <= w) {
      console.log(`✅ Already ≤ ${w}px wide, skipping: ${filename} (${meta.width}px)`);
      continue;
    }

    const resizeOpts = h ? { width: w, height: h, fit: 'cover' } : { width: w };
    const buffer = await sharp(filePath)
      .resize(resizeOpts)
      .webp({ quality, effort: 6 })
      .toBuffer();

    fs.writeFileSync(filePath, buffer);
    const newSize = buffer.length;
    const saved = originalSize - newSize;
    totalSaved += saved;
    console.log(
      `✔ ${filename}: ${meta.width}px → ${w}px | ` +
      `${(originalSize / 1024).toFixed(1)} KB → ${(newSize / 1024).toFixed(1)} KB ` +
      `(saved ${(saved / 1024).toFixed(1)} KB)`
    );
  }

  console.log(`\n🎉 Total saved: ${(totalSaved / 1024).toFixed(1)} KB`);
}

run().catch(console.error);

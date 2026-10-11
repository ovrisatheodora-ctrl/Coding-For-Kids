/**
 * resize-images.mjs — Resize oversized images.
 * Writes to a /resized/ subfolder first; manually copy over originals if happy.
 */

import sharp from 'sharp';
import { join, dirname } from 'path';
import { existsSync, statSync, mkdirSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS = join(__dirname, '../src/assets');
const OUT = join(ASSETS, 'resized');
mkdirSync(OUT, { recursive: true });

const TARGETS = [
  ['Maskot_Coding_For_Kids.webp', 780, 82],
  ['Playful_Pink_Idea_Cube.webp', 500, 80],
  ['Kawaii_Cat_Designing_a_Star.webp', 660, 80],
  ['Kawaii_Robot_and_Pastel_Signpost.webp', 566, 80],
  ['Maskot AI.webp', 528, 82],
  ['Logo_Coding.webp', 324, 82],
  ['user1.webp', 126, 75],
  ['user2.webp', 126, 75],
  ['user3.webp', 126, 75],
  ['user4.webp', 126, 75],
  ['user5.webp', 126, 75],
  ['user6.webp', 126, 75],
  ['user7.webp', 126, 75],
  ['user8.webp', 126, 75],
  ['user9.webp', 126, 75],
  ['user10.webp', 126, 75],
];

async function run() {
  let totalSaved = 0;

  for (const [filename, w, quality] of TARGETS) {
    const filePath = join(ASSETS, filename);
    if (!existsSync(filePath)) {
      console.log(`⚠️  Not found: ${filename}`);
      continue;
    }

    const originalSize = statSync(filePath).size;
    const outPath = join(OUT, filename);

    const inputBuffer = await sharp(filePath).toBuffer();
    const meta = await sharp(inputBuffer).metadata();

    if (meta.width <= w) {
      console.log(`✅ Already ≤ ${w}px, skipping: ${filename} (${meta.width}px)`);
      continue;
    }

    await sharp(inputBuffer)
      .resize({ width: w })
      .webp({ quality, effort: 6 })
      .toFile(outPath);

    const newSize = statSync(outPath).size;
    const saved = originalSize - newSize;
    totalSaved += saved;
    console.log(
      `✔ ${filename}: ${meta.width}→${w}px | ` +
      `${(originalSize / 1024).toFixed(1)}→${(newSize / 1024).toFixed(1)} KB ` +
      `(−${(saved / 1024).toFixed(1)} KB)`
    );
  }

  console.log(`\n🎉 Total saved: ${(totalSaved / 1024).toFixed(1)} KB`);
  console.log(`📁 Resized images written to: ${OUT}`);
  console.log(`   Run 'node scripts/apply-resized.mjs' to replace originals.`);
}

run().catch(console.error);

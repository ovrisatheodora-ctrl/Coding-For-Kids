import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { join, extname, basename } from "path";
import { writeFileSync } from "fs";

const DIR = "src/assets";
const MAX = 1000;            // lebar maksimal (px). Kalau ada yang buram, naikkan ke 1400
const hasil = [];
let sebelum = 0, sesudah = 0;

for (const f of readdirSync(DIR)) {
  if (extname(f).toLowerCase() !== ".png") continue;
  const src = join(DIR, f);
  if (statSync(src).size === 0) { console.log(`DILEWATI (file kosong): ${f}`); continue; }
  const nama = basename(f, extname(f));
  const out = join(DIR, nama + ".webp");
  try {
    const meta = await sharp(src).metadata();
    await sharp(src).resize({ width: MAX, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out);
    const a = statSync(src).size, b = statSync(out).size;
    sebelum += a; sesudah += b;
    console.log(`${f}  [${meta.width}px]  ${(a / 1024).toFixed(0)} KB -> ${(b / 1024).toFixed(0)} KB`);
    hasil.push(nama);
  } catch (e) {
    console.log(`GAGAL: ${f} (${e.message})`);
  }
}
writeFileSync("konversi.json", JSON.stringify(hasil));
console.log(`\nTotal: ${(sebelum / 1024 / 1024).toFixed(1)} MB -> ${(sesudah / 1024 / 1024).toFixed(1)} MB`);
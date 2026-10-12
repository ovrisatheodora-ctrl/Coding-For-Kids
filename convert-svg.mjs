import sharp from "sharp";
import { readdirSync, readFileSync, statSync, existsSync, writeFileSync } from "fs";
import { join, extname, basename } from "path";

const DIR = "src/assets";
// lebar hasil (px). Kalau ada gambar yang terlihat buram, naikkan angkanya.
const lebar = n => /^user/i.test(n) ? 240 : /^(IOS|Logo)/i.test(n) ? 200 : /^GAME/i.test(n) ? 900 : 800;

const hasil = [];
let sebelum = 0, sesudah = 0;

for (const f of readdirSync(DIR)) {
  if (extname(f).toLowerCase() !== ".svg") continue;
  const src = join(DIR, f), nama = basename(f, ".svg"), out = join(DIR, nama + ".webp");
  if (!/data:image\/(png|jpe?g|webp)/i.test(readFileSync(src, "utf8"))) { console.log(`DILEWATI (vektor asli): ${f}`); continue; }
  if (existsSync(out)) { console.log(`DILEWATI (sudah ada .webp): ${f}`); continue; }
  try {
    await sharp(src, { density: 192 }).resize({ width: lebar(nama) }).webp({ quality: 82 }).toFile(out);
    const a = statSync(src).size, b = statSync(out).size;
    sebelum += a; sesudah += b;
    console.log(`${f}: ${(a / 1024).toFixed(0)} KB -> ${(b / 1024).toFixed(0)} KB`);
    hasil.push(nama);
  } catch (e) { console.log(`GAGAL: ${f} (${e.message})`); }
}
writeFileSync("konversi-svg.json", JSON.stringify(hasil));
console.log(`\nTotal: ${(sebelum / 1024 / 1024).toFixed(1)} MB -> ${(sesudah / 1024 / 1024).toFixed(1)} MB`);
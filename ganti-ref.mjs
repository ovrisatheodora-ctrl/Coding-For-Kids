import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from "fs";
import { join } from "path";

const nama = JSON.parse(readFileSync("konversi.json", "utf8"));
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// cocokkan "NamaFile.png" yang didahului / \ " ' ` atau (  (termasuk versi %20 untuk spasi)
const pola = [];
for (const n of nama) {
  for (const varian of new Set([n, encodeURI(n)])) {
    pola.push([new RegExp("(?<=[/\\\\\"'`(])" + esc(varian) + "\\.png", "g"), varian + ".webp"]);
  }
}

const ekstensi = [".jsx", ".tsx", ".js", ".ts", ".css", ".html"];
function proses(p) {
  const s = readFileSync(p, "utf8");
  let baru = s;
  for (const [re, ganti] of pola) baru = baru.replace(re, ganti);
  if (baru !== s) { writeFileSync(p, baru); console.log("diubah:", p); }
}
function jalan(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) { if (f !== "node_modules") jalan(p); }
    else if (ekstensi.some(e => f.endsWith(e))) proses(p);
  }
}
jalan("src");
if (existsSync("index.html")) proses("index.html");
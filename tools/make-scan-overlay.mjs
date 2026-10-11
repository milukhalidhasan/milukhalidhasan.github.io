// Makes the false-colour "vegetation index" copy of the hero painting that the drone reveals.
// The crops are mapped to a red-yellow-green index ramp; sky, mountains and anything blue stay
// transparent, so the painting shows through. The colours are illustrative, not measured data.
//
// Usage: node tools/make-scan-overlay.mjs [input.jpg] [output.webp]
// Defaults: images/paintings/harvest.jpg -> images/paintings/harvest-scan.webp
// Needs Playwright with Chromium. Rerun it whenever the painting changes, so the two line up.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const input = process.argv[2] || join(root, "images/paintings/harvest.jpg");
const output = process.argv[3] || join(root, "images/paintings/harvest-scan.webp");
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");

const dataUrl = "data:image/jpeg;base64," + readFileSync(input).toString("base64");
const browser = await chromium.launch();
const page = await browser.newPage();
const webp = await page.evaluate(async (src) => {
  const img = new Image();
  img.src = src;
  await img.decode();
  const W = img.naturalWidth, H = img.naturalHeight;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const px = ctx.getImageData(0, 0, W, H);
  const d = px.data;

  // Greenness index per pixel (VARI: (G - R) / (G + R - B)), and a crop mask
  const idx = new Float32Array(W * H), mask = new Float32Array(W * H);
  const horizon = Math.round(H * 0.355), fadeIn = Math.round(H * 0.035); // above this is sky and mountains
  for (let i = 0, p = 0; p < W * H; p++, i += 4) {
    const r = d[i], g = d[i + 1], b = d[i + 2];
    const v = (g - r) / Math.max(1, g + r - b);
    idx[p] = Number.isFinite(v) ? Math.max(-1, Math.min(1, v)) : 0;
    const y = Math.floor(p / W);
    const blue = b > r && b > g * 0.95; // sky, mountains, blue clothing
    mask[p] = blue ? 0 : Math.max(0, Math.min(1, (y - horizon) / fadeIn));
  }
  // Box blur, so the map reads as patches rather than single strokes
  function blur(a, rad) {
    const out = new Float32Array(a.length), tmp = new Float32Array(a.length);
    for (let y = 0; y < H; y++) { let s = 0; for (let x = -rad; x <= rad; x++) s += a[y * W + Math.min(W - 1, Math.max(0, x))];
      for (let x = 0; x < W; x++) { tmp[y * W + x] = s / (2 * rad + 1); s += a[y * W + Math.min(W - 1, x + rad + 1)] - a[y * W + Math.max(0, x - rad)]; } }
    for (let x = 0; x < W; x++) { let s = 0; for (let y = -rad; y <= rad; y++) s += tmp[Math.min(H - 1, Math.max(0, y)) * W + x];
      for (let y = 0; y < H; y++) { out[y * W + x] = s / (2 * rad + 1); s += tmp[Math.min(H - 1, y + rad + 1) * W + x] - tmp[Math.max(0, y - rad) * W + x]; } }
    return out;
  }
  // Blur only within the crops, so sky colours don't bleed into the map along the horizon
  const num = blur(idx.map((v, p) => v * mask[p]), 4), den = blur(mask, 4);
  const sIdx = num.map((v, p) => (den[p] > 0.01 ? v / den[p] : 0)), sMask = blur(mask, 3);
  // Spread the colours by rank, so each class covers a similar share of the field
  const vals = [];
  for (let p = 0; p < W * H; p += 5) if (mask[p] > 0.5) vals.push(sIdx[p]);
  vals.sort((a, b) => a - b);
  const rank = (v) => { let lo = 0, hi = vals.length; while (lo < hi) { const m = (lo + hi) >> 1; if (vals[m] < v) lo = m + 1; else hi = m; } return lo / vals.length; };
  // Six-class red-yellow-green ramp, the same colours as the drawn plots elsewhere on the site
  const ramp = [[215, 48, 31], [252, 141, 89], [253, 204, 138], [217, 239, 139], [145, 207, 96], [26, 152, 80]];
  for (let i = 0, p = 0; p < W * H; p++, i += 4) {
    const t = Math.max(0, Math.min(0.999, rank(sIdx[p]))) || 0;
    const col = ramp[Math.floor(t * ramp.length)];
    // keep a little of the painting's light and shade, so the brushwork still shows
    const lum = (d[i] * 0.3 + d[i + 1] * 0.59 + d[i + 2] * 0.11) / 255;
    const shade = 0.72 + 0.4 * lum;
    d[i] = Math.min(255, col[0] * shade); d[i + 1] = Math.min(255, col[1] * shade); d[i + 2] = Math.min(255, col[2] * shade);
    d[i + 3] = Math.round(255 * Math.min(1, sMask[p] * 1.15) * 0.92);
  }
  ctx.putImageData(px, 0, 0);
  return c.toDataURL("image/webp", 0.8);
}, dataUrl);
writeFileSync(output, Buffer.from(webp.split(",")[1], "base64"));
console.log("wrote", output);
await browser.close();

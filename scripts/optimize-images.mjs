// Convert the large raster assets in public/ to WebP.
// Run once:  node scripts/optimize-images.mjs
// Originals are kept as fallback for browsers without WebP support.
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

const targets = [
  // [relative path, maxWidth, quality]
  ['photos/janardhan-blazer.jpg', 800, 80],
  ['photos/janardhan-cinematic.jpg', 1600, 80],
  ['avatar/avatar_ref.jpg', 400, 80],
  ['certificates/innobyte_certificate.png', 1600, 85],
  ['certificates/innobyte_internship.png', 1600, 85],
  ['certificates/csc_india_apsche.png', 1600, 85],
  ['certificates/intel_ai_for_all.jpg', 1600, 85]
];

for (const [relPath, maxWidth, quality] of targets) {
  const srcPath = path.join(publicDir, relPath);
  const outPath = srcPath.replace(/\.(png|jpe?g)$/i, '.webp');

  if (!fs.existsSync(srcPath)) {
    console.warn(`skip (missing): ${relPath}`);
    continue;
  }

  const image = sharp(srcPath);
  const meta = await image.metadata();
  const width = Math.min(meta.width || maxWidth, maxWidth);

  await image
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 4 })
    .toFile(outPath);

  const before = fs.statSync(srcPath).size;
  const after = fs.statSync(outPath).size;
  console.log(
    `${relPath}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB  (${width}px)`
  );
}

console.log('Done. WebP files written next to the originals.');

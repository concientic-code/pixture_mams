/**
 * Script para optimizar imágenes del proyecto MAMS.
 * Convierte las fotos de modelos (~20MB PNG) a WebP optimizado.
 * 
 * Uso: node scripts/optimize-images.mjs
 */

import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join } from "path";

const IMAGES_DIR = "public/images/models";
const MAX_WIDTH = 1920; // Ancho máximo necesario
const QUALITY = 82; // Balance calidad/tamaño

async function optimizeImages() {
  const files = await readdir(IMAGES_DIR);
  const pngFiles = files.filter((f) => f.endsWith(".png"));

  for (const file of pngFiles) {
    const inputPath = join(IMAGES_DIR, file);
    const outputPath = join(IMAGES_DIR, file.replace(".png", ".webp"));

    const info = await stat(inputPath);
    const sizeMB = (info.size / 1024 / 1024).toFixed(1);

    console.log(`Processing: ${file} (${sizeMB} MB)`);

    await sharp(inputPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const outputInfo = await stat(outputPath);
    const outputSizeMB = (outputInfo.size / 1024 / 1024).toFixed(2);
    const reduction = (((info.size - outputInfo.size) / info.size) * 100).toFixed(0);

    console.log(`  → ${file.replace(".png", ".webp")} (${outputSizeMB} MB) — ${reduction}% smaller`);
  }

  console.log("\nDone! Update your components to use .webp files for production.");
  console.log("Keep .png originals as source of truth.\n");
}

optimizeImages().catch(console.error);

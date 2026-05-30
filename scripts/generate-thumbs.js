import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dirs = [
  path.join(process.cwd(), 'public', 'images', 'halls', '0'),
  path.join(process.cwd(), 'public', 'images', 'halls', '7')
];

async function generateThumbnails() {
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.toLowerCase().endsWith('.webp') && !file.includes('-thumb')) {
        const inputPath = path.join(dir, file);
        const base = path.basename(file, '.webp');
        const outputPath = path.join(dir, `${base}-thumb.webp`);
        
        if (fs.existsSync(outputPath)) continue;
        
        console.log(`Generating thumbnail for ${file}...`);
        await sharp(inputPath)
          .resize({ width: 256, height: 256, fit: 'cover' })
          .webp({ quality: 70 })
          .toFile(outputPath);
      }
    }
  }
  
  // Also logo
  const logoPath = path.join(process.cwd(), 'public', 'logo', 'arka3.webp');
  if (fs.existsSync(logoPath)) {
    await sharp(logoPath)
      .resize({ width: 400, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(process.cwd(), 'public', 'logo', 'arka3-thumb.webp'));
  }

  console.log('Thumbnails generated!');
}

generateThumbnails().catch(console.error);

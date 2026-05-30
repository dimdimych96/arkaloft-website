import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = path.join(process.cwd(), 'public', 'images', 'hero');

async function convert() {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.png')) {
      const inputPath = path.join(dir, file);
      const ext = path.extname(file);
      const base = path.basename(file, ext);
      const outputPath = path.join(dir, `${base}.webp`);
      
      console.log(`Converting ${file} to WebP...`);
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
    }
  }
  console.log('Conversion complete!');
}

convert().catch(console.error);

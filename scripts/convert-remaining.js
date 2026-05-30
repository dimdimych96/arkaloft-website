import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dirs = [
  path.join(process.cwd(), 'public', 'images', 'halls', '0'),
  path.join(process.cwd(), 'public', 'images', 'halls', '7'),
  path.join(process.cwd(), 'public', 'logo')
];

async function convert() {
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.png')) {
        const inputPath = path.join(dir, file);
        const ext = path.extname(file);
        const base = path.basename(file, ext);
        const outputPath = path.join(dir, `${base}.webp`);
        
        // Skip if already converted
        if (fs.existsSync(outputPath)) continue;
        
        console.log(`Converting ${file} to WebP...`);
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
      }
    }
  }
  console.log('All remaining images converted!');
}

convert().catch(console.error);

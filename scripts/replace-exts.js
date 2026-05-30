import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(path.join(process.cwd(), 'src'));
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // Replace /images/halls/... formats
    const regexHalls = /(\/images\/halls\/(?:0|7)\/[^'"]+)\.(?:jpg|JPG|jpeg|png|PNG)/g;
    content = content.replace(regexHalls, '$1.webp');

    // Replace /logo/... formats
    const regexLogo = /(\/logo\/[^'"]+)\.(?:jpg|JPG|jpeg|png|PNG)/g;
    // Except for favicon.png and apple-touch-icon.png etc which might not be converted or needed. 
    // We only converted arka1, arka2, arka3. Let's be specific for logo:
    content = content.replace(/\/logo\/(arka1|arka2|arka3|arka2-Photoroom)\.(?:png|PNG|jpg|JPG)/g, '/logo/$1.webp');

    if (content !== fs.readFileSync(file, 'utf8')) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
}

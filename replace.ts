import * as fs from 'fs';
import * as path from 'path';

function walkDir(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/text-white/g, 'text-foreground');
      content = content.replace(/bg-black-deep/g, 'bg-background');
      content = content.replace(/border-white(\/[0-9]+|\[(.*?)\])/g, 'border-foreground$1');
      content = content.replace(/bg-white(\/[0-9]+|\[(.*?)\])/g, 'bg-foreground$1');
      content = content.replace(/bg-dark-accent/g, 'bg-card');
      content = content.replace(/text-gray-text/g, 'text-muted-foreground');
      fs.writeFileSync(fullPath, content);
    }
  }
}

walkDir('./src/');
console.log('Done!');

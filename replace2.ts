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
      
      // Fix specific black-deep gradients and text-white
      content = content.replace(/from-black-deep/g, 'from-background');
      content = content.replace(/to-black-deep/g, 'to-background');
      content = content.replace(/via-black-deep/g, 'via-background');
      content = content.replace(/text-white/g, 'text-foreground');
      content = content.replace(/border-white(\/[0-9]+)?/g, 'border-foreground$1');
      content = content.replace(/bg-white\//g, 'bg-foreground/');
      content = content.replace(/bg-\[#0a0a0a\]/gi, "bg-background");
      content = content.replace(/bg-\[#0[a-zA-Z0-9]{5}\]/gi, "bg-background");
      content = content.replace(/bg-black/gi, "bg-foreground");
      content = content.replace(/bg-transparent/g, "bg-background/0");
      content = content.replace(/bg-\[#111\]/gi, "bg-muted");
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

walkDir('./src/');
console.log('Done replacement!');

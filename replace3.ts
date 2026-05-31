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
      
      // Fix background opacities that break light mode.
      // bg-foreground/40 in light mode means 40% black. Let's make that adapt to light and dark better.
      content = content.replace(/bg-foreground\/(40|20)/g, 'bg-card/90 dark:bg-foreground/10');
      // bg-foreground/10 or below is fine, 5% black is a subtle grey. 
      // Replace some shadows that are too strong on white.
      content = content.replace(/shadow-\[0_8px_32px_rgba\(0,0,0,0\.5\)\]/g, 'shadow-xl dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

walkDir('./src/');
console.log('Done replacement!');

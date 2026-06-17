const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
  const result = execSync('grep -rI "Missing property" node_modules/', { encoding: 'utf8' });
  console.log(result.substring(0, 1000));
} catch (e) {
  if (e.stdout) console.log(e.stdout.substring(0, 1000));
  else console.log(e.message);
}

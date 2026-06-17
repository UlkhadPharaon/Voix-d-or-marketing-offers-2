const { execSync } = require('child_process');
try {
  const result = execSync('grep -rlI "Missing property" node_modules/', { encoding: 'utf8' });
  console.log(result);
} catch (e) {
  console.log("Not found or error");
}

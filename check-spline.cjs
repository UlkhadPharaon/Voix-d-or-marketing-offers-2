const fs = require('fs');
const content = fs.readFileSync('node_modules/@splinetool/runtime/build/runtime.js', 'utf8');
const index = content.indexOf('Missing property');
if (index !== -1) {
    console.log(content.substring(index - 50, index + 50));
} else {
    console.log("Not found in runtime.js");
}

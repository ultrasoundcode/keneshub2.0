const fs = require('fs');
const path = require('path');

function fixPx(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Change px-6 to px-4 md:px-8 for proper mobile/desktop padding
  content = content.replace(/\bpx-6\b/g, 'px-4 md:px-8');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed px in ${filePath}`);
  }
}

const dir = path.join(__dirname, 'src', 'components', 'landing');
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.endsWith('.tsx')) {
    fixPx(path.join(dir, file));
  }
}

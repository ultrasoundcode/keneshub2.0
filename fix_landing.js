const fs = require('fs');
const path = require('path');

function fixSection(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Fix massive padding `py-32` to responsive `py-16 md:py-24 lg:py-32`
  content = content.replace(/\bpy-32\b/g, 'py-16 md:py-24 lg:py-32');

  // 2. Fix headings: remove font-sans font-bold, replace with font-serif (Manus aesthetic)
  content = content.replace(/\bfont-sans font-bold text-gray-900 mt-4 mb-6\b/g, 'font-serif text-gray-900 mt-4 mb-6 tracking-tight');
  content = content.replace(/\bfont-sans font-bold text-gray-900 mb-6\b/g, 'font-serif text-gray-900 mb-6 tracking-tight');
  
  // 3. Keep text size but make headings look more elegant
  // Wait, I already removed bold on serif in the regex above. Let's make sure it's just `font-serif`.
  
  // 4. Cards: `rounded-2xl` to `rounded-3xl` for that soft Manus look
  content = content.replace(/rounded-2xl/g, 'rounded-3xl');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed formatting in ${filePath}`);
  }
}

const dir = path.join(__dirname, 'src', 'components', 'landing');
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.endsWith('.tsx') && file !== 'Hero.tsx' && file !== 'Navbar.tsx') {
    fixSection(path.join(dir, file));
  }
}

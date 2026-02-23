const fs = require('fs');
const path = require('path');

const globalsPath = path.join(__dirname, 'src', 'app', 'globals.css');
let content = fs.readFileSync(globalsPath, 'utf8');

if (!content.includes('.chip {')) {
  content += `\n
@layer components {
  .chip {
    @apply inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 bg-white text-zinc-600 text-sm font-medium hover:bg-zinc-50 hover:text-zinc-900 transition-colors shadow-sm;
  }
}
`;
  fs.writeFileSync(globalsPath, content, 'utf8');
  console.log('Added .chip to globals.css');
}

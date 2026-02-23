const fs = require('fs');
const path = require('path');

const replacements = {
  // Backgrounds
  "bg-navy-950/80": "bg-white/80",
  "bg-navy-950": "bg-[#f9fafb]",
  "bg-navy-900/50": "bg-[#ffffff]",
  "bg-navy-900": "bg-white",
  "bg-navy-800": "bg-gray-100",
  "bg-white/5": "bg-gray-100",
  "bg-white/10": "bg-gray-200",
  "bg-[rgba(255,255,255,0.03)]": "bg-gray-50",
  "bg-white/\\[0.03\\]": "bg-white",
  "bg-white/\\[0.02\\]": "bg-gray-50",
  "hover:bg-white/5": "hover:bg-gray-100",
  "hover:bg-white/\\[0.02\\]": "hover:bg-gray-50",
  "bg-white/20": "bg-gray-200",

  // Text colors
  "text-white": "text-gray-900",
  "text-gray-200": "text-gray-800",
  "text-gray-300": "text-gray-700",
  "text-gray-400": "text-gray-500",
  "text-gray-500": "text-gray-400", // Will conflict if done sequentially badly, but using map
  
  // Borders
  "border-white/5": "border-gray-200",
  "border-white/10": "border-gray-300",
  "border-white/20": "border-gray-300",
  "border-white/\\[0.03\\]": "border-gray-200",
  
  // Fonts
  "font-serif": "font-sans",
  
  // Logos / brand styles (from manus.im reference: mostly black/dark grey buttons)
  "bg-gradient-to-br from-accent-blue to-accent-purple": "bg-gray-900 text-white",
  "bg-accent-blue/10": "bg-gray-100",
  "text-accent-blue": "text-gray-900",
  "hover:text-accent-blue": "hover:text-black",
  "border-accent-blue/20": "border-gray-200",
  
  // Glass -> Clean white cards
  "glass-hover": "hover:shadow-md hover:border-gray-300 transition-shadow",
  "glass": "bg-white border border-gray-200 shadow-sm rounded-2xl",
};

// We need to apply replacements carefully to long strings.
function processFile(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Exact replacements using regex word boundaries or exact strings for Tailwind classes
    // Replace text-gray-500 to text-gray-501 temporally to swap 400 and 500
    content = content.replace(/text-gray-500/g, 'text-gray-TEMP');
    content = content.replace(/text-gray-400/g, 'text-gray-500');
    content = content.replace(/text-gray-TEMP/g, 'text-gray-400');
    
    // Other replacements
    for (const [search, replace] of Object.entries(replacements)) {
      if (search.includes('text-gray-')) continue; // Already handled
      
      const regex = new RegExp(search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
      content = content.replace(regex, replace);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else {
      processFile(fullPath);
    }
  }
}

traverse(path.join(__dirname, 'src', 'app'));
traverse(path.join(__dirname, 'src', 'components'));

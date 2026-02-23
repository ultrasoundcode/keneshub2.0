const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;
    
    // Remove glow classes
    content = content.replace(/\bglow-purple\b/g, '');
    content = content.replace(/\bglow-blue\b/g, '');
    content = content.replace(/\bhover:glow-blue\b/g, '');
    content = content.replace(/\bhover:glow-purple\b/g, '');
    content = content.replace(/\bglow-text\b/g, '');
    
    // Remove radial gradient backgrounds
    content = content.replace(/<div className="absolute inset-0 bg-gradient-radial-[^"]+" \/>\n\s*/g, '');
    content = content.replace(/<div className="absolute inset-0 bg-gradient-mesh[^"]*" \/>\n\s*/g, '');
    content = content.replace(/bg-gradient-radial-[a-z]+/g, '');
    content = content.replace(/bg-gradient-mesh/g, '');
    
    // Remove gradient text
    content = content.replace(/text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple/g, 'text-gray-900');
    content = content.replace(/text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-blue/g, 'text-gray-900');
    content = content.replace(/bg-gradient-to-br from-accent-blue to-accent-purple/g, 'bg-gray-900 text-white');
    content = content.replace(/bg-gradient-to-r from-accent-blue to-accent-purple/g, 'bg-gray-900 text-white');
    content = content.replace(/bg-gradient-to-r from-accent-purple to-accent-blue/g, 'bg-gray-900 text-white');
    
    // Remove gradient border pseudo-element class
    content = content.replace(/\bgradient-border\b/g, 'border border-gray-200');

    // Remove double rounded-2xl if they accidentally got typed
    content = content.replace(/rounded-2xl rounded-2xl/g, 'rounded-2xl');
    
    // Turn accent texts to gray-900 or accent-blue depending on context, for manus UI let's keep accent-blue as #111827 or similar?
    // Oh, I already redefined accent colors in globals.css, but manus is literally monochrome.
    // Let's replace text-accent-cyan, text-accent-purple with just text-gray-900 for a monochrome look
    content = content.replace(/\btext-accent-purple\b/g, 'text-gray-900');
    content = content.replace(/\btext-accent-cyan\b/g, 'text-gray-900');
    content = content.replace(/\btext-accent-blue\b/g, 'text-gray-900');
    content = content.replace(/\bh-screen\b/g, 'min-h-screen');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Stripped effects in ${filePath}`);
    }
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

const fs = require('fs');
const path = require('path');

const htmlFiles = [
  'index.html',
  'properties.html',
  'property-detail.html',
  'about.html',
  'amenities.html',
  'communities.html',
  'contact.html'
];

let totalImages = 0;
let totalMissing = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.error(`FILE NOT FOUND: ${file}`);
    totalMissing++;
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const imgRegex = /src=["'](assets\/[^"']+)["']/g;
  let match;
  let pageImages = 0;
  let pageMissing = 0;

  while ((match = imgRegex.exec(content)) !== null) {
    pageImages++;
    totalImages++;
    const assetPath = path.join(__dirname, match[1]);
    if (!fs.existsSync(assetPath)) {
      console.error(`In ${file} -> MISSING ASSET: ${match[1]}`);
      pageMissing++;
      totalMissing++;
    }
  }

  console.log(`Verified ${file}: ${pageImages} image references (Missing: ${pageMissing})`);
});

console.log(`\n--- SUMMARY ---`);
console.log(`Total HTML pages: ${htmlFiles.length}`);
console.log(`Total image references checked: ${totalImages}`);
console.log(`Total missing: ${totalMissing}`);

if (totalMissing === 0) {
  console.log('SUCCESS: All pages and referenced assets are 100% verified on disk!');
} else {
  process.exit(1);
}

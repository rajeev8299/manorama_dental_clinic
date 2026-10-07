const fs = require('fs');
let data = fs.readFileSync('frontend/src/components/HeroBanner.tsx', 'utf8');
data = data.replace(/<div className="a logo">[\s\S]*?<\/div>/, '');
fs.writeFileSync('frontend/src/components/HeroBanner.tsx', data);

const fs = require('fs');
let content = fs.readFileSync('frontend/src/index.css', 'utf-8');

// Replace the first part
content = content.replace(
  /\.premium-card \{[\s\S]*?z-index: 1;\r?\n\}/m,
  `.premium-card {
  background-color: var(--color-secondary-light);
  border: 1px solid rgba(215, 184, 102, 0.3);
  border-radius: 20px;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 30px rgba(18, 58, 104, 0.08);
  position: relative;
  z-index: 1;
  transform-style: preserve-3d;
}

.premium-card::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border: 4px solid transparent;
  background: linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #0066ff, #9933ff, #ff0080) border-box;
  -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  background-size: 200% 100%;
  animation: borderCrawl 3s linear infinite;
  z-index: 50;
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.premium-card:hover, .premium-card:active {
  transform: translateY(-12px) scale(1.03) translateZ(20px);
  box-shadow: 0 30px 60px rgba(14, 165, 233, 0.2);
  border-color: transparent;
}

.premium-card:hover::before, .premium-card:active::before {
  opacity: 1;
}`
);

// Replace the second part
content = content.replace(
  /\.premium-card:hover::after\s*,\s*\.premium-card:active::after\s*\{[\s\S]*?z-index: 5;\r?\n\}/m,
  `.premium-card:hover::after , .premium-card:active::after  {
  left: 200%;
}`
);

fs.writeFileSync('frontend/src/index.css', content);

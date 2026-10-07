const fs = require("fs");
let content = fs.readFileSync("frontend/src/index.css", "utf-8");

const mediaQuery = `
@media (max-width: 768px) {
  html, body {
    overflow-x: hidden;
    width: 100%;
  }
  #root {
    overflow-x: hidden;
  }
  .container {
    padding: 0 1rem;
    overflow-x: hidden;
  }
  h1 {
    font-size: 2.2rem !important;
  }
  h2 {
    font-size: 1.8rem !important;
  }
  h3 {
    font-size: 1.5rem !important;
  }
  h4 {
    font-size: 1.25rem !important;
  }
  p {
    font-size: 1rem !important;
  }
  
  /* Force inline grids to stack */
  div[style*="grid-template-columns"] {
    grid-template-columns: 1fr !important;
    gap: 1.5rem !important;
    direction: ltr !important;
  }
  
  /* Force inline flex containers to wrap */
  div[style*="display: flex"] {
    flex-wrap: wrap;
  }
  
  /* Adjust paddings on big sections */
  section[style*="padding:"] {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }
  
  /* Adjust inner paddings on cards */
  div[style*="padding: 3rem"], 
  div[style*="padding: 4rem"] {
    padding: 1.5rem !important;
  }
  
  /* Fix huge gaps */
  div[style*="gap: 4rem"], 
  div[style*="gap: 3rem"] {
    gap: 1.5rem !important;
  }
  
  /* Image sizing fixes */
  img {
    max-width: 100% !important;
    height: auto !important;
  }
}
`;

if (!content.includes("Force inline grids to stack")) {
  fs.writeFileSync("frontend/src/index.css", content + "\n" + mediaQuery);
}

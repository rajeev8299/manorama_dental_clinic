const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

// Add imports
if (!code.includes('FloatingElement')) {
  code = code.replace(
    'import ScrollReveal from \'../components/ScrollReveal\';',
    'import ScrollReveal from \'../components/ScrollReveal\';\nimport FloatingElement from \'../components/FloatingElement\';\nimport Hover3DCard from \'../components/Hover3DCard\';'
  );
}

// Replace whyCard
code = code.replace(/<div className=\{styles\.whyCard\}>/g, '<Hover3DCard className={styles.whyCard}>');
code = code.replace(/<\/div>\s*<div>\s*<h3 className=\{styles\.cardTitle\}>Personalized Care<\/h3>\s*<p className=\{styles\.cardDesc\}>Tailored treatment plans for your unique needs\.<\/p>\s*<\/div>\s*<ChevronRight size=\{20\} className=\{styles\.cardArrow\} color=\"#087BC1\" \/>\s*<\/div>/g, 
  '</div>\n                <div>\n                  <h3 className={styles.cardTitle}>Personalized Care</h3>\n                  <p className={styles.cardDesc}>Tailored treatment plans for your unique needs.</p>\n                </div>\n                <ChevronRight size={20} className={styles.cardArrow} color="#087BC1" />\n              </Hover3DCard>');

code = code.replace(/<\/div>\s*<div>\s*<h3 className=\{styles\.cardTitle\}>Modern Technology<\/h3>\s*<p className=\{styles\.cardDesc\}>Advanced equipment for accurate and effective care\.<\/p>\s*<\/div>\s*<ChevronRight size=\{20\} className=\{styles\.cardArrow\} color=\"#087BC1\" \/>\s*<\/div>/g, 
  '</div>\n                <div>\n                  <h3 className={styles.cardTitle}>Modern Technology</h3>\n                  <p className={styles.cardDesc}>Advanced equipment for accurate and effective care.</p>\n                </div>\n                <ChevronRight size={20} className={styles.cardArrow} color="#087BC1" />\n              </Hover3DCard>');

code = code.replace(/<\/div>\s*<div>\s*<h3 className=\{styles\.cardTitle\}>Patient Comfort<\/h3>\s*<p className=\{styles\.cardDesc\}>A relaxed and welcoming environment for all ages\.<\/p>\s*<\/div>\s*<ChevronRight size=\{20\} className=\{styles\.cardArrow\} color=\"#087BC1\" \/>\s*<\/div>/g, 
  '</div>\n                <div>\n                  <h3 className={styles.cardTitle}>Patient Comfort</h3>\n                  <p className={styles.cardDesc}>A relaxed and welcoming environment for all ages.</p>\n                </div>\n                <ChevronRight size={20} className={styles.cardArrow} color="#087BC1" />\n              </Hover3DCard>');

code = code.replace(/<\/div>\s*<div>\s*<h3 className=\{styles\.cardTitle\}>Professional Care<\/h3>\s*<p className=\{styles\.cardDesc\}>We maintain high standards of cleanliness and care\.<\/p>\s*<\/div>\s*<ChevronRight size=\{20\} className=\{styles\.cardArrow\} color=\"#087BC1\" \/>\s*<\/div>/g, 
  '</div>\n                <div>\n                  <h3 className={styles.cardTitle}>Professional Care</h3>\n                  <p className={styles.cardDesc}>We maintain high standards of cleanliness and care.</p>\n                </div>\n                <ChevronRight size={20} className={styles.cardArrow} color="#087BC1" />\n              </Hover3DCard>');

// Replace serviceCard inside map
code = code.replace(/<div key=\{idx\} className=\{styles\.serviceCard\}>/g, '<Hover3DCard key={idx} className={styles.serviceCard}>');
code = code.replace(/<ChevronRight size=\{20\} className=\{styles\.serviceArrow\} color=\"#087BC1\" \/>\s*<\/div>\s*<\/div>/g, '<ChevronRight size={20} className={styles.serviceArrow} color="#087BC1" />\n                </div>\n              </Hover3DCard>');

// Replace statCard
code = code.replace(/<div className=\{styles\.statCard\}>/g, '<Hover3DCard className={styles.statCard}>');
code = code.replace(/<p className=\{styles\.statLabel\}>Years of Experience<\/p>\s*<\/div>/g, '<p className={styles.statLabel}>Years of Experience</p>\n          </Hover3DCard>');
code = code.replace(/<p className=\{styles\.statLabel\}>Happy Smiles<\/p>\s*<\/div>/g, '<p className={styles.statLabel}>Happy Smiles</p>\n          </Hover3DCard>');
code = code.replace(/<p className=\{styles\.statLabel\}>Patient Satisfaction<\/p>\s*<\/div>/g, '<p className={styles.statLabel}>Patient Satisfaction</p>\n          </Hover3DCard>');
code = code.replace(/<p className=\{styles\.statLabel\}>Advanced Equipments<\/p>\s*<\/div>/g, '<p className={styles.statLabel}>Advanced Equipments</p>\n          </Hover3DCard>');

// Add FloatingElement to the Why Image
code = code.replace(
  '<div className={styles.whyImageSide}>', 
  '<div className={styles.whyImageSide}>\n            <FloatingElement duration={4} yOffset={20}>'
);
code = code.replace(
  '<div className={styles.whyImageBackdrop}></div>\n          </div>',
  '<div className={styles.whyImageBackdrop}></div>\n            </FloatingElement>\n          </div>'
);

// Add FloatingElement to the FAQ Image
code = code.replace(
  '<div className={styles.faqImageSide}>', 
  '<div className={styles.faqImageSide}>\n            <FloatingElement duration={5} yOffset={15}>'
);
code = code.replace(
  '<div className={styles.faqImageBackdrop}></div>\n          </div>',
  '<div className={styles.faqImageBackdrop}></div>\n            </FloatingElement>\n          </div>'
);

fs.writeFileSync('src/pages/Home.tsx', code);
console.log("Home.tsx updated with cool animations!");

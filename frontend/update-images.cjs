const fs = require('fs');
let code = fs.readFileSync('src/pages/Home.tsx', 'utf8');

code = code.replace(
  "{ title: 'General Dentistry', desc: 'Routine checkups and preventive care', img: '/images/clinic-01.jpg', icon: <CheckCircle /> },",
  "{ title: 'General Dentistry', desc: 'Routine checkups and preventive care', img: '/images/services/general_dentistry.jpg', icon: <CheckCircle /> },"
);
code = code.replace(
  "{ title: 'Dental Implants', desc: 'Long-lasting solutions for missing teeth', img: '/images/clinic-02.jpg', icon: <Settings /> },",
  "{ title: 'Dental Implants', desc: 'Long-lasting solutions for missing teeth', img: '/images/services/dental_implants.jpg', icon: <Settings /> },"
);
code = code.replace(
  "{ title: 'Cosmetic Dentistry', desc: 'Enhance your smile with modern treatments', img: '/images/clinic-03.jpg', icon: <Smile /> },",
  "{ title: 'Cosmetic Dentistry', desc: 'Enhance your smile with modern treatments', img: '/images/services/cosmetic_dentistry.jpg', icon: <Smile /> },"
);
code = code.replace(
  "{ title: 'Root Canal Treatment', desc: 'Save natural teeth with advanced care', img: '/images/clinic-04.jpg', icon: <Heart /> },",
  "{ title: 'Root Canal Treatment', desc: 'Save natural teeth with advanced care', img: '/images/services/root_canal.jpg', icon: <Heart /> },"
);
code = code.replace(
  "{ title: 'Orthodontic Treatment', desc: 'Align your teeth for a confident smile', img: '/images/clinic-05.jpg', icon: <Activity /> }",
  "{ title: 'Orthodontic Treatment', desc: 'Align your teeth for a confident smile', img: '/images/services/orthodontics.jpg', icon: <Activity /> }"
);

fs.writeFileSync('src/pages/Home.tsx', code);
console.log('Images updated in Home.tsx');

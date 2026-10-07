import heroImage from '../assets/hero_image.webp';

import './HeroBanner.css';

const HeroBanner = () => {
  return (
    <section className="hero" aria-label="Manorama Multispeciality Dental Clinic">

  {/*  Background waves + gold lines  */}
  <svg className="bg" viewBox="0 0 2048 768" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 0H2048V70C1750 15 1250 150 850 95 520 50 300 140 0 70Z" fill="#fff" opacity=".65"/>
    <path d="M180 0C520 125 900 118 1300 55S1800 35 2048 105" fill="none" stroke="#e2b24f" strokeWidth="2" opacity=".85"/>
    <path d="M0 768V690C400 730 800 770 1300 735S1850 690 2048 735V768Z" fill="#fff" opacity=".55"/>
    <path d="M0 655C450 700 900 745 1400 705S1900 690 2048 725" fill="none" stroke="#e2b24f" strokeWidth="2" opacity=".85"/>
    <path d="M0 330C300 280 500 420 800 380S1700 450 2048 400V520C1700 560 1300 480 900 520S300 450 0 480Z" fill="#a9d6f8" opacity=".25"/>
  </svg>

  

  <h1 className="sr">Every Smile Matters</h1>
  <svg className="hs" viewBox="0 0 2048 768" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#52b2f8"/><stop offset="1" stop-color="#a4d5fc"/></linearGradient></defs>
    <g font-family="Anton,Impact,sans-serif" font-size="205" fill="url(#hg)" lengthAdjust="spacingAndGlyphs">
      <text x="113" y="382" textLength="778" lengthAdjust="spacingAndGlyphs">EVERY SMILE</text>
      <text x="1405" y="382" textLength="560" lengthAdjust="spacingAndGlyphs">MATTERS</text>
    </g>
  </svg>

  <img className="a vis" alt="Dr. Amit Kumar Dubey with 3D tooth" width="620" height="620" src={heroImage} fetchPriority="high" />

  <h2 className="a l2">Expert Dental Care</h2>
  <p className="a l3">for a <span>Healthier, Brighter Smile</span></p>

  <div className="a ft">
    <div className="fi"><span className="ic"><svg viewBox="0 0 24 24"><path d="M12 5c-2-2-7-1-7 3 0 3 2 4 2 8 0 3 1 5 2 5s1-3 3-3 2 3 3 3 2-2 2-5c0-4 2-5 2-8 0-4-5-5-7-3z"/></svg></span><span>Advanced<br />Technology</span></div>
    <div className="fi"><span className="ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3"/><circle cx="5" cy="10" r="2.2"/><circle cx="19" cy="10" r="2.2"/><path d="M6 19c0-4 3-6 6-6s6 2 6 6zM1 18c0-3 2-4 4-4-1 1-1 3-1 4zM23 18c0-3-2-4-4-4 1 1 1 3 1 4z"/></svg></span><span>Personalized<br />Care</span></div>
    <div className="fi"><span className="ic"><svg viewBox="0 0 24 24"><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5zm-1 14l6-6-1.4-1.4L11 13.2 8.4 10.6 7 12z"/></svg></span><span>Comfortable<br />Environment</span></div>
  </div>

  <p className="a rp">Experience world-class dentistry with <b>Dr. Amit Kumar Dubey.</b> We combine advanced dental technology with compassionate care.</p>

  <div className="a cta">
    <a className="call" href="tel:+918127766794" aria-label="Call 8127766794">
      <i><svg viewBox="0 0 24 24"><path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11 11 0 003.5.56 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.2.2 2.4.56 3.5a1 1 0 01-.25 1z"/></svg></i>
      <span><small>CALL US:</small><b>8127766794</b></span>
    </a>
    <a className="btn" href="#contact">BOOK CONSULTATION <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" stroke-linecap="round" strokeLinejoin="round"><path d="M4 12h15M13 5l7 7-7 7"/></svg></a>
  </div>

</section>
  );
};

export default HeroBanner;
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, Shield, Heart, Smile } from 'lucide-react';
import styles from './PremiumBanner.module.css';

const PremiumBanner = () => {
  return (
    <section className={styles.premiumBannerSection}>
      <div className={styles.bannerContainer}>
        {/* Background Waves & Gold Lines */}
        <div className={styles.bgElements}>
          <div className={styles.waveTop}></div>
          <div className={styles.waveBottom}></div>
        </div>

        {/* Huge Background Text */}
        <div className={styles.hugeTextBg}>
          EVERY SMILE MATTERS
        </div>

        <div className={styles.contentLayout}>
          {/* Left Side */}
          <div className={styles.leftContent}>
            <div className={styles.logoArea}>
              <img src="/logo.png" alt="Manorama Multispeciality Dental Clinic" className={styles.logoImg} />
            </div>
            <h2 className={styles.headline}>
              Expert Dental Care
            </h2>
            <p className={styles.subheadline}>
              for a <span className={styles.highlightText}>Healthier, Brighter Smile</span>
            </p>
            
            <div className={styles.featuresList}>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}><Smile size={18} color="#008ecc" /></div>
                <span>Advanced<br/>Technology</span>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}><Heart size={18} color="#008ecc" /></div>
                <span>Personalized<br/>Care</span>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}><Shield size={18} color="#008ecc" /></div>
                <span>Comfortable<br/>Environment</span>
              </div>
            </div>
          </div>

          {/* Center Graphic */}
          <div className={styles.centerGraphic}>
            <img src="/premium_tooth_solid.jpg" alt="Premium Dental Care" className={styles.toothGraphic} />
            <div className={styles.doctorForeground}>
              <img src="/images/dr_amit_nobg.png" alt="Dr. Amit Kumar Dubey" className={styles.doctorImgCutout} />
            </div>
          </div>

          {/* Right Side */}
          <div className={styles.rightContent}>
            <p className={styles.descText}>
              Experience world-class dentistry with <br/>
              <strong>Dr. Amit Kumar Dubey</strong>. We combine <br/>
              advanced dental technology with <br/>
              compassionate care.
            </p>
            
            <div className={styles.ctaArea}>
              <div className={styles.callBox}>
                <div className={styles.phoneIconWrapper}>
                  <Phone size={18} color="white" />
                </div>
                <div className={styles.phoneText}>
                  <span>CALL US:</span>
                  <strong>81277 66794</strong>
                </div>
              </div>
              <Link to="/contact" className={styles.bookBtn}>
                BOOK FREE CONSULTATION <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumBanner;

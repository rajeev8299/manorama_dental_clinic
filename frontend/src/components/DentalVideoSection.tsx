import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import styles from './DentalVideoSection.module.css';

export const DentalVideoSection: React.FC = () => {
  return (
    <section className={styles.videoSection}>
      <div className={styles.container}>
        <div className={styles.videoWrapper}>
          <video
            className={styles.video}
            src="/videos/dental-clinic-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <Link to="/about" className={styles.visitButton}>
            Visit doctor 
            <span className={styles.iconCircle}>
              <ArrowRight strokeWidth={2} color="#0f172a" className={styles.arrowIcon} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

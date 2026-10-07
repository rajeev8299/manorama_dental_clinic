import React from 'react';
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
        </div>
      </div>
    </section>
  );
};

import { useState, useEffect } from 'react';
import styles from './SplashScreen.module.css';

const SplashScreen = () => {
  const hasVisited = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('hasVisitedSplash') : false;
  const [isOpen, setIsOpen] = useState(false);
  const [isRendered, setIsRendered] = useState(!hasVisited);

  useEffect(() => {
    if (hasVisited) {
      return;
    }

    // Trigger the shutter open effect after a short delay
    const openTimer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem('hasVisitedSplash', 'true');
    }, 800); // 800ms delay to show the clinic name

    // Remove the component from DOM after animation completes
    const removeTimer = setTimeout(() => {
      setIsRendered(false);
    }, 1300); // 800ms delay + 400ms animation + 100ms buffer

    return () => {
      clearTimeout(openTimer);
      clearTimeout(removeTimer);
    };
  }, [hasVisited]);

  if (!isRendered) return null;

  return (
    <div className={`${styles.splashContainer} ${isOpen ? styles.isOpen : ''}`}>
      <div className={styles.shutterTop}></div>
      <div className={styles.shutterBottom}></div>
      
      <div className={styles.content}>
        <h1 className={styles.title}>Manorama</h1>
        <p className={styles.subtitle}>Multispeciality Dental Clinic</p>
      </div>
    </div>
  );
};

export default SplashScreen;

import React, { useState, useRef, type MouseEvent, type TouchEvent, type ReactNode } from 'react';
import styles from './BeforeAfterSlider.module.css';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: ReactNode;
  afterLabel?: ReactNode;
  bottomLabel?: ReactNode;
  beforeImageStyle?: React.CSSProperties;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ 
  beforeImage, 
  afterImage, 
  beforeLabel, 
  afterLabel,
  bottomLabel,
  beforeImageStyle
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = (clientX: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
      setSliderPosition(percentage);
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    if (e.buttons === 1) { // Left click is held down
      handleDrag(e.clientX);
    }
  };

  const onTouchMove = (e: TouchEvent) => {
    handleDrag(e.touches[0].clientX);
  };

  return (
    <div 
      className={styles.sliderContainer}
      ref={containerRef}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onClick={(e) => handleDrag(e.clientX)}
    >
      <img src={beforeImage} alt="Before" className={styles.imageBefore} style={beforeImageStyle} />
      
      <div 
        className={styles.imageAfterContainer} 
        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
      >
        <img src={afterImage} alt="After" className={styles.imageAfter} />
      </div>

      <div 
        className={styles.sliderHandle} 
        style={{ left: `${sliderPosition}%` }}
      >
        <div className={styles.sliderLine}></div>
        <div className={styles.sliderButton}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#002147" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
            <path d="M9 18l6-6-6-6" />
          </svg>
        </div>
      </div>

      {beforeLabel && (
        <div className={styles.labelBefore}>
          {beforeLabel}
        </div>
      )}
      
      {afterLabel && (
        <div className={styles.labelAfter}>
          {afterLabel}
        </div>
      )}

      {bottomLabel && (
        <div className={styles.labelBottom}>
          {bottomLabel}
        </div>
      )}
    </div>
  );
};

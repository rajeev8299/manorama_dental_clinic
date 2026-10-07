import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useTransform, motion, animate } from 'framer-motion';

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export const CountUp: React.FC<CountUpProps> = ({ end, suffix = '', duration = 2 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, end, { duration });
      return controls.stop;
    }
  }, [isInView, end, duration, count]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
};

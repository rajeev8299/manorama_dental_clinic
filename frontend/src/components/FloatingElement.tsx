import { motion } from 'framer-motion';

const FloatingElement = ({ children, delay = 0, yOffset = 15, duration = 3 }: any) => {
  return (
    <motion.div
      animate={{ y: [0, -yOffset, 0] }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: delay
      }}
      style={{ display: 'inline-block', width: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;

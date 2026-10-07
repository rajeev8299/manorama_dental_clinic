import { motion } from 'framer-motion';

const ScrollReveal = ({ children, minHeight = '100px', delay = 0 }: { children: React.ReactNode, minHeight?: string, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
      transition={{ 
        duration: 1.2, 
        delay: delay,
        type: 'spring', 
        bounce: 0.3,
      }}
      style={{ minHeight, width: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;

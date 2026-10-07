import { motion } from 'framer-motion';

const Hover3DCard = ({ children, className, style }: any) => {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.05, y: -10, rotateX: 2, rotateY: 2, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 1000, ...style }}
    >
      {children}
    </motion.div>
  );
};

export default Hover3DCard;

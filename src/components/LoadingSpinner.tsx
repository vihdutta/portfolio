import { motion } from 'framer-motion';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-64">
      <motion.div
        className="flex space-x-2"
        initial="initial"
        animate="animate"
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: '#29353c' }}
            variants={{
              initial: { scale: 0.8, opacity: 0.5 },
              animate: { scale: 1.2, opacity: 1 },
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: index * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}; 
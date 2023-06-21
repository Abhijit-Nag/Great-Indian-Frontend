import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  const loaderVariants = {
    animation: {
      rotate: [0, 360],
      scale: [1, 0.8, 1],
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <motion.div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          border: '4px solid white',
        }}
        variants={loaderVariants}
        animate="animation"
      />
    </div>
  );
};

export default Loader;

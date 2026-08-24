import React from 'react';
import { motion } from 'framer-motion';

export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="loader-container">
      <motion.div 
        className="loader-spinner"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      />
      <motion.p 
        className="loader-text"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1.2, repeatType: 'reverse' }}
      >
        {text}
      </motion.p>
    </div>
  );
}
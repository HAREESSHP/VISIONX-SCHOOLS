import React from 'react';
import { motion } from 'framer-motion';

export default function About3DVisual() {
  return (
    <div className="about-3d-visual-wrapper">
      <div className="about-3d-image-container">
        {/* Central Image - Large */}
        <motion.div
          className="about-central-image"
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src="/robo-image.jpeg" 
            alt="VisionX Robot Learning" 
            className="robo-image"
          />
        </motion.div>
      </div>

      {/* Floating 3D Stat Badges */}
      <motion.div 
        className="about-3d-badge badge-top"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.08 }}
      >
        <span className="badge-3d-icon">🎓</span>
        <div>
          <strong>98.4%</strong>
          <span>Speech Clarity Gain</span>
        </div>
      </motion.div>

      <motion.div 
        className="about-3d-badge badge-bottom"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        whileHover={{ scale: 1.08 }}
      >
        <span className="badge-3d-icon">🏫</span>
        <div>
          <strong>100+ Schools</strong>
          <span>Empowered Nationwide</span>
        </div>
      </motion.div>
    </div>
  );
}

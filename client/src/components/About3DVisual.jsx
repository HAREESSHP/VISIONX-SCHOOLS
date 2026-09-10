import React from 'react';
import { motion } from 'framer-motion';

export default function About3DVisual() {
  return (
    <div className="about-3d-visual-wrapper">
      <div className="about-3d-image-container">
        {/* Central Image - Large */}
        <motion.div
          className="about-central-image"
          initial={{ opacity: 0, scale: 0.75, rotateY: 15 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
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
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
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
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
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

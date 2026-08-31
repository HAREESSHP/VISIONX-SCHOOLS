import React from 'react';
import { motion } from 'framer-motion';

export default function Hero3DScene() {
  return (
    <div className="hero-3d-wrapper">
      <div className="hero-3d-photo-stack" aria-label="School learning hero image">
        <div className="hero-rotation-ring" />
        <div className="hero-photo-backdrop" />
        <div className="hero-photo-card">
          <img src="/school-3d.png" alt="Student learning English with confident speaking practice" />
        </div>
      </div>

      <motion.div 
        className="floating-3d-card card-top-left"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.06, rotateZ: -2 }}
      >
        <div className="floating-card-icon">🎙️</div>
        <div className="floating-card-text">
          <strong>Speaking Fluency</strong>
          <span>Real-time Voice AI Practice</span>
        </div>
      </motion.div>

      <motion.div 
        className="floating-3d-card card-bottom-right"
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        whileHover={{ scale: 1.06, rotateZ: 2 }}
      >
        <div className="floating-card-icon">⭐</div>
        <div className="floating-card-text">
          <strong>Nursery to Class 10</strong>
          <span>Structured CEFR Curriculum</span>
        </div>
      </motion.div>

      <motion.div 
        className="floating-3d-card card-middle-right"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        whileHover={{ scale: 1.06, rotateZ: -1 }}
      >
        <div className="floating-badge-chip">
          <span className="live-pulse-dot"></span>
          <span>50,000+ Lessons Completed</span>
        </div>
      </motion.div>
    </div>
  );
}

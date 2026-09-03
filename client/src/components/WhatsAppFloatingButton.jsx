import React from 'react';
import { motion } from 'framer-motion';

export default function WhatsAppFloatingButton() {
  // Phone number: +91 9381304491
  const phoneNumber = '919381304491';
  const defaultMessage = encodeURIComponent('Hey VisionX');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="whatsapp-floating-widget">
      {/* Pulsing Ripple Aura */}
      <motion.div
        animate={{
          scale: [1, 1.35, 1.55],
          opacity: [0.55, 0.25, 0],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: 'easeOut',
        }}
        className="whatsapp-pulse-aura"
      />

      {/* Official WhatsApp Floating Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.12, y: -2 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Chat with VisionX on WhatsApp"
        className="whatsapp-floating-btn"
      >
        <svg
          viewBox="0 0 32 32"
          width="28"
          height="28"
          fill="#FFFFFF"
          className="whatsapp-svg-icon"
        >
          <path d="M16.002 2C8.28 2 2 8.28 2 16c0 2.7.77 5.23 2.1 7.38L2.5 30l6.81-1.57A13.94 13.94 0 0016.002 30C23.72 30 30 23.72 30 16S23.72 2 16.002 2zm8.17 19.97c-.34.96-1.7 1.81-2.77 2.05-.73.16-1.68.3-4.9-1.02-4.12-1.69-6.76-5.87-6.97-6.15-.2-.28-1.66-2.21-1.66-4.21 0-2 1.05-2.98 1.43-3.39.37-.41.8-.52 1.07-.52.27 0 .54 0 .77.01.25.01.59-.09.92.7.34.82 1.17 2.85 1.27 3.05.1.21.17.45.03.72-.13.27-.2.44-.4.68-.21.24-.43.53-.62.71-.21.21-.42.43-.19.85.24.41 1.07 1.77 2.3 2.87 1.58 1.4 2.91 1.84 3.32 2.04.41.21.65.18.89-.1.24-.27 1.02-1.19 1.3-1.6.27-.41.55-.34.92-.21.37.14 2.37 1.12 2.78 1.32.41.21.68.3.78.47.1.18.1 1.03-.24 1.99z" />
        </svg>
      </motion.a>
    </div>
  );
}

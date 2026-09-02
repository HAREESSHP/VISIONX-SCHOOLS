import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollProgressButton() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;

          if (totalHeight > 0) {
            const progress = (currentScroll / totalHeight) * 100;
            setScrollProgress(Math.min(100, Math.max(0, progress)));
          }

          setIsVisible(currentScroll > 220);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Circle parameters for SVG progress ring
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="scroll-progress-container"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: 'clamp(1.25rem, 3vw, 2rem)',
            right: 'clamp(1.25rem, 3vw, 2rem)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Tooltip on Hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="scroll-top-tooltip"
                initial={{ opacity: 0, x: 8, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: 'absolute',
                  right: 'calc(100% + 10px)',
                  background: 'rgba(35, 30, 27, 0.95)',
                  color: '#FAF4EB',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '10px',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
                  border: '1px solid rgba(196, 163, 105, 0.35)',
                  pointerEvents: 'none',
                  letterSpacing: '0.02em',
                }}
              >
                Back to Top ({Math.round(scrollProgress)}%)
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Floating Button */}
          <motion.button
            type="button"
            onClick={scrollToTop}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.92 }}
            aria-label={`Scroll to top, page is ${Math.round(scrollProgress)}% scrolled`}
            style={{
              position: 'relative',
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(43, 39, 36, 0.95) 0%, rgba(28, 25, 23, 0.98) 100%)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              boxShadow: '0 10px 28px rgba(0, 0, 0, 0.45), 0 2px 8px rgba(181, 96, 46, 0.25)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            {/* SVG Circular Scroll Progress Ring */}
            <svg
              width="52"
              height="52"
              viewBox="0 0 52 52"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: 'rotate(-90deg)',
                pointerEvents: 'none',
              }}
            >
              {/* Background Track Circle */}
              <circle
                cx="26"
                cy="26"
                r={radius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="3.2"
              />
              {/* Dynamic Filling Progress Circle */}
              <circle
                cx="26"
                cy="26"
                r={radius}
                fill="none"
                stroke="url(#scrollProgressGradient)"
                strokeWidth="3.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{
                  transition: 'stroke-dashoffset 0.12s linear',
                }}
              />
              {/* Gradient Definition */}
              <defs>
                <linearGradient id="scrollProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B5602E" />
                  <stop offset="50%" stopColor="#C4A369" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Arrow Icon */}
            <motion.div
              animate={{
                y: isHovered ? [0, -3, 0] : 0,
              }}
              transition={{
                repeat: isHovered ? Infinity : 0,
                duration: 0.8,
                ease: 'easeInOut',
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FAF4EB',
                zIndex: 2,
              }}
            >
              <ArrowUp size={20} strokeWidth={2.6} />
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

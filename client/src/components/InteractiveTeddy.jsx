import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * InteractiveTeddy
 * An animated, charming Teddy Bear companion that:
 * - Follows the user's cursor across the screen with its head and glossy pupils.
 * - Adorably covers its eyes with its paws when the user is typing their password.
 * - Peeks through its paws when "Show Password" is toggled on.
 * - Looks down towards the input field when typing a Login ID.
 * - Blinks naturally at periodic intervals.
 */
export default function InteractiveTeddy({
  isPasswordFocused = false,
  isLoginIdFocused = false,
  showPassword = false,
  isSubmitting = false
}) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ pupilX: 0, pupilY: 0, headRotate: 0, headTiltY: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  // Periodic natural blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 4200 + Math.random() * 2500);

    return () => clearInterval(blinkInterval);
  }, []);

  // Track cursor relative to the center of the Teddy
  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : centerX);
      const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : centerY);

      const dx = clientX - centerX;
      const dy = clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Max pupil offset is 9px, max head tilt is 12 degrees
      const maxDist = 450;
      const factor = Math.min(dist / maxDist, 1);

      const angle = Math.atan2(dy, dx);
      const pupilX = Math.cos(angle) * 8.5 * factor;
      const pupilY = Math.sin(angle) * 7 * factor;

      setMousePos({
        pupilX,
        pupilY,
        headRotate: (dx / window.innerWidth) * 14,
        headTiltY: (dy / window.innerHeight) * 10
      });
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  // Determine pupil position based on focus state
  let targetPupilX = mousePos.pupilX || 0;
  let targetPupilY = mousePos.pupilY || 0;
  let headTiltX = mousePos.headTiltY || 0;
  let headRotate = mousePos.headRotate || 0;

  if (isLoginIdFocused) {
    // When typing ID, look attentively toward the form (down & right)
    targetPupilX = 4;
    targetPupilY = 6;
    headTiltX = 6;
    headRotate = 5;
  }

  // Paw covering eyes state
  const coverEyes = isPasswordFocused && !showPassword;
  const peekEyes = isPasswordFocused && showPassword;

  return (
    <div className="interactive-teddy-wrapper" ref={containerRef}>
      <motion.div
        className="interactive-teddy-stage"
        animate={{
          y: isSubmitting ? [0, -10, 0] : [0, -4, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: isSubmitting ? 0.6 : 3.5,
          ease: 'easeInOut'
        }}
      >
        <svg
          viewBox="0 0 280 290"
          className="teddy-svg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Fur Gradients */}
            <radialGradient id="teddyFurGrad" cx="45%" cy="38%" r="62%">
              <stop offset="0%" stopColor="#f5b875" />
              <stop offset="65%" stopColor="#d98236" />
              <stop offset="100%" stopColor="#b45d1d" />
            </radialGradient>

            <radialGradient id="teddyMuzzleGrad" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#fff8ed" />
              <stop offset="75%" stopColor="#fde0be" />
              <stop offset="100%" stopColor="#f7cca1" />
            </radialGradient>

            <radialGradient id="teddyInnerEarGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbcfe8" />
              <stop offset="70%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#db2777" />
            </radialGradient>

            <radialGradient id="teddyCheekGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(244, 114, 182, 0.45)" />
              <stop offset="100%" stopColor="rgba(244, 114, 182, 0)" />
            </radialGradient>

            <linearGradient id="pawPadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>

            {/* Soft Shadow */}
            <filter id="teddyDropShadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#1e1005" floodOpacity="0.38" />
            </filter>

            <filter id="pawShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#000000" floodOpacity="0.28" />
            </filter>
          </defs>

          {/* Teddy Body / Shoulders */}
          <g className="teddy-body" filter="url(#teddyDropShadow)">
            {/* Torso */}
            <ellipse cx="140" cy="275" rx="88" ry="60" fill="url(#teddyFurGrad)" />
            
            {/* Tummy patch */}
            <ellipse cx="140" cy="272" rx="54" ry="40" fill="url(#teddyMuzzleGrad)" opacity="0.92" />
            
            {/* Cute Scholar Bow Tie */}
            <g transform="translate(140, 222)">
              {/* Left Wing */}
              <polygon points="0,0 -24,-12 -24,12" fill="#00C4B4" />
              {/* Right Wing */}
              <polygon points="0,0 24,-12 24,12" fill="#008F84" />
              {/* Center Ribbon Knot */}
              <circle cx="0" cy="0" r="6" fill="#38BDF8" />
              {/* Gold Ribbon Pin */}
              <circle cx="0" cy="0" r="2.5" fill="#FCD34D" />
            </g>
          </g>

          {/* Teddy Head with Dynamic Rotation and Tilt */}
          <motion.g
            className="teddy-head-group"
            animate={{
              rotate: headRotate,
              y: headTiltX,
              transformOrigin: '140px 150px'
            }}
            transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          >
            {/* Left Ear */}
            <g className="teddy-left-ear">
              <circle cx="68" cy="72" r="34" fill="url(#teddyFurGrad)" />
              <circle cx="68" cy="72" r="20" fill="url(#teddyInnerEarGrad)" opacity="0.85" />
            </g>

            {/* Right Ear */}
            <g className="teddy-right-ear">
              <circle cx="212" cy="72" r="34" fill="url(#teddyFurGrad)" />
              <circle cx="212" cy="72" r="20" fill="url(#teddyInnerEarGrad)" opacity="0.85" />
            </g>

            {/* Head Silhouette */}
            <ellipse cx="140" cy="140" rx="84" ry="78" fill="url(#teddyFurGrad)" />

            {/* Rosy Cheeks */}
            <circle cx="82" cy="154" r="18" fill="url(#teddyCheekGrad)" />
            <circle cx="198" cy="154" r="18" fill="url(#teddyCheekGrad)" />

            {/* Eyes Container */}
            <g className="teddy-eyes">
              {/* Left Eye Cornea */}
              <ellipse cx="98" cy="120" rx="16" ry="18" fill="#ffffff" />
              {/* Right Eye Cornea */}
              <ellipse cx="182" cy="120" rx="16" ry="18" fill="#ffffff" />

              {/* Pupils with Cursor Follow Motion */}
              {/* Left Eye Pupil */}
              <motion.g
                animate={{
                  x: targetPupilX,
                  y: isBlinking ? 0 : targetPupilY,
                  scaleY: isBlinking ? 0.1 : 1
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                style={{ transformOrigin: '98px 120px' }}
              >
                {/* Iris */}
                <circle cx="98" cy="120" r="10.5" fill="#291406" />
                {/* Glistening Catchlights */}
                <circle cx="95" cy="116" r="4.2" fill="#ffffff" />
                <circle cx="102" cy="123" r="2" fill="#ffffff" opacity="0.8" />
              </motion.g>

              {/* Right Eye Pupil */}
              <motion.g
                animate={{
                  x: targetPupilX,
                  y: isBlinking ? 0 : targetPupilY,
                  scaleY: isBlinking ? 0.1 : 1
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                style={{ transformOrigin: '182px 120px' }}
              >
                {/* Iris */}
                <circle cx="182" cy="120" r="10.5" fill="#291406" />
                {/* Glistening Catchlights */}
                <circle cx="179" cy="116" r="4.2" fill="#ffffff" />
                <circle cx="186" cy="123" r="2" fill="#ffffff" opacity="0.8" />
              </motion.g>

              {/* Cheerful Animated Eyebrows */}
              <path
                d="M84,98 Q98,92 112,98"
                stroke="#692d0b"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M168,98 Q182,92 196,98"
                stroke="#692d0b"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* Muzzle Area */}
            <ellipse cx="140" cy="160" rx="38" ry="30" fill="url(#teddyMuzzleGrad)" />
            
            {/* Cute Button Nose */}
            <path
              d="M130,146 Q140,142 150,146 Q140,158 130,146 Z"
              fill="#2e1405"
            />
            {/* Nose highlight */}
            <ellipse cx="138" cy="146" rx="3" ry="1.5" fill="#ffffff" opacity="0.6" />

            {/* Happy Smile */}
            <path
              d="M140,154 L140,165 M128,163 Q140,175 152,163"
              stroke="#2e1405"
              strokeWidth="2.8"
              strokeLinecap="round"
              fill="none"
            />
          </motion.g>

          {/* Animated Paws (Peek-a-boo mechanism) */}
          {/* Left Paw */}
          <motion.g
            className="teddy-left-paw"
            filter="url(#pawShadow)"
            initial={false}
            animate={
              coverEyes
                ? { x: 30, y: -125, rotate: 18 }
                : peekEyes
                ? { x: 0, y: 0, rotate: 0 }
                : { x: (mousePos.pupilX || 0) * -0.4, y: 0, rotate: 0 }
            }
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            style={{ transformOrigin: '68px 245px' }}
          >
            <ellipse cx="68" cy="245" rx="32" ry="30" fill="url(#teddyFurGrad)" />
            {/* Paw Pads */}
            <ellipse cx="68" cy="246" rx="17" ry="15" fill="url(#pawPadGrad)" opacity="0.9" />
            <circle cx="53" cy="232" r="5.2" fill="url(#pawPadGrad)" opacity="0.85" />
            <circle cx="68" cy="225" r="5.5" fill="url(#pawPadGrad)" opacity="0.85" />
            <circle cx="83" cy="232" r="5.2" fill="url(#pawPadGrad)" opacity="0.85" />
          </motion.g>

          {/* Right Paw */}
          <motion.g
            className="teddy-right-paw"
            filter="url(#pawShadow)"
            initial={false}
            animate={
              coverEyes
                ? { x: -30, y: -125, rotate: -18 }
                : peekEyes
                ? { x: -30, y: -125, rotate: -18 }
                : { x: (mousePos.pupilX || 0) * 0.4, y: 0, rotate: 0 }
            }
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            style={{ transformOrigin: '212px 245px' }}
          >
            <ellipse cx="212" cy="245" rx="32" ry="30" fill="url(#teddyFurGrad)" />
            {/* Paw Pads */}
            <ellipse cx="212" cy="246" rx="17" ry="15" fill="url(#pawPadGrad)" opacity="0.9" />
            <circle cx="197" cy="232" r="5.2" fill="url(#pawPadGrad)" opacity="0.85" />
            <circle cx="212" cy="225" r="5.5" fill="url(#pawPadGrad)" opacity="0.85" />
            <circle cx="227" cy="232" r="5.2" fill="url(#pawPadGrad)" opacity="0.85" />
          </motion.g>
        </svg>

        {/* Speech Bubble / Mascot Hint */}
        <motion.div
          className="teddy-speech-bubble"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {isSubmitting ? (
            <span>🚀 Launching your Speaking Lab...</span>
          ) : coverEyes ? (
            <span>🙈 I'm not looking at your password!</span>
          ) : peekEyes ? (
            <span>👀 Peek-a-boo! I see your secret code!</span>
          ) : isLoginIdFocused ? (
            <span>✨ Finding your speaking badges...</span>
          ) : (
            <span>🎙️ Ready to speak English with confidence?</span>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

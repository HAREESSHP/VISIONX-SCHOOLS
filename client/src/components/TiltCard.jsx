import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';

export default function TiltCard({
  children,
  className = '',
  style = {},
  maxAngle = 8,
  scale = 1.02,
  glareEnable = true,
  glareMaxOpacity = 0.12,
  borderRadius = '20px',
  onClick,
  ...rest
}) {
  const [isTouchOrReducedMotion, setIsTouchOrReducedMotion] = useState(false);

  useEffect(() => {
    const checkMotionAndTouch = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchOrReducedMotion(prefersReducedMotion || isTouch);
    };

    checkMotionAndTouch();
    window.addEventListener('resize', checkMotionAndTouch);
    return () => window.removeEventListener('resize', checkMotionAndTouch);
  }, []);

  return (
    <Tilt
      tiltEnable={!isTouchOrReducedMotion}
      perspective={1000}
      tiltMaxAngleX={maxAngle}
      tiltMaxAngleY={maxAngle}
      scale={isTouchOrReducedMotion ? 1 : scale}
      transitionSpeed={600}
      glareEnable={glareEnable && !isTouchOrReducedMotion}
      glareMaxOpacity={glareMaxOpacity}
      glareColor="#FFFFFF"
      glarePosition="all"
      glareBorderRadius={borderRadius}
      className={`tactile-tilt-card ${className}`}
      style={{
        borderRadius,
        transformStyle: 'preserve-3d',
        ...style
      }}
      onClick={onClick}
      {...rest}
    >
      {children}
    </Tilt>
  );
}

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export default function Hero3DScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = currentMount.clientWidth || 500;
    const height = currentMount.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);

    // Group for mouse rotation
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Tactile 3D Shape (Torus Knot with Terracotta & Gold sheen)
    const geometry = new THREE.TorusKnotGeometry(1.4, 0.42, 128, 32, 2, 3);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xB5602E, // Terracotta
      emissive: 0x3D2B1F,
      roughness: 0.25,
      metalness: 0.15,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      reflectivity: 0.9,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    mainGroup.add(torusKnot);

    // 2. Orbiting 3D Rings
    const ringGeo = new THREE.TorusGeometry(2.6, 0.04, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xC4A369, // Golden tan
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.85
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    mainGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 3;
    ring2.scale.set(1.15, 1.15, 1.15);
    mainGroup.add(ring2);

    // 3. Floating 3D Spheres (Orbiters)
    const sphereGeo = new THREE.SphereGeometry(0.18, 32, 32);
    const sphereMatGold = new THREE.MeshStandardMaterial({ color: 0xE7D5B5, roughness: 0.3, metalness: 0.7 });
    const sphereMatSage = new THREE.MeshStandardMaterial({ color: 0x8DAE78, roughness: 0.4, metalness: 0.2 });
    
    const orbiter1 = new THREE.Mesh(sphereGeo, sphereMatGold);
    const orbiter2 = new THREE.Mesh(sphereGeo, sphereMatSage);
    const orbiter3 = new THREE.Mesh(sphereGeo, sphereMatGold);
    orbiter3.scale.set(0.7, 0.7, 0.7);

    mainGroup.add(orbiter1);
    mainGroup.add(orbiter2);
    mainGroup.add(orbiter3);

    // 4. Star / Particle Dust
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i + 2] = (Math.random() - 0.5) * 12;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xF5EDE0,
      size: 0.05,
      transparent: true,
      opacity: 0.75
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xFDFCFA, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xFFE4D6, 2.5);
    dirLight1.position.set(5, 6, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xC4A369, 1.8);
    dirLight2.position.set(-5, -4, 3);
    scene.add(dirLight2);

    // Mouse Interaction Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (event.clientX / innerWidth - 0.5) * 2;
      mouseY = (event.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous 3D rotation
      torusKnot.rotation.x = elapsedTime * 0.35;
      torusKnot.rotation.y = elapsedTime * 0.45;

      ring1.rotation.z = elapsedTime * 0.2;
      ring2.rotation.z = -elapsedTime * 0.25;

      // Orbiters circular path
      orbiter1.position.x = Math.cos(elapsedTime * 1.2) * 2.6;
      orbiter1.position.y = Math.sin(elapsedTime * 1.2) * 2.6;
      orbiter1.position.z = Math.sin(elapsedTime * 0.6) * 1.2;

      orbiter2.position.x = Math.cos(-elapsedTime * 0.9 + 2) * 3.0;
      orbiter2.position.y = Math.sin(-elapsedTime * 0.9 + 2) * 2.2;
      orbiter2.position.z = Math.cos(elapsedTime * 0.9) * 1.5;

      orbiter3.position.x = Math.sin(elapsedTime * 1.5) * 2.1;
      orbiter3.position.y = Math.cos(elapsedTime * 1.5) * 2.1;

      particles.rotation.y = elapsedTime * 0.04;

      // Smooth mouse follow interpolation
      targetRotationY = mouseX * 0.6;
      targetRotationX = mouseY * 0.6;

      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.06;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="hero-3d-wrapper">
      {/* Three.js 3D WebGL Canvas */}
      <div ref={mountRef} className="hero-3d-canvas-container" />

      {/* Floating 3D Interactive UI Badges (Framer Motion + Parallax Depth) */}
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

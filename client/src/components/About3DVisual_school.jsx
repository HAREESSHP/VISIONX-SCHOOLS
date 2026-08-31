import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export default function About3DVisual() {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const width = currentMount.clientWidth || 450;
    const height = currentMount.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Central rotating globe (Earth/World)
    const globeGeo = new THREE.SphereGeometry(1.2, 64, 64);
    const globeMat = new THREE.MeshPhysicalMaterial({
      color: 0x2E7D32,
      emissive: 0x1B5E20,
      roughness: 0.18,
      metalness: 0.3,
      clearcoat: 0.9,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    group.add(globe);

    // Wireframe overlay on globe
    const globeWireMat = new THREE.MeshBasicMaterial({
      color: 0xFFC107,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const globeWire = new THREE.Mesh(globeGeo, globeWireMat);
    globeWire.scale.set(1.02, 1.02, 1.02);
    group.add(globeWire);

    // Rotating books stacked around globe
    const bookColors = [0xFF6B6B, 0x4ECDC4, 0xFFE66D, 0x95E1D3];
    const books = [];
    
    for (let i = 0; i < 4; i++) {
      const bookGeo = new THREE.BoxGeometry(0.4, 1.2, 0.25);
      const bookMat = new THREE.MeshPhysicalMaterial({
        color: bookColors[i],
        emissive: bookColors[i],
        metalness: 0.4,
        roughness: 0.3,
        clearcoat: 0.7,
      });
      const book = new THREE.Mesh(bookGeo, bookMat);
      group.add(book);
      books.push({
        mesh: book,
        baseAngle: (i / 4) * Math.PI * 2,
        orbitSpeed: 0.4 + i * 0.1,
        distance: 2.5,
      });
    }

    // Rotating graduation caps (tetrahedrons)
    const capGeo = new THREE.TetrahedronGeometry(0.3);
    const capColors = [0x1A237E, 0x2C3E50, 0x1B5E20];
    const caps = [];

    for (let i = 0; i < 3; i++) {
      const capMat = new THREE.MeshPhysicalMaterial({
        color: capColors[i],
        emissive: capColors[i],
        metalness: 0.6,
        roughness: 0.25,
        clearcoat: 0.8,
      });
      const cap = new THREE.Mesh(capGeo, capMat);
      group.add(cap);
      caps.push({
        mesh: cap,
        baseAngle: (i / 3) * Math.PI * 2 + 1,
        orbitSpeed: 0.6 + i * 0.12,
        distance: 3.5,
      });
    }

    // Enhanced lighting for school theme
    const ambientLight = new THREE.AmbientLight(0xFDFCFA, 1.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xFFE66D, 2.8, 70);
    pointLight1.position.set(6, 5, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x2E7D32, 2, 60);
    pointLight2.position.set(-5, -4, -3);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x4ECDC4, 1.8, 50);
    pointLight3.position.set(3, -5, 3);
    scene.add(pointLight3);

    // Animation Loop
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Rotate central globe
      globe.rotation.y = t * 0.35;
      globe.rotation.x = Math.sin(t * 0.5) * 0.15;
      globeWire.rotation.y = t * 0.35;
      globeWire.rotation.x = Math.sin(t * 0.5) * 0.15;

      // Animate books orbiting around globe
      books.forEach((book) => {
        const angle = t * book.orbitSpeed + book.baseAngle;
        book.mesh.position.x = Math.cos(angle) * book.distance;
        book.mesh.position.y = Math.sin(angle * 0.6) * 1.5;
        book.mesh.position.z = Math.sin(angle * 0.4) * 2;
        book.mesh.rotation.x = t * 1.2;
        book.mesh.rotation.y = angle;
        book.mesh.rotation.z = Math.sin(t * 1.5) * 0.3;
      });

      // Animate graduation caps orbiting
      caps.forEach((cap) => {
        const angle = t * cap.orbitSpeed + cap.baseAngle;
        cap.mesh.position.x = Math.cos(angle) * cap.distance;
        cap.mesh.position.y = Math.sin(angle * 0.7) * 2;
        cap.mesh.position.z = Math.sin(angle * 0.5) * 2.5;
        cap.mesh.rotation.x = t * 2;
        cap.mesh.rotation.y = t * 2.3;
        cap.mesh.rotation.z = angle;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!currentMount) return;
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="about-3d-visual-wrapper">
      <div ref={mountRef} className="about-3d-canvas" />

      {/* Floating 3D Stat Badges with parallax */}
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

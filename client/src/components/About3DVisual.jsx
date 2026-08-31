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

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 6.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Central rotating torus (ring shape)
    const torusGeo = new THREE.TorusGeometry(1.5, 0.45, 32, 100);
    const torusMat = new THREE.MeshPhysicalMaterial({
      color: 0xC4A369,
      emissive: 0x7A5C3A,
      roughness: 0.12,
      metalness: 0.7,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = 0.4;
    group.add(torus);

    // Secondary rotating torus (different axis)
    const torus2Geo = new THREE.TorusGeometry(1.8, 0.35, 32, 100);
    const torus2Mat = new THREE.MeshPhysicalMaterial({
      color: 0x7B68D1,
      emissive: 0x4A3B7D,
      roughness: 0.15,
      metalness: 0.6,
      clearcoat: 0.8,
    });
    const torus2 = new THREE.Mesh(torus2Geo, torus2Mat);
    torus2.rotation.y = 0.6;
    group.add(torus2);

    // Central core sphere
    const coreGeo = new THREE.IcosahedronGeometry(0.5, 4);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0xFF6B35,
      emissive: 0xFF4500,
      roughness: 0.1,
      metalness: 0.8,
      clearcoat: 1.0,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Orbiting color-changing nodes
    const orbits = [];
    const colors = [0xFF6B6B, 0xF5A623, 0x4ECDC4, 0xA29BFE];
    for (let i = 0; i < 4; i++) {
      const nodeGeo = new THREE.SphereGeometry(0.25, 32, 32);
      const nodeMat = new THREE.MeshPhysicalMaterial({
        color: colors[i],
        emissive: colors[i],
        metalness: 0.7,
        roughness: 0.2,
        clearcoat: 0.9,
      });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      group.add(node);
      orbits.push({ mesh: node, angle: (i / 4) * Math.PI * 2, speed: 0.5 + i * 0.15 });
    }

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xFDFCFA, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xFF6B35, 3, 60);
    pointLight1.position.set(6, 5, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x7B68D1, 2.5, 60);
    pointLight2.position.set(-5, -4, -3);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x4ECDC4, 2, 50);
    pointLight3.position.set(3, -6, 2);
    scene.add(pointLight3);

    // Animation Loop
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Rotate tori
      torus.rotation.z = t * 0.6;
      torus2.rotation.x = t * 0.4;
      torus2.rotation.z = t * 0.3;

      // Rotate and pulse core
      core.rotation.x = t * 0.8;
      core.rotation.y = t * 1.1;
      core.scale.set(
        1 + Math.sin(t * 2.5) * 0.08,
        1 + Math.sin(t * 2.5) * 0.08,
        1 + Math.sin(t * 2.5) * 0.08
      );

      // Animate orbiting nodes
      orbits.forEach((orbit, idx) => {
        const angle = t * orbit.speed + orbit.angle;
        orbit.mesh.position.x = Math.cos(angle) * 3.2;
        orbit.mesh.position.y = Math.sin(angle * 0.7) * 2.5;
        orbit.mesh.position.z = Math.sin(angle * 0.5) * 2.8;
        orbit.mesh.rotation.x = t * 2;
        orbit.mesh.rotation.y = t * 2.5;
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

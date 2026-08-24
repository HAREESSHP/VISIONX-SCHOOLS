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
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. Central 3D Icosahedron (Tactile Educational Prism)
    const prismGeo = new THREE.IcosahedronGeometry(1.5, 0);
    const prismMat = new THREE.MeshPhysicalMaterial({
      color: 0xC4A369, // Golden Tan
      emissive: 0x2B2724,
      roughness: 0.2,
      metalness: 0.3,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const prism = new THREE.Mesh(prismGeo, prismMat);
    group.add(prism);

    // Wireframe overlay for 3D architectural look
    const wireMat = new THREE.MeshBasicMaterial({ color: 0xF5EDE0, wireframe: true, transparent: true, opacity: 0.4 });
    const wireMesh = new THREE.Mesh(prismGeo, wireMat);
    wireMesh.scale.set(1.02, 1.02, 1.02);
    group.add(wireMesh);

    // 2. Orbiting 3D Learning Nodes (Cubes & Spheres)
    const cubeGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35);
    const cubeMat = new THREE.MeshStandardMaterial({ color: 0xB5602E, metalness: 0.5, roughness: 0.2 });
    
    const node1 = new THREE.Mesh(cubeGeo, cubeMat);
    const node2 = new THREE.Mesh(cubeGeo, cubeMat);
    const node3 = new THREE.Mesh(cubeGeo, cubeMat);
    group.add(node1, node2, node3);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xFDFCFA, 1.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xFFE4D6, 3, 50);
    pointLight.position.set(4, 5, 4);
    scene.add(pointLight);

    const backLight = new THREE.PointLight(0xB5602E, 2, 50);
    backLight.position.set(-4, -4, -2);
    scene.add(backLight);

    // Animation Loop
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      prism.rotation.x = t * 0.25;
      prism.rotation.y = t * 0.35;
      wireMesh.rotation.x = t * 0.25;
      wireMesh.rotation.y = t * 0.35;

      node1.position.x = Math.cos(t * 1.1) * 2.3;
      node1.position.y = Math.sin(t * 1.1) * 2.3;
      node1.rotation.x = t * 2;

      node2.position.x = Math.cos(t * 0.8 + 2) * 2.5;
      node2.position.z = Math.sin(t * 0.8 + 2) * 2.5;
      node2.rotation.y = t * 1.5;

      node3.position.y = Math.sin(t * 1.4 + 4) * 2.2;
      node3.position.z = Math.cos(t * 1.4 + 4) * 2.2;
      node3.rotation.z = t * 2;

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

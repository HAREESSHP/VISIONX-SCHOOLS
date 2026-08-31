import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export default function Hero3DThreeScene() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const groupRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xffffff);
    scene.fog = new THREE.Fog(0xffffff, 100, 1000);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create group for all 3D objects
    const group = new THREE.Group();
    scene.add(group);
    groupRef.current = group;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x4a7c9e, 1, 100);
    pointLight1.position.set(20, 20, 20);
    pointLight1.castShadow = true;
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xc4a369, 0.8, 100);
    pointLight2.position.set(-20, -15, 20);
    scene.add(pointLight2);

    // Create central sphere with torus
    const sphereGeometry = new THREE.IcosahedronGeometry(8, 4);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x4a7c9e,
      emissive: 0x2a5c8e,
      shininess: 100,
      wireframe: false,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    group.add(sphere);

    // Create rotating rings
    const createRing = (radius, color, widthSegments = 32) => {
      const geometry = new THREE.BufferGeometry();
      const points = [];
      for (let i = 0; i <= widthSegments; i++) {
        const angle = (i / widthSegments) * Math.PI * 2;
        points.push(
          new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0)
        );
      }
      geometry.setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color, linewidth: 2 });
      return new THREE.Line(geometry, material);
    };

    const ring1 = createRing(12, 0xc4a369);
    ring1.rotation.x = Math.PI / 4;
    group.add(ring1);

    const ring2 = createRing(14, 0x6c7d8e);
    ring2.rotation.y = Math.PI / 3;
    group.add(ring2);

    const ring3 = createRing(16, 0x4a7c9e);
    ring3.rotation.z = Math.PI / 6;
    group.add(ring3);

    // Create particle system
    const particleCount = 60;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 60;
      positions[i + 1] = (Math.random() - 0.5) * 60;
      positions[i + 2] = (Math.random() - 0.5) * 60;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x4a7c9e,
      size: 0.4,
      sizeAttenuation: true,
      opacity: 0.4,
      transparent: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);
    particlesRef.current = particleGeometry.attributes.position.array;

    // Mouse interaction
    const mouse = { x: 0, y: 0 };
    const windowHalf = {
      x: containerRef.current.clientWidth / 2,
      y: containerRef.current.clientHeight / 2,
    };

    const onMouseMove = (event) => {
      mouse.x = (event.clientX - windowHalf.x) / windowHalf.x;
      mouse.y = (event.clientY - windowHalf.y) / windowHalf.y;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Rotate objects
      sphere.rotation.x += 0.002;
      sphere.rotation.y += 0.003;

      ring1.rotation.x += 0.001;
      ring1.rotation.y += 0.002;

      ring2.rotation.y += 0.0015;
      ring2.rotation.z += 0.0008;

      ring3.rotation.z += 0.0012;
      ring3.rotation.x += 0.0006;

      // Mouse-based interaction
      group.rotation.x = mouse.y * 0.3;
      group.rotation.y = mouse.x * 0.3;

      // Animate particles
      if (particlesRef.current) {
        const positions = particlesRef.current;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += (Math.random() - 0.5) * 0.1;
          positions[i + 1] += (Math.random() - 0.5) * 0.1;
          positions[i + 2] += (Math.random() - 0.5) * 0.1;
        }
        particleGeometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="hero-3d-wrapper">
      <div ref={containerRef} className="hero-3d-canvas-container" />

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

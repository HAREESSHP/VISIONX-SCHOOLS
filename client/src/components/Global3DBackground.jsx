import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useLocation } from 'react-router-dom';

/**
 * Global3DBackground
 * Full-site ambient 3D canvas with interactive particle field,
 * floating geometric polyhedra (torus, icosahedron, dodecahedron),
 * soft lighting, and mouse / scroll parallax.
 */
export default function Global3DBackground() {
  const mountRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // --- 1. Scene & Camera Setup ---
    const scene = new THREE.Scene();

    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    mount.appendChild(renderer.domElement);

    // --- 2. Lighting ---
    const ambientLight = new THREE.AmbientLight(0xFDFCFA, 1.2);
    scene.add(ambientLight);

    const pointLightWarm = new THREE.PointLight(0xDF8958, 2.5, 30);
    pointLightWarm.position.set(6, 6, 8);
    scene.add(pointLightWarm);

    const pointLightGold = new THREE.PointLight(0xC4A369, 2.0, 30);
    pointLightGold.position.set(-6, -5, 6);
    scene.add(pointLightGold);

    // --- 3. Star Dust / Particle Grid ---
    const particleCount = 220;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 32;
      particlePositions[i + 1] = (Math.random() - 0.5) * 32;
      particlePositions[i + 2] = (Math.random() - 0.5) * 20 - 2;
      particleScales[i / 3] = Math.random() * 0.08 + 0.02;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xF5EDE0,
      size: 0.12,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- 4. Floating 3D Geometric Entities ---
    const floatingGroup = new THREE.Group();
    scene.add(floatingGroup);

    // Materials tailored to brand palette
    const matTerracotta = new THREE.MeshPhysicalMaterial({
      color: 0xB5602E,
      roughness: 0.35,
      metalness: 0.25,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      transparent: true,
      opacity: 0.85
    });

    const matGold = new THREE.MeshPhysicalMaterial({
      color: 0xC4A369,
      roughness: 0.2,
      metalness: 0.6,
      clearcoat: 0.9,
      transparent: true,
      opacity: 0.88
    });

    const matSage = new THREE.MeshStandardMaterial({
      color: 0x8DAE78,
      roughness: 0.4,
      metalness: 0.15,
      transparent: true,
      opacity: 0.8
    });

    const matWire = new THREE.MeshBasicMaterial({
      color: 0xF5EDE0,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });

    // Shapes array for animation updates
    const floatingMeshes = [];

    // 4a. Torus Ring Left
    const torusGeo = new THREE.TorusGeometry(2.2, 0.12, 16, 64);
    const torusMesh = new THREE.Mesh(torusGeo, matGold);
    torusMesh.position.set(-8, 3, -4);
    torusMesh.rotation.x = Math.PI / 4;
    floatingGroup.add(torusMesh);
    floatingMeshes.push({ mesh: torusMesh, rotSpeedX: 0.003, rotSpeedY: 0.005, floatSpeed: 0.7, offset: 0, baseY: 3 });

    // 4b. Icosahedron Right
    const icoGeo = new THREE.IcosahedronGeometry(1.6, 0);
    const icoMesh = new THREE.Mesh(icoGeo, matTerracotta);
    icoMesh.position.set(8.5, -2, -3);
    const icoWire = new THREE.Mesh(icoGeo, matWire);
    icoWire.scale.set(1.05, 1.05, 1.05);
    icoMesh.add(icoWire);
    floatingGroup.add(icoMesh);
    floatingMeshes.push({ mesh: icoMesh, rotSpeedX: 0.004, rotSpeedY: 0.006, floatSpeed: 0.9, offset: 1.5, baseY: -2 });

    // 4c. Dodecahedron Top Right
    const dodecaGeo = new THREE.DodecahedronGeometry(1.1, 0);
    const dodecaMesh = new THREE.Mesh(dodecaGeo, matSage);
    dodecaMesh.position.set(6.5, 5.5, -5);
    floatingGroup.add(dodecaMesh);
    floatingMeshes.push({ mesh: dodecaMesh, rotSpeedX: 0.005, rotSpeedZ: 0.004, floatSpeed: 1.1, offset: 3, baseY: 5.5 });

    // 4d. Floating Octahedron Bottom Left
    const octaGeo = new THREE.OctahedronGeometry(1.3, 0);
    const octaMesh = new THREE.Mesh(octaGeo, matGold);
    octaMesh.position.set(-7, -4.5, -4);
    const octaWire = new THREE.Mesh(octaGeo, matWire);
    octaWire.scale.set(1.06, 1.06, 1.06);
    octaMesh.add(octaWire);
    floatingGroup.add(octaMesh);
    floatingMeshes.push({ mesh: octaMesh, rotSpeedY: 0.007, rotSpeedZ: 0.003, floatSpeed: 0.8, offset: 4.5, baseY: -4.5 });

    // 4e. Small satellite spheres scattered
    const sphereGeo = new THREE.SphereGeometry(0.35, 24, 24);
    const sphere1 = new THREE.Mesh(sphereGeo, matTerracotta);
    sphere1.position.set(-4, 6, -3);
    floatingGroup.add(sphere1);
    floatingMeshes.push({ mesh: sphere1, rotSpeedX: 0.01, rotSpeedY: 0.01, floatSpeed: 1.3, offset: 2, baseY: 6 });

    const sphere2 = new THREE.Mesh(sphereGeo, matGold);
    sphere2.position.set(4, -6, -2);
    floatingGroup.add(sphere2);
    floatingMeshes.push({ mesh: sphere2, rotSpeedX: 0.01, rotSpeedY: 0.01, floatSpeed: 1.2, offset: 5, baseY: -6 });

    // --- 5. Mouse Parallax & Scroll Listeners ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      scrollY = window.scrollY || document.documentElement.scrollTop;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // --- 6. Resize Handler ---
    const onResize = () => {
      if (!mount) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // --- 7. Animation Loop ---
    let animId;
    const clock = new THREE.Clock();
    let isVisible = true;

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      targetX += (mouseX * 0.7 - targetX) * 0.04;
      targetY += (mouseY * 0.7 - targetY) * 0.04;
      targetScrollY += ((scrollY * 0.003) - targetScrollY) * 0.05;

      // Group rotation and tilt based on mouse & scroll
      floatingGroup.rotation.y = targetX * 0.35 + elapsedTime * 0.02;
      floatingGroup.rotation.x = -targetY * 0.25 - targetScrollY * 0.15;
      camera.position.y = -targetScrollY * 0.8;

      // Particle rotation
      particles.rotation.y = elapsedTime * 0.015;
      particles.rotation.x = elapsedTime * 0.008;

      // Dynamic light tracking
      pointLightWarm.position.x = 6 + targetX * 3;
      pointLightWarm.position.y = 6 - targetY * 3;
      pointLightGold.position.x = -6 - targetX * 3;

      // Individual mesh floating behavior
      floatingMeshes.forEach((item) => {
        item.mesh.rotation.x += item.rotSpeedX || 0.002;
        if (item.rotSpeedY) item.mesh.rotation.y += item.rotSpeedY;
        if (item.rotSpeedZ) item.mesh.rotation.z += item.rotSpeedZ;

        // Gentle vertical bobbing
        item.mesh.position.y = item.baseY + Math.sin(elapsedTime * item.floatSpeed + item.offset) * 0.45;
      });

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animId);

      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="global-3d-canvas-container"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    />
  );
}

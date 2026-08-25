import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

/**
 * Login3DVisual
 * Interactive 3D Holographic Student/Admin Pass with tactile gold & terracotta materials,
 * orbiting crystal rings, and smooth mouse-follow tilt.
 */
export default function Login3DVisual({ isAdmin = false }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const width = mount.clientWidth || 320;
    const height = mount.clientHeight || 320;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central 3D Card / Badge
    // Rounded Card geometry using Extrude
    const cardShape = new THREE.Shape();
    const w = 1.3, h = 1.8, r = 0.2;
    cardShape.moveTo(-w + r, -h);
    cardShape.lineTo(w - r, -h);
    cardShape.quadraticCurveTo(w, -h, w, -h + r);
    cardShape.lineTo(w, h - r);
    cardShape.quadraticCurveTo(w, h, w - r, h);
    cardShape.lineTo(-w + r, h);
    cardShape.quadraticCurveTo(-w, h, -w, h - r);
    cardShape.lineTo(-w, -h + r);
    cardShape.quadraticCurveTo(-w, -h, -w + r, -h);

    const extrudeSettings = {
      depth: 0.12,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05
    };

    const cardGeo = new THREE.ExtrudeGeometry(cardShape, extrudeSettings);
    cardGeo.center();

    // Material: Tactile metallic gold or charcoal
    const cardMat = new THREE.MeshPhysicalMaterial({
      color: isAdmin ? 0x3D2B1F : 0xB5602E,
      emissive: isAdmin ? 0x2B1E15 : 0x3D2B1F,
      roughness: 0.25,
      metalness: 0.4,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
      reflectivity: 0.95
    });

    const badgeMesh = new THREE.Mesh(cardGeo, cardMat);
    mainGroup.add(badgeMesh);

    // Inner Crest Shield / Emblem on Card
    const emblemGeo = new THREE.OctahedronGeometry(0.45, 0);
    const emblemMat = new THREE.MeshStandardMaterial({
      color: 0xC4A369,
      metalness: 0.85,
      roughness: 0.15
    });
    const emblem = new THREE.Mesh(emblemGeo, emblemMat);
    emblem.position.z = 0.22;
    mainGroup.add(emblem);

    // 2. Orbiting Holographic Rings
    const ringGeo = new THREE.TorusGeometry(2.1, 0.03, 16, 80);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xC4A369,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.75
    });

    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    mainGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.x = -Math.PI / 3.5;
    ring2.rotation.y = Math.PI / 4;
    ring2.scale.set(1.1, 1.1, 1.1);
    mainGroup.add(ring2);

    // 3. Orbiting XP Spheres
    const orbGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const orbMat = new THREE.MeshStandardMaterial({ color: 0xF5EDE0, metalness: 0.6, roughness: 0.2 });
    const orb1 = new THREE.Mesh(orbGeo, orbMat);
    const orb2 = new THREE.Mesh(orbGeo, orbMat);
    mainGroup.add(orb1, orb2);

    // Lighting
    const amb = new THREE.AmbientLight(0xFDFCFA, 1.5);
    scene.add(amb);

    const light1 = new THREE.DirectionalLight(0xFFE4D6, 2.8);
    light1.position.set(4, 5, 5);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xC4A369, 1.8);
    light2.position.set(-4, -4, 3);
    scene.add(light2);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Badge subtle idle floating
      badgeMesh.rotation.y = Math.sin(t * 0.8) * 0.15;
      badgeMesh.rotation.x = Math.cos(t * 0.6) * 0.1;
      
      // Emblem spin
      emblem.rotation.y = t * 1.2;
      emblem.rotation.z = t * 0.8;

      // Rings spin
      ring1.rotation.z = t * 0.3;
      ring2.rotation.z = -t * 0.35;

      // Orb paths
      orb1.position.x = Math.cos(t * 1.5) * 2.1;
      orb1.position.y = Math.sin(t * 1.5) * 2.1;
      orb1.position.z = Math.sin(t * 0.8) * 0.8;

      orb2.position.x = Math.cos(-t * 1.2 + 2) * 2.3;
      orb2.position.y = Math.sin(-t * 1.2 + 2) * 2.3;
      orb2.position.z = Math.cos(t * 0.8) * 0.8;

      // Smooth mouse follow
      mainGroup.rotation.y += (mouseX * 0.6 - mainGroup.rotation.y) * 0.08;
      mainGroup.rotation.x += (-mouseY * 0.6 - mainGroup.rotation.x) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isAdmin]);

  return (
    <div className="login-3d-visual-container">
      <div ref={mountRef} className="login-3d-canvas" />
    </div>
  );
}

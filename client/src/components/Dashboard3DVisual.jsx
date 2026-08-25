import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Dashboard3DVisual
 * Interactive 3D Trophy / Achievement Crest with floating star nodes
 * and mouse-responsive gyro rotation.
 */
export default function Dashboard3DVisual({ streak = 0, xp = 0 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const width = mount.clientWidth || 260;
    const height = mount.clientHeight || 200;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.0;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. Central Diamond Crest
    const diamondGeo = new THREE.OctahedronGeometry(1.2, 0);
    const diamondMat = new THREE.MeshPhysicalMaterial({
      color: 0xC4A369, // Gold
      emissive: 0x3D2B1F,
      roughness: 0.15,
      metalness: 0.75,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.95
    });
    const diamond = new THREE.Mesh(diamondGeo, diamondMat);
    group.add(diamond);

    // 2. Wireframe Cage
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xF5EDE0,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const wireMesh = new THREE.Mesh(diamondGeo, wireMat);
    wireMesh.scale.set(1.08, 1.08, 1.08);
    group.add(wireMesh);

    // 3. Orbiting Rings
    const ringGeo = new THREE.TorusGeometry(1.9, 0.035, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xB5602E,
      metalness: 0.8,
      roughness: 0.25,
      transparent: true,
      opacity: 0.8
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.scale.set(1.15, 1.15, 1.15);
    group.add(ring2);

    // 4. Floating XP Satellites
    const satGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const satMatGold = new THREE.MeshStandardMaterial({ color: 0xF5EDE0, metalness: 0.7 });
    const sat1 = new THREE.Mesh(satGeo, satMatGold);
    const sat2 = new THREE.Mesh(satGeo, satMatGold);
    const sat3 = new THREE.Mesh(satGeo, satMatGold);
    group.add(sat1, sat2, sat3);

    // Lighting
    const amb = new THREE.AmbientLight(0xFDFCFA, 1.6);
    scene.add(amb);

    const light1 = new THREE.DirectionalLight(0xFFE4D6, 2.5);
    light1.position.set(4, 5, 4);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xC4A369, 1.8);
    light2.position.set(-4, -4, 2);
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

      // Diamond rotation
      diamond.rotation.y = t * 0.45;
      diamond.rotation.x = Math.sin(t * 0.3) * 0.2;
      wireMesh.rotation.y = t * 0.45;
      wireMesh.rotation.x = Math.sin(t * 0.3) * 0.2;

      // Rings
      ring1.rotation.z = t * 0.25;
      ring2.rotation.z = -t * 0.3;

      // Satellites
      sat1.position.x = Math.cos(t * 1.6) * 2.0;
      sat1.position.y = Math.sin(t * 1.6) * 2.0;
      sat1.position.z = Math.sin(t * 0.8) * 0.6;

      sat2.position.x = Math.cos(-t * 1.2 + 2) * 2.2;
      sat2.position.y = Math.sin(-t * 1.2 + 2) * 1.5;
      sat2.position.z = Math.cos(t * 1.2) * 0.8;

      sat3.position.x = Math.sin(t * 1.4 + 4) * 1.8;
      sat3.position.y = Math.cos(t * 1.4 + 4) * 1.8;

      // Mouse follow
      group.rotation.y += (mouseX * 0.5 - group.rotation.y) * 0.08;
      group.rotation.x += (-mouseY * 0.5 - group.rotation.x) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix;
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
  }, [streak, xp]);

  return (
    <div className="dashboard-3d-visual-wrapper">
      <div ref={mountRef} className="dashboard-3d-canvas" />
    </div>
  );
}

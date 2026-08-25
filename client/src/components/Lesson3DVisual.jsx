import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Lesson3DVisual
 * Interactive 3D Audio Reactive Orb / Frequency Sphere that pulses
 * and undulates dynamically during speech and listening exercises.
 */
export default function Lesson3DVisual({ isRecording = false, isSpeaking = false, text = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const width = mount.clientWidth || 220;
    const height = mount.clientHeight || 220;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. Central Morphing Audio Sphere
    const sphereGeo = new THREE.IcosahedronGeometry(1.2, 4);
    // Store initial positions for noise vertex displacement
    const originalPositions = sphereGeo.attributes.position.array.slice();

    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: isRecording ? 0xDF8958 : (isSpeaking ? 0xC4A369 : 0xB5602E),
      emissive: isRecording ? 0x984E22 : 0x3D2B1F,
      roughness: 0.2,
      metalness: 0.4,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const audioOrb = new THREE.Mesh(sphereGeo, sphereMat);
    group.add(audioOrb);

    // 2. Wireframe Energy Shell
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xF5EDE0,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireOrb = new THREE.Mesh(sphereGeo, wireMat);
    wireOrb.scale.set(1.04, 1.04, 1.04);
    group.add(wireOrb);

    // 3. Orbiting Soundwave Ring
    const waveRingGeo = new THREE.TorusGeometry(1.65, 0.025, 16, 64);
    const waveRingMat = new THREE.MeshStandardMaterial({
      color: 0xC4A369,
      metalness: 0.7,
      roughness: 0.2,
      transparent: true,
      opacity: 0.7,
    });
    const waveRing = new THREE.Mesh(waveRingGeo, waveRingMat);
    waveRing.rotation.x = Math.PI / 2.5;
    group.add(waveRing);

    // Lighting
    const amb = new THREE.AmbientLight(0xFDFCFA, 1.6);
    scene.add(amb);

    const light1 = new THREE.PointLight(0xFFE4D6, 3, 50);
    light1.position.set(3, 4, 3);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xDF8958, 2, 50);
    light2.position.set(-3, -3, 2);
    scene.add(light2);

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      const intensity = isRecording ? 0.35 : (isSpeaking ? 0.22 : 0.08);
      const speed = isRecording ? 6.0 : 2.5;

      // Vertex ripple deformation for audio wave feel
      const positionAttribute = sphereGeo.attributes.position;
      const positions = positionAttribute.array;

      for (let i = 0; i < positions.length; i += 3) {
        const ox = originalPositions[i];
        const oy = originalPositions[i + 1];
        const oz = originalPositions[i + 2];

        const wave = Math.sin(ox * 2 + t * speed) * Math.cos(oy * 2 + t * speed) * intensity;
        const length = Math.sqrt(ox * ox + oy * oy + oz * oz);
        const factor = 1 + wave / length;

        positions[i] = ox * factor;
        positions[i + 1] = oy * factor;
        positions[i + 2] = oz * factor;
      }
      positionAttribute.needsUpdate = true;
      sphereGeo.computeVertexNormals();

      // Rotation
      audioOrb.rotation.y = t * 0.4;
      audioOrb.rotation.x = t * 0.2;
      wireOrb.rotation.y = t * 0.4;
      wireOrb.rotation.x = t * 0.2;
      waveRing.rotation.z = t * 0.5;

      // Dynamic scale pulse on recording
      if (isRecording) {
        const pulse = 1 + Math.sin(t * 8) * 0.06;
        group.scale.set(pulse, pulse, pulse);
      } else {
        group.scale.set(1, 1, 1);
      }

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
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      sphereGeo.dispose();
      sphereMat.dispose();
      renderer.dispose();
    };
  }, [isRecording, isSpeaking]);

  return (
    <div className="lesson-3d-audio-orb-container">
      <div ref={mountRef} className="lesson-3d-canvas" />
    </div>
  );
}

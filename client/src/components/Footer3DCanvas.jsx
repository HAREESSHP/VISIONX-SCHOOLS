import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Footer3DCanvas - Option 4: Neural Synapse Network
 * 
 * Generates an organic 3D neural constellation with:
 * - Glowing synaptic junction nodes drifting dynamically
 * - Laser-thin synaptic axon filaments linking neighboring nodes
 * - Interactive magnetic attraction towards cursor
 * - Subtle energetic neural signal pulses
 */
export default function Footer3DCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    mount.appendChild(renderer.domElement);

    // 2. Helper: Circular Glow Texture for Synaptic Nodes
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(155, 182, 255, 0.9)');
      gradient.addColorStop(0.5, 'rgba(123, 150, 212, 0.35)');
      gradient.addColorStop(1, 'rgba(22, 24, 27, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    const glowTexture = createGlowTexture();

    // 3. Neural Nodes Setup
    const nodeCount = 110;
    const bounds = { x: 38, y: 20, z: 12 };

    const nodesData = [];
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);

    const baseColorA = new THREE.Color(0x9bb6ff); // Periwinkle
    const baseColorB = new THREE.Color(0x7b96d4); // Slate Cyan
    const highlightColor = new THREE.Color(0xffffff); // White Spark

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * bounds.x * 2;
      const y = (Math.random() - 0.5) * bounds.y * 2;
      const z = (Math.random() - 0.5) * bounds.z * 2 - 2;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const mixed = Math.random() > 0.4 ? baseColorA : baseColorB;
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;

      nodesData.push({
        x,
        y,
        z,
        originX: x,
        originY: y,
        originZ: z,
        vx: (Math.random() - 0.5) * 0.018,
        vy: (Math.random() - 0.5) * 0.018,
        vz: (Math.random() - 0.5) * 0.012,
        pulseSpeed: 1.5 + Math.random() * 2.5,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    nodeGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      size: 1.4,
      map: glowTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodePoints);

    // 4. Synaptic Axon Filaments (Connecting Lines)
    const maxConnections = (nodeCount * (nodeCount - 1)) / 2;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // 5. Mouse Interaction Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseActive = false;

    const handleMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x * (bounds.x * 0.6);
      targetMouseY = y * (bounds.y * 0.6);
      mouseActive = true;
    };

    const handleMouseLeave = () => {
      mouseActive = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    mount.addEventListener('mouseleave', handleMouseLeave);

    // 6. Resize Handler
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let animId;
    const clock = new THREE.Clock();
    let isVisible = true;

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const maxDistance = 7.5;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const time = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Rotate whole network subtly
      scene.rotation.y = Math.sin(time * 0.08) * 0.08 + (mouseX / bounds.x) * 0.12;
      scene.rotation.x = Math.cos(time * 0.06) * 0.05 - (mouseY / bounds.y) * 0.1;

      const pos = nodeGeometry.attributes.position.array;
      const col = nodeGeometry.attributes.color.array;

      // Update node positions and pulse
      for (let i = 0; i < nodeCount; i++) {
        const node = nodesData[i];
        const i3 = i * 3;

        // Natural organic drift
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        // Bounce at boundaries
        if (Math.abs(node.x) > bounds.x) node.vx *= -1;
        if (Math.abs(node.y) > bounds.y) node.vy *= -1;
        if (Math.abs(node.z) > bounds.z) node.vz *= -1;

        // Interactive Cursor Attraction (Synapse Magnetism)
        let currentX = node.x;
        let currentY = node.y;
        let currentZ = node.z;

        if (mouseActive) {
          const dx = mouseX - node.x;
          const dy = mouseY - node.y;
          const distMouse = Math.sqrt(dx * dx + dy * dy);

          if (distMouse < 12) {
            const pullForce = (1 - distMouse / 12) * 0.8;
            currentX += dx * pullForce * 0.12;
            currentY += dy * pullForce * 0.12;
          }
        }

        pos[i3] = currentX;
        pos[i3 + 1] = currentY;
        pos[i3 + 2] = currentZ;

        // Node brightness pulsing
        const pulse = (Math.sin(time * node.pulseSpeed + node.pulseOffset) + 1) * 0.5;
        const targetColor = pulse > 0.85 ? highlightColor : baseColorA;

        col[i3] = THREE.MathUtils.lerp(baseColorB.r, targetColor.r, pulse);
        col[i3 + 1] = THREE.MathUtils.lerp(baseColorB.g, targetColor.g, pulse);
        col[i3 + 2] = THREE.MathUtils.lerp(baseColorB.b, targetColor.b, pulse);
      }

      nodeGeometry.attributes.position.needsUpdate = true;
      nodeGeometry.attributes.color.needsUpdate = true;

      // Build Synapse Lines
      let lineIndex = 0;
      let colorIndex = 0;
      const lPos = lineGeometry.attributes.position.array;
      const lCol = lineGeometry.attributes.color.array;

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const i3 = i * 3;
          const j3 = j * 3;

          const dx = pos[i3] - pos[j3];
          const dy = pos[i3 + 1] - pos[j3 + 1];
          const dz = pos[i3 + 2] - pos[j3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            // Signal alpha fades as nodes move apart
            const strength = Math.pow(1 - dist / maxDistance, 1.4);
            const signalWave = (Math.sin(time * 3 + (pos[i3] + pos[j3]) * 0.3) + 1) * 0.5;
            const r = baseColorA.r * strength * (0.6 + signalWave * 0.4);
            const g = baseColorA.g * strength * (0.6 + signalWave * 0.4);
            const b = baseColorA.b * strength * (0.6 + signalWave * 0.4);

            lPos[lineIndex++] = pos[i3];
            lPos[lineIndex++] = pos[i3 + 1];
            lPos[lineIndex++] = pos[i3 + 2];

            lPos[lineIndex++] = pos[j3];
            lPos[lineIndex++] = pos[j3 + 1];
            lPos[lineIndex++] = pos[j3 + 2];

            lCol[colorIndex++] = r;
            lCol[colorIndex++] = g;
            lCol[colorIndex++] = b;

            lCol[colorIndex++] = r;
            lCol[colorIndex++] = g;
            lCol[colorIndex++] = b;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex / 3);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup on Unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      mount.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animId);

      if (mount && renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }

      glowTexture.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="footer-3d-canvas-container"
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    />
  );
}

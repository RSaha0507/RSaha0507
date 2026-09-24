import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Background3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // ==========================================
    // 1. 3D Amber Neural Sphere / Icosahedron System
    // ==========================================
    const sphereRig = new THREE.Group();
    scene.add(sphereRig);

    // Outer Low-poly Icosahedron Wireframe
    const icoGeometry = new THREE.IcosahedronGeometry(1.6, 1);
    const icoMaterial = new THREE.MeshBasicMaterial({
      color: 0xf59e0b, // Amber 500
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
    sphereRig.add(icoMesh);

    // Inner Glowing Core Dodecahedron
    const coreGeometry = new THREE.DodecahedronGeometry(0.9, 0);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xfbbf24, // Amber 400
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    sphereRig.add(coreMesh);

    // Outer Vertices Point Cloud
    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xffedd5,
      size: 0.12,
      transparent: true,
      opacity: 0.9,
    });
    const pointsMesh = new THREE.Points(icoGeometry, pointsMaterial);
    sphereRig.add(pointsMesh);

    // Double Orbital Rings
    const ringGeo1 = new THREE.RingGeometry(2.1, 2.14, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.28,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    ringMesh1.rotation.y = Math.PI / 6;
    sphereRig.add(ringMesh1);

    const ringGeo2 = new THREE.RingGeometry(2.5, 2.53, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xd97706,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.18,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 4;
    ringMesh2.rotation.z = Math.PI / 4;
    sphereRig.add(ringMesh2);

    // Initial Hero framing position
    sphereRig.position.set(3.0, 0.2, 0);

    // ==========================================
    // 2. Cosmic Ambient Starfield & Neural Particle Dust
    // ==========================================
    const particleCount = 1800;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 45;
      positions[i + 1] = (Math.random() - 0.5) * 45;
      positions[i + 2] = (Math.random() - 0.5) * 30 - 5;
      scales[i / 3] = Math.random() * 0.8 + 0.2;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Particle dot texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 16;
    pCanvas.height = 16;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(251, 191, 36, 0.8)');
      grad.addColorStop(1, 'rgba(251, 191, 36, 0)');
      pCtx.fillStyle = grad;
      pCtx.beginPath();
      pCtx.arc(8, 8, 8, 0, Math.PI * 2);
      pCtx.fill();
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.18,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.6,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // ==========================================
    // 3. Scroll Keyframe Coordinates Interpolation
    // ==========================================
    // Sections: [home, about, education, experience, skills, projects, awards, contact]
    const sectionWaypoints = [
      { id: 'home', pos: [3.2, 0.1, 0], scale: 1.25, rotSpeed: 1.0, opacity: 0.38 },
      { id: 'about', pos: [-4.2, -0.4, -2.2], scale: 0.95, rotSpeed: 0.8, opacity: 0.25 },
      { id: 'education', pos: [3.8, 0.3, -1.2], scale: 1.1, rotSpeed: 0.9, opacity: 0.32 },
      { id: 'experience', pos: [0.0, 0.0, -3.2], scale: 1.45, rotSpeed: 1.2, opacity: 0.3 },
      { id: 'skills', pos: [2.6, 0.9, -0.6], scale: 1.35, rotSpeed: 1.4, opacity: 0.45 },
      { id: 'projects', pos: [-3.8, -0.5, -2.5], scale: 1.05, rotSpeed: 0.7, opacity: 0.25 },
      { id: 'awards', pos: [3.6, -0.2, -1.5], scale: 1.15, rotSpeed: 0.9, opacity: 0.3 },
      { id: 'contact', pos: [0.0, 0.0, -0.6], scale: 1.4, rotSpeed: 1.1, opacity: 0.5 },
    ];

    // Mouse Parallax variables
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // ==========================================
    // 4. Render & Scroll Motion Loop
    // ==========================================
    let animationFrameId: number;
    let isTabActive = true;

    const handleVisibilityChange = () => {
      isTabActive = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Interpolation state
    const currentPos = new THREE.Vector3(3.2, 0.1, 0);
    const targetPos = new THREE.Vector3(3.2, 0.1, 0);
    let currentScale = 1.25;
    let targetScale = 1.25;
    let currentOpacity = 0.38;
    let targetOpacity = 0.38;

    const calculateScrollTarget = () => {
      const scrollY = window.scrollY;

      // Find section proximity
      const sectionElements = sectionWaypoints.map((w) => document.getElementById(w.id));
      const sectionOffsets = sectionElements.map((el) => (el ? el.offsetTop : 0));

      let activeIndex = 0;
      for (let i = 0; i < sectionOffsets.length; i++) {
        if (scrollY >= sectionOffsets[i] - window.innerHeight * 0.4) {
          activeIndex = i;
        }
      }

      const nextIndex = Math.min(activeIndex + 1, sectionWaypoints.length - 1);
      const curOffset = sectionOffsets[activeIndex];
      const nextOffset = sectionOffsets[nextIndex] || curOffset + window.innerHeight;
      const range = Math.max(1, nextOffset - curOffset);
      const localProgress = Math.max(0, Math.min(1, (scrollY - curOffset) / range));

      const fromWp = sectionWaypoints[activeIndex];
      const toWp = sectionWaypoints[nextIndex];

      // Blend positions
      targetPos.x = THREE.MathUtils.lerp(fromWp.pos[0], toWp.pos[0], localProgress);
      targetPos.y = THREE.MathUtils.lerp(fromWp.pos[1], toWp.pos[1], localProgress);
      targetPos.z = THREE.MathUtils.lerp(fromWp.pos[2], toWp.pos[2], localProgress);

      targetScale = THREE.MathUtils.lerp(fromWp.scale, toWp.scale, localProgress);
      targetOpacity = THREE.MathUtils.lerp(fromWp.opacity, toWp.opacity, localProgress);

      // On mobile screens, adjust framing so sphere is never obtrusive
      if (window.innerWidth < 768) {
        targetPos.x *= 0.35;
        targetPos.z -= 1.5;
        targetScale *= 0.75;
      }
    };

    const animate = () => {
      if (isTabActive) {
        calculateScrollTarget();

        // Smooth LERP damping
        currentPos.lerp(targetPos, 0.05);
        currentScale += (targetScale - currentScale) * 0.05;
        currentOpacity += (targetOpacity - currentOpacity) * 0.05;

        mouseX += (targetMouseX - mouseX) * 0.04;
        mouseY += (targetMouseY - mouseY) * 0.04;

        // Apply Position & Scale
        sphereRig.position.copy(currentPos);
        sphereRig.scale.set(currentScale, currentScale, currentScale);

        // Update Opacities
        icoMaterial.opacity = currentOpacity;
        ringMat1.opacity = currentOpacity * 0.8;
        ringMat2.opacity = currentOpacity * 0.6;

        // Self Rotations & Parallax
        sphereRig.rotation.y += 0.005;
        sphereRig.rotation.x += 0.002;
        coreMesh.rotation.y -= 0.008;
        ringMesh1.rotation.z += 0.003;
        ringMesh2.rotation.z -= 0.004;

        // Add mouse parallax offset to sphere and particles
        sphereRig.position.x += mouseX * 0.2;
        sphereRig.position.y -= mouseY * 0.2;

        particles.rotation.y += 0.0003;
        particles.rotation.x = mouseY * 0.05;
        particles.position.x = -mouseX * 0.3;

        renderer.render(scene, camera);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      icoGeometry.dispose();
      icoMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      pointsMaterial.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
    };
  }, []);

  return (
    <>
      {/* 3D WebGL Canvas Layer */}
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{ opacity: 0.95 }}
      />

      {/* Atmospheric Aurora Glows in Background */}
      <div className="aurora-background pointer-events-none z-[-1]">
        <div className="aurora-shape1 opacity-40" />
        <div className="aurora-shape2 opacity-30" />
      </div>
    </>
  );
};

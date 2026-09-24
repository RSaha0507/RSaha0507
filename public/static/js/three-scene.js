import * as THREE from 'three';

// Global 3D WebGL Background Scene with Scroll-driven Animatic Motion
(function initGlobal3DScene() {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const container = document.getElementById('bg-3d-canvas') || document.body;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 7.5;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const canvasEl = renderer.domElement;
  canvasEl.style.position = 'fixed';
  canvasEl.style.top = '0';
  canvasEl.style.left = '0';
  canvasEl.style.width = '100vw';
  canvasEl.style.height = '100vh';
  canvasEl.style.pointerEvents = 'none';
  canvasEl.style.zIndex = '0';

  if (document.getElementById('bg-3d-canvas')) {
    document.getElementById('bg-3d-canvas').appendChild(canvasEl);
  }

  // 1. 3D Amber Neural Sphere Rig
  const sphereRig = new THREE.Group();
  scene.add(sphereRig);

  const icoGeometry = new THREE.IcosahedronGeometry(1.6, 1);
  const icoMaterial = new THREE.MeshBasicMaterial({
    color: 0xf59e0b,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  });
  const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
  sphereRig.add(icoMesh);

  const coreGeometry = new THREE.DodecahedronGeometry(0.9, 0);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0xfbbf24,
    wireframe: true,
    transparent: true,
    opacity: 0.65,
  });
  const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
  sphereRig.add(coreMesh);

  const pointsMaterial = new THREE.PointsMaterial({
    color: 0xffedd5,
    size: 0.12,
    transparent: true,
    opacity: 0.9,
  });
  const pointsMesh = new THREE.Points(icoGeometry, pointsMaterial);
  sphereRig.add(pointsMesh);

  const ringGeo1 = new THREE.RingGeometry(2.1, 2.14, 64);
  const ringMat1 = new THREE.MeshBasicMaterial({
    color: 0xf59e0b,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.28,
  });
  const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
  ringMesh1.rotation.x = Math.PI / 3;
  sphereRig.add(ringMesh1);

  // 2. Cosmic Particle Field
  const particleCount = 1500;
  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 45;
    positions[i + 1] = (Math.random() - 0.5) * 45;
    positions[i + 2] = (Math.random() - 0.5) * 30 - 5;
  }
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMaterial = new THREE.PointsMaterial({
    color: 0xfbbf24,
    size: 0.15,
    transparent: true,
    opacity: 0.5,
  });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  // 3. Section Coordinates
  const sectionWaypoints = [
    { id: 'home', pos: [3.2, 0.1, 0], scale: 1.25, opacity: 0.38 },
    { id: 'about', pos: [-4.2, -0.4, -2.2], scale: 0.95, opacity: 0.25 },
    { id: 'education', pos: [3.8, 0.3, -1.2], scale: 1.1, opacity: 0.32 },
    { id: 'experience', pos: [0.0, 0.0, -3.2], scale: 1.45, opacity: 0.3 },
    { id: 'skills', pos: [2.6, 0.9, -0.6], scale: 1.35, opacity: 0.45 },
    { id: 'projects', pos: [-3.8, -0.5, -2.5], scale: 1.05, opacity: 0.25 },
    { id: 'awards', pos: [3.6, -0.2, -1.5], scale: 1.15, opacity: 0.3 },
    { id: 'contact', pos: [0.0, 0.0, -0.6], scale: 1.4, opacity: 0.5 },
  ];

  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 1.5;
  });

  const currentPos = new THREE.Vector3(3.2, 0.1, 0);
  const targetPos = new THREE.Vector3(3.2, 0.1, 0);
  let currentScale = 1.25;
  let targetScale = 1.25;

  function updateScroll() {
    const scrollY = window.scrollY;
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

    targetPos.x = THREE.MathUtils.lerp(fromWp.pos[0], toWp.pos[0], localProgress);
    targetPos.y = THREE.MathUtils.lerp(fromWp.pos[1], toWp.pos[1], localProgress);
    targetPos.z = THREE.MathUtils.lerp(fromWp.pos[2], toWp.pos[2], localProgress);
    targetScale = THREE.MathUtils.lerp(fromWp.scale, toWp.scale, localProgress);
  }

  function animate() {
    updateScroll();

    currentPos.lerp(targetPos, 0.05);
    currentScale += (targetScale - currentScale) * 0.05;
    mouseX += (targetMouseX - mouseX) * 0.04;
    mouseY += (targetMouseY - mouseY) * 0.04;

    sphereRig.position.copy(currentPos);
    sphereRig.scale.set(currentScale, currentScale, currentScale);
    sphereRig.rotation.y += 0.005;
    sphereRig.rotation.x += 0.002;
    coreMesh.rotation.y -= 0.008;

    sphereRig.position.x += mouseX * 0.2;
    sphereRig.position.y -= mouseY * 0.2;

    particles.rotation.y += 0.0003;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

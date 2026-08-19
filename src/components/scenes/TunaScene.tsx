import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { clone } from 'three/addons/utils/SkeletonUtils.js';

function TunaModel() {
  const gltf = useLoader(GLTFLoader, '/media/models/tuna.glb', (loader) => loader.setMeshoptDecoder(MeshoptDecoder)) as GLTF;
  const scene = useMemo(() => clone(gltf.scene), [gltf.scene]);
  const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);
  const root = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0, scroll: 0 });

  useEffect(() => {
    const clip = gltf.animations.find((animation) => animation.name.includes('Swimming_Normal'));
    if (!clip) return;
    const action = mixer.clipAction(clip);
    action.play();
    return () => { mixer.stopAllAction(); };
  }, [gltf.animations, mixer]);

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    const updateScroll = () => { pointer.current.scroll = window.scrollY; };
    window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
    return () => {
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('scroll', updateScroll);
    };
  }, []);

  useFrame((state, delta) => {
    mixer.update(delta);
    if (!root.current) return;
    root.current.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.05 + Math.sin(pointer.current.scroll * 0.002) * 0.035;
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, Math.PI / 2 + pointer.current.x * 0.07, 3, delta);
    root.current.rotation.z = THREE.MathUtils.damp(root.current.rotation.z, -0.08 + pointer.current.y * -0.035, 3, delta);
  });

  return <group ref={root} scale={1.35} rotation={[0.05, Math.PI / 2, -0.08]}><primitive object={scene} /></group>;
}

export function TunaScene() {
  const [enabled, setEnabled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [overContact, setOverContact] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const canvas = document.createElement('canvas');
    const update = () => setEnabled(!media.matches && Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const update = () => {
      const hero = document.querySelector('.scene--hero');
      if (!hero) return;
      const bounds = hero.getBoundingClientRect();
      setOverHero(bounds.top <= window.innerHeight * 0.45 && bounds.bottom > window.innerHeight * 0.45);
      const contact = document.querySelector('.scene--contact');
      if (contact) {
        const contactBounds = contact.getBoundingClientRect();
        setOverContact(contactBounds.top < window.innerHeight && contactBounds.bottom > 0);
      }
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  if (!enabled) return null;

  return (
    <aside className={`tuna-overlay ${overHero ? 'is-over-hero' : ''} ${overContact ? 'is-over-contact' : ''}`.trim()} aria-hidden="true">
      <Canvas className="tuna-canvas" dpr={[1, 1.25]} camera={{ position: [0, 0, 7.4], fov: 32 }} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}>
        <ambientLight intensity={1.7} />
        <directionalLight position={[3, 4, 4]} intensity={2.2} />
        <directionalLight position={[-3, -1, 2]} intensity={0.65} color="#fbcf15" />
        <Suspense fallback={null}><TunaModel /></Suspense>
      </Canvas>
    </aside>
  );
}

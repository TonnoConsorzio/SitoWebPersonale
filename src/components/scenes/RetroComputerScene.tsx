import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState, Suspense, type RefObject } from 'react';
import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

type RetroComputerSceneProps = { sectionRef: RefObject<HTMLElement | null> };

function useHeroScroll(sectionRef: RefObject<HTMLElement | null>) {
  const progress = useRef(0);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      progress.current = THREE.MathUtils.clamp(-section.getBoundingClientRect().top / window.innerHeight, 0, 1);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [sectionRef]);

  return progress;
}

function Computer({ sectionRef, reducedMotion }: RetroComputerSceneProps & { reducedMotion: boolean }) {
  const gltf = useLoader(GLTFLoader, '/media/models/retro-computer.glb', (loader) => loader.setMeshoptDecoder(MeshoptDecoder)) as GLTF;
  const model = useMemo(() => {
    const clone = gltf.scene.clone(true);
    clone.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });
    return clone;
  }, [gltf.scene]);
  const root = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useHeroScroll(sectionRef);

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', updatePointer, { passive: true });
    return () => window.removeEventListener('pointermove', updatePointer);
  }, []);

  useFrame((state, delta) => {
    if (!root.current || reducedMotion) return;
    const progress = scroll.current;
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -0.12 + pointer.current.y * 0.055, 3.6, delta);
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, -0.62 + pointer.current.x * 0.075 - progress * 0.18, 3.6, delta);
    root.current.rotation.z = THREE.MathUtils.damp(root.current.rotation.z, pointer.current.x * -0.025, 3.6, delta);
    root.current.position.y = THREE.MathUtils.damp(root.current.position.y, -0.04 - progress * 0.22, 3.2, delta);
    root.current.position.x = THREE.MathUtils.damp(root.current.position.x, progress * -0.14, 3.2, delta);
    const scale = THREE.MathUtils.damp(root.current.scale.x, 1.5 * (1 - progress * 0.04), 3.2, delta);
    root.current.scale.setScalar(scale);
  });

  return <group ref={root} scale={1.5} position={[0, -0.04, 0]} rotation={[-0.1, -0.62, -0.01]}><primitive object={model} /></group>;
}

export function ComputerFallback() {
  return <div className="computer-fallback" aria-hidden="true"><span className="computer-fallback__screen" /><span className="computer-fallback__base" /><span className="computer-fallback__key" /></div>;
}

export function RetroComputerScene({ sectionRef }: RetroComputerSceneProps) {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    setWebgl(Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  if (!webgl || reducedMotion) return <ComputerFallback />;

  return (
    <Canvas className="computer-canvas" dpr={[1, 1.5]} frameloop={reducedMotion ? 'demand' : 'always'} shadows camera={{ position: [0, 0.1, 5.7], fov: 34 }} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.15 }} fallback={<ComputerFallback />}>
      <ambientLight intensity={1.2} />
      <hemisphereLight args={['#fff8eb', '#5d554b', 1.25]} />
      <directionalLight castShadow position={[4, 5, 5]} intensity={2.9} shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-4, 1, 2]} intensity={0.7} color="#fbcf15" />
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, -0.1]}>
        <planeGeometry args={[6.5, 4.5]} />
        <shadowMaterial transparent opacity={0.18} />
      </mesh>
      <Suspense fallback={null}><Computer sectionRef={sectionRef} reducedMotion={reducedMotion} /></Suspense>
    </Canvas>
  );
}

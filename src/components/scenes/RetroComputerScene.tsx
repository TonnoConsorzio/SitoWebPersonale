import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useScroll, type MotionValue } from 'motion/react';
import { useCallback, useEffect, useMemo, useRef, useState, Suspense, type RefObject } from 'react';
import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

type RetroComputerSceneProps = { sectionRef: RefObject<HTMLElement | null> };

function Computer({ scroll, reducedMotion, onReady }: { scroll: MotionValue<number>; reducedMotion: boolean; onReady: () => void }) {
  const gltf = useLoader(GLTFLoader, '/media/models/retro-computer.glb', (loader) => loader.setMeshoptDecoder(MeshoptDecoder)) as GLTF;
  const { model, buttonParts } = useMemo(() => {
    const clone = gltf.scene.clone(true);
    const bounds = new THREE.Box3().setFromObject(clone);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    const largestDimension = Math.max(size.x, size.y, size.z);

    clone.position.sub(center);
    clone.scale.setScalar(largestDimension > 0 ? 2.7 / largestDimension : 1);

    const buttonParts: THREE.Object3D[] = [];
    clone.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;

        const name = node.name.toLowerCase();
        if (name === 'pad' || name.includes('mousepad')) {
          node.visible = false;
        }
        if (name.includes('button')) {
          node.userData.baseY = node.position.y;
          buttonParts.push(node);
        }

        if (name.includes('screen')) {
          const tintMaterial = (material: THREE.Material) => {
            const copy = material.clone();
            if ('emissive' in copy && copy.emissive instanceof THREE.Color) {
              copy.emissive.set('#6a4c00');
              (copy as THREE.MeshStandardMaterial).emissiveIntensity = 0.18;
            }
            return copy;
          };
          node.material = Array.isArray(node.material)
            ? node.material.map(tintMaterial)
            : tintMaterial(node.material);
        }
      }
    });

    return { model: clone, buttonParts };
  }, [gltf.scene]);
  const root = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    onReady();
  }, [onReady]);

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
    const progress = THREE.MathUtils.clamp(scroll.get(), 0, 1);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, 0.3 + pointer.current.y * 0.045, 3.6, delta);
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, -0.42 + pointer.current.x * 0.065 - progress * 0.18, 3.6, delta);
    root.current.rotation.z = THREE.MathUtils.damp(root.current.rotation.z, pointer.current.x * -0.025, 3.6, delta);
    root.current.position.y = THREE.MathUtils.damp(root.current.position.y, -0.04 - progress * 0.22 + Math.sin(state.clock.elapsedTime * 0.45) * 0.018, 3.2, delta);
    root.current.position.x = THREE.MathUtils.damp(root.current.position.x, progress * -0.14, 3.2, delta);
    const scale = THREE.MathUtils.damp(root.current.scale.x, 1 - progress * 0.04, 3.2, delta);
    root.current.scale.setScalar(scale);
    buttonParts.forEach((button) => {
      button.position.y = (button.userData.baseY as number) + Math.sin(state.clock.elapsedTime * 0.9) * 0.0015;
    });
  });

  return <group ref={root} position={[0, -0.04, 0]} rotation={[0.3, -0.42, -0.01]}><primitive object={model} /></group>;
}

export function ComputerFallback() {
  return <div className="computer-fallback" aria-hidden="true"><span className="computer-fallback__screen" /><span className="computer-fallback__base" /><span className="computer-fallback__key" /></div>;
}

export function RetroComputerScene({ sectionRef }: RetroComputerSceneProps) {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [computerReady, setComputerReady] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const handleComputerReady = useCallback(() => setComputerReady(true), []);

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
    <>
      <div className={`computer-loading-fallback${computerReady ? ' is-hidden' : ''}`} aria-hidden="true"><ComputerFallback /></div>
      <Canvas className="computer-canvas" dpr={[1, 1.5]} frameloop={reducedMotion ? 'demand' : 'always'} shadows camera={{ position: [0, 0.1, 5.7], fov: 33 }} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.15 }} fallback={<ComputerFallback />}>
        <ambientLight intensity={1.2} />
        <hemisphereLight args={['#fff8eb', '#5d554b', 1.25]} />
        <directionalLight castShadow position={[4, 5, 5]} intensity={2.9} shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
        <directionalLight position={[-4, 1, 2]} intensity={0.7} color="#fbcf15" />
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, -0.1]}>
          <planeGeometry args={[6.5, 4.5]} />
          <shadowMaterial transparent opacity={0.18} />
        </mesh>
        <Suspense fallback={null}><Computer scroll={scrollYProgress} reducedMotion={reducedMotion} onReady={handleComputerReady} /></Suspense>
      </Canvas>
    </>
  );
}

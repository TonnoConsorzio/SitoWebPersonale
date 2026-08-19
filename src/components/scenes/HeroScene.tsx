import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState, type RefObject } from 'react';
import * as THREE from 'three';

type Vector = [number, number, number];

type HeroSceneProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

const pieces: Array<{ start: Vector; end: Vector; rotation: Vector; endRotation: Vector; size: Vector; color: string }> = [
  { start: [-1.8, 1.05, 0.3], end: [-1.05, 0.7, 0], rotation: [0.25, -0.65, 0.2], endRotation: [0, -0.25, 0], size: [1.85, 0.16, 0.22], color: '#0b0b0b' },
  { start: [1.75, 0.72, -0.3], end: [0.85, 0.68, -0.18], rotation: [-0.2, 0.58, -0.3], endRotation: [0, 0.24, 0], size: [1.55, 0.28, 0.26], color: '#242424' },
  { start: [-1.48, -0.55, 0.5], end: [-0.85, -0.63, 0.1], rotation: [0.38, 0.34, -0.42], endRotation: [0.08, 0.04, 0], size: [1.42, 0.14, 0.54], color: '#fbcf15' },
  { start: [1.6, -0.9, 0.16], end: [0.9, -0.6, -0.1], rotation: [-0.28, -0.45, 0.36], endRotation: [-0.06, -0.18, 0], size: [1.25, 0.22, 0.28], color: '#101010' },
  { start: [-0.25, 1.58, -0.5], end: [-0.08, 1.08, 0], rotation: [0.1, 0.15, 0.65], endRotation: [0, 0, 0], size: [0.18, 1.45, 0.18], color: '#383838' },
  { start: [0.18, -1.48, 0.45], end: [0.08, -1.08, 0.03], rotation: [-0.2, 0.35, -0.5], endRotation: [0, 0, 0], size: [0.22, 1.1, 0.18], color: '#fbcf15' },
  { start: [0.12, 0.18, 1.05], end: [0, 0.08, 0.3], rotation: [0.6, 0.25, -0.25], endRotation: [0.1, 0, 0], size: [0.62, 0.44, 0.22], color: '#171717' },
];

function useScrollProgress(sectionRef: RefObject<HTMLElement | null>) {
  const progress = useRef(0);
  const reduced = useRef(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    reduced.current = media.matches;
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const bounds = section.getBoundingClientRect();
      // Keep the assembly scrubbed while the one-viewport hero is leaving.
      progress.current = reduced.current ? 1 : THREE.MathUtils.clamp(-bounds.top / window.innerHeight, 0, 1);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    media.addEventListener('change', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      media.removeEventListener('change', update);
    };
  }, [sectionRef]);

  return { progress, reduced };
}

function Engine({ sectionRef }: HeroSceneProps) {
  const root = useRef<THREE.Group>(null);
  const meshes = useRef<Array<THREE.Mesh | null>>([]);
  const { progress, reduced } = useScrollProgress(sectionRef);

  useFrame((state, delta) => {
    if (!root.current) return;
    const scroll = progress.current;
    const pointerX = reduced.current ? 0 : state.pointer.x * 0.07;
    const pointerY = reduced.current ? 0 : state.pointer.y * 0.06;
    const drift = reduced.current ? 0 : Math.sin(state.clock.elapsedTime * 0.35) * 0.035;

    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -0.18 + pointerY, 4, delta);
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, 0.35 + pointerX - scroll * 0.25, 4, delta);
    root.current.rotation.z = THREE.MathUtils.damp(root.current.rotation.z, drift, 3, delta);
    root.current.position.y = THREE.MathUtils.damp(root.current.position.y, 0.05 - scroll * 0.1, 3, delta);
    root.current.scale.setScalar(THREE.MathUtils.damp(root.current.scale.x, 1.42 - scroll * 0.16, 3, delta));

    pieces.forEach((piece, index) => {
      const mesh = meshes.current[index];
      if (!mesh) return;
      const x = THREE.MathUtils.lerp(piece.start[0], piece.end[0], scroll);
      const y = THREE.MathUtils.lerp(piece.start[1], piece.end[1], scroll);
      const z = THREE.MathUtils.lerp(piece.start[2], piece.end[2], scroll);
      mesh.position.x = THREE.MathUtils.damp(mesh.position.x, x, 4, delta);
      mesh.position.y = THREE.MathUtils.damp(mesh.position.y, y, 4, delta);
      mesh.position.z = THREE.MathUtils.damp(mesh.position.z, z, 4, delta);
      mesh.rotation.x = THREE.MathUtils.damp(mesh.rotation.x, THREE.MathUtils.lerp(piece.rotation[0], piece.endRotation[0], scroll), 4, delta);
      mesh.rotation.y = THREE.MathUtils.damp(mesh.rotation.y, THREE.MathUtils.lerp(piece.rotation[1], piece.endRotation[1], scroll), 4, delta);
      mesh.rotation.z = THREE.MathUtils.damp(mesh.rotation.z, THREE.MathUtils.lerp(piece.rotation[2], piece.endRotation[2], scroll), 4, delta);
    });
  });

  return (
    <group ref={root}>
      {pieces.map((piece, index) => (
        <mesh key={index} ref={(node) => { meshes.current[index] = node; }} castShadow receiveShadow>
          <boxGeometry args={piece.size} />
          <meshStandardMaterial color={piece.color} roughness={0.78} metalness={0.08} />
        </mesh>
      ))}
    </group>
  );
}

export function StaticEngine() {
  return (
    <svg className="procedural-fallback" viewBox="0 0 400 330" aria-hidden="true" focusable="false">
      <rect x="56" y="70" width="126" height="16" fill="#0b0b0b" transform="rotate(-14 56 70)" />
      <rect x="227" y="77" width="116" height="25" fill="#242424" transform="rotate(15 227 77)" />
      <rect x="75" y="202" width="118" height="18" fill="#fbcf15" transform="rotate(18 75 202)" />
      <rect x="216" y="209" width="100" height="26" fill="#111111" transform="rotate(-17 216 209)" />
      <rect x="189" y="49" width="17" height="130" fill="#383838" transform="rotate(10 189 49)" />
      <rect x="194" y="170" width="19" height="108" fill="#fbcf15" transform="rotate(-9 194 170)" />
      <rect x="167" y="134" width="64" height="44" fill="#171717" transform="rotate(8 167 134)" />
    </svg>
  );
}

export function HeroScene({ sectionRef }: HeroSceneProps) {
  const [webgl, setWebgl] = useState(true);
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

  if (!webgl || reducedMotion) return <StaticEngine />;

  return (
    <Canvas className="procedural-canvas" dpr={[1, 1.65]} camera={{ position: [0, 0, 5.35], fov: 32 }} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }} fallback={<StaticEngine />}>
      <ambientLight intensity={1.15} />
      <directionalLight position={[4, 5, 6]} intensity={2.1} />
      <directionalLight position={[-4, -3, 3]} intensity={0.55} color="#d7d0c5" />
      <Engine sectionRef={sectionRef} />
    </Canvas>
  );
}

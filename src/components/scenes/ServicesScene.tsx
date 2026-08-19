import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { StaticEngine } from './HeroScene';

type Vector = [number, number, number];

type Module = {
  size: Vector;
  color: string;
  states: Array<{ position: Vector; rotation: Vector; scale: Vector }>;
};

const modules: Module[] = [
  { size: [1.7, 0.12, 0.16], color: '#111111', states: [{ position: [-0.8, 0.85, 0], rotation: [0, 0, 0], scale: [1, 1, 1] }, { position: [-1.22, 0.68, 0], rotation: [0.05, 0.18, -0.24], scale: [0.9, 1, 1] }, { position: [-0.72, 0.7, 0], rotation: [0, 0.08, 0], scale: [1, 1, 1] }] },
  { size: [1.7, 0.12, 0.16], color: '#111111', states: [{ position: [-0.8, -0.85, 0], rotation: [0, 0, 0], scale: [1, 1, 1] }, { position: [-0.18, 0.1, 0.12], rotation: [0.16, -0.12, 0.18], scale: [0.74, 1, 1] }, { position: [-0.72, -0.1, 0], rotation: [0, 0.08, 0], scale: [1, 1, 1] }] },
  { size: [0.13, 1.8, 0.16], color: '#2c2c2c', states: [{ position: [-1.62, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] }, { position: [0.74, -0.62, -0.08], rotation: [-0.15, 0.18, 0.2], scale: [0.76, 1, 1] }, { position: [0.1, 0.25, 0], rotation: [0, 0.08, 0], scale: [1, 1, 1] }] },
  { size: [0.13, 1.8, 0.16], color: '#2c2c2c', states: [{ position: [0.02, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] }, { position: [1.16, 0.72, 0.12], rotation: [0.15, -0.18, -0.28], scale: [0.7, 1, 1] }, { position: [0.94, 0.25, 0], rotation: [0, 0.08, 0], scale: [1, 1, 1] }] },
  { size: [0.86, 0.18, 0.45], color: '#fbcf15', states: [{ position: [-0.8, 0, 0.14], rotation: [0, 0, 0], scale: [1, 1, 1] }, { position: [0.18, 1.13, -0.1], rotation: [0.2, 0.1, 0.22], scale: [0.92, 1, 1] }, { position: [0.1, -0.65, 0.16], rotation: [0, 0.08, 0], scale: [1.8, 1, 1] }] },
];

function Sculpture({ active }: { active: number }) {
  const root = useRef<THREE.Group>(null);
  const meshes = useRef<Array<THREE.Mesh | null>>([]);
  const reduced = useRef(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    reduced.current = query.matches;
    const change = () => { reduced.current = query.matches; };
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);

  useFrame((state, delta) => {
    if (!root.current) return;
    const idle = reduced.current ? 0 : Math.sin(state.clock.elapsedTime * 0.45) * 0.025;
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, 0.35 + state.pointer.x * 0.05, 4, delta);
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -0.16 + state.pointer.y * 0.04, 4, delta);
    root.current.position.y = THREE.MathUtils.damp(root.current.position.y, idle, 3, delta);
    root.current.scale.setScalar(THREE.MathUtils.damp(root.current.scale.x, 1.38, 3, delta));

    modules.forEach((module, index) => {
      const mesh = meshes.current[index];
      if (!mesh) return;
      const target = module.states[active];
      mesh.position.x = THREE.MathUtils.damp(mesh.position.x, target.position[0], 5, delta);
      mesh.position.y = THREE.MathUtils.damp(mesh.position.y, target.position[1], 5, delta);
      mesh.position.z = THREE.MathUtils.damp(mesh.position.z, target.position[2], 5, delta);
      mesh.rotation.x = THREE.MathUtils.damp(mesh.rotation.x, target.rotation[0], 5, delta);
      mesh.rotation.y = THREE.MathUtils.damp(mesh.rotation.y, target.rotation[1], 5, delta);
      mesh.rotation.z = THREE.MathUtils.damp(mesh.rotation.z, target.rotation[2], 5, delta);
      mesh.scale.x = THREE.MathUtils.damp(mesh.scale.x, target.scale[0], 5, delta);
      mesh.scale.y = THREE.MathUtils.damp(mesh.scale.y, target.scale[1], 5, delta);
      mesh.scale.z = THREE.MathUtils.damp(mesh.scale.z, target.scale[2], 5, delta);
    });
  });

  return <group ref={root}>{modules.map((module, index) => <mesh key={index} ref={(node) => { meshes.current[index] = node; }}><boxGeometry args={module.size} /><meshStandardMaterial color={module.color} roughness={0.8} metalness={0.06} /></mesh>)}</group>;
}

export function ServicesScene({ active }: { active: number }) {
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
    <Canvas className="procedural-canvas" dpr={[1, 1.5]} camera={{ position: [0, 0, 4.8], fov: 31 }} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }} fallback={<StaticEngine />}>
      <ambientLight intensity={1.15} />
      <directionalLight position={[3, 4, 5]} intensity={2} />
      <directionalLight position={[-4, -2, 2]} intensity={0.48} color="#d7d0c5" />
      <Sculpture active={active} />
    </Canvas>
  );
}

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { type MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

type ThreadStage = 'hero' | 'projects' | 'services' | 'process' | 'final' | 'none';
type Point = [number, number, number];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const smooth = (from: number, to: number, amount: number) => from + (to - from) * amount;

const CHAOS: Point[] = [
  [-2.35, -0.28, -0.15], [-1.62, 1.38, 0.34], [-0.58, 0.74, -0.62],
  [0.18, -0.82, 0.48], [1.45, -0.18, 0.12], [1.26, 1.2, -0.3],
  [0.08, 1.62, 0.4], [-0.38, 0.12, -0.22], [0.84, -1.4, 0.18]
];
const EXPLORATION: Point[] = [
  [-3.25, -1.22, -1.75], [-2.15, -0.58, -0.9], [-1.05, 0.78, 0.35],
  [0.08, 1.3, -0.42], [1.04, 0.34, 0.72], [2.06, -0.76, -0.2], [3.35, -0.16, 1.58]
];
const BRANCHES: Point[][] = [
  [[-2.45, -0.24, 0], [-1.3, 0.08, 0.12], [-0.38, 0.78, -0.05], [0.56, 1.42, 0.18], [1.9, 1.2, -0.18]],
  [[-2.45, -0.24, 0], [-1.28, 0.02, -0.12], [-0.15, -0.1, 0.28], [1.02, -0.12, -0.24], [2.25, 0.32, 0.16]],
  [[-2.45, -0.24, 0], [-1.22, -0.06, 0.1], [-0.24, -0.96, -0.18], [0.76, -1.45, 0.16], [2.08, -1.1, 0]]
];
const RESOLUTION: Point[] = [
  [-2.72, -0.1, 0], [-1.78, 0.5, 0.12], [-0.86, 0.54, -0.12], [0, 0.06, 0],
  [0.86, 0.54, 0.12], [1.78, 0.5, -0.12], [2.72, -0.1, 0]
];

function curveFrom(points: Point[]) {
  return new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)), false, 'centripetal', 0.42);
}

function setOpacity(group: THREE.Group | null, value: number) {
  if (!group) return;
  group.visible = value > 0.012;
  group.userData.opacity = value;
  group.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const material = Array.isArray(child.material) ? child.material[0] : child.material;
    if (!(material instanceof THREE.MeshStandardMaterial)) return;
    material.transparent = true;
    material.opacity = value;
    material.depthWrite = value > 0.62;
  });
}

function ThreadTube({ points, color, accent, mobile }: { points: Point[]; color: string; accent?: Point[]; mobile: boolean }) {
  const curve = useMemo(() => curveFrom(points), [points]);
  const accentCurve = useMemo(() => accent ? curveFrom(accent) : null, [accent]);
  const segments = mobile ? 64 : 132;
  const radialSegments = mobile ? 6 : 8;

  return (
    <>
      <mesh castShadow receiveShadow>
        <tubeGeometry args={[curve, segments, mobile ? 0.045 : 0.058, radialSegments, false]} />
        <meshStandardMaterial color={color} roughness={0.78} metalness={0.1} />
      </mesh>
      {accentCurve && (
        <mesh castShadow>
          <tubeGeometry args={[accentCurve, Math.max(24, Math.round(segments * 0.28)), mobile ? 0.049 : 0.062, radialSegments, false]} />
          <meshStandardMaterial color="#fbcf15" roughness={0.66} metalness={0.08} />
        </mesh>
      )}
    </>
  );
}

function ThreadScene({ stageRef, substageRef, substage, pointerRef, progressRef, mobile }: {
  stageRef: MutableRefObject<ThreadStage>;
  substageRef: MutableRefObject<number>;
  substage: number;
  pointerRef: MutableRefObject<[number, number]>;
  progressRef: MutableRefObject<number>;
  mobile: boolean;
}) {
  const root = useRef<THREE.Group>(null);
  const chaos = useRef<THREE.Group>(null);
  const exploration = useRef<THREE.Group>(null);
  const branching = useRef<THREE.Group>(null);
  const resolution = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame((_, delta) => {
    if (!root.current) return;
    const stage = stageRef.current;
    const pointer = pointerRef.current;
    const ease = 1 - Math.pow(0.001, delta);
    const reveal = stage === 'hero' ? 1 : 0;
    const explore = stage === 'projects' ? 1 : 0;
    const branches = stage === 'services' ? 1 : 0;
    const resolve = stage === 'final' ? 1 : 0;
    const serviceShift = clamp(substageRef.current, 0, 2);
    const baseX = stage === 'hero' ? 1.05 : stage === 'projects' ? 0.08 : stage === 'services' ? [0.42, 0.74, 1.05][serviceShift] : stage === 'final' ? 0.58 : 0;
    const baseY = stage === 'projects' ? -0.04 : stage === 'final' ? 0.08 : 0;
    const targetScale = stage === 'hero' ? 0.86 : stage === 'projects' ? 1.16 : stage === 'services' ? 0.9 : stage === 'final' ? 1.02 : 0.86;

    root.current.position.x = smooth(root.current.position.x, baseX, ease);
    root.current.position.y = smooth(root.current.position.y, baseY, ease);
    root.current.scale.setScalar(smooth(root.current.scale.x, targetScale, ease));
    root.current.rotation.x = smooth(root.current.rotation.x, pointer[1] * 0.068, 0.06);
    root.current.rotation.y = smooth(root.current.rotation.y, pointer[0] * 0.068 + progressRef.current * 0.16, 0.06);
    root.current.rotation.z = smooth(root.current.rotation.z, stage === 'projects' ? -0.08 : 0, 0.06);

    const fadeGroup = (group: THREE.Group | null, target: number) => setOpacity(group, smooth((group?.userData.opacity as number | undefined) ?? 0, target, ease));
    fadeGroup(chaos.current, reveal);
    fadeGroup(exploration.current, explore);
    fadeGroup(branching.current, branches);
    fadeGroup(resolution.current, resolve);

    camera.position.x = smooth(camera.position.x, stage === 'projects' ? -0.22 : pointer[0] * 0.12, 0.045);
    camera.position.y = smooth(camera.position.y, pointer[1] * 0.08 - progressRef.current * 0.12, 0.045);
    camera.position.z = smooth(camera.position.z, stage === 'hero' ? 6.25 : stage === 'projects' ? 5.7 : 6.05, 0.045);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={1.15} />
      <hemisphereLight args={['#f3f0e8', '#0a0a0a', 1.15]} />
      <directionalLight position={[3.5, 4.5, 4]} intensity={3.8} color="#fff6ce" castShadow />
      <pointLight position={[-3, -2, 3]} intensity={1.9} color="#fbcf15" distance={8} />
      <group ref={root}>
        <group ref={chaos}><ThreadTube points={CHAOS} accent={[[0.18, -0.82, 0.48], [0.78, -0.46, 0.32], [1.45, -0.18, 0.12]]} color="#111111" mobile={mobile} /></group>
        <group ref={exploration}><ThreadTube points={EXPLORATION} accent={[[0.08, 1.3, -0.42], [0.62, 0.78, 0.18], [1.04, 0.34, 0.72]]} color="#e7e2d8" mobile={mobile} /></group>
        <group ref={branching}>
          {BRANCHES.map((branch, index) => <ThreadTube key={index} points={branch} accent={index === substage ? branch.slice(2, 4) : undefined} color="#111111" mobile={mobile} />)}
        </group>
        <group ref={resolution}><ThreadTube points={RESOLUTION} accent={[[0, 0.06, 0], [0.86, 0.54, 0.12], [1.3, 0.6, 0]]} color="#111111" mobile={mobile} /></group>
      </group>
    </>
  );
}

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export function ThreadCanvas() {
  const [stage, setStage] = useState<ThreadStage>('hero');
  const [substage, setSubstage] = useState(0);
  const [fallback, setFallback] = useState(() => typeof window === 'undefined' || !canUseWebGL() || window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [visible, setVisible] = useState(true);
  const stageRef = useRef<ThreadStage>('hero');
  const substageRef = useRef(0);
  const pointerRef = useRef<[number, number]>([0, 0]);
  const progressRef = useRef(0);
  const mobileRef = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(hover: none), (pointer: coarse)');
    const read = () => {
      const nextStage = (root.dataset.threadStage || 'none') as ThreadStage;
      stageRef.current = ['hero', 'projects', 'services', 'process', 'final', 'none'].includes(nextStage) ? nextStage : 'none';
      substageRef.current = Number(root.dataset.threadSubstage || 0);
      setStage(stageRef.current);
      setSubstage(substageRef.current);
      mobileRef.current = window.innerWidth < 768;
    };
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ['data-thread-stage', 'data-thread-substage'] });
    read();

    const onPointer = (event: PointerEvent) => {
      if (reduced.matches || coarsePointer.matches || event.pointerType === 'touch') return;
      pointerRef.current = [
        clamp((event.clientX / window.innerWidth - 0.5) * 2, -1, 1),
        clamp((event.clientY / window.innerHeight - 0.5) * -2, -1, 1)
      ];
    };
    const onResize = () => { mobileRef.current = window.innerWidth < 768; };
    const onVisibility = () => setVisible(!document.hidden);
    const onReduced = () => setFallback(reduced.matches || !canUseWebGL());
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    reduced.addEventListener('change', onReduced);

    let trigger: ScrollTrigger | undefined;
    if (!reduced.matches) {
      gsap.registerPlugin(ScrollTrigger);
      trigger = ScrollTrigger.create({
        trigger: '.experience-page',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => { progressRef.current = self.progress; }
      });
      ScrollTrigger.refresh();
    }

    return () => {
      observer.disconnect();
      trigger?.kill();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      reduced.removeEventListener('change', onReduced);
    };
  }, []);

  const paused = !visible || stage === 'none';
  const mobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className={`thread-canvas ${fallback ? 'thread-canvas--fallback' : ''}`} data-thread-stage={stage} aria-hidden="true">
      {!fallback && (
        <Canvas
          className="thread-canvas__webgl"
          dpr={mobile ? [1, 1.2] : [1, 1.6]}
          camera={{ position: [0, 0, 6.25], fov: 35, near: 0.1, far: 100 }}
          gl={{ alpha: true, antialias: !mobile, powerPreference: 'high-performance' }}
          frameloop={paused ? 'demand' : 'always'}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <ThreadScene stageRef={stageRef} substageRef={substageRef} substage={substage} pointerRef={pointerRef} progressRef={progressRef} mobile={mobile} />
        </Canvas>
      )}
      <svg className="thread-canvas__fallback" viewBox="0 0 600 430" focusable="false">
        <path className="thread-canvas__fallback-main" d="M48 285C114 102 178 82 250 213s128 124 188-19c33-79 73-121 121-156" />
        <path className="thread-canvas__fallback-accent" d="M250 213c34 62 67 87 99 78" />
      </svg>
    </div>
  );
}

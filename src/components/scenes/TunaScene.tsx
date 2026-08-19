import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { createPortal } from 'react-dom';
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { clone } from 'three/addons/utils/SkeletonUtils.js';

type TunaState = 'CRUISE' | 'APPROACH' | 'RETREAT' | 'DART' | 'JUMP' | 'CURIOUS';
type ScreenPoint = { x: number; y: number };

const SAFE_POINTS: ScreenPoint[] = [
  { x: .84, y: .18 }, { x: .84, y: .48 }, { x: .76, y: .78 },
  { x: .52, y: .82 }, { x: .24, y: .82 },
  { x: .24, y: .48 }, { x: .52, y: .18 }, { x: .76, y: .48 },
];
const TUNA_SCALE = .08;
const TUNA_HEADING_OFFSET = -.08;

function dampAngle(current: number, target: number, lambda: number, delta: number) {
  const difference = THREE.MathUtils.euclideanModulo(target - current + Math.PI, Math.PI * 2) - Math.PI;
  return current + difference * (1 - Math.exp(-lambda * delta));
}

function getExclusionRects() {
  return Array.from(document.querySelectorAll<HTMLElement>(
    '.experience-nav, .hero-scene__content, .project-stage__content, .project-stage__controls, .contact-scene__form, .faq-scene__answer, .experience-button',
  )).map((element) => element.getBoundingClientRect());
}

function chooseWaypoint(previous?: ScreenPoint) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const paddingX = width * .08;
  const paddingY = height * .08;
  const rects = getExclusionRects();
  const safe = SAFE_POINTS.filter(({ x, y }) => {
    const pointX = x * width;
    const pointY = y * height;
    return rects.every((rect) => pointX < rect.left - paddingX || pointX > rect.right + paddingX || pointY < rect.top - paddingY || pointY > rect.bottom + paddingY);
  });
  const withoutPrevious = previous
    ? safe.filter((point) => Math.abs(point.x - previous.x) > .01 || Math.abs(point.y - previous.y) > .01)
    : safe;
  const candidates = withoutPrevious.length > 0 ? withoutPrevious : safe.length > 0 ? safe : SAFE_POINTS;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function TunaModel({ reducedMotion }: { reducedMotion: boolean }) {
  const gltf = useLoader(GLTFLoader, '/media/models/tuna.glb', (loader) => loader.setMeshoptDecoder(MeshoptDecoder)) as GLTF;
  const scene = useMemo(() => clone(gltf.scene), [gltf.scene]);
  const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);
  const root = useRef<THREE.Group>(null);
  const current = useRef(new THREE.Vector3());
  const previousPosition = useRef(new THREE.Vector3());
  const target = useRef(new THREE.Vector3());
  const currentPoint = useRef<ScreenPoint>({ x: .84, y: .78 });
  const targetPoint = useRef<ScreenPoint>({ x: .84, y: .78 });
  const state = useRef<TunaState>('CRUISE');
  const stateStarted = useRef(0);
  const stateDeadline = useRef(0);
  const nextEventAt = useRef(5.5);
  const pointer = useRef({ x: 0, y: 0, lastMoveAt: performance.now() });
  const activeAction = useRef<THREE.AnimationAction | null>(null);
  const travelAngle = useRef(0);
  const { camera, size } = useThree();
  const isMobile = size.width < 700;

  const screenToWorld = useCallback((point: ScreenPoint) => {
    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    const distance = Math.abs(perspectiveCamera.position.z);
    const viewHeight = 2 * Math.tan(THREE.MathUtils.degToRad(perspectiveCamera.fov) / 2) * distance;
    const viewWidth = viewHeight * (size.width / Math.max(size.height, 1));
    return new THREE.Vector3((point.x - .5) * viewWidth * .84, (.5 - point.y) * viewHeight * .72, 0);
  }, [camera, size.height, size.width]);

  const playClip = useCallback((needle: string) => {
    const clip = gltf.animations.find((animation) => animation.name.includes(needle));
    if (!clip) return;
    const next = mixer.clipAction(clip);
    next.reset().fadeIn(.18).play();
    activeAction.current?.fadeOut(.18);
    activeAction.current = next;
  }, [gltf.animations, mixer]);

  const setTarget = useCallback((point: ScreenPoint, nextState: TunaState, now: number, duration: number) => {
    targetPoint.current = point;
    target.current.copy(screenToWorld(point));
    state.current = nextState;
    stateStarted.current = now;
    stateDeadline.current = now + duration;
  }, [screenToWorld]);

  useEffect(() => {
    const start = chooseWaypoint();
    const next = chooseWaypoint(start);
    currentPoint.current = start;
    targetPoint.current = next;
    current.current.copy(screenToWorld(start));
    previousPosition.current.copy(current.current);
    target.current.copy(screenToWorld(next));
    if (root.current) root.current.position.copy(current.current);
  }, [screenToWorld]);

  useEffect(() => {
    if (reducedMotion) {
      mixer.stopAllAction();
      return;
    }
    playClip('Swimming_Normal');
  }, [mixer, playClip, reducedMotion]);

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      pointer.current.x = event.clientX / Math.max(window.innerWidth, 1) * 2 - 1;
      pointer.current.y = event.clientY / Math.max(window.innerHeight, 1) * 2 - 1;
      pointer.current.lastMoveAt = performance.now();
      if (state.current === 'CURIOUS') {
        state.current = 'CRUISE';
        nextEventAt.current = 12;
      }
    };
    window.addEventListener('pointermove', updatePointer, { passive: true });
    return () => window.removeEventListener('pointermove', updatePointer);
  }, []);

  useFrame((frameState, delta) => {
    if (!root.current) return;
    if (!reducedMotion) mixer.update(delta);
    if (reducedMotion) return;

    const now = frameState.clock.elapsedTime;
    const idle = performance.now() - pointer.current.lastMoveAt > 1000;
    if (idle && state.current === 'CRUISE') {
      state.current = 'CURIOUS';
      stateStarted.current = now;
      stateDeadline.current = now + 1.1;
    }

    if (state.current === 'APPROACH' && now >= stateDeadline.current) {
      setTarget(chooseWaypoint(targetPoint.current), 'RETREAT', now, 1.7);
    } else if ((state.current === 'RETREAT' || state.current === 'DART' || state.current === 'JUMP') && now >= stateDeadline.current) {
      playClip('Swimming_Normal');
      state.current = 'CRUISE';
      stateStarted.current = now;
      nextEventAt.current = now + 12 + Math.random() * 8;
    } else if (state.current === 'CURIOUS' && now >= stateDeadline.current) {
      state.current = 'CRUISE';
      nextEventAt.current = now + 12;
    }

    if (state.current === 'CRUISE' && current.current.distanceTo(target.current) < .06) {
      currentPoint.current = targetPoint.current;
      const next = chooseWaypoint(currentPoint.current);
      targetPoint.current = next;
      target.current.copy(screenToWorld(next));

      if (now >= nextEventAt.current) {
        const roll = Math.random();
        if (!isMobile && roll > .72) {
          playClip('Out_Of_Water');
          state.current = 'JUMP';
          stateStarted.current = now;
          stateDeadline.current = now + 1.1;
        } else if (roll > .45) {
          playClip('Swimming_Fast');
          state.current = 'DART';
          stateStarted.current = now;
          stateDeadline.current = now + .8;
        } else {
          playClip('Swimming_Normal');
          state.current = 'APPROACH';
          stateStarted.current = now;
          stateDeadline.current = now + 2.1;
        }
      }
    }

    const speed = state.current === 'DART' ? 5.2 : state.current === 'APPROACH' ? 1.15 : .65;
    current.current.lerp(target.current, 1 - Math.exp(-speed * delta));
    root.current.position.copy(current.current);

    const movementX = current.current.x - previousPosition.current.x;
    const movementY = current.current.y - previousPosition.current.y;
    if (Math.abs(movementX) + Math.abs(movementY) > .00001) {
      travelAngle.current = Math.atan2(movementY, movementX);
    }
    previousPosition.current.copy(current.current);

    if (state.current === 'JUMP') {
      const progress = THREE.MathUtils.clamp((now - stateStarted.current) / 1.1, 0, 1);
      root.current.position.y += Math.sin(progress * Math.PI) * .34;
    }

    const curiosity = state.current === 'CURIOUS' ? pointer.current.x * .08 : 0;
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, Math.PI / 2 + curiosity, 3, delta);
    root.current.rotation.z = dampAngle(
      root.current.rotation.z,
      travelAngle.current + TUNA_HEADING_OFFSET,
      5.5,
      delta,
    );

    const scaleTarget = state.current === 'APPROACH' ? TUNA_SCALE * 1.35 : state.current === 'RETREAT' ? TUNA_SCALE * .76 : TUNA_SCALE;
    const scale = THREE.MathUtils.damp(root.current.scale.x, scaleTarget, 2.4, delta);
    root.current.scale.setScalar(scale);
  });

  return <group ref={root} scale={TUNA_SCALE} rotation={[0.05, Math.PI / 2, -0.08]}><primitive object={scene} /></group>;
}

export function MascotLayer() {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    setWebgl(Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setPageVisible(document.visibilityState === 'visible');
    updateMotion();
    updateVisibility();
    media.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      media.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  if (webgl !== true) return null;

  return createPortal(
    <aside className="tuna-overlay" aria-hidden="true" data-tuna-state={reducedMotion ? 'STATIC' : 'CRUISE'}>
      <Canvas className="tuna-canvas" frameloop={reducedMotion || !pageVisible ? 'demand' : 'always'} dpr={[1, 1.5]} camera={{ position: [0, 0, 7.4], fov: 32 }} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}>
        <ambientLight intensity={1.7} />
        <directionalLight position={[3, 4, 4]} intensity={2.2} />
        <directionalLight position={[-3, -1, 2]} intensity={.65} color="#fbcf15" />
        <Suspense fallback={null}><TunaModel reducedMotion={reducedMotion} /></Suspense>
      </Canvas>
    </aside>,
    document.body,
  );
}

export const TunaScene = MascotLayer;

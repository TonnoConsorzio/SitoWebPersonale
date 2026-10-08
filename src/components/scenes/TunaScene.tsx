import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { createPortal } from 'react-dom';
import { Suspense, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { clone } from 'three/addons/utils/SkeletonUtils.js';

type TunaState = 'IDLE' | 'CRUISE' | 'APPROACH' | 'RETREAT' | 'DART' | 'BREACH';
type ScreenPoint = { x: number; y: number };

const SAFE_POINTS: ScreenPoint[] = [
  { x: .08, y: .9 }, { x: .92, y: .9 },
  { x: .84, y: .18 }, { x: .84, y: .48 }, { x: .76, y: .78 },
  { x: .52, y: .82 }, { x: .24, y: .82 }, { x: .24, y: .48 },
  { x: .52, y: .18 }, { x: .76, y: .48 },
];
const INTRO_POINT: ScreenPoint = { x: .04, y: .96 };
const TUNA_SCALE = .064;
const TUNA_FORWARD = new THREE.Vector3(0, 0, 1);

function getExclusionRects() {
  return Array.from(document.querySelectorAll<HTMLElement>(
    '.experience-nav, .hero-scene__content, .hero-scene__stage, .project-stage__content, .project-stage__controls, .contact-scene__form, .faq-scene__answer, .testimonials-scene__layout, .experience-button',
  )).map((element) => element.getBoundingClientRect());
}

function chooseWaypoint(previous?: ScreenPoint) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const paddingX = Math.min(112, Math.max(32, width * .035));
  const paddingY = Math.min(72, Math.max(28, height * .055));
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

function createSwimmingPath(start: THREE.Vector3, end: THREE.Vector3, state: TunaState) {
  const direction = end.clone().sub(start);
  const length = Math.max(direction.length(), .2);
  const normal = new THREE.Vector3(-direction.y, direction.x, 0).normalize();
  const bend = Math.min(Math.max(length * .18, .16), .5) * (Math.random() > .5 ? 1 : -1);
  const controlA = start.clone().lerp(end, .34).addScaledVector(normal, bend);
  const controlB = start.clone().lerp(end, .68).addScaledVector(normal, bend * .72);
  const depth = state === 'APPROACH' ? .36 : state === 'RETREAT' ? -.28 : 0;
  controlA.z += depth * .55;
  controlB.z += depth;
  end.z += depth;
  return new THREE.CatmullRomCurve3([start, controlA, controlB, end], false, 'centripetal', .5);
}

function TunaModel({ reducedMotion, petMode, onReady }: { reducedMotion: boolean; petMode: boolean; onReady: () => void }) {
  const gltf = useLoader(GLTFLoader, '/media/models/tuna.glb', (loader) => loader.setMeshoptDecoder(MeshoptDecoder)) as GLTF;
  const scene = useMemo(() => clone(gltf.scene), [gltf.scene]);
  const mixer = useMemo(() => new THREE.AnimationMixer(scene), [scene]);
  const root = useRef<THREE.Group>(null);
  const current = useRef(new THREE.Vector3());
  const currentPoint = useRef<ScreenPoint>(INTRO_POINT);
  const targetPoint = useRef<ScreenPoint>(INTRO_POINT);
  const path = useRef<THREE.CatmullRomCurve3 | null>(null);
  const pathProgress = useRef(0);
  const pathDuration = useRef(8);
  const state = useRef<TunaState>('IDLE');
  const stateDeadline = useRef(0);
  const nextEventAt = useRef(24);
  const activeAction = useRef<THREE.AnimationAction | null>(null);
  const targetQuaternion = useMemo(() => new THREE.Quaternion(), []);
  const { camera, size } = useThree();
  const isMobile = size.width < 700;
  const introPoint = useMemo(() => isMobile ? { x: .17, y: .96 } : INTRO_POINT, [isMobile]);

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
    next.reset().fadeIn(.2).play();
    activeAction.current?.fadeOut(.2);
    activeAction.current = next;
  }, [gltf.animations, mixer]);

  const startPath = useCallback((point: ScreenPoint, nextState: TunaState, now: number, duration: number) => {
    const start = current.current.clone();
    const end = screenToWorld(point);
    path.current = createSwimmingPath(start, end, nextState);
    pathProgress.current = 0;
    pathDuration.current = duration;
    targetPoint.current = point;
    state.current = nextState;
    stateDeadline.current = now + duration;
    playClip(nextState === 'DART' ? 'Swimming_Fast' : nextState === 'BREACH' ? 'Out_Of_Water' : nextState === 'APPROACH' ? 'Swimming_Impulse' : 'Swimming_Normal');
  }, [playClip, screenToWorld]);

  useLayoutEffect(() => {
    current.current.copy(screenToWorld(introPoint));
    currentPoint.current = introPoint;
    targetPoint.current = introPoint;
    path.current = null;
    state.current = 'IDLE';
    if (root.current) {
      root.current.position.copy(current.current);
      root.current.quaternion.setFromUnitVectors(TUNA_FORWARD, new THREE.Vector3(1, 0, 0));
      root.current.scale.setScalar(TUNA_SCALE);
    }
  }, [introPoint, screenToWorld]);

  useEffect(() => {
    onReady();
  }, [onReady]);

  useEffect(() => {
    if (reducedMotion) {
      mixer.stopAllAction();
      return;
    }
    playClip('Swimming_Normal');
  }, [mixer, playClip, reducedMotion]);

  useEffect(() => {
    path.current = null;
    state.current = 'IDLE';
    stateDeadline.current = 0;
    nextEventAt.current = 20 + Math.random() * 18;
  }, [petMode]);

  useFrame((frameState, delta) => {
    if (!root.current) return;
    if (!reducedMotion) mixer.update(delta);

    if (!petMode || reducedMotion) {
      root.current.position.copy(current.current);
      root.current.position.y += Math.sin(frameState.clock.elapsedTime * .65) * .018;
      root.current.scale.setScalar(TUNA_SCALE);
      return;
    }

    const now = frameState.clock.elapsedTime;
    if (state.current === 'IDLE') {
      root.current.position.copy(current.current);
      root.current.position.y += Math.sin(now * .65) * .018;
      if (now >= stateDeadline.current) {
        const next = chooseWaypoint(currentPoint.current);
        const event = now >= nextEventAt.current;
        const roll = Math.random();
        const nextState: TunaState = event && roll > .72 ? 'DART' : event && roll > .52 ? 'APPROACH' : 'CRUISE';
        const duration = nextState === 'DART' ? 1.25 : nextState === 'APPROACH' ? 5.5 : 7 + Math.random() * 4;
        startPath(next, nextState, now, duration);
        if (event) nextEventAt.current = now + 22 + Math.random() * 18;
      }
    } else if (path.current) {
      pathProgress.current = Math.min(1, pathProgress.current + delta / pathDuration.current);
      const progress = pathProgress.current;
      const point = path.current.getPointAt(progress);
      const tangent = path.current.getTangentAt(Math.min(progress, .999)).normalize();
      root.current.position.copy(point);
      if (state.current === 'BREACH') root.current.position.y += Math.sin(progress * Math.PI) * .18;
      targetQuaternion.setFromUnitVectors(TUNA_FORWARD, tangent);
      root.current.quaternion.slerp(targetQuaternion, 1 - Math.exp(-3.2 * delta));

      if (progress >= 1) {
        current.current.copy(point);
        currentPoint.current = targetPoint.current;
        path.current = null;
        if (state.current === 'APPROACH') {
          const next = chooseWaypoint(currentPoint.current);
          startPath(next, 'RETREAT', now, 4.5 + Math.random() * 1.5);
        } else {
          state.current = 'IDLE';
          stateDeadline.current = now + 2.2 + Math.random() * 2.4;
          playClip('Swimming_Normal');
        }
      }
    }

    const scaleTarget = state.current === 'APPROACH' ? TUNA_SCALE * 1.05 : state.current === 'RETREAT' ? TUNA_SCALE * .9 : TUNA_SCALE;
    root.current.scale.setScalar(THREE.MathUtils.damp(root.current.scale.x, scaleTarget, 2.2, delta));
  });

  return <group ref={root} scale={TUNA_SCALE}><primitive object={scene} /></group>;
}

export function MascotLayer() {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [introduced, setIntroduced] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [zone, setZone] = useState('hero');
  const [tunaReady, setTunaReady] = useState(false);
  const handleTunaReady = useCallback(() => setTunaReady(true), []);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    setWebgl(Boolean(canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setPageVisible(document.visibilityState === 'visible');
    setIntroduced(window.sessionStorage.getItem('tunaIntroduced') === 'true');
    updateMotion();
    updateVisibility();
    media.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      media.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    const zoneById: Record<string, string> = {
      progetti: 'projects',
      formazione: 'formation',
      processo: 'process',
      contatti: 'contact',
      about: 'away',
      abbo: 'away',
      faq: 'away',
    };
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      const visibleId = visible ? (visible.target as HTMLElement).id : '';
      const next = visible ? zoneById[visibleId] ?? ((visible.target as HTMLElement).classList.contains('scene--hero') ? 'hero' : 'away') : 'away';
      setZone((current) => current === next ? current : next);
    }, { rootMargin: '-42% 0px -42% 0px', threshold: [0, 0.5, 1] });

    document.querySelectorAll<HTMLElement>('.experience-page .scene, .experience-page #abbo').forEach((section) => {
      observer.observe(section);
    });

    Object.keys(zoneById).forEach((id) => {
      const section = document.getElementById(id);
      if (section && !section.matches('.scene, #abbo')) observer.observe(section);
    });

    const hero = document.querySelector<HTMLElement>('.scene--hero');
    const heroObserver = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: .02 });
    if (hero) heroObserver.observe(hero);

    return () => {
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, []);

  const activate = () => {
    window.sessionStorage.setItem('tunaIntroduced', 'true');
    setIntroduced(true);
  };

  if (webgl === false) return createPortal(<div className="tuna-static-fallback" aria-hidden="true" />, document.body);
  if (webgl !== true) return null;

  const visibleZone = !heroVisible && !introduced ? 'away' : zone;

  return createPortal(
    <aside className={`tuna-overlay${tunaReady ? ' is-ready' : ''}`} data-tuna-state={reducedMotion ? 'STATIC' : introduced ? 'PET' : 'INTRO'} data-tuna-zone={visibleZone} aria-label="Tonno, mascotte interattiva">
      <Canvas className="tuna-canvas" frameloop={reducedMotion || !pageVisible ? 'demand' : 'always'} dpr={[1, 1.5]} camera={{ position: [0, 0, 7.4], fov: 32 }} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}>
        <ambientLight intensity={1.7} />
        <directionalLight position={[3, 4, 4]} intensity={2.2} />
        <directionalLight position={[-3, -1, 2]} intensity={.65} color="#fbcf15" />
        <Suspense fallback={null}><TunaModel reducedMotion={reducedMotion} petMode={introduced} onReady={handleTunaReady} /></Suspense>
      </Canvas>
      {!introduced && (
        <div className="tuna-intro">
          <p>Ciao, io sono Tonno.</p>
          <button type="button" className="tuna-intro__button" onClick={activate}>Cliccami.</button>
        </div>
      )}
      {!introduced && <button type="button" className="tuna-intro__hitbox" onClick={activate} aria-label="Attiva Tonno" />}
    </aside>,
    document.body,
  );
}

export const TunaScene = MascotLayer;

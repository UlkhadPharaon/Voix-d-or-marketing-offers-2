import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  NEFERTEM — interactive 3D phone mockup for the hero.              */
/*  Fully procedural three.js: no external assets, no network fetch.  */
/*  Screen is a live canvas texture recreating the publication feed   */
/*  (same content as the previous CSS mockup), gold-on-navy luxury.   */
/* ------------------------------------------------------------------ */

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/* ---------------- Screen content (matches old CSS mockup) ---------------- */

type FeedIcon = 'cloche' | 'sparkles' | 'clapper' | 'tag' | 'star';

const FEED_CARDS: { icon: FeedIcon; title: string; sub: string }[] = [
  { icon: 'cloche',   title: 'Menu du jour',         sub: 'Plat + jus · 1 500 F' },
  { icon: 'sparkles', title: 'Nouvelle collection',  sub: 'Disponible en boutique' },
  { icon: 'clapper',  title: 'En cuisine ce matin',  sub: 'Vidéo 15 s' },
  { icon: 'tag',      title: '-20 % ce week-end',    sub: 'Offre limitée' },
  { icon: 'star',     title: 'Ils nous ont choisis', sub: 'Avis clients' },
];

/* Screen texture must have EXACTLY the screen-mesh aspect so the canvas
 * covers the whole glass with zero distortion. The mesh is 1.32 × 3.08,
 * i.e. 3:7 (≈ 9:21, close to a 9:19.5 phone panel); 438 × 1022 packs the
 * same 3:7 ratio in whole pixels (3 × 146 and 7 × 146). */
const SCREEN_GEO_W = 1.32;
const SCREEN_GEO_H = 3.08;
const SCREEN_H = 1022; // 7 × 146
const SCREEN_W = 438;  // 3 × 146
const FEED_TOP = 152;
const FEED_BOTTOM = 942;
const CARD_H = 134;
const CARD_GAP = 15;
const LOOP = FEED_CARDS.length * (CARD_H + CARD_GAP);

/* Rounded-rect path helper (no ctx.roundRect dependency). */
function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.lineTo(x + w - rad, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
  ctx.lineTo(x + w, y + h - rad);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
  ctx.lineTo(x + rad, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
  ctx.lineTo(x, y + rad);
  ctx.quadraticCurveTo(x, y, x + rad, y);
  ctx.closePath();
}

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, outer: number, inner: number, rot = -Math.PI / 2) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const radius = i % 2 === 0 ? outer : inner;
    const angle = rot + (i * Math.PI) / 5;
    const px = cx + Math.cos(angle) * radius;
    const py = cy + Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function drawSparkle(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number) {
  ctx.beginPath();
  ctx.moveTo(cx, cy - size);
  ctx.quadraticCurveTo(cx, cy, cx + size, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy + size);
  ctx.quadraticCurveTo(cx, cy, cx - size, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy - size);
  ctx.closePath();
}

function drawFeedIcon(ctx: CanvasRenderingContext2D, kind: FeedIcon, cx: number, cy: number, size = 34) {
  ctx.strokeStyle = '#221A08';
  ctx.fillStyle = '#221A08';
  ctx.lineWidth = 4.8;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const k = size / 34; // scale factor over the base design size

  switch (kind) {
    case 'cloche': {
      ctx.beginPath();
      ctx.arc(cx, cy + 3 * k, 13 * k, Math.PI, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - 17 * k, cy + 3 * k);
      ctx.lineTo(cx + 17 * k, cy + 3 * k);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy - 12.5 * k, 2.6 * k, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(cx - 12 * k, cy + 10 * k);
      ctx.lineTo(cx + 12 * k, cy + 10 * k);
      ctx.stroke();
      break;
    }
    case 'sparkles': {
      drawSparkle(ctx, cx - 3 * k, cy + 3 * k, 12 * k);
      ctx.stroke();
      drawSparkle(ctx, cx + 13 * k, cy - 11 * k, 5.5 * k);
      ctx.fill();
      break;
    }
    case 'clapper': {
      rr(ctx, cx - 15 * k, cy - 12 * k, 30 * k, 24 * k, 4 * k);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - 15 * k, cy - 4 * k);
      ctx.lineTo(cx + 15 * k, cy - 4 * k);
      ctx.stroke();
      // Slanted stripes on the top strip.
      ctx.beginPath();
      ctx.moveTo(cx - 9 * k, cy - 12 * k);
      ctx.lineTo(cx - 13 * k, cy - 4 * k);
      ctx.moveTo(cx + 1 * k, cy - 12 * k);
      ctx.lineTo(cx - 3 * k, cy - 4 * k);
      ctx.moveTo(cx + 11 * k, cy - 12 * k);
      ctx.lineTo(cx + 7 * k, cy - 4 * k);
      ctx.stroke();
      break;
    }
    case 'tag': {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.55);
      ctx.beginPath();
      ctx.moveTo(-15 * k, -10 * k);
      ctx.lineTo(3 * k, -10 * k);
      ctx.lineTo(16 * k, 3 * k);
      ctx.lineTo(3 * k, 16 * k);
      ctx.lineTo(-15 * k, 16 * k);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(6 * k, 6 * k, 2.4 * k, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      break;
    }
    case 'star': {
      drawStar(ctx, cx, cy, 15.5 * k, 6.6 * k);
      ctx.stroke();
      break;
    }
  }
}

function drawNavIcon(ctx: CanvasRenderingContext2D, index: number, cx: number, cy: number, active: boolean) {
  ctx.strokeStyle = active ? '#D4AF37' : '#5F7889';
  ctx.lineWidth = 3.4;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  switch (index) {
    case 0: { // home
      ctx.beginPath();
      ctx.moveTo(cx - 10, cy + 1);
      ctx.lineTo(cx, cy - 8);
      ctx.lineTo(cx + 10, cy + 1);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - 6.5, cy - 1.5);
      ctx.lineTo(cx - 6.5, cy + 8);
      ctx.lineTo(cx + 6.5, cy + 8);
      ctx.lineTo(cx + 6.5, cy - 1.5);
      ctx.stroke();
      break;
    }
    case 1: { // grid / catalogue
      const s = 6.4, gap = 4.4;
      for (const [dx, dy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]] as const) {
        rr(ctx, cx + dx * (s / 2 + gap / 2) - s / 2, cy + dy * (s / 2 + gap / 2) - s / 2, s, s, 1.6);
        ctx.stroke();
      }
      break;
    }
    case 2: { // messages
      rr(ctx, cx - 10, cy - 8.5, 20, 13.5, 5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - 3, cy + 5);
      ctx.lineTo(cx - 5.5, cy + 11);
      ctx.lineTo(cx + 5, cy + 5);
      ctx.stroke();
      break;
    }
    case 3: { // profile
      ctx.beginPath();
      ctx.arc(cx, cy - 4.2, 4.6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy + 11.5, 8.2, Math.PI * 1.22, Math.PI * 1.78);
      ctx.stroke();
      break;
    }
  }
}

function drawScreen(ctx: CanvasRenderingContext2D, scrollOffset: number, now: Date) {
  const W = SCREEN_W;
  const H = SCREEN_H;

  /* Wallpaper: deep navy with a soft gold glow top-left */
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#102434');
  bg.addColorStop(0.55, '#0C1E2C');
  bg.addColorStop(1, '#0B1C29');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const glow = ctx.createRadialGradient(W * 0.18, 40, 10, W * 0.18, 40, 480);
  glow.addColorStop(0, 'rgba(212,175,55,0.14)');
  glow.addColorStop(1, 'rgba(212,175,55,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  /* Status bar */
  ctx.fillStyle = '#F5F1E6';
  ctx.font = '600 25px Manrope, "Segoe UI", sans-serif';
  ctx.textBaseline = 'middle';
  const time = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  ctx.fillText(time, 30, 33);

  // Signal bars
  const barsX = W - 148;
  for (let i = 0; i < 4; i++) {
    const barH = 5 + i * 4;
    ctx.fillRect(barsX + i * 7.5, 39 - barH, 4.6, barH);
  }
  // Wifi arcs
  ctx.strokeStyle = '#F5F1E6';
  ctx.lineWidth = 2.4;
  for (const radius of [6, 10.5]) {
    ctx.beginPath();
    ctx.arc(W - 96, 34, radius, Math.PI * 1.25, Math.PI * 1.75);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(W - 96, 37.5, 1.8, 0, Math.PI * 2);
  ctx.fill();
  // Battery
  ctx.lineWidth = 2.2;
  rr(ctx, W - 66, 24, 30, 15, 4);
  ctx.stroke();
  ctx.fillRect(W - 61.5, 28.5, 15, 7);
  ctx.fillRect(W - 34.5, 28.5, 2.6, 7);

  /* Dynamic island */
  ctx.fillStyle = '#05080C';
  rr(ctx, W / 2 - W * 0.165, 10, W * 0.33, 33, 16.5);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.10)';
  ctx.beginPath();
  ctx.arc(W / 2 + 52, 26.5, 5, 0, Math.PI * 2);
  ctx.fill();

  /* App header — NEFERTEM publication account */
  const avatar = ctx.createRadialGradient(44, 92, 2, 52, 105, 28);
  avatar.addColorStop(0, '#EBD27A');
  avatar.addColorStop(1, '#8A6D1F');
  ctx.fillStyle = avatar;
  ctx.beginPath();
  ctx.arc(52, 104, 26, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#241A06';
  ctx.font = '700 27px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('N', 52, 105);
  ctx.textAlign = 'left';

  ctx.save();
  ctx.letterSpacing = '5px';
  ctx.fillStyle = '#D8B45C';
  ctx.font = '700 20px Manrope, "Segoe UI", sans-serif';
  ctx.fillText('NEFERTEM', 88, 97);
  ctx.restore();
  ctx.fillStyle = '#87A0B2';
  ctx.font = '400 16px Manrope, "Segoe UI", sans-serif';
  ctx.fillText('Publié pour vous · vu 1 248 fois', 88, 124);

  // Verified badge
  ctx.fillStyle = '#D4AF37';
  ctx.beginPath();
  ctx.arc(W - 46, 103, 11.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#231A06';
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(W - 51.5, 103);
  ctx.lineTo(W - 47.5, 107.2);
  ctx.lineTo(W - 40, 98.5);
  ctx.stroke();

  // Hairline divider with gold accent
  const divider = ctx.createLinearGradient(0, 0, W, 0);
  divider.addColorStop(0, 'rgba(212,175,55,0)');
  divider.addColorStop(0.5, 'rgba(212,175,55,0.55)');
  divider.addColorStop(1, 'rgba(212,175,55,0)');
  ctx.fillStyle = divider;
  ctx.fillRect(24, 146.5, W - 48, 2);

  /* Scrolling feed (clipped) */
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, FEED_TOP, W, FEED_BOTTOM - FEED_TOP);
  ctx.clip();

  for (let i = 0; i < FEED_CARDS.length * 2; i++) {
    const card = FEED_CARDS[i % FEED_CARDS.length];
    const y = FEED_TOP + 10 + i * (CARD_H + CARD_GAP) - scrollOffset;
    if (y + CARD_H < FEED_TOP || y > FEED_BOTTOM) continue;

    rr(ctx, 16, y, W - 32, CARD_H, 22);
    ctx.fillStyle = 'rgba(235,240,245,0.055)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Gold icon tile
    const tile = ctx.createLinearGradient(38, y + 27, 112, y + 103);
    tile.addColorStop(0, '#E9CE6B');
    tile.addColorStop(1, '#B98E1E');
    rr(ctx, 38, y + 27, 76, 76, 19);
    ctx.fillStyle = tile;
    ctx.fill();
    drawFeedIcon(ctx, card.icon, 76, y + 65, 38);

    // Title + sub
    ctx.fillStyle = '#F3EEE2';
    ctx.font = '600 23px Manrope, "Segoe UI", sans-serif';
    ctx.fillText(card.title, 132, y + 56);
    ctx.fillStyle = '#87A0B2';
    ctx.font = '400 16px Manrope, "Segoe UI", sans-serif';
    ctx.fillText(card.sub, 132, y + 88);

    // Gold chevron — "voir comme vos clients"
    ctx.strokeStyle = 'rgba(212,175,55,0.65)';
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.moveTo(W - 44, y + 56);
    ctx.lineTo(W - 36, y + 65);
    ctx.lineTo(W - 44, y + 74);
    ctx.stroke();
  }

  // Fade edges so cards dissolve into the chrome
  const fadeTop = ctx.createLinearGradient(0, FEED_TOP, 0, FEED_TOP + 30);
  fadeTop.addColorStop(0, '#102433');
  fadeTop.addColorStop(1, 'rgba(16,36,51,0)');
  ctx.fillStyle = fadeTop;
  ctx.fillRect(0, FEED_TOP, W, 30);
  const fadeBottom = ctx.createLinearGradient(0, FEED_BOTTOM - 30, 0, FEED_BOTTOM);
  fadeBottom.addColorStop(0, 'rgba(11,28,41,0)');
  fadeBottom.addColorStop(1, '#0B1C29');
  ctx.fillStyle = fadeBottom;
  ctx.fillRect(0, FEED_BOTTOM - 30, W, 30);
  ctx.restore();

  /* Bottom navigation */
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.fillRect(0, 946, W, 1.5);
  for (let i = 0; i < 4; i++) {
    drawNavIcon(ctx, i, (W * (2 * i + 1)) / 8, 972, i === 0);
  }
  // Home indicator
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  rr(ctx, W / 2 - 68, 1006, 136, 5, 2.5);
  ctx.fill();
}

/* Back-panel logo: thin gold ring + serif N (drawn once). */
function makeBackLogoTexture(three: any) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(128, 128, 96, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#D4AF37';
  ctx.font = '700 128px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('N', 128, 134);
  const texture = new three.CanvasTexture(canvas);
  texture.colorSpace = three.SRGBColorSpace;
  return texture;
}

function roundedRectShape(THREE: any, w: number, h: number, r: number) {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  return shape;
}

const FALLBACK_NOTIFS = [
  'Votre lot de la semaine est prêt',
  "Un client vient d'être accueilli sur WhatsApp",
];

/** On-brand static fallback if WebGL is unavailable. */
function FallbackPhone() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className="rounded-[2.4rem] bg-gradient-to-b from-primary/80 via-primary/25 to-primary/60 p-[2px] shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_60px_rgba(212,175,55,0.18)]">
        <div className="flex h-64 w-36 flex-col items-center justify-center gap-3 rounded-[calc(2.4rem-2px)] bg-[#0B1C29]">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/50 font-serif text-4xl text-primary">
            N
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[4px] text-primary">Nefertem</span>
        </div>
      </div>
      <ul className="flex flex-col gap-2">
        {FALLBACK_NOTIFS.map((text) => (
          <li
            key={text}
            className="flex items-start gap-2 rounded-[10px] border border-primary/30 bg-background/95 p-2.5 shadow-lg backdrop-blur"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span className="text-[10px] font-bold leading-snug text-foreground">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PhoneMockup3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [staticMode, setStaticMode] = useState(false);
  const [failed, setFailed] = useState(false);

  /* Detect motion preferences once. */
  useEffect(() => {
    const reduced = window.matchMedia(REDUCED_MOTION).matches;
    const saveData = Boolean((navigator as any).connection?.saveData);
    setStaticMode(reduced || saveData);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let cleanupFn: (() => void) | undefined;

    async function init() {
      const THREE = await import('three');
      const { RoundedBoxGeometry } = await import('three/examples/jsm/geometries/RoundedBoxGeometry.js');
      const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js');
      if (cancelled) return;

      const {
        WebGLRenderer, Scene, PerspectiveCamera, PMREMGenerator,
        AmbientLight, DirectionalLight, PointLight,
        ExtrudeGeometry, ShapeGeometry, CylinderGeometry, TorusGeometry, CircleGeometry, PlaneGeometry,
        BufferGeometry, BufferAttribute, PointsMaterial, Points,
        MeshPhysicalMaterial, MeshStandardMaterial, MeshBasicMaterial, ShadowMaterial,
        CanvasTexture, SRGBColorSpace, ACESFilmicToneMapping,
        Group, Mesh,
      } = THREE as any;

      /* ---------- Full-hero canvas ----------
       * The canvas is position:absolute;inset:0 across the WHOLE hero (its
       * positioned ancestor is the clip-free hero <section>) and has
       * pointer-events:none. Drag/zoom live on this component's wrapper
       * div — the "phone zone" — so nothing else in the hero is blocked. */
      const hero = ((container.closest('section') as HTMLElement | null) ??
        container.parentElement ?? container);

      const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = SRGBColorSpace;
      renderer.toneMapping = ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.shadowMap.enabled = true;
      const dom = renderer.domElement;
      dom.style.display = 'block';
      dom.style.position = 'absolute';
      dom.style.inset = '0';
      dom.style.width = '100%';
      dom.style.height = '100%';
      dom.style.pointerEvents = 'none';

      const host = document.createElement('div');
      host.style.cssText = 'position:absolute;inset:0;pointer-events:none;';
      host.appendChild(dom);
      hero.appendChild(host);

      /* ---------- Environment (offline IBL for the gold) ---------- */
      const pmrem = new PMREMGenerator(renderer);
      const envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

      /* ---------- Scene & camera ---------- */
      const scene = new Scene();
      scene.environment = envMap;

      const camera = new PerspectiveCamera(32, 1, 0.1, 60);
      camera.position.set(0, 0, 6.35); // distance re-fit by layout()
      camera.lookAt(0, 0, 0);

      /* ---------- Stage: everything that must follow the phone ----------
       * The canvas spans the whole hero, so the phone, its lights, shadow,
       * halo and gold dust travel as one group re-anchored over the slot. */
      const stage = new Group();
      scene.add(stage);

      /* ---------- Lights ---------- */
      scene.add(new AmbientLight(0xffffff, 0.35));

      const key = new DirectionalLight(0xfff4dd, 2.2);
      key.position.set(3.2, 4.5, 4.5);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      key.shadow.camera.near = 0.5;
      key.shadow.camera.far = 15;
      stage.add(key);
      stage.add(key.target); // keep the light direction fixed relative to the phone

      const rimGold = new PointLight(0xd4af37, 16, 12, 2);
      rimGold.position.set(-2.3, 1.7, -1.6);
      stage.add(rimGold);

      const fillCool = new PointLight(0x88aaff, 5, 12, 2);
      fillCool.position.set(2.2, -1.2, 2.4);
      stage.add(fillCool);

      const hoverGlow = new PointLight(0xffe9b0, 0, 4.5, 2);
      hoverGlow.position.set(0, 0.35, 1.5);
      stage.add(hoverGlow);

      /* ---------- Gold halo behind the phone ----------
       * In-scene replacement for the old blurred DOM div (which now sits in a
       * stacking context ABOVE the full-hero canvas): alpha gradient so it
       * composites cleanly over the page. */
      const glowCanvas = document.createElement('canvas');
      glowCanvas.width = 256;
      glowCanvas.height = 256;
      const glowCtx = glowCanvas.getContext('2d')!;
      const glowGrad = glowCtx.createRadialGradient(128, 128, 6, 128, 128, 128);
      glowGrad.addColorStop(0, 'rgba(212,175,55,0.85)');
      glowGrad.addColorStop(0.45, 'rgba(212,175,55,0.30)');
      glowGrad.addColorStop(1, 'rgba(212,175,55,0)');
      glowCtx.fillStyle = glowGrad;
      glowCtx.fillRect(0, 0, 256, 256);
      const glowTexture = new CanvasTexture(glowCanvas);
      glowTexture.colorSpace = SRGBColorSpace;
      const halo = new Mesh(
        new PlaneGeometry(4.6, 5.4),
        new MeshBasicMaterial({ map: glowTexture, transparent: true, depthWrite: false, toneMapped: false })
      );
      halo.position.z = -1.2;
      stage.add(halo);

      /* ---------- Ground shadow catcher ---------- */
      const shadowMesh = new Mesh(
        new PlaneGeometry(8, 8),
        new ShadowMaterial({ opacity: 0.3 })
      );
      shadowMesh.rotation.x = -Math.PI / 2;
      shadowMesh.position.y = -1.78; // just under the phone's bottom edge
      shadowMesh.receiveShadow = true;
      stage.add(shadowMesh);

      const phone = new Group();
      stage.add(phone);

      const BODY_W = 1.5;
      const BODY_H = 3.3;
      const DEPTH = 0.15;
      const BEVEL = 0.03;
      const FRONT_Z = DEPTH / 2 + BEVEL; // 0.105

      /* ---------- Gold unibody (extruded rounded rect, beveled) ---------- */
      const bodyShape = roundedRectShape(THREE, BODY_W, BODY_H, 0.44);
      const bodyGeometry = new ExtrudeGeometry(bodyShape, {
        depth: DEPTH,
        steps: 1,
        bevelEnabled: true,
        bevelThickness: BEVEL,
        bevelSize: BEVEL,
        bevelSegments: 4,
        curveSegments: 44,
      });
      bodyGeometry.translate(0, 0, -DEPTH / 2);
      const goldMaterial = new MeshPhysicalMaterial({
        color: 0xd4af37,
        metalness: 1.0,
        roughness: 0.24,
        clearcoat: 0.55,
        clearcoatRoughness: 0.22,
        envMapIntensity: 1.35,
      });
      const body = new Mesh(bodyGeometry, goldMaterial);
      body.castShadow = true;
      phone.add(body);

      /* ---------- Black glass bezel + screen ---------- */
      const bezel = new Mesh(
        new ShapeGeometry(roundedRectShape(THREE, SCREEN_GEO_W + 0.04, SCREEN_GEO_H + 0.04, 0.24), 32),
        new MeshPhysicalMaterial({ color: 0x05070b, metalness: 0.35, roughness: 0.32, clearcoat: 0.8, envMapIntensity: 0.9 })
      );
      bezel.position.z = FRONT_Z + 0.0015;
      phone.add(bezel);

      // Live screen (canvas texture)
      const screenCanvas = document.createElement('canvas');
      screenCanvas.width = SCREEN_W;
      screenCanvas.height = SCREEN_H;
      const screenCtx = screenCanvas.getContext('2d')!;
      const screenTexture = new CanvasTexture(screenCanvas);
      screenTexture.colorSpace = SRGBColorSpace;
      screenTexture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      /* ShapeGeometry exposes raw vertex coordinates as UVs ("world uvs"):
       * x ∈ [-w/2, w/2], y ∈ [-h/2, h/2]. Remap them so the canvas spans
       * exactly UV 0–1 over the whole glass (MeshBasicMaterial keeps the
       * screen emissive/bright regardless of scene lights). */
      screenTexture.repeat.set(1 / SCREEN_GEO_W, 1 / SCREEN_GEO_H);
      screenTexture.offset.set(0.5, 0.5);

      const screen = new Mesh(
        new ShapeGeometry(roundedRectShape(THREE, SCREEN_GEO_W, SCREEN_GEO_H, 0.21), 32),
        new MeshBasicMaterial({ map: screenTexture, toneMapped: false })
      );
      screen.position.z = FRONT_Z + 0.004;
      phone.add(screen);

      // Sheen — catches the room environment as the phone rotates
      const sheen = new Mesh(
        new ShapeGeometry(roundedRectShape(THREE, SCREEN_GEO_W, SCREEN_GEO_H, 0.21), 32),
        new MeshPhysicalMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.085,
          roughness: 0.06,
          metalness: 0,
          clearcoat: 1,
          clearcoatRoughness: 0.08,
          envMapIntensity: 1.6,
          depthWrite: false,
        })
      );
      sheen.position.z = FRONT_Z + 0.0065;
      phone.add(sheen);

      /* ---------- Black glass back + gold logo ---------- */
      const backPanel = new Mesh(
        new ShapeGeometry(roundedRectShape(THREE, BODY_W - 0.1, BODY_H - 0.1, 0.4), 32),
        new MeshPhysicalMaterial({
          color: 0x0d1b28,
          metalness: 0.15,
          roughness: 0.3,
          clearcoat: 1,
          clearcoatRoughness: 0.18,
          envMapIntensity: 1.1,
        })
      );
      backPanel.position.z = -FRONT_Z - 0.0015;
      backPanel.rotation.y = Math.PI;
      phone.add(backPanel);

      const backLogoTexture = makeBackLogoTexture(THREE);
      const backLogo = new Mesh(
        new PlaneGeometry(0.66, 0.66),
        new MeshBasicMaterial({ map: backLogoTexture, transparent: true, toneMapped: false, opacity: 0.92 })
      );
      backLogo.position.set(0, -0.35, -FRONT_Z - 0.004);
      backLogo.rotation.y = Math.PI;
      phone.add(backLogo);

      /* ---------- Camera module (back, top-left) ---------- */
      const moduleMat = new MeshPhysicalMaterial({ color: 0x141a22, metalness: 0.6, roughness: 0.35, clearcoat: 0.6 });
      const cameraModule = new Mesh(new RoundedBoxGeometry(0.56, 0.56, 0.055, 3, 0.13), moduleMat);
      cameraModule.position.set(-0.4, 1.12, -FRONT_Z - 0.018);
      cameraModule.castShadow = true;
      phone.add(cameraModule);

      const lensGlass = new MeshPhysicalMaterial({ color: 0x060b14, metalness: 0.1, roughness: 0.05, clearcoat: 1, envMapIntensity: 2 });
      for (const lensY of [1.25, 0.99]) {
        const ring = new Mesh(new TorusGeometry(0.088, 0.017, 12, 36), goldMaterial);
        ring.position.set(-0.4, lensY, -FRONT_Z - 0.047);
        phone.add(ring);
        const glass = new Mesh(new CylinderGeometry(0.078, 0.078, 0.03, 32), lensGlass);
        glass.rotation.x = Math.PI / 2;
        glass.position.set(-0.4, lensY, -FRONT_Z - 0.045);
        phone.add(glass);
      }
      // Flash
      const flash = new Mesh(
        new CircleGeometry(0.032, 20),
        new MeshBasicMaterial({ color: 0xf7eed3 })
      );
      flash.position.set(-0.22, 1.12, -FRONT_Z - 0.047);
      flash.rotation.y = Math.PI;
      phone.add(flash);

      /* ---------- Side buttons (gold) ---------- */
      const buttonMat = goldMaterial;
      const addButton = (x: number, y: number, len: number) => {
        const button = new Mesh(new RoundedBoxGeometry(0.055, len, 0.085, 2, 0.022), buttonMat);
        button.position.set(x, y, 0);
        phone.add(button);
      };
      const halfW = BODY_W / 2;
      addButton(-halfW - 0.012, 1.02, 0.2);   // mute switch
      addButton(-halfW - 0.012, 0.68, 0.34);  // volume up
      addButton(-halfW - 0.012, 0.28, 0.34);  // volume down
      addButton(halfW + 0.012, 0.68, 0.5);    // power

      // USB-C slot + speaker/mic perforations on the bottom edge
      const usbSlot = new Mesh(
        new RoundedBoxGeometry(0.32, 0.05, 0.09, 2, 0.02),
        new MeshStandardMaterial({ color: 0x05070b, roughness: 0.6, metalness: 0.4 })
      );
      usbSlot.position.set(0, -BODY_H / 2 - 0.002, 0);
      phone.add(usbSlot);
      const holeGeometry = new CylinderGeometry(0.021, 0.021, 0.05, 12);
      const holeMaterial = new MeshStandardMaterial({ color: 0x05070b, roughness: 0.7 });
      for (const side of [-1, 1]) {
        for (let i = 0; i < 3; i++) {
          const hole = new Mesh(holeGeometry, holeMaterial);
          hole.position.set(side * (0.31 + i * 0.085), -BODY_H / 2 - 0.002, 0);
          phone.add(hole);
        }
      }

      /* ---------- Gold-dust particles ---------- */
      const PARTICLE_COUNT = 90;
      const positions = new Float32Array(PARTICLE_COUNT * 3);
      const seeds = new Float32Array(PARTICLE_COUNT);
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 3.4;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 4.4;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 2.4;
        seeds[i] = Math.random() * Math.PI * 2;
      }
      const particleGeometry = new BufferGeometry();
      particleGeometry.setAttribute('position', new BufferAttribute(positions, 3));
      const particleMaterial = new PointsMaterial({
        color: 0xd4af37,
        size: 0.028,
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });
      const particles = new Points(particleGeometry, particleMaterial);
      stage.add(particles); // re-anchored & rescaled with the phone (see layout)

      /* ---------- Interaction ----------
       * All input lives on this component's wrapper div (the phone zone);
       * the canvas itself has pointer-events:none. Zoom stays available but
       * is hard-bounded (minDistance/maxDistance as zoom ratios around the
       * fitted base distance), and drag rotations are clamped so the model
       * always keeps a margin inside the frustum. */
      const state = {
        dragging: false,
        prevX: 0,
        prevY: 0,
        baseRotX: 0.1,
        baseRotY: -0.45,
        spin: 0,
        parX: 0,      // smoothed pointer parallax (x)
        parY: 0,      // smoothed pointer parallax (y)
        parTargetX: 0,
        parTargetY: 0,
        hover: 0,     // 0..1 smoothed
        hoverTarget: 0,
        zoomRatio: 1, // user zoom, as a ratio of the fitted distance (bounded)
        zoom: 0,      // smoothed camera distance; snapped by the first layout()
        fitZoom: 6.35,
      };

      /* ---------- Layout: full-hero canvas + slot anchor ----------
       * The canvas is hero-wide, so the camera is re-fit here and the stage
       * re-anchored so the phone renders exactly over this component's slot
       * with margins: at rest the phone fills FIT of the slot height, zoom
       * never makes it exceed the slot, and narrow heroes get horizontally
       * widened (MIN_WORLD_W) so the model never touches the frustum edges. */
      const FOV_RAD = (32 * Math.PI) / 180;
      const HALF_TAN = Math.tan(FOV_RAD / 2);
      const MODEL_H = 3.3;               // phone height in world units
      const MODEL_W = 1.6;               // worst-case rotated width, buttons in
      const FIT = 0.82;                  // phone height = 82% of slot height
      const ZOOM_IN = 0.85;              // minDistance = fit distance × ZOOM_IN
      const ZOOM_OUT = 1.12;             // maxDistance = fit distance × ZOOM_OUT
      const MIN_WORLD_W = MODEL_W * 1.2; // guaranteed horizontal margin

      let canvasW = 1;
      let canvasH = 1;
      let slotCx = 0; // slot centre within the hero canvas, in px
      let slotCy = 0;

      const layout = () => {
        const heroRect = hero.getBoundingClientRect();
        const slotRect = container.getBoundingClientRect();
        const W = Math.max(1, Math.round(heroRect.width));
        const H = Math.max(1, Math.round(heroRect.height));
        if (W !== canvasW || H !== canvasH) {
          canvasW = W;
          canvasH = H;
          renderer.setSize(W, H, false); // CSS size stays inset-0 / 100%
          camera.aspect = W / H;
          camera.updateProjectionMatrix();
        }
        const ppu = (FIT * (slotRect.height || 420)) / MODEL_H; // px per world unit
        const fitZoom = H / ppu / (2 * HALF_TAN);
        const fitWidthZoom = MIN_WORLD_W / (2 * HALF_TAN * (W / H));
        state.fitZoom = Math.max(fitZoom, fitWidthZoom);
        state.zoomRatio = Math.min(ZOOM_OUT, Math.max(ZOOM_IN, state.zoomRatio));
        if (state.zoom === 0) state.zoom = state.fitZoom * state.zoomRatio; // no size flash
        slotCx = slotRect.left - heroRect.left + slotRect.width / 2;
        slotCy = slotRect.top - heroRect.top + slotRect.height / 2;
        // Gold dust stays in the slot's vicinity (the canvas is hero-wide).
        particles.scale.set(
          Math.min((W * 0.9) / ppu, ((slotRect.width || 280) + 180) / ppu) / 3.4,
          ((slotRect.height || 420) + 180) / ppu / 4.4,
          1
        );
      };

      const onPointerDown = (e: PointerEvent) => {
        state.dragging = true;
        state.prevX = e.clientX;
        state.prevY = e.clientY;
        container.style.cursor = 'grabbing';
        try { container.setPointerCapture(e.pointerId); } catch { /* noop */ }
      };
      const onPointerMove = (e: PointerEvent) => {
        // Parallax is measured across the whole hero; hover only in the zone.
        const hr = hero.getBoundingClientRect();
        const nx = hr.width > 0 ? ((e.clientX - hr.left) / hr.width) * 2 - 1 : 0;
        const ny = hr.height > 0 ? ((e.clientY - hr.top) / hr.height) * 2 - 1 : 0;
        state.parTargetX = Math.max(-1, Math.min(1, nx));
        state.parTargetY = Math.max(-1, Math.min(1, ny));
        const r = container.getBoundingClientRect();
        state.hoverTarget = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom ? 1 : 0;

        if (!state.dragging) return;
        const dx = e.clientX - state.prevX;
        const dy = e.clientY - state.prevY;
        // Bounded yaw/pitch — the model never tilts out of view.
        state.baseRotY = Math.max(-1.65, Math.min(0.75, state.baseRotY + dx * 0.011));
        state.baseRotX = Math.max(-0.42, Math.min(0.55, state.baseRotX + dy * 0.009));
        state.prevX = e.clientX;
        state.prevY = e.clientY;
      };
      const onPointerUp = () => {
        state.dragging = false;
        container.style.cursor = 'grab';
      };
      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        // Ratio-based zoom, re-clamped into [ZOOM_IN, ZOOM_OUT] every frame.
        state.zoomRatio = Math.min(ZOOM_OUT, Math.max(ZOOM_IN, state.zoomRatio + e.deltaY * 0.0004));
      };

      layout();

      if (!staticMode) {
        container.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
        container.addEventListener('wheel', onWheel, { passive: false });
      }

      /* ---------- Resize ---------- */
      const STATIC_ELAPSED = 1.2;
      const resizeObserver = new ResizeObserver(() => {
        layout();
        if (staticMode) drawFrame(STATIC_ELAPSED, true); // keep the static frame painted
      });
      resizeObserver.observe(hero);
      resizeObserver.observe(container);

      /* ---------- Render loop ---------- */
      let rafId = 0;
      let lastFrame = 0;
      let screenAccum = 1; // force first draw
      const startTime = performance.now();

      const drawFrame = (elapsed: number, forceScreen = false) => {
        // Screen texture ~30 fps is plenty for a slow scroll
        screenAccum += 1 / 60;
        if (forceScreen || screenAccum >= 1 / 30) {
          drawScreen(screenCtx, (elapsed * 26) % LOOP, new Date());
          screenTexture.needsUpdate = true;
          screenAccum = 0;
        }

        // Anchor the phone (and its entourage) over the slot for the current zoom.
        const halfH = HALF_TAN * state.zoom;
        stage.position.set(
          ((slotCx * 2) / Math.max(1, canvasW) - 1) * halfH * camera.aspect,
          -((slotCy * 2) / Math.max(1, canvasH) - 1) * halfH,
          0
        );

        phone.rotation.y = state.baseRotY + state.spin + state.parX * 0.16;
        // Pitch stays bounded (drag + parallax combined).
        phone.rotation.x = Math.max(-0.52, Math.min(0.65, state.baseRotX + state.parY * 0.1));
        phone.rotation.z = Math.sin(elapsed * 0.5) * 0.02;
        phone.position.y = Math.sin(elapsed * 0.9) * 0.075;
        renderer.render(scene, camera);
      };

      const animate = () => {
        rafId = requestAnimationFrame(animate);
        const now = performance.now();
        const dt = Math.min(0.05, lastFrame ? (now - lastFrame) / 1000 : 1 / 60);
        lastFrame = now;
        const elapsed = (now - startTime) / 1000;

        // Idle spin + pointer parallax, critically damped
        if (!state.dragging) state.spin += dt * 0.14;
        const damp = 1 - Math.exp(-dt * 7);
        state.parX += (state.parTargetX - state.parX) * damp;
        state.parY += (state.parTargetY - state.parY) * damp;
        state.hover += (state.hoverTarget - state.hover) * damp;
        state.zoomRatio = Math.max(ZOOM_IN, Math.min(ZOOM_OUT, state.zoomRatio));
        state.zoom += (state.fitZoom * state.zoomRatio - state.zoom) * (1 - Math.exp(-dt * 8));

        camera.position.set(0, 0, state.zoom);
        camera.lookAt(0, 0, 0);
        hoverGlow.intensity = state.hover * 5;

        // Particle drift + wrap
        const positionAttr = particleGeometry.getAttribute('position') as any;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          let y = positionAttr.getY(i) + dt * 0.14;
          if (y > 2.3) y = -2.3;
          positionAttr.setY(i, y);
          positionAttr.setX(i, positionAttr.getX(i) + Math.sin(elapsed * 0.8 + seeds[i]) * dt * 0.03);
        }
        positionAttr.needsUpdate = true;

        drawFrame(elapsed);
      };

      if (staticMode) {
        // Static, flattering 3/4 view — no loop, no listeners
        state.baseRotY = -0.38;
        state.baseRotX = 0.12;
        state.spin = 0;
        drawFrame(STATIC_ELAPSED, true);
      } else {
        animate();
      }
      if (!cancelled) setReady(true);

      /* ---------- Cleanup ---------- */
      cleanupFn = () => {
        cancelAnimationFrame(rafId);
        resizeObserver.disconnect();
        container.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        container.removeEventListener('wheel', onWheel);
        glowTexture.dispose();
        scene.traverse((obj: any) => {
          if (obj?.isMesh || obj?.isPoints) {
            obj.geometry?.dispose?.();
            const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
            for (const material of materials) {
              if (!material) continue;
              for (const key of Object.keys(material)) {
                const value = material[key];
                if (value?.isTexture) value.dispose?.();
              }
              material.dispose?.();
            }
          }
        });
        backLogoTexture.dispose();
        screenTexture.dispose();
        particleGeometry.dispose();
        particleMaterial.dispose();
        envMap.dispose();
        pmrem.dispose();
        renderer.dispose();
        if (host.parentNode) host.parentNode.removeChild(host);
      };
    }

    init().catch((err) => {
      console.error('[PhoneMockup3D] WebGL init failed:', err);
      if (!cancelled) setFailed(true);
    });

    return () => {
      cancelled = true;
      cleanupFn?.();
    };
  }, [staticMode]);

  /* Layout slot AND the only pointer-events zone ("phone area"); the 3D
   * canvas itself is mounted absolute over the whole hero. */
  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-[280px] select-none sm:w-[310px]"
      style={{ height: 420, cursor: staticMode || failed ? 'default' : 'grab', touchAction: 'pan-y' }}
      aria-hidden="true"
    >
      {!ready && !failed && !staticMode && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary/70" />
        </div>
      )}

      {failed && <FallbackPhone />}
    </div>
  );
}

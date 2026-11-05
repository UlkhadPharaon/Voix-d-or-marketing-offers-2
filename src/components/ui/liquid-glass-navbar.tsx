"use client"

/**
 * Nimbus UI · "Liquid Glass Navbar" — Waterline engine adapted to a pill navbar.
 * The original (21st.dev/r/gughigug/liquid-glass-navbar, by Guglielmo Giannattasio,
 * MIT) could not be raw-fetched without a 21st API key, so this file re-implements
 * its documented behaviour on top of the SAME engine as the Liquid Toggle
 * ("Waterline"): a single water drop travels along the pill, stretches into a neck,
 * sheds gooey droplets that merge back into the destination bubble with a ripple,
 * while the track fills with water behind it. Built-in hover "meniscus" (the water
 * bulges toward the cursor), WebGL shader with CSS fallback when unavailable,
 * keyboard support, reduced-motion jumps. Icons ride on top of the water with the
 * fx micro-animations (glow / spin / plane / drop / wave). React only, no deps besides React.
 */

import * as React from "react"

export type LiquidNavbarFx = "glow" | "spin" | "plane" | "drop" | "wave" | "none"

export type LiquidNavbarItem = {
  label?: string
  icon?: React.ReactNode
  fx?: LiquidNavbarFx
}

export type LiquidNavbarProps = {
  items: LiquidNavbarItem[]
  /** controlled active index */
  active?: number
  defaultActive?: number
  onBeforeChange?: () => void
  onSelect?: (index: number) => void
  /** "light" water for bright backgrounds, "dark" for dark ones */
  tone?: "light" | "dark"
  /** pill height in px */
  size?: number
  /** soft synthesized "plip" on switch (no audio files) */
  sound?: boolean
  /** accessible name for the nav landmark */
  label?: string
  className?: string
  style?: React.CSSProperties
}

/* ---------- icons (stroke = currentColor, sized from CSS) ---------- */
const I = (d: React.ReactNode) => (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d}
  </svg>
)
export const NimbusIcons = {
  home: I(<><path d="M3.5 10.5 12 3.5l8.5 7" /><path d="M5.5 9.5V20h13V9.5" /></>),
  globe: I(<><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.2 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.2-3.6-8.5S9.6 5.8 12 3.5Z" /></>),
  plane: I(<path d="M10.5 13.5 3 11l18-7-6.5 17-2.8-7.2-.4-4.3Z" />),
  drop: I(<path d="M12 3.5s6.5 7.3 6.5 11.2A6.5 6.5 0 0 1 5.5 14.7C5.5 10.8 12 3.5 12 3.5Z" />),
  user: I(<><circle cx="12" cy="8" r="3.8" /><path d="M4.5 20.5c1.6-3.4 4.2-5 7.5-5s5.9 1.6 7.5 5" /></>),
  compass: I(<><circle cx="12" cy="12" r="8.5" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>),
  film: I(<><rect x="3.5" y="4.5" width="17" height="15" rx="2.5" /><path d="M8 4.5v15M16 4.5v15M3.5 12h17M3.5 8.3h4.5M3.5 15.7h4.5M16 8.3h4.5M16 15.7h4.5" /></>),
  gem: I(<><path d="M7 4.5h10l3.5 5-8.5 10-8.5-10L7 4.5Z" /><path d="M3.5 9.5h17M9.5 4.5 8 9.5l4 10 4-10-1.5-5" /></>),
  help: I(<><circle cx="12" cy="12" r="8.5" /><path d="M9.6 9.3a2.5 2.5 0 0 1 4.9.7c0 1.6-2.5 2-2.5 3.5M12 17h.01" /></>),
  sparkle: I(<path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9L12 3.5ZM19 16.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z" />),
  sun: I(<><circle cx="12" cy="12" r="4.2" /><path d="M12 2.8v2.1M12 19.1v2.1M2.8 12h2.1M19.1 12h2.1M5.5 5.5 7 7M17 17l1.5 1.5M5.5 18.5 7 17M17 7l1.5-1.5" /></>),
  moon: I(<path d="M20 14.6A8.3 8.3 0 1 1 9.4 4a6.6 6.6 0 0 0 10.6 10.6Z" />),
}

/* ---------- styles ---------- */
const NL_CSS = `
.nimbus-navbar{--t-tint:rgba(255,255,255,.18);--t-rim:rgba(255,255,255,.8);--t-ink-off:rgba(11,19,43,.62);--t-ink-on:#0273B6;--nc-accent:rgba(0,162,255,.85);
  position:relative;display:inline-flex;align-items:stretch;gap:2px;padding:5px 9px;margin:0;border:0;background:none;border-radius:999px;isolation:isolate;
  vertical-align:middle;touch-action:pan-y;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;
  font:600 11px/1 ui-sans-serif,-apple-system,'Segoe UI',system-ui,sans-serif;letter-spacing:.08em}
.nimbus-navbar[data-tone="dark"]{--t-tint:rgba(10,18,40,.34);--t-rim:rgba(255,255,255,.3);--t-ink-off:rgba(234,244,255,.6);--t-ink-on:#7EE8FF;--nc-accent:rgba(126,232,255,.9)}
.nimbus-navbar:focus-visible{outline:2px solid #00A2FF;outline-offset:3px}
.nl-glass{position:absolute;inset:0;border-radius:inherit;z-index:-2;overflow:hidden;background:var(--t-tint);
  -webkit-backdrop-filter:blur(10px) saturate(1.2) brightness(1.06);backdrop-filter:blur(10px) saturate(1.2) brightness(1.06);
  box-shadow:inset 0 2px 5px rgba(0,40,90,.16),inset 0 -1px 1px var(--t-rim),inset 0 0 0 1px rgba(255,255,255,.24),0 1px 0 rgba(255,255,255,.45),0 10px 24px -14px rgba(0,40,90,.5)}
.nimbus-navbar[data-tone="dark"] .nl-glass{box-shadow:inset 0 2px 6px rgba(0,0,0,.35),inset 0 -1px 1px var(--t-rim),inset 0 0 0 1px rgba(255,255,255,.12),0 10px 24px -14px rgba(0,0,0,.7)}
.nl-water{position:absolute;z-index:-1;pointer-events:none}
.nimbus-navbar[data-gl="off"] .nl-water{display:none}
.nl-fill,.nl-knob{display:none;position:absolute;pointer-events:none;border-radius:999px;will-change:transform,width}
.nimbus-navbar[data-gl="off"] .nl-fill,.nimbus-navbar[data-gl="off"] .nl-knob{display:block}
.nl-fill{z-index:-1;left:2px;top:4px;bottom:4px;background:linear-gradient(180deg,#7EE8FF,#00A2FF);opacity:.8}
.nl-knob{z-index:0;background:radial-gradient(120% 140% at 30% 0%,rgba(255,255,255,.95),rgba(255,255,255,0) 60%),rgba(240,250,255,.82);
  box-shadow:inset 0 1px 1px #fff,inset 0 -2px 6px rgba(0,162,255,.25),inset 0 0 0 1px rgba(255,255,255,.6),0 4px 10px -3px rgba(0,60,130,.45)}
.nimbus-navbar[data-tone="dark"] .nl-knob{background:radial-gradient(120% 140% at 30% 0%,rgba(255,255,255,.55),rgba(255,255,255,0) 60%),rgba(120,180,240,.5);
  box-shadow:inset 0 1px 1px rgba(255,255,255,.7),inset 0 0 0 1px rgba(255,255,255,.35),0 4px 10px -3px rgba(0,0,0,.6)}
.nimbus-navbar[data-tone="dark"] .nl-fill{background:linear-gradient(180deg,#2EB8FF,#0060CC)}
.nl-item{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;gap:7px;min-height:100%;padding:4px 13px;
  border:0;background:none;border-radius:999px;cursor:pointer;color:var(--t-ink-off);letter-spacing:inherit;
  transition:color .25s ease;-webkit-tap-highlight-color:transparent}
.nl-item:focus-visible{outline:2px solid #00A2FF;outline-offset:-2px}
.nl-item[data-active]{color:var(--t-ink-on)}
.nl-ico{position:relative;display:block;flex:none;width:17px;height:17px}
.nl-ico svg{display:block;width:100%;height:100%}
@keyframes nl-fx-glow{0%,100%{filter:drop-shadow(0 0 1px rgba(255,255,255,.3))}50%{filter:drop-shadow(0 0 7px var(--nc-accent))}}
@keyframes nl-fx-spin{to{transform:rotate(360deg)}}
@keyframes nl-fx-plane{0%,100%{transform:translateX(0) skewX(0)}25%{transform:translateX(4px) skewX(-8deg)}60%{transform:translateX(-3px) skewX(5deg)}}
@keyframes nl-fx-drop{0%,100%{transform:translateY(0) scaleY(1)}30%{transform:translateY(-4px) scaleY(1.08)}60%{transform:translateY(1px) scaleY(.94)}80%{transform:translateY(0) scaleY(1.02)}}
@keyframes nl-fx-wave{0%,100%{transform:scale(1,1)}25%{transform:scale(1.15,.86)}50%{transform:scale(.88,1.12)}75%{transform:scale(1.07,.93)}}
.nl-item[data-active] .nl-fx-glow{animation:nl-fx-glow 2.6s ease-in-out infinite}
.nl-item:hover .nl-fx-glow{animation:nl-fx-glow 1.2s ease-in-out infinite}
.nl-item:hover .nl-fx-spin{animation:nl-fx-spin .7s cubic-bezier(.5,.1,.3,1)}
.nl-item:hover .nl-fx-plane{animation:nl-fx-plane .8s ease}
.nl-item:hover .nl-fx-drop{animation:nl-fx-drop .8s cubic-bezier(.4,0,.4,1)}
.nl-item:hover .nl-fx-wave{animation:nl-fx-wave 1s ease-in-out}
.nimbus-navbar[data-motion="off"] .nl-ico{animation:none!important}
@media (prefers-reduced-motion: reduce){.nl-ico{animation:none!important}}
`

/* ---------- the water shader (same Waterline engine as Liquid Toggle) ---------- */
const VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`
const FRAG = `precision highp float;
uniform vec2 uRes;uniform float uDpr;uniform float uS;uniform float uTime;uniform vec4 uPill;uniform vec4 uFill;
uniform vec4 uBlob[6];uniform float uSy[6];uniform vec4 uRip[6];uniform vec3 uMouse;uniform float uDark;uniform float uAmb;uniform float uK;
float sdRB(vec2 p,vec2 b,float r){vec2 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,q.y),0.)-r;}
float sdCap(vec2 p,vec4 B,float sy){p-=B.xy;p.y/=sy;p.x=max(abs(p.x)-B.z,0.);return(length(p)-B.w)*min(1.,sy);}
float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}
float dropD(vec2 p){float d=1e4;for(int i=0;i<6;i++){if(uBlob[i].w>.5){d=smin(d,sdCap(p,uBlob[i],uSy[i]),uK);}}return d;}
float pillD(vec2 p){vec2 h=uPill.zw*.5;return sdRB(p-uPill.xy-h,h,h.y);}
float fillD(vec2 p){float w=(sin(p.y*.3+uTime*5.)+.6*sin(p.y*.17-uTime*3.3))*uFill.y;float f=smin(p.x-uFill.x-w,dropD(p)+3.+(1.-uFill.z)*60.,9.);return max(pillD(p)+2.,f);}
float lens(float d,float w){float t=clamp(-d/w,0.,1.);return sqrt(1.-(1.-t)*(1.-t));}
float waves(vec2 p){float w=0.;
 for(int i=0;i<6;i++){vec4 R=uRip[i];if(R.w>0.){float x=length(p-R.xy)-R.z*240.;w+=R.w*exp(-R.z*1.7)*sin(x*.3)*exp(-x*x/700.);}}
 vec2 m=p-uMouse.xy;w+=uMouse.z*3.6*exp(-dot(m,m)/1000.);
 w+=uAmb*(sin(p.x*.05+uTime*1.2)*.45+sin(p.x*.13-uTime*.85+p.y*.2)*.25);return w;}
float H(vec2 p){float dp=pillD(p);return lens(dp,uPill.w*.36)*2.4+lens(fillD(p),9.)*2.2+lens(dropD(p),11.)*7.5+waves(p)*smoothstep(0.,7.,-dp);}
float caus(vec2 p,float t){vec2 q=p;float c=0.;for(int i=0;i<3;i++){q+=vec2(sin(q.y*1.1+t),cos(q.x*1.3-t*.7))*.6;c+=1./(1.+16.*abs(sin(q.x)*sin(q.y)));}return c/3.;}
void main(){
 vec2 p=vec2(gl_FragCoord.x,uRes.y*uDpr-gl_FragCoord.y)/uDpr/uS;
 float dp=pillD(p);float dd=dropD(p);float fd=fillD(p);
 float h0=H(p);vec3 n=normalize(vec3(h0-H(p+vec2(1.,0.)),h0-H(p+vec2(0.,1.)),1.));
 vec3 V=vec3(0.,0.,1.);
 float spec=pow(max(dot(reflect(-normalize(vec3(-.45,-.8,.85)),n),V),0.),70.);
 float spec2=pow(max(dot(reflect(-normalize(vec3(.6,.75,.7)),n),V),0.),22.)*.3;
 float fres=clamp((1.-n.z)*4.,0.,1.);
 vec3 irid=.5+.5*cos(6.2831*(vec3(0.,.33,.67)+fres*.85+p.x*.0028+uTime*.035));
 float pm=smoothstep(1.,-1.,dp);float dm=smoothstep(1.,-1.,dd)*smoothstep(1.,-2.,dp);
 float fm=smoothstep(1.,-1.,fd)*pm;
 float depth=clamp((p.y-uPill.y)/uPill.w,0.,1.);
 vec3 wc=mix(mix(vec3(.50,.93,1.),vec3(0.,.62,1.),depth),mix(vec3(.18,.72,1.),vec3(0.,.36,.80),depth),uDark);
 float cw=caus((p+n.xy*8.)*.09,uTime*.8);
 wc+=vec3(.75,.95,1.)*smoothstep(.55,1.,cw)*.32;
 wc=mix(wc,vec3(1.),fm*(1.-smoothstep(0.,2.5,-fd))*.7);
 float wa=fm*(.78+.1*uDark);
 vec3 c=wc*wa;float a=wa;
 float sh=smoothstep(9.,-9.,dropD(p-vec2(0.,5.)))*(1.-dm)*pm*(.2+.1*uDark);
 c=vec3(0.,.14,.36)*sh+c*(1.-sh);a=sh+a*(1.-sh);
 float pa=clamp(pm*(fres*.5+spec*.9+spec2),0.,1.);
 c=mix(vec3(1.),irid,.5*fres)*pa+c*(1.-pa);a=pa+a*(1.-pa);
 float th=lens(dd,11.);
 float cs=caus((p+n.xy*th*18.)*.085,uTime*.9);
 vec3 tint=mix(vec3(.86,.96,1.),vec3(.80,.92,1.),uDark);
 float rim=dm*(1.-smoothstep(0.,8.,-dd));
 float cres=dm*smoothstep(.12,.55,dot(n.xy,normalize(vec2(.55,.85))))*smoothstep(0.,3.,-dd);
 float body=.5+.5*clamp(-n.y*3.,-1.,1.);
 float da=dm*(mix(.62,.76,uDark)+.18*body);vec3 dc=mix(tint,vec3(1.),body*.6);
 float la=rim*.3;vec3 lc=mix(vec3(0.,.42,.78),vec3(.1,.55,.95),uDark);dc=lc*la+dc*da*(1.-la);da=la+da*(1.-la);
 la=clamp(cres*.7+smoothstep(.6,1.,cs)*.28*th*dm,0.,1.);dc=vec3(1.)*la+dc*(1.-la);da=la+da*(1.-la);
 la=clamp(dm*(spec*1.2+spec2*.5),0.,1.);dc=vec3(1.)*la+dc*(1.-la);da=la+da*(1.-la);
 la=dm*smoothstep(-2.,0.,dd)*.4;dc=mix(vec3(1.),irid,.35)*la+dc*(1.-la);da=la+da*(1.-la);
 c=dc+c*(1.-da);a=da+a*(1.-da);
 gl_FragColor=vec4(c,a);
}`

type Body = { x: number; v: number }
type Sat = { x: number; y: number; vx: number; vy: number; r: number; k: number }
type Rip = { x: number; y: number; age: number; amp: number }
type GLC = { gl: WebGLRenderingContext; u: Record<string, WebGLUniformLocation | null> }

type NavState = {
  a: Body
  b: Body
  lead: 0 | 1
  lagUntil: number
  sy: { s: number; v: number }
  q: number
  qT: number
  sats: Sat[]
  rips: Rip[]
  fill: Body
  active: number
  itemsX: number[]
  w: number
  h: number
  g: { pad: number; r: number; PAD: number; xL: number; xR: number; cy: number; S: number }
  mouse: { x: number; y: number; s: number }
  moving: boolean
  split: boolean
  ready: boolean
  visible: boolean
  reduce: boolean
  raf: number
  last: number
  time: number
  glc: GLC | null
}

type Geo = { pad: number; r: number; PAD: number; xL: number; xR: number; cy: number; S: number }

function geometry(h: number, w = 0): Geo {
  const H = Math.max(36, Math.round(h))
  const pad = H * 0.12
  const r = H / 2 - pad
  const PAD = Math.round(H * 0.45)
  return { pad, r, PAD, xL: PAD + pad + r, xR: PAD + w - pad - r, cy: PAD + H / 2, S: r / 21 }
}

function makeState(): NavState {
  return {
    a: { x: 0, v: 0 },
    b: { x: 0, v: 0 },
    lead: 0,
    lagUntil: 0,
    sy: { s: 1, v: 0 },
    q: 0,
    qT: 0,
    sats: [],
    rips: [],
    fill: { x: 0, v: 0 },
    active: 0,
    itemsX: [],
    w: 0,
    h: 56,
    g: geometry(56, 200),
    mouse: { x: 0, y: 0, s: 0 },
    moving: false,
    split: false,
    ready: false,
    visible: true,
    reduce: false,
    raf: 0,
    last: 0,
    time: 0,
    glc: null,
  }
}

function initGL(canvas: HTMLCanvasElement): GLC | null {
  const gl = canvas.getContext("webgl", { premultipliedAlpha: true, alpha: true, antialias: false }) as WebGLRenderingContext | null
  if (!gl) return null
  const sh = (type: number, src: string) => {
    const s = gl.createShader(type)
    if (!s) return null
    gl.shaderSource(s, src)
    gl.compileShader(s)
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null
  }
  const vs = sh(gl.VERTEX_SHADER, VERT)
  const fs = sh(gl.FRAGMENT_SHADER, FRAG)
  const p = gl.createProgram()
  if (!vs || !fs || !p) return null
  gl.attachShader(p, vs)
  gl.attachShader(p, fs)
  gl.linkProgram(p)
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) return null
  gl.useProgram(p)
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(p, "a")
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
  const u: Record<string, WebGLUniformLocation | null> = {}
  for (const n of ["uRes", "uDpr", "uS", "uTime", "uPill", "uFill", "uBlob", "uSy", "uRip", "uMouse", "uDark", "uAmb", "uK"]) u[n] = gl.getUniformLocation(p, n)
  return { gl, u }
}

export function LiquidNavbar({
  items,
  active,
  defaultActive = 0,
  onSelect,
  tone = "light",
  size = 56,
  sound = false,
  label = "Navigation",
  className,
  style,
}: LiquidNavbarProps) {
  const [inner, setInner] = React.useState(defaultActive)
  const controlled = active !== undefined
  const current = controlled ? (active ?? 0) : inner
  const rootRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const knobRef = React.useRef<HTMLSpanElement>(null)
  const fillRef = React.useRef<HTMLSpanElement>(null)
  const itemRefs = React.useRef<Array<HTMLButtonElement | null>>([])
  const audio = React.useRef<AudioContext | null>(null)
  const st = React.useRef<NavState>(makeState())
  const [gl, setGl] = React.useState<"on" | "off">("on")
  const darkRef = React.useRef(0)
  darkRef.current = tone === "dark" ? 1 : 0
  const cbRef = React.useRef({ onSelect, sound })
  cbRef.current = { onSelect, sound }
  const currentRef = React.useRef(current)
  currentRef.current = current

  const g = geometry(size)

  /* index -> nearest measured position (in canvas coordinates) */
  const targetX = React.useCallback((i: number) => {
    const s = st.current
    if (!s.itemsX.length) return s.g.PAD + 10
    const idx = Math.max(0, Math.min(s.itemsX.length - 1, i))
    return s.itemsX[idx]
  }, [])

  /* ---- drawing ---- */
  const draw = React.useCallback(() => {
    const s = st.current
    const head = s.lead === 0 ? s.a : s.b
    const tail = s.lead === 0 ? s.b : s.a
    const sep = Math.abs(head.x - tail.x)
    const thin = Math.min(sep / (1.7 * s.g.r), 1)
    if (s.glc) {
      const { gl: c, u } = s.glc
      const G = s.g
      const S = G.S
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      c.viewport(0, 0, c.drawingBufferWidth, c.drawingBufferHeight)
      c.uniform2f(u.uRes, s.w + G.PAD * 2, s.h + G.PAD * 2)
      c.uniform1f(u.uDpr, dpr)
      c.uniform1f(u.uS, S)
      c.uniform1f(u.uTime, s.time)
      c.uniform4f(u.uPill, G.PAD / S, G.PAD / S, s.w / S, s.h / S)
      const amp = s.reduce ? 0 : Math.min(Math.abs(s.fill.v) / S * 0.004, 2.6) + 0.35
      const fz = Math.max(0, Math.min(1, (s.fill.x - G.xL) / Math.max(1, s.w)))
      c.uniform4f(u.uFill, s.fill.x / S, amp, fz, 0)
      const blobs = new Float32Array(24)
      const sy = new Float32Array(6).fill(1)
      blobs.set([head.x / S, G.cy / S, (s.q * (1 - 0.25 * thin)) / S, (G.r * (1 - 0.12 * thin)) / S, tail.x / S, G.cy / S, (s.q * (1 - 0.8 * thin)) / S, (G.r * (1 - 0.55 * thin)) / S], 0)
      sy[0] = sy[1] = s.sy.s
      s.sats.slice(0, 4).forEach((d, i) => blobs.set([d.x / S, d.y / S, 0, d.r / S], 8 + i * 4))
      c.uniform4fv(u.uBlob, blobs)
      c.uniform1fv(u.uSy, sy)
      const rips = new Float32Array(24)
      s.rips.slice(-6).forEach((p, i) => rips.set([p.x / S, p.y / S, p.age, p.amp], i * 4))
      c.uniform4fv(u.uRip, rips)
      c.uniform3f(u.uMouse, s.mouse.x / S, s.mouse.y / S, s.mouse.s)
      c.uniform1f(u.uDark, darkRef.current)
      c.uniform1f(u.uAmb, s.reduce ? 0 : 1)
      c.uniform1f(u.uK, 10)
      c.clearColor(0, 0, 0, 0)
      c.clear(c.COLOR_BUFFER_BIT)
      c.drawArrays(c.TRIANGLES, 0, 3)
    } else {
      const G = s.g
      if (knobRef.current) {
        const left = Math.min(head.x, tail.x) - s.q - G.r - G.PAD
        knobRef.current.style.width = `${sep + 2 * (s.q + G.r)}px`
        knobRef.current.style.top = `${G.PAD + G.pad}px`
        knobRef.current.style.height = `${G.r * 2}px`
        knobRef.current.style.transform = `translateX(${left}px) scaleY(${s.sy.s})`
      }
      if (fillRef.current) fillRef.current.style.width = `${Math.max(0, Math.min(s.w - 4, s.fill.x - G.PAD - 2))}px`
    }
  }, [])

  /* ---- physics (Waterline bodies, generalized to N stops) ---- */
  const step = React.useCallback((dt: number, now: number) => {
    const s = st.current
    const G = s.g
    const S = G.S
    s.time += dt
    s.q += (s.qT - s.q) * Math.min(1, dt * 14)
    const home = targetX(s.active)
    const bodies = [s.a, s.b]
    let still = true
    if (s.reduce) {
      s.a.x = s.b.x = home
      s.a.v = s.b.v = 0
      s.sy.s = 1
      s.sy.v = 0
      s.sats = []
      s.fill.x = home
      s.fill.v = 0
    } else {
      bodies.forEach((B, i) => {
        // the tail is held by surface tension and lags (the neck stretches)
        const k = i === s.lead ? 260 : 72
        const c = i === s.lead ? 28 : 13
        const f = i !== s.lead && now < s.lagUntil ? 0.06 : 1
        B.v += (k * (home - B.x) - c * B.v) * dt * f
        B.x += B.v * dt
        const lo = G.xL + s.q - 2, hi = G.xR - s.q + 2
        if (B.x < lo || B.x > hi) {
          s.sy.v -= Math.min(Math.abs(B.v) / S, 900) * 0.0018
          B.x = Math.max(lo, Math.min(hi, B.x))
          B.v *= -0.25
        }
        if (Math.abs(home - B.x) > 0.3 || Math.abs(B.v) > 3) still = false
      })
      const L = bodies[s.lead]
      const syT = 1 - 0.18 * Math.min(Math.abs(L.v) / S / 1500, 1)
      s.sy.v += (280 * (syT - s.sy.s) - 9 * s.sy.v) * dt
      s.sy.s += s.sy.v * dt
      if (Math.abs(s.sy.s - 1) > 0.002 || Math.abs(s.sy.v) > 0.02) still = false
      // break the neck: droplets pinch off between head and tail
      const sep = Math.abs(s.a.x - s.b.x)
      if (!s.split && s.moving && sep > G.r * 1.6) {
        s.split = true
        const lo = bodies[1 - s.lead], hi = bodies[s.lead]
        ;[0.38, 0.62].forEach((t, j) => {
          s.sats.push({
            x: lo.x + (hi.x - lo.x) * t,
            y: G.cy + (Math.random() - 0.5) * G.r * 0.4,
            vx: (lo.v + hi.v) * 0.4,
            vy: (Math.random() - 0.5) * 50 * S,
            r: G.r * (0.36 - j * 0.06),
            k: 60 + Math.random() * 70,
          })
        })
      }
      const sink = bodies[s.lead].x
      s.sats = s.sats.filter((d) => {
        d.vx += (d.k * (sink - d.x) - 9 * d.vx) * dt
        d.vy += (90 * (G.cy - d.y) - 7 * d.vy) * dt
        d.x += d.vx * dt
        d.y += d.vy * dt
        d.x = Math.max(G.xL, Math.min(G.xR, d.x))
        d.y = Math.max(G.cy - G.r, Math.min(G.cy + G.r, d.y))
        if (Math.abs(sink - d.x) < G.r * 0.55) d.r -= dt * 30 * S
        return d.r > 0.6 * S
      })
      if (s.sats.length) still = false
      // the water follows a little behind the drop
      s.fill.v += (70 * (home - s.fill.x) - 12 * s.fill.v) * dt
      s.fill.x += s.fill.v * dt
      if (Math.abs(home - s.fill.x) > 0.3 || Math.abs(s.fill.v) > 2) still = false
    }
    if (s.moving && still) {
      s.moving = false
      s.qT = 0
      if (!s.reduce) s.rips.push({ x: home, y: G.cy, age: 0, amp: s.split ? 1.1 : 0.6 })
    }
    s.rips.forEach((p) => (p.age += dt))
    s.rips = s.rips.filter((p) => p.age < 2.4)
    s.mouse.s += (0 - s.mouse.s) * Math.min(1, dt * 7)
  }, [targetX])

  const loop = React.useCallback(() => {
    const s = st.current
    if (s.raf) return
    s.last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min((now - s.last) / 1000, 1 / 30)
      s.last = now
      step(dt, now)
      draw()
      const busy = s.moving || s.rips.length || s.sats.length || s.mouse.s > 0.01
      if (s.visible && (!s.reduce || busy)) s.raf = requestAnimationFrame(tick)
      else s.raf = 0
    }
    s.raf = requestAnimationFrame(tick)
  }, [draw, step])

  /* ---- sound ---- */
  const plip = (up: boolean) => {
    if (!cbRef.current.sound) return
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = (audio.current ||= new AC())
      const t = ctx.currentTime
      const o = ctx.createOscillator()
      const gn = ctx.createGain()
      o.type = "sine"
      o.frequency.setValueAtTime(up ? 460 : 620, t)
      o.frequency.exponentialRampToValueAtTime(up ? 15e2 : 380, t + 0.08)
      gn.gain.setValueAtTime(1e-4, t)
      gn.gain.exponentialRampToValueAtTime(0.15, t + 0.008)
      gn.gain.exponentialRampToValueAtTime(1e-4, t + 0.16)
      o.connect(gn).connect(ctx.destination)
      o.start(t)
      o.stop(t + 0.18)
    } catch {
      /* audio is optional */
    }
  }

  /* move the water to another stop */
  const goTo = React.useCallback((i: number, lag = true) => {
    const s = st.current
    if (s.itemsX.length && i === s.active && s.ready) return
    s.active = i
    const target = targetX(i)
    s.lead = Math.abs(target - s.a.x) >= Math.abs(target - s.b.x) ? 0 : 1
    if (lag) s.lagUntil = performance.now() + 120
    s.moving = true
    s.split = false
    loop()
  }, [loop, targetX])

  /* user picked a stop */
  const commit = (i: number) => {
    const s = st.current
    const was = s.active
    if (s.itemsX.length && i === was) return
    s.qT = s.g.r * 0.3
    goTo(i)
    plip(i > was)
    try { if (navigator.vibrate) navigator.vibrate(8) } catch { /* optional */ }
    if (!controlled) setInner(i)
    cbRef.current.onSelect?.(i)
  }

  /* ---- setup ---- */
  React.useEffect(() => {
    const s = st.current
    s.reduce = !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    const nav = rootRef.current
    const cv = canvasRef.current
    s.glc = cv ? initGL(cv) : null
    if (!s.glc) setGl("off")
    const lost = (e: Event) => { e.preventDefault(); s.glc = null; setGl("off") }
    cv?.addEventListener("webglcontextlost", lost)
    const io = new IntersectionObserver(([e]) => { s.visible = e.isIntersecting; if (s.visible) loop() })
    if (nav) io.observe(nav)
    const vis = () => { s.visible = document.visibilityState === "visible"; if (s.visible) loop() }
    document.addEventListener("visibilitychange", vis)
    return () => {
      cv?.removeEventListener("webglcontextlost", lost)
      io.disconnect()
      document.removeEventListener("visibilitychange", vis)
      cancelAnimationFrame(s.raf)
      s.raf = 0
    }
  }, [loop])

  /* measure the pill + items, size the shader canvas */
  const measure = React.useCallback(() => {
    const s = st.current
    const nav = rootRef.current
    if (!nav) return
    s.w = nav.clientWidth
    s.h = nav.clientHeight
    s.g = geometry(s.h, s.w)
    const G = s.g
    s.itemsX = itemRefs.current.map((el) => (el ? el.offsetLeft + el.offsetWidth / 2 + G.PAD : 0))
    const cv = canvasRef.current
    if (cv) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const W = s.w + G.PAD * 2
      const Hh = s.h + G.PAD * 2
      cv.width = Math.round(W * dpr)
      cv.height = Math.round(Hh * dpr)
      cv.style.width = `${W}px`
      cv.style.height = `${Hh}px`
      cv.style.left = cv.style.top = `${-G.PAD}px`
    }
    if (!s.ready && s.itemsX.length) {
      const x = targetX(currentRef.current)
      s.a.x = s.b.x = x
      s.a.v = s.b.v = 0
      s.fill.x = x
      s.active = currentRef.current
      s.ready = true
    }
    draw()
    loop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draw, loop, targetX])

  React.useLayoutEffect(() => {
    const s = st.current
    s.reduce = !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    measure()
    const nav = rootRef.current
    const ro = new ResizeObserver(() => measure())
    if (nav) ro.observe(nav)
    // re-measure once webfonts land (labels change width)
    document.fonts?.ready?.then(() => measure()).catch(() => {})
    return () => ro.disconnect()
  }, [measure])

  /* follow the controlled / uncontrolled value */
  React.useEffect(() => {
    goTo(current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, goTo])

  React.useEffect(() => {
    loop()
  }, [tone, loop])

  /* roving keyboard: ArrowRight/Left switch stops */
  const onItemKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return
    e.preventDefault()
    const n = items.length
    let next = currentRef.current
    if (e.key === "ArrowRight") next = (next + 1) % n
    if (e.key === "ArrowLeft") next = (next - 1 + n) % n
    if (e.key === "Home") next = 0
    if (e.key === "End") next = n - 1
    commit(next)
    itemRefs.current[next]?.focus()
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const s = st.current
    const nav = rootRef.current
    if (!nav) return
    s.mouse.x = e.clientX - nav.getBoundingClientRect().left + s.g.PAD
    s.mouse.y = e.clientY - nav.getBoundingClientRect().top + s.g.PAD
    s.mouse.s = 1
    loop()
  }

  return (
    <nav
      ref={rootRef}
      className={["nimbus-navbar", className].filter(Boolean).join(" ")}
      data-tone={tone}
      data-gl={gl}
      aria-label={label}
      style={{ height: size, ...style }}
      onPointerMove={onPointerMove}
      onPointerLeave={() => { st.current.mouse.s = 0; st.current.mouse.x = 0 }}
    >
      <style dangerouslySetInnerHTML={{ __html: NL_CSS }} />
      <span className="nl-glass" aria-hidden="true" />
      <canvas className="nl-water" ref={canvasRef} aria-hidden="true" />
      <span className="nl-fill" ref={fillRef} aria-hidden="true" />
      <span className="nl-knob" ref={knobRef} aria-hidden="true" />
      {items.map((item, i) => {
        const isActive = i === current
        const fx = item.fx ?? "none"
        return (
          <button
            key={i}
            ref={(el) => { itemRefs.current[i] = el }}
            type="button"
            className="nl-item"
            data-active={isActive || undefined}
            tabIndex={isActive ? 0 : -1}
            aria-current={isActive ? ("true" as const) : undefined}
            aria-label={item.label}
            onKeyDown={(e) => { onItemKeyDown(e) }}
            onClick={() => commit(i)}
          >
            {item.icon && (
              <span className={`nl-ico${fx !== "none" ? ` nl-fx-${fx}` : ""}`}>
                {item.icon}
              </span>
            )}
            {item.label && <span>{item.label}</span>}
          </button>
        )
      })}
    </nav>
  )
}

export { LiquidNavbar as Component }
export default LiquidNavbar

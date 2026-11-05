"use client"

/**
 * Halftone Wordmark Footer — adaptive re-implementation of Kedhareswer Naidu's
 * "Halftone Wordmark Footer" (21st.dev, MIT; raw source is API-key-gated).
 * Documents behaviour we match: an enormous brand word cropped by the bottom
 * edge and printed in halftone dots that part around the pointer on springs
 * and warm in colour as they move; clicking sends a shock ring through the
 * letters. Canvas + React only, no assets, pauses off-screen, respects
 * prefers-reduced-motion (static print, no interaction).
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export interface HalftoneWordmarkFooterProps {
  /** The word printed in halftone dots. */
  word?: string
  /** Band height classes, e.g. "h-[240px] md:h-[360px]". */
  className?: string
}

type Dot = {
  hx: number
  hy: number
  x: number
  y: number
  vx: number
  vy: number
  r: number
  warm: number
}
type Ring = { x: number; y: number; age: number }

function hexToRgb(input: string): [number, number, number] {
  const v = input.trim()
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(v)
  if (!m) return [212, 175, 55] // --brand gold fallback
  const hex = m[1]
  if (hex.length === 3) {
    return [parseInt(hex[0] + hex[0], 16), parseInt(hex[1] + hex[1], 16), parseInt(hex[2] + hex[2], 16)]
  }
  return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)]
}

function cssVar(value: string, fallback: [number, number, number]): [number, number, number] {
  try {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(value)
    return raw ? hexToRgb(raw) : fallback
  } catch {
    return fallback
  }
}

const mix = (a: number, b: number, t: number) => a + (b - a) * t

export function HalftoneWordmarkFooter({
  word = "NEFERTEM",
  className,
}: HalftoneWordmarkFooterProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const ctxRef = React.useRef<CanvasRenderingContext2D | null>(null)
  const lettersRef = React.useRef<HTMLCanvasElement | null>(null)
  const dotsRef = React.useRef<Dot[]>([])
  const ringsRef = React.useRef<Ring[]>([])
  const sizeRef = React.useRef({ w: 0, h: 0, gap: 9, dpr: 1 })
  const pointerRef = React.useRef({ x: 0, y: 0, on: false })
  const visibleRef = React.useRef(true)
  const rafRef = React.useRef(0)
  const lastRef = React.useRef(0)
  const reduceRef = React.useRef(false)
  const hoverRef = React.useRef(false)
  const colorsRef = React.useRef({
    base: [212, 175, 55] as [number, number, number],
    hot: [255, 231, 163] as [number, number, number],
  })

  /* one static frame (no springs, no motion) — also the reduced-motion state */
  const paintStatic = React.useCallback(() => {
    const ctx = ctxRef.current
    if (!ctx) return
    const { w, h } = sizeRef.current
    ctx.clearRect(0, 0, w, h)
    const [r0, g0, b0] = colorsRef.current.base
    ctx.fillStyle = `rgb(${r0},${g0},${b0})`
    const dots = dotsRef.current
    ctx.beginPath()
    for (const d of dots) {
      if (d.r <= 0.4) continue
      ctx.moveTo(d.hx + d.r, d.hy)
      ctx.arc(d.hx, d.hy, d.r, 0, 6.2832)
    }
    ctx.fill()
  }, [])

  /* rebuild the static halftone print from a text mask */
  const build = React.useCallback(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return
    const W = root.clientWidth
    const H = root.clientHeight
    if (W < 4 || H < 4) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    sizeRef.current = { w: W, h: H, dpr, gap: Math.max(7, Math.round(9 + W / 900)) }

    canvas.width = Math.round(W * dpr)
    canvas.height = Math.round(H * dpr)
    canvas.style.width = `${W}px`
    canvas.style.height = `${H}px`
    const ctx = canvas.getContext("2d")
    ctxRef.current = ctx
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    colorsRef.current = {
      base: cssVar("--primary", [212, 175, 55]),
      hot: [255, 236, 170] as [number, number, number],
    }
    const [b0, b1, b2] = colorsRef.current.base
    colorsRef.current.hot = [
      Math.round(mix(b0, 255, 0.55)),
      Math.round(mix(b1, 236, 0.55)),
      Math.round(mix(b2, 170, 0.55)),
    ]

    /* text mask */
    const letter = (lettersRef.current ??= document.createElement("canvas")) as HTMLCanvasElement
    const lw = Math.max(1, W)
    const lh = Math.max(1, H)
    letter.width = lw
    letter.height = lh
    const lctx = letter.getContext("2d", { willReadFrequently: true })
    if (!lctx) return
    const family = getComputedStyle(document.body).fontFamily || "ui-sans-serif, system-ui, sans-serif"
    const fs0 = 100
    const supportsLS = "letterSpacing" in lctx
    if (supportsLS) {
      try { lctx.letterSpacing = "0.05em" } catch { /* older engines */ }
    }
    lctx.font = `800 ${fs0}px ${family}`
    let mw = lctx.measureText(word).width
    if (!supportsLS) mw += 0.05 * fs0 * Math.max(0, word.length - 1)
    const fs = Math.min(fs0 * ((W * 0.94) / Math.max(1, mw)), H * 2.4, 640)
    lctx.clearRect(0, 0, lw, lh)
    lctx.font = `800 ${fs}px ${family}`
    lctx.fillStyle = "#000"
    lctx.textAlign = "center"
    lctx.textBaseline = "alphabetic"
    /* Bottom-crop the word when it fills the band (the 21st.dev reference look).
       When the font is width-bound and much shorter than the band (mobile), the
       letters would only peek at the very bottom edge — hidden behind the fixed
       mobile nav bar — so they are vertically centered and shown in full there. */
    const cropsBottom = fs > H * 0.5
    lctx.fillText(
      word,
      W / 2,
      cropsBottom ? H * 1.14 : (H - fs * 0.72) * 0.45 + fs * 0.72
    )
    const img = lctx.getImageData(0, 0, lw, lh).data

    const { gap } = sizeRef.current
    const dots: Dot[] = []
    const at = (x: number, y: number) => {
      const xi = Math.max(0, Math.min(lw - 1, Math.round(x)))
      const yi = Math.max(0, Math.min(lh - 1, Math.round(y)))
      return img[(yi * lw + xi) * 4 + 3] / 255
    }
    for (let y = gap / 2; y < H; y += gap) {
      for (let x = gap / 2; x < W; x += gap) {
        const a = (at(x, y) + at(x - gap * 0.35, y) + at(x, y - gap * 0.35) + at(x + gap * 0.35, y)) / 4
        if (a < 0.14) continue
        const r = gap * 0.44 * Math.pow(a, 0.85)
        dots.push({ hx: x, hy: y, x, y, vx: 0, vy: 0, r, warm: 0 })
      }
    }
    dotsRef.current = dots
    ringsRef.current = []

    paintStatic()
  }, [word, paintStatic])

  /* animated frame: springs + pointer repel + shock rings + warm colour */
  const paint = React.useCallback((dt: number) => {
    const ctx = ctxRef.current
    const dots = dotsRef.current
    if (!ctx) return
    const { w, h, gap } = sizeRef.current
    const P = pointerRef.current
    const R = gap * 12

    const [r0, g0, b0] = colorsRef.current.base
    const [r1, g1, b1] = colorsRef.current.hot

    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = `rgb(${r0},${g0},${b0})`
    ctx.beginPath()
    const warmBrush = new Map<string, Dot[]>()
    for (const d of dots) {
      // pointer repel
      if (P.on) {
        const dx = d.x - P.x
        const dy = d.y - P.y
        const dist = Math.hypot(dx, dy)
        if (dist < R) {
          const f = (1 - dist / R) * 2400
          const inv = dist > 0.01 ? 1 / dist : 0
          d.vx += dx * inv * f * dt
          d.vy += dy * inv * f * dt
        }
      }
      // shock rings
      for (const ring of ringsRef.current) {
        const dx = d.x - ring.x
        const dy = d.y - ring.y
        const dist = Math.hypot(dx, dy) || 0.01
        const front = ring.age * 620
        const off = dist - front
        if (Math.abs(off) < 64) {
          const decay = Math.max(0.15, 1 - front / (w * 1.6))
          const f = (1 - Math.abs(off) / 64) * 5200 * decay
          d.vx += (dx / dist) * f * dt
          d.vy += (dy / dist) * f * dt
        }
      }
      // home spring + damping
      d.vx += (d.hx - d.x) * 130 * dt
      d.vy += (d.hy - d.y) * 130 * dt
      d.vx *= Math.exp(-4.6 * dt)
      d.vy *= Math.exp(-4.6 * dt)
      d.x += d.vx * dt
      d.y += d.vy * dt
      const speed = Math.hypot(d.vx, d.vy)
      const target = Math.min(1, speed / 420)
      d.warm += (target - d.warm) * Math.min(1, dt * 7)

      if (d.warm > 0.08) {
        // animated dots get their own warm fill
        const bucket = String(Math.round(d.warm * 24))
        const arr = warmBrush.get(bucket)
        if (arr) arr.push(d)
        else warmBrush.set(bucket, [d])
      } else {
        if (d.r > 0.4) {
          ctx.moveTo(d.x + d.r, d.y)
          ctx.arc(d.x, d.y, Math.min(gap * 0.46, d.r * (1 + d.warm * 0.3)), 0, 6.2832)
        }
      }
    }
    ctx.fill()

    warmBrush.forEach((arr, bucket) => {
      const t = Number(bucket) / 24
      ctx.fillStyle = `rgb(${Math.round(mix(r0, r1, t))},${Math.round(mix(g0, g1, t))},${Math.round(mix(b0, b1, t))})`
      ctx.beginPath()
      for (const d of arr) {
        if (d.r > 0.4) {
          ctx.moveTo(d.x + d.r, d.y)
          ctx.arc(d.x, d.y, Math.min(gap * 0.46, d.r * (1 + d.warm * 0.3)), 0, 6.2832)
        }
      }
      ctx.fill()
    })

    ringsRef.current = ringsRef.current.filter((r) => r.age < 2.6)
    if (ringsRef.current.length) {
      for (const ring of ringsRef.current) ring.age += dt
    }
  }, [])

  const loop = React.useCallback(() => {
    if (rafRef.current) return
    lastRef.current = performance.now()
    const tick = (now: number) => {
      const dt = Math.min((now - lastRef.current) / 1000, 1 / 30)
      lastRef.current = now
      const started = ringsRef.current.length || pointerRef.current.on
      if (started) paint(dt)
      // keep animating while anything still moves
      const busy =
        ringsRef.current.length > 0 ||
        pointerRef.current.on ||
        dotsRef.current.some((d) => d.warm > 0.05 || Math.abs(d.vx) + Math.abs(d.vy) > 4)
      if (visibleRef.current && (!reduceRef.current || busy)) rafRef.current = requestAnimationFrame(tick)
      else {
        rafRef.current = 0
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [paint])

  /* boot: environment flags + observers */
  React.useEffect(() => {
    reduceRef.current = !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    hoverRef.current = !!window.matchMedia?.("(hover: hover) and (pointer: fine)").matches
    const root = rootRef.current
    const canvas = canvasRef.current
    build()

    const ro = new ResizeObserver(() => build())
    if (root) ro.observe(root)
    // the word metrics change once the webfont lands — reprint once
    let cancelled = false
    document.fonts?.ready?.then(
      () => { if (!cancelled) build() },
      () => {}
    )
    const io = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting
      if (visibleRef.current && !document.hidden) loop()
    })
    if (root) io.observe(root)
    const vis = () => {
      visibleRef.current = document.visibilityState === "visible"
      if (visibleRef.current) loop()
    }
    document.addEventListener("visibilitychange", vis)
    // repaint when the theme flips (colours are CSS variables)
    const theme = new MutationObserver(() => {
      build()
    })
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => {
      cancelled = true
      ro.disconnect()
      io.disconnect()
      theme.disconnect()
      document.removeEventListener("visibilitychange", vis)
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
  }, [build, loop])

  /* interaction */
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceRef.current || !hoverRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    pointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, on: true }
    loop()
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    ringsRef.current.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, age: 0 })
    if (ringsRef.current.length > 4) ringsRef.current.shift()
    loop()
  }

  return (
    <div
      ref={rootRef}
      className={cn("relative w-full overflow-hidden", className)}
      aria-hidden="true"
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerLeave={() => {
        pointerRef.current.on = false
      }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}

export default HalftoneWordmarkFooter

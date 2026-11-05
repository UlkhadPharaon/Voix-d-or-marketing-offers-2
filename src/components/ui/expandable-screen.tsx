"use client"

/**
 * Expandable Screen — a trigger that expands into a full-screen panel.
 *
 * Anatomy:
 *   <ExpandableScreen>                 provider (open state, radii, layout id)
 *     <ExpandableScreenTrigger>        the pill/button that opens the screen
 *     <ExpandableScreenContent>        the full-screen panel (portalled to <body>)
 *
 * The panel is rendered in a portal so it escapes transformed ancestors
 * (page transitions) and always covers the viewport.
 *
 * The expansion is driven by the trigger's measured rect: the background layer
 * scales from the trigger box to the viewport while the content fades in on
 * top — no text distortion during the transition.
 */

import * as React from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion, usePresence, useReducedMotion } from "motion/react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { getLenis } from "@/lib/lenis"

type ExpandableScreenContextValue = {
  open: boolean
  openScreen: () => void
  closeScreen: () => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
  rectRef: React.RefObject<DOMRect | null>
  layoutId: string
  triggerRadius: string
  contentRadius: string
}

const ExpandableScreenContext = React.createContext<ExpandableScreenContextValue | null>(null)

function useExpandableScreen() {
  const ctx = React.useContext(ExpandableScreenContext)
  if (!ctx) {
    throw new Error("ExpandableScreen parts must be used inside <ExpandableScreen>")
  }
  return ctx
}

export interface ExpandableScreenProps {
  children: React.ReactNode
  /** Shared id of the expanding element (kept for API parity). */
  layoutId?: string
  /** Border radius of the trigger while closed. */
  triggerRadius?: string
  /** Border radius of the panel once expanded. */
  contentRadius?: string
  /** Controlled open state. */
  open?: boolean
  /** Setter for the controlled open state. */
  setOpen?: (open: boolean) => void
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean
  className?: string
  /** Fired whenever the screen opens or closes. */
  onOpenChange?: (open: boolean) => void
}

export function ExpandableScreen({
  children,
  layoutId = "expandable-screen",
  triggerRadius = "100px",
  contentRadius = "24px",
  open: controlledOpen,
  setOpen: setControlledOpen,
  defaultOpen = false,
  className,
  onOpenChange,
}: ExpandableScreenProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const triggerRef = React.useRef<HTMLButtonElement | null>(null)
  const rectRef = React.useRef<DOMRect | null>(null)

  const controlled = controlledOpen !== undefined
  const open = controlled ? controlledOpen : internalOpen

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!controlled) setInternalOpen(next)
      setControlledOpen?.(next)
    },
    [controlled, setControlledOpen]
  )

  const openScreen = React.useCallback(() => {
    const node = triggerRef.current
    rectRef.current = node ? node.getBoundingClientRect() : null
    setOpen(true)
  }, [setOpen])

  const closeScreen = React.useCallback(() => setOpen(false), [setOpen])

  React.useEffect(() => {
    onOpenChange?.(open)
  }, [open, onOpenChange])

  const value = React.useMemo<ExpandableScreenContextValue>(
    () => ({
      open,
      openScreen,
      closeScreen,
      triggerRef,
      rectRef,
      layoutId,
      triggerRadius,
      contentRadius,
    }),
    [open, openScreen, closeScreen, layoutId, triggerRadius, contentRadius]
  )

  return (
    <ExpandableScreenContext.Provider value={value}>
      <div data-slot="expandable-screen" data-layout-id={layoutId} className={className}>
        {children}
      </div>
    </ExpandableScreenContext.Provider>
  )
}

/** The button that opens the screen. */
export function ExpandableScreenTrigger({
  children,
  className,
  onClick,
  ref,
  ...props
}: React.ComponentProps<"button">) {
  const ctx = useExpandableScreen()

  const setRefs = (node: HTMLButtonElement | null) => {
    ctx.triggerRef.current = node
    if (typeof ref === "function") ref(node)
    else if (ref) (ref as React.RefObject<HTMLButtonElement | null>).current = node
  }

  return (
    <button
      ref={setRefs}
      data-slot="expandable-screen-trigger"
      type="button"
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) ctx.openScreen()
      }}
      className={cn(
        "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

/**
 * Pointer-events gate around the interactive layers.
 *
 * Reads PresenceContext (which propagates through the whole exiting subtree),
 * so it flips "pointer-events: none" the instant the exit starts. The overlay
 * itself stays a direct motion child of <AnimatePresence> — that keeps DOM
 * removal (safeToRemove) automatic — and is permanently pointer-events: none,
 * so only this gate ever catches clicks.
 */
function OverlayInteractivity({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const [isPresent, safeToRemove] = usePresence()
  React.useEffect(() => {
    // Any usePresence() consumer must report completion, or AnimatePresence
    // never unmounts the overlay. Calling early isn't a problem: removal is
    // gated on every presence subscriber, so the motion layers' fade-outs
    // still hold the subtree until they finish.
    if (!isPresent) safeToRemove()
  }, [isPresent, safeToRemove])
  return (
    <div
      className={className}
      style={{ pointerEvents: isPresent ? "auto" : "none" }}
    >
      {children}
    </div>
  )
}

/** The full-screen panel. Portalled to <body>, rendered only while open. */
export function ExpandableScreenContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ctx = useExpandableScreen()
  const reduce = useReducedMotion()
  const [mounted, setMounted] = React.useState(false)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const overlayRef = React.useRef<HTMLDivElement>(null)
  const closeRef = React.useRef(ctx.closeScreen)
  closeRef.current = ctx.closeScreen

  React.useEffect(() => setMounted(true), [])

  // Scroll lock + Escape + focus handling while the screen is open.
  React.useEffect(() => {
    if (!ctx.open) return

    const lenis = getLenis()
    lenis?.stop()

    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    const prevOverflow = document.body.style.overflow
    const prevPadding = document.body.style.paddingRight
    document.body.style.overflow = "hidden"
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        closeRef.current()
        return
      }
      if (event.key !== "Tab") return
      // Keep the keyboard inside the overlay while it is open.
      const overlay = overlayRef.current
      if (!overlay) return
      const focusables = Array.from(
        overlay.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null)
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement as HTMLElement | null
      if (event.shiftKey && (active === first || !overlay.contains(active))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (active === last || !overlay.contains(active))) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", onKeyDown)

    const focusTimer = window.setTimeout(() => panelRef.current?.focus(), 80)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = prevOverflow
      document.body.style.paddingRight = prevPadding
      lenis?.start()
      ctx.triggerRef.current?.focus({ preventScroll: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.open])

  if (!mounted) return null

  const rect = ctx.rectRef.current
  const vw = window.innerWidth
  const vh = window.innerHeight
  const originX = rect && vw ? (rect.left + rect.width / 2) / vw : 0.5
  const originY = rect && vh ? (rect.top + rect.height / 2) / vh : 0.5
  const scaleX = rect && vw ? Math.max(rect.width / vw, 0.05) : 0.05
  const scaleY = rect && vh ? Math.max(rect.height / vh, 0.05) : 0.05

  const spring = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 260, damping: 30, mass: 0.9 }

  return createPortal(
    <AnimatePresence>
      {ctx.open && (
        <motion.div
          key="expandable-screen"
          ref={overlayRef}
          data-slot="expandable-screen-overlay"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[90] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
        >
          {/* Background layer — scales from the trigger box to the viewport. */}
          <motion.div
            aria-hidden="true"
            className={cn("absolute inset-0 bg-background", className)}
            style={{ originX, originY }}
            initial={{ scaleX, scaleY, borderRadius: ctx.triggerRadius, opacity: 0.9 }}
            animate={{ scaleX: 1, scaleY: 1, borderRadius: ctx.contentRadius, opacity: 1 }}
            exit={{
              scaleX,
              scaleY,
              borderRadius: ctx.triggerRadius,
              opacity: 0,
              transition: { duration: reduce ? 0 : 0.22, ease: "easeIn" },
            }}
            transition={spring}
          />

          {/* Interactive layers — re-enable pointer events while present. */}
          <OverlayInteractivity className="absolute inset-0">
            {/* Content layer — no scaling, so nothing gets distorted. */}
            <motion.div
              ref={panelRef}
              tabIndex={-1}
              className="absolute inset-0 z-10 overflow-y-auto focus:outline-none"
              initial={{ opacity: 0, y: reduce ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: reduce ? 0 : 8,
                transition: { duration: reduce ? 0 : 0.18, ease: "easeIn" },
              }}
              transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : 0.12 }}
            >
              {children}
            </motion.div>

            <button
              type="button"
              aria-label="Fermer"
              onClick={() => ctx.closeScreen()}
              className="absolute top-4 right-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/15 bg-background/80 text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </OverlayInteractivity>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

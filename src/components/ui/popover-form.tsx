"use client"

/**
 * Popover Form — floating form card (NEFERTEM).
 *
 * Anatomy:
 *   <PopoverForm>                     root, controlled `open` state
 *     openChild    → the form
 *     successChild → the success state
 *   <PopoverFormSeparator/>           divider of the bottom bar
 *   <PopoverFormCutOutLeftIcon/>      punched hole at the left end of the divider
 *   <PopoverFormCutOutRightIcon/>     punched hole at the right end of the divider
 *   <PopoverFormButton/>              submit button of the bottom bar
 *   <PopoverFormSuccess/>             success block
 *
 * The cut-out icons are filled with `var(--popover)` so they punch through the
 * divider exactly like the panel itself (light + dark themes).
 *
 * Positioning, focus trap, Escape and outside-click are handled by Base UI.
 */

import * as React from "react"
import { Popover } from "@base-ui/react/popover"
import { Check, Loader2, X } from "lucide-react"

import { cn } from "@/lib/utils"

type PopoverFormSide = "top" | "right" | "bottom" | "left"
type PopoverFormAlign = "start" | "center" | "end"

export interface PopoverFormProps {
  /** Panel heading — also the label of the default trigger. */
  title?: string
  /** Controlled open state. */
  open: boolean
  /** Setter for the controlled open state. */
  setOpen: (open: boolean) => void
  /** Panel width (any CSS length). */
  width?: string
  /** Panel height (any CSS length). Auto when omitted. */
  height?: string
  /** Show the close button in the panel header. */
  showCloseButton?: boolean
  /** Swap `openChild` for `successChild`. */
  showSuccess?: boolean
  /** Content shown while the form is active. */
  openChild: React.ReactNode
  /** Content shown once the form succeeded. */
  successChild?: React.ReactNode
  /** Custom trigger element (replaces the default title button). */
  trigger?: React.ReactElement
  /** Extra classes for the default trigger button. */
  triggerClassName?: string
  /** Side of the trigger the panel opens on. */
  side?: PopoverFormSide
  /** Alignment against the trigger. */
  align?: PopoverFormAlign
  /** Distance (px) between the trigger and the panel. */
  sideOffset?: number
  /** Extra classes for the panel. */
  className?: string
  /** Fired whenever the panel opens or closes. */
  onOpenChange?: (open: boolean) => void
}

export function PopoverForm({
  title,
  open,
  setOpen,
  width,
  height,
  showCloseButton = true,
  showSuccess = false,
  openChild,
  successChild,
  trigger,
  triggerClassName,
  side = "top",
  align = "center",
  sideOffset = 12,
  className,
  onOpenChange,
}: PopoverFormProps) {
  return (
    <Popover.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        onOpenChange?.(next)
      }}
    >
      {trigger ? (
        <Popover.Trigger render={trigger} />
      ) : (
        <Popover.Trigger
          data-slot="popover-form-trigger"
          className={cn(
            "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[4px] border border-primary/40 bg-primary/10 px-5 text-[13px] font-bold uppercase tracking-[1px] text-primary transition-colors hover:border-primary hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
            triggerClassName
          )}
        >
          {title}
        </Popover.Trigger>
      )}

      <Popover.Portal>
        <Popover.Positioner
          side={side}
          align={align}
          sideOffset={sideOffset}
          collisionPadding={16}
          className="z-[80]"
        >
          <Popover.Popup
            data-slot="popover-form"
            style={{ width, height }}
            className={cn(
              "relative flex max-h-[min(80vh,640px)] flex-col overflow-hidden rounded-[14px] border border-border bg-popover text-popover-foreground shadow-[0_30px_70px_-25px_rgba(0,0,0,0.55)]",
              "origin-(--transform-origin) transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] data-[starting-style]:scale-[0.96] data-[starting-style]:opacity-0 data-[ending-style]:scale-[0.96] data-[ending-style]:opacity-0",
              className
            )}
          >
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
                {title ? (
                  <Popover.Title className="font-heading text-[14px] uppercase tracking-[1px] text-foreground">
                    {title}
                  </Popover.Title>
                ) : (
                  <span />
                )}
                {showCloseButton && (
                  <Popover.Close
                    aria-label="Fermer"
                    className="-mr-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </Popover.Close>
                )}
              </div>
            )}

            <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
              {showSuccess ? successChild : openChild}
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}

/**
 * Divider of the bottom bar — a full-bleed line pinned to the top edge of its
 * (positioned) parent, so the cut-out icons can punch holes at both ends.
 */
export function PopoverFormSeparator({ className }: { className?: string }) {
  return (
    <div
      data-slot="popover-form-separator"
      role="separator"
      className={cn("pointer-events-none absolute inset-x-0 top-0 h-px bg-border", className)}
    />
  )
}

/** Hole punched at the left end of the divider. */
export function PopoverFormCutOutLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      data-slot="popover-form-cut-out-left"
      viewBox="0 0 12 12"
      className={cn("h-3 w-3", className)}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="6" cy="6" r="5.5" fill="var(--popover)" stroke="var(--border)" strokeWidth="1" />
    </svg>
  )
}

/** Hole punched at the right end of the divider. */
export function PopoverFormCutOutRightIcon({ className }: { className?: string }) {
  return (
    <svg
      data-slot="popover-form-cut-out-right"
      viewBox="0 0 12 12"
      className={cn("h-3 w-3", className)}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="6" cy="6" r="5.5" fill="var(--popover)" stroke="var(--border)" strokeWidth="1" />
    </svg>
  )
}

/** Submit button of the bottom bar. */
export function PopoverFormButton({
  loading = false,
  text,
  className,
  disabled,
  ...props
}: React.ComponentProps<"button"> & { loading?: boolean; text?: string }) {
  return (
    <button
      data-slot="popover-form-button"
      type="submit"
      disabled={loading || disabled}
      className={cn(
        "inline-flex h-10 w-full items-center justify-center gap-2 rounded-[4px] bg-primary px-5 text-[13px] font-bold uppercase tracking-[1px] text-black-deep transition-colors hover:bg-gold-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-60",
        className
      )}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {text}
    </button>
  )
}

/** Success state of the panel. */
export function PopoverFormSuccess({
  title,
  description,
  className,
}: {
  title: string
  description?: React.ReactNode
  className?: string
}) {
  return (
    <div
      data-slot="popover-form-success"
      className={cn(
        "flex h-full flex-col items-center justify-center gap-3 px-6 py-8 text-center",
        className
      )}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
        <Check className="h-6 w-6" aria-hidden="true" />
      </span>
      <div>
        <p className="font-heading text-[16px] uppercase tracking-[1px] text-foreground">{title}</p>
        {description && (
          <p className="mx-auto mt-1 max-w-[26ch] text-[13px] leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

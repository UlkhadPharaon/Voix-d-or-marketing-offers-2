"use client"

/**
 * Contact Popover — quick message form in a floating card.
 *
 * Sends a partial lead to POST /api/lead (same pipeline as the /demarrer
 * wizard) and always offers the WhatsApp fallback: a message is never lost
 * because the API is down.
 */

import { useEffect, useRef, useState } from "react"
import { Loader2, Mail, Send } from "lucide-react"

import { track } from "@/lib/analytics"
import { buildDossierId, normalisePhone } from "@/lib/lead"
import {
  PopoverForm,
  PopoverFormButton,
  PopoverFormCutOutLeftIcon,
  PopoverFormCutOutRightIcon,
  PopoverFormSeparator,
  PopoverFormSuccess,
} from "@/components/ui/popover-form"
import { cn } from "@/lib/utils"

type FormState = "idle" | "loading" | "success"

const WHATSAPP_FALLBACK =
  "https://wa.me/22673764882?text=Bonjour%20NEFERTEM%2C%20j%27ai%20une%20question."

async function postLead(payload: object, timeoutMs: number): Promise<boolean> {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    clearTimeout(timer)
    return res.ok
  } catch {
    return false
  }
}

export function ContactPopover({ className }: { className?: string }) {
  const [formState, setFormState] = useState<FormState>("idle")
  const [open, setOpen] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const timers = useRef<number[]>([])

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach((t) => window.clearTimeout(t))
  }, [])

  const reset = () => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
    setFormState("idle")
    setFirstName("")
    setPhone("")
    setMessage("")
    setError("")
  }

  function submit() {
    const e164 = normalisePhone(phone)
    if (!firstName.trim()) {
      setError("Indiquez votre prénom.")
      return
    }
    if (!e164) {
      setError("Numéro WhatsApp invalide (ex : +226 70 00 00 00).")
      return
    }
    if (!message.trim()) {
      setError("Écrivez votre message.")
      return
    }

    setError("")
    setFormState("loading")
    track("contact_popover_submitted", { src: "footer" })

    void postLead(
      {
        id: buildDossierId(),
        createdAt: new Date().toISOString(),
        step: 1,
        business: "",
        firstName: firstName.trim(),
        whatsapp: e164,
        city: "",
        sector: "",
        sectorKey: "",
        pains: [],
        painKeys: [],
        goal: "",
        goalKey: "",
        networks: [],
        pageUrl: "",
        plan: "essentials",
        period: "monthly",
        price: 0,
        src: "popover",
        utm: { source: "", medium: "", campaign: "" },
        recommendedPlan: "essentials",
        completed: false,
        message: message.trim(),
      },
      4000
    ).then((ok) => {
      if (!ok) track("lead_api_failed", { step: 1 })
    })

    timers.current.push(
      window.setTimeout(() => setFormState("success"), 900),
      window.setTimeout(() => {
        setOpen(false)
      }, 6000)
    )
  }

  return (
    <PopoverForm
      title="Écrire à NEFERTEM"
      open={open}
      setOpen={setOpen}
      width="360px"
      side="top"
      align="start"
      sideOffset={10}
      showCloseButton={formState !== "success"}
      showSuccess={formState === "success"}
      onOpenChange={(next) => {
        if (!next) reset()
      }}
      trigger={
        <button
          type="button"
          onClick={() => track("cta_click", { location: "footer", label: "contact_popover" })}
          className={cn(
            "inline-flex items-center gap-2 text-[14px] uppercase tracking-[1px] text-muted-foreground transition-colors hover:text-primary",
            className
          )}
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Poser une question
        </button>
      }
      openChild={
        <form
          onSubmit={(event) => {
            event.preventDefault()
            submit()
          }}
          className="space-y-3 p-4"
        >
          <div className="space-y-1.5">
            <label
              htmlFor="popover-name"
              className="block text-[11px] font-bold uppercase tracking-[1px] text-muted-foreground"
            >
              Prénom
            </label>
            <input
              id="popover-name"
              name="firstName"
              autoComplete="given-name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              placeholder="Ex : Awa"
              required
              className="w-full rounded-[4px] border border-foreground/20 bg-background px-3 py-2.5 text-[14px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="popover-phone"
              className="block text-[11px] font-bold uppercase tracking-[1px] text-muted-foreground"
            >
              WhatsApp
            </label>
            <div className="relative">
              <input
                id="popover-phone"
                name="whatsapp"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value)
                  setError("")
                }}
                placeholder="+226 70 00 00 00"
                required
                className="w-full rounded-[4px] border border-foreground/20 bg-background px-3 py-2.5 pr-9 text-[14px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
              />
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <Mail className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="popover-message"
              className="block text-[11px] font-bold uppercase tracking-[1px] text-muted-foreground"
            >
              Message
            </label>
            <textarea
              id="popover-message"
              name="message"
              value={message}
              onChange={(event) => {
                setMessage(event.target.value)
                setError("")
              }}
              placeholder="Votre activité, votre objectif…"
              rows={3}
              required
              className="w-full resize-none rounded-[4px] border border-foreground/20 bg-background px-3 py-2.5 text-[14px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
            />
          </div>

          {error && (
            <p role="alert" className="text-[13px] text-red-500">
              {error}
            </p>
          )}

          <div className="relative -mx-4 flex h-14 items-center px-[10px]">
            <PopoverFormSeparator />
            <div className="absolute top-0 left-0 -translate-x-[1.5px] -translate-y-1/2">
              <PopoverFormCutOutLeftIcon />
            </div>
            <div className="absolute top-0 right-0 translate-x-[1.5px] -translate-y-1/2">
              <PopoverFormCutOutRightIcon />
            </div>
            <PopoverFormButton loading={formState === "loading"} text="Envoyer" />
          </div>
        </form>
      }
      successChild={
        <PopoverFormSuccess
          title="Message envoyé"
          description={
            <span>
              Réponse en moins d&apos;1 heure. Rien n&apos;a été perdu — écrivez-nous aussi sur WhatsApp.
            </span>
          }
        />
      }
    />
  )
}

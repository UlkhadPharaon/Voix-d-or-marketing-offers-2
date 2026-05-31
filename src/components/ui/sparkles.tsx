"use client"

import React, { useId } from "react"
import { Particles, ParticlesProvider } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { ISourceOptions, Engine } from "@tsparticles/engine"

interface SparklesProps {
  className?: string
  size?: number
  minSize?: number | null
  density?: number
  speed?: number
  minSpeed?: number | null
  opacity?: number
  opacitySpeed?: number
  minOpacity?: number | null
  color?: string
  background?: string
  options?: Partial<ISourceOptions>
  direction?: string
  style?: React.CSSProperties
}

export function Sparkles({
  className,
  size = 1,
  minSize = null,
  density = 800,
  speed = 1,
  minSpeed = null,
  opacity = 1,
  opacitySpeed = 3,
  minOpacity = null,
  color = "#FFFFFF",
  background = "transparent",
  options = {},
  direction
}: SparklesProps) {
  const id = useId()

  const defaultOptions: ISourceOptions = {
    background: {
      color: {
        value: background,
      },
      image: "",
      position: "50% 50%",
      repeat: "no-repeat",
      size: "cover",
    },
    fullScreen: {
      enable: false,
      zIndex: 1,
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: color,
      },
      move: {
        enable: true,
        direction: (direction as any) || "none",
        speed: {
          min: minSpeed || speed / 10,
          max: speed,
        },
        straight: false,
      },
      number: {
        value: density,
      },
      opacity: {
        value: {
          min: minOpacity || opacity / 10,
          max: opacity,
        },
        animation: {
          enable: true,
          sync: false,
          speed: opacitySpeed,
        },
      },
      size: {
        value: {
          min: minSize || size / 2.5,
          max: size,
        },
      },
    },
    detectRetina: true,
  }

  const init = async (engine: Engine) => {
    await loadSlim(engine);
  };

  return (
    <ParticlesProvider init={init}>
      <Particles id={id} options={{ ...defaultOptions, ...options }} className={className} />
    </ParticlesProvider>
  )
}

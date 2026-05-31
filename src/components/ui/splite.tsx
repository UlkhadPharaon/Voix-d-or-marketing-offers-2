'use client'

import { Suspense, lazy, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { ErrorBoundary } from '../ErrorBoundary'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hasMounted, setHasMounted] = useState(false)
  const isInView = useInView(ref, { once: false, margin: "100px" })

  // We keep it mounted if it has ever been in view, or we can just strictly unmount it.
  // Actually, keeping 6 webgl contexts alive is the problem. We must strictly unmount.

  return (
    <div ref={ref} className={className} style={{ width: '100%', height: '100%', display: 'flex' }}>
      {isInView && (
        <ErrorBoundary fallback={<div className="w-full h-full flex items-center justify-center opacity-10 bg-black-deep min-h-[300px]"></div>}>
          <Suspense 
            fallback={
              <div className="w-full h-full flex items-center justify-center min-h-[300px]">
                <div className="text-primary font-mono text-[12px] uppercase tracking-[2px] animate-pulse">Chargement 3D...</div>
              </div>
            }
          >
            <Spline
              scene={scene}
              className="w-full h-full"
            />
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  )
}

'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="loader-wrapper">
            <div className="loader"></div>
            <div className="loader-letter">L</div>
            <div className="loader-letter">o</div>
            <div className="loader-letter">a</div>
            <div className="loader-letter">d</div>
            <div className="loader-letter">i</div>
            <div className="loader-letter">n</div>
            <div className="loader-letter">g</div>
            <div className="loader-letter">.</div>
            <div className="loader-letter">.</div>
            <div className="loader-letter">.</div>
          </div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  )
}

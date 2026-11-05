import * as React from "react"

import { cn } from "@/lib/utils"

/* Minimal flat card (base-nova "mau" template style): no border or shadow by
   default, so sections can theme the surface entirely via className. */
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "flex flex-col gap-2 rounded-xl bg-card text-sm text-card-foreground",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4", className)}
      {...props}
    />
  )
}

export { Card, CardContent }

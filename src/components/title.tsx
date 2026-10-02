import * as React from "react"

import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export type TitleProps = {
  children: React.ReactNode
  className?: string
  separatorClassName?: string
}

/** The page's main site title: an <h1> with a horizontal separator beneath it. */
export function Title({ children, className, separatorClassName }: TitleProps) {
  return (
    <div data-slot="title" className="flex w-full flex-col items-center gap-4">
      <h1
        className={cn(
          "font-heading scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance text-foreground",
          className
        )}
      >
        {children}
      </h1>
      <Separator className={cn("w-full max-w-5/6 md:max-w-1/2", separatorClassName)} />
    </div>
  )
}

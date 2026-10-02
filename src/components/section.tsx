import * as React from "react"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

export type SectionProps = {
  title: string
  /** Renders a horizontal <Separator> above the heading (portfolio-page's convention). */
  withSeparator?: boolean
  /** Paragraph(s), a list, or any free-form content — e.g. <Paragraph>/<List> from this library. */
  children: React.ReactNode
  className?: string
  headingClassName?: string
}

export function Section({
  title,
  withSeparator = false,
  children,
  className,
  headingClassName,
}: SectionProps) {
  return (
    <>
      {withSeparator && (
        <Separator className="w-full max-w-5/6 md:max-w-1/2" />
      )}
      <div
        data-slot="section"
        className={cn(
          "flex w-full max-w-4xl flex-col items-center",
          className
        )}
      >
        <h2
          data-slot="section-title"
          className={cn(
            "scroll-m-20 text-center text-2xl font-bold tracking-tight text-foreground",
            headingClassName
          )}
        >
          {title}
        </h2>
        {children}
      </div>
    </>
  )
}

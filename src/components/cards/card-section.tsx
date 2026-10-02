import * as React from "react"

import { Section, type SectionProps } from "@/components/section"
import { cn } from "@/lib/utils"

export type CardSectionProps = Omit<SectionProps, "children" | "headingClassName"> & {
  /** One or more <ImgCard>/<TextCard>/<IconCard>. */
  children: React.ReactNode
  gridClassName?: string
}

export function CardSection({
  title,
  withSeparator,
  className,
  gridClassName,
  children,
}: CardSectionProps) {
  return (
    <Section
      title={title}
      withSeparator={withSeparator}
      className={cn("max-w-5xl", className)}
    >
      <div
        data-slot="card-section-grid"
        className={cn("mt-4 flex w-full flex-wrap justify-center gap-4", gridClassName)}
      >
        {children}
      </div>
    </Section>
  )
}

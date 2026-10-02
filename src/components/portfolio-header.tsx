import * as React from "react"
import { ImageIcon } from "lucide-react"

import { Paragraph } from "@/components/typography"
import { cn } from "@/lib/utils"

export type PortfolioHeaderProps = {
  name: string
  tagline: string
  photo?: { src: string; alt: string }
  /** Button row(s) — compose <ContactButton>/<GenericButton> inside, one or more wrapping <div>s. */
  children?: React.ReactNode
  className?: string
}

export function PortfolioHeader({
  name,
  tagline,
  photo,
  children,
  className,
}: PortfolioHeaderProps) {
  return (
    <div
      data-slot="portfolio-header"
      className={cn(
        "flex w-full max-w-4xl flex-col items-center justify-center gap-4 md:flex-row",
        className
      )}
    >
      {photo ? (
        <img
          src={photo.src}
          alt={photo.alt}
          className="size-24 shrink-0 rounded-full object-cover shadow-lg md:size-56"
        />
      ) : (
        <div className="flex size-24 shrink-0 items-center justify-center rounded-2xl bg-muted shadow-lg md:size-56">
          <ImageIcon className="size-8 text-muted-foreground md:size-16" />
        </div>
      )}

      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="font-heading scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance text-foreground">
          {name}
        </h1>
        <Paragraph className="mt-0">{tagline}</Paragraph>
        {children}
      </div>
    </div>
  )
}

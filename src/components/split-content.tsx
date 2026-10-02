import * as React from "react"

import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export type SplitContentProps = {
  /** Left column, e.g. a <Paragraph>. Renders full-width alone if `right` is omitted. */
  left?: React.ReactNode
  /** Right column, e.g. a <List>. Renders full-width alone if `left` is omitted. */
  right?: React.ReactNode
  className?: string
}

/**
 * Two-column content split (paragraph + list, e.g. "About Me") with a separator between the
 * columns — only when both sides are provided. Pass just one side for a plain single-column block.
 */
export function SplitContent({ left, right, className }: SplitContentProps) {
  if (left && right) {
    return (
      <div
        data-slot="split-content"
        className={cn(
          "mt-4 flex w-full flex-col items-stretch gap-6 md:flex-row md:items-start",
          className
        )}
      >
        <div className="flex-1">{left}</div>
        <Separator className="md:hidden" />
        <Separator orientation="vertical" className="hidden self-stretch md:block" />
        <div className="flex-1">{right}</div>
      </div>
    )
  }

  return (
    <div data-slot="split-content" className={cn("mt-4 w-full", className)}>
      {left ?? right}
    </div>
  )
}

import * as React from "react"

import { cn } from "@/lib/utils"

export type ParagraphProps = React.ComponentProps<"p">

/** Body text styled to match <Section>'s heading — use inside <Section> children. */
export function Paragraph({ className, ...props }: ParagraphProps) {
  return (
    <p
      data-slot="paragraph"
      className={cn(
        "mt-4 leading-7 text-foreground [&:not(:first-child)]:mb-4",
        className
      )}
      {...props}
    />
  )
}

export type ListProps = React.ComponentProps<"ul">

/** Bulleted list styled to match <Section>'s heading — use inside <Section> children. */
export function List({ className, ...props }: ListProps) {
  return (
    <ul
      data-slot="list"
      className={cn(
        "my-6 ml-6 list-disc text-foreground [&>li]:mt-2",
        className
      )}
      {...props}
    />
  )
}

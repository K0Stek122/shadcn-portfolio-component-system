import type { LucideIcon } from "lucide-react"

import { CARD_WIDTH_CLASS, CardDialog } from "@/components/cards/card-dialog"
import { cn } from "@/lib/utils"

export type IconCardProps = {
  title: string
  description: string
  icon: LucideIcon
  details?: string[]
  demoLink?: string
  githubLink?: string
}

export function IconCard({
  title,
  description,
  icon: Icon,
  details,
  demoLink,
  githubLink,
}: IconCardProps) {
  return (
    <div
      data-slot="icon-card"
      className={cn(
        "flex flex-col gap-2 rounded-lg border border-border bg-card p-4 text-card-foreground",
        CARD_WIDTH_CLASS
      )}
    >
      <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon className="size-4" />
      </div>
      <p className="line-clamp-1 font-bold">{title}</p>
      <p className="line-clamp-3 flex-1 text-sm text-muted-foreground">{description}</p>
      <CardDialog
        title={title}
        media={{ kind: "icon", icon: Icon }}
        details={details}
        demoLink={demoLink}
        githubLink={githubLink}
      />
    </div>
  )
}

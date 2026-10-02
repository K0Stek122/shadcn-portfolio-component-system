import { CARD_WIDTH_CLASS, CardDialog } from "@/components/cards/card-dialog"
import { cn } from "@/lib/utils"

export type TextCardProps = {
  title: string
  description: string
  details?: string[]
  demoLink?: string
  githubLink?: string
}

export function TextCard({
  title,
  description,
  details,
  demoLink,
  githubLink,
}: TextCardProps) {
  return (
    <div
      data-slot="text-card"
      className={cn(
        "flex flex-col gap-2 rounded-lg border border-border bg-card p-4 text-card-foreground",
        CARD_WIDTH_CLASS
      )}
    >
      <p className="line-clamp-1 font-bold">{title}</p>
      <p className="line-clamp-3 flex-1 text-sm text-muted-foreground">{description}</p>
      <CardDialog
        title={title}
        media={{ kind: "none" }}
        details={details}
        demoLink={demoLink}
        githubLink={githubLink}
      />
    </div>
  )
}

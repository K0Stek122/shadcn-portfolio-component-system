import type { LucideIcon } from "lucide-react"
import { Code2, Link } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

/** Shared flex-item width for <ImgCard>/<IconCard>/<TextCard> inside <CardSection>'s flex-wrap grid. */
export const CARD_WIDTH_CLASS = "w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"

export type CardDialogMedia =
  | { kind: "image"; src: string; alt: string }
  | { kind: "icon"; icon: LucideIcon }
  | { kind: "none" }

export type CardDialogProps = {
  title: string
  media: CardDialogMedia
  details?: string[]
  demoLink?: string
  githubLink?: string
}

/** Shared "learn more" dialog used by <ImgCard>/<TextCard>/<IconCard>, rendered smaller than the default dialog. */
export function CardDialog({ title, media, details, demoLink, githubLink }: CardDialogProps) {
  return (
    <Dialog>
      <DialogTrigger render={<Button size="sm" variant="secondary" className="w-full" />}>
        Learn More
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-xs">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {media.kind === "icon" && (
              <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <media.icon className="size-4" />
              </div>
            )}
            <DialogTitle>{title}</DialogTitle>
          </div>
        </DialogHeader>

        {media.kind === "image" && (
          <div className="mx-auto w-4/5 shrink-0">
            <img
              src={media.src}
              alt={media.alt}
              className="h-48 w-full rounded-md object-cover"
            />
          </div>
        )}

        {details && details.length > 0 && (
          <ul className="flex list-disc flex-col gap-1 pl-5 text-muted-foreground">
            {details.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        )}

        {(demoLink || githubLink) && (
          <DialogFooter className="sm:justify-center">
            {demoLink && (
              <Button
                variant="outline"
                nativeButton={false}
                render={<a href={demoLink} target="_blank" rel="noopener noreferrer" />}
              >
                <Link data-icon="inline-start" />
                See this in action
              </Button>
            )}
            {githubLink && (
              <Button
                variant="outline"
                nativeButton={false}
                render={<a href={githubLink} target="_blank" rel="noopener noreferrer" />}
              >
                <Code2 data-icon="inline-start" />
                View GitHub
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

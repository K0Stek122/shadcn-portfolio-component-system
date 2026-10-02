import { CARD_WIDTH_CLASS, CardDialog } from "@/components/cards/card-dialog"
import { cn } from "@/lib/utils"

export type ImgCardProps = {
  title: string
  description: string
  image: { src: string; alt: string }
  /** Full-size image shown in the "learn more" dialog, defaults to `image`. */
  dialogImage?: { src: string; alt: string }
  details?: string[]
  demoLink?: string
  githubLink?: string
}

export function ImgCard({
  title,
  description,
  image,
  dialogImage,
  details,
  demoLink,
  githubLink,
}: ImgCardProps) {
  const media = dialogImage ?? image

  return (
    <div
      data-slot="img-card"
      className={cn(
        "flex flex-col gap-2 rounded-lg border border-border bg-card p-4 text-card-foreground",
        CARD_WIDTH_CLASS
      )}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="h-[9.6rem] w-full rounded-md object-cover"
      />
      <p className="line-clamp-1 font-bold">{title}</p>
      <p className="line-clamp-3 flex-1 text-sm text-muted-foreground">{description}</p>
      <CardDialog
        title={title}
        media={{ kind: "image", src: media.src, alt: media.alt }}
        details={details}
        demoLink={demoLink}
        githubLink={githubLink}
      />
    </div>
  )
}

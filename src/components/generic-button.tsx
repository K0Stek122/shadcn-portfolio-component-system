import type { LucideIcon } from "lucide-react"
import { Link } from "react-router-dom"

import { Button, type buttonVariants } from "@/components/ui/button"
import type { VariantProps } from "class-variance-authority"

function isExternalLink(to: string): boolean {
  return /^([a-z][a-z0-9+.-]*:)?\/\//i.test(to) || to.startsWith("mailto:") || to.startsWith("tel:")
}

export type GenericButtonProps = {
  name: string
  to: string
  /** Defaults to auto-detecting from `to` (absolute URL / mailto: / tel: => external). */
  external?: boolean
  icon?: LucideIcon
} & Pick<VariantProps<typeof buttonVariants>, "variant" | "size">

export function GenericButton({
  name,
  to,
  external,
  icon: Icon,
  variant = "default",
  size = "lg",
}: GenericButtonProps) {
  const isExternal = external ?? isExternalLink(to)

  if (isExternal) {
    return (
      <Button
        variant={variant}
        size={size}
        nativeButton={false}
        render={<a href={to} target="_blank" rel="noopener noreferrer" />}
      >
        {Icon && <Icon data-icon="inline-start" />}
        {name}
      </Button>
    )
  }

  return (
    <Button variant={variant} size={size} nativeButton={false} render={<Link to={to} />}>
      {Icon && <Icon data-icon="inline-start" />}
      {name}
    </Button>
  )
}

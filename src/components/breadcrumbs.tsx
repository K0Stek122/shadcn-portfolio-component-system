import * as React from "react"
import { Link } from "react-router-dom"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useRegisterBreadcrumbs } from "@/hooks/use-breadcrumbs"
import type { BreadcrumbEntry } from "@/lib/contexts"
import { cn } from "@/lib/utils"

export type BreadcrumbsProps = {
  /** Trailing crumbs after "Home", which is always prepended automatically. */
  items: BreadcrumbEntry[]
  homeLabel?: string
  homeHref?: string
  className?: string
}

/**
 * Renders the visible breadcrumb trail — always starting with "Home" — and registers it so
 * <SEO> can emit matching BreadcrumbList JSON-LD automatically, without passing the same list
 * twice. On the homepage itself, pass `items={[]}` for just "Home" as the current page.
 */
export function Breadcrumbs({
  items,
  homeLabel = "Home",
  homeHref = "/",
  className,
}: BreadcrumbsProps) {
  const trail = React.useMemo(
    () => [{ label: homeLabel, href: homeHref }, ...items],
    [homeLabel, homeHref, items]
  )

  useRegisterBreadcrumbs(trail)

  return (
    <Breadcrumb className={cn(className)}>
      <BreadcrumbList>
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1

          return (
            <React.Fragment key={item.href}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink render={<Link to={item.href} />}>
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

import * as React from "react"

import { BreadcrumbContext, type BreadcrumbEntry } from "@/lib/contexts"

/** Reads the breadcrumb trail last registered by a <Breadcrumbs> on the current page. */
export function useBreadcrumbs() {
  const context = React.useContext(BreadcrumbContext)

  if (context === undefined) {
    throw new Error("useBreadcrumbs must be used within a ShadcnProvider")
  }

  return context.breadcrumbs
}

/** Registers a breadcrumb trail for the current page. Used internally by <Breadcrumbs>. */
export function useRegisterBreadcrumbs(items: BreadcrumbEntry[]) {
  const context = React.useContext(BreadcrumbContext)

  if (context === undefined) {
    throw new Error("useRegisterBreadcrumbs must be used within a ShadcnProvider")
  }

  const { setBreadcrumbs } = context
  const key = JSON.stringify(items)

  React.useEffect(() => {
    setBreadcrumbs(items)

    return () => setBreadcrumbs([])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, setBreadcrumbs])
}

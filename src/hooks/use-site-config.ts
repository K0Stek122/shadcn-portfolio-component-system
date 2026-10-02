import * as React from "react"

import { SiteConfigContext } from "@/lib/contexts"

export function useSiteConfig() {
  const context = React.useContext(SiteConfigContext)

  if (context === undefined) {
    throw new Error("useSiteConfig must be used within a ShadcnProvider")
  }

  return context
}

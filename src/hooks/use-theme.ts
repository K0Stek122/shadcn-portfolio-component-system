import * as React from "react"

import { ThemeContext } from "@/lib/contexts"

export function useTheme() {
  const context = React.useContext(ThemeContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ShadcnProvider")
  }

  return context
}

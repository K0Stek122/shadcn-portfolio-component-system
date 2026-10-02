import * as React from "react"

export type Theme = "dark" | "light" | "system"
export type ResolvedTheme = "dark" | "light"

export type ThemeContextValue = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

export const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
)

export type BreadcrumbEntry = {
  label: string
  href: string
}

export type BreadcrumbContextValue = {
  breadcrumbs: BreadcrumbEntry[]
  setBreadcrumbs: (breadcrumbs: BreadcrumbEntry[]) => void
}

export const BreadcrumbContext = React.createContext<
  BreadcrumbContextValue | undefined
>(undefined)

export type SiteConfig = {
  siteUrl: string
  siteName: string
  defaultImage: string
  defaultImageWidth?: number
  defaultImageHeight?: number
  sameAs?: string[]
}

export const SiteConfigContext = React.createContext<SiteConfig | undefined>(
  undefined
)

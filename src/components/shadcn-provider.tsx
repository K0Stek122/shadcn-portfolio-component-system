import * as React from "react"

import {
  BreadcrumbContext,
  SiteConfigContext,
  ThemeContext,
  type BreadcrumbEntry,
  type ResolvedTheme,
  type SiteConfig,
  type Theme,
} from "@/lib/contexts"

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)"
const THEME_VALUES: Theme[] = ["dark", "light", "system"]

function isTheme(value: string | null): value is Theme {
  if (value === null) {
    return false
  }

  return THEME_VALUES.includes(value as Theme)
}

function getSystemTheme(): ResolvedTheme {
  if (window.matchMedia(COLOR_SCHEME_QUERY).matches) {
    return "dark"
  }

  return "light"
}

function subscribeToSystemTheme(callback: () => void) {
  const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY)
  mediaQuery.addEventListener("change", callback)
  return () => mediaQuery.removeEventListener("change", callback)
}

function getSystemThemeServerSnapshot(): ResolvedTheme {
  return "light"
}

function disableTransitionsTemporarily() {
  const style = document.createElement("style")
  style.appendChild(
    document.createTextNode(
      "*,*::before,*::after{-webkit-transition:none!important;transition:none!important}"
    )
  )
  document.head.appendChild(style)

  return () => {
    window.getComputedStyle(document.body)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        style.remove()
      })
    })
  }
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  if (target.isContentEditable) {
    return true
  }

  const editableParent = target.closest(
    "input, textarea, select, [contenteditable='true']"
  )
  if (editableParent) {
    return true
  }

  return false
}

/** CSS custom-property values (without the `--` prefix), e.g. pasted from ui.shadcn.com/themes. */
export type ThemeVariables = Record<string, string>

export type ShadcnProviderTheme = {
  light?: ThemeVariables
  dark?: ThemeVariables
}

function variablesToDeclarations(vars: ThemeVariables): string {
  return Object.entries(vars)
    .map(([name, value]) => {
      const property = name.startsWith("--") ? name : `--${name}`
      return `${property}:${value};`
    })
    .join("")
}

function ThemeStyleOverrides({ theme }: { theme?: ShadcnProviderTheme }) {
  if (!theme?.light && !theme?.dark) {
    return null
  }

  const css = [
    theme.light ? `:root{${variablesToDeclarations(theme.light)}}` : "",
    theme.dark ? `.dark{${variablesToDeclarations(theme.dark)}}` : "",
  ]
    .filter(Boolean)
    .join("")

  return <style>{css}</style>
}

export type ShadcnProviderProps = {
  children: React.ReactNode
  /** CSS variable overrides pasted from shadcn's theme generator (ui.shadcn.com/themes). */
  theme?: ShadcnProviderTheme
  /** Site-wide defaults consumed by <SEO> (siteUrl, siteName, default OG image, socials). */
  siteConfig?: SiteConfig
  defaultTheme?: Theme
  storageKey?: string
  disableTransitionOnChange?: boolean
}

export function ShadcnProvider({
  children,
  theme,
  siteConfig,
  defaultTheme = "system",
  storageKey = "theme",
  disableTransitionOnChange = true,
}: ShadcnProviderProps) {
  const [themeState, setThemeState] = React.useState<Theme>(() => {
    if (typeof window === "undefined") {
      return defaultTheme
    }

    const storedTheme = localStorage.getItem(storageKey)
    if (isTheme(storedTheme)) {
      return storedTheme
    }

    return defaultTheme
  })

  const [breadcrumbs, setBreadcrumbs] = React.useState<BreadcrumbEntry[]>([])

  const systemPreference = React.useSyncExternalStore(
    subscribeToSystemTheme,
    getSystemTheme,
    getSystemThemeServerSnapshot
  )

  const resolvedTheme: ResolvedTheme =
    themeState === "system" ? systemPreference : themeState

  const setTheme = React.useCallback(
    (nextTheme: Theme) => {
      localStorage.setItem(storageKey, nextTheme)
      setThemeState(nextTheme)
    },
    [storageKey]
  )

  // Syncs the resolved theme onto <html> — a pure DOM side-effect, no React state updates here.
  React.useEffect(() => {
    const root = document.documentElement
    const restoreTransitions = disableTransitionOnChange
      ? disableTransitionsTemporarily()
      : null

    root.classList.remove("light", "dark")
    root.classList.add(resolvedTheme)

    if (restoreTransitions) {
      restoreTransitions()
    }
  }, [resolvedTheme, disableTransitionOnChange])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (isEditableTarget(event.target)) {
        return
      }

      if (event.key.toLowerCase() !== "d") {
        return
      }

      setThemeState((currentTheme) => {
        const nextTheme =
          currentTheme === "dark"
            ? "light"
            : currentTheme === "light"
              ? "dark"
              : getSystemTheme() === "dark"
                ? "light"
                : "dark"

        localStorage.setItem(storageKey, nextTheme)
        return nextTheme
      })
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [storageKey])

  React.useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea !== localStorage) {
        return
      }

      if (event.key !== storageKey) {
        return
      }

      if (isTheme(event.newValue)) {
        setThemeState(event.newValue)
        return
      }

      setThemeState(defaultTheme)
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [defaultTheme, storageKey])

  const themeContextValue = React.useMemo(
    () => ({
      theme: themeState,
      resolvedTheme,
      setTheme,
    }),
    [themeState, resolvedTheme, setTheme]
  )

  const breadcrumbContextValue = React.useMemo(
    () => ({ breadcrumbs, setBreadcrumbs }),
    [breadcrumbs]
  )

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <SiteConfigContext.Provider value={siteConfig}>
        <BreadcrumbContext.Provider value={breadcrumbContextValue}>
          <ThemeStyleOverrides theme={theme} />
          {children}
        </BreadcrumbContext.Provider>
      </SiteConfigContext.Provider>
    </ThemeContext.Provider>
  )
}

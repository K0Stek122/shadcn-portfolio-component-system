// Providers & context hooks
export { ShadcnProvider } from "@/components/shadcn-provider"
export type {
  ShadcnProviderProps,
  ShadcnProviderTheme,
  ThemeVariables,
} from "@/components/shadcn-provider"
export { useTheme } from "@/hooks/use-theme"
export { useBreadcrumbs } from "@/hooks/use-breadcrumbs"
export { useSiteConfig } from "@/hooks/use-site-config"
export type { Theme, ResolvedTheme, BreadcrumbEntry, SiteConfig } from "@/lib/contexts"
export { ThemeToggle, type ThemeToggleProps } from "@/components/theme-toggle"

// Layout / typography
export { Title, type TitleProps } from "@/components/title"
export { Paragraph, List, type ParagraphProps, type ListProps } from "@/components/typography"
export { Section, type SectionProps } from "@/components/section"
export { SplitContent, type SplitContentProps } from "@/components/split-content"
export { Breadcrumbs, type BreadcrumbsProps } from "@/components/breadcrumbs"
export { SEO, type SEOProps, type ServiceEntry, type FAQEntry } from "@/components/seo"

// Header & buttons
export { PortfolioHeader, type PortfolioHeaderProps } from "@/components/portfolio-header"
export { ContactButton, type ContactButtonProps } from "@/components/contact-button"
export { GenericButton, type GenericButtonProps } from "@/components/generic-button"

// Cards
export { CardSection, type CardSectionProps } from "@/components/cards/card-section"
export { ImgCard, type ImgCardProps } from "@/components/cards/img-card"
export { TextCard, type TextCardProps } from "@/components/cards/text-card"
export { IconCard, type IconCardProps } from "@/components/cards/icon-card"
export {
  CardDialog,
  type CardDialogProps,
  type CardDialogMedia,
} from "@/components/cards/card-dialog"

// Bundled shadcn primitives (Base UI-backed)
export { Button, buttonVariants } from "@/components/ui/button"
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
export { Separator } from "@/components/ui/separator"
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb"

export { cn } from "@/lib/utils"

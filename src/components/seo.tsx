import { useBreadcrumbs } from "@/hooks/use-breadcrumbs"
import { useSiteConfig } from "@/hooks/use-site-config"

export type ServiceEntry = {
  name: string
  serviceType: string
}

export type FAQEntry = {
  question: string
  answer: string
}

export type SEOProps = {
  title: string
  description: string
  path: string
  type?: "website" | "article"
  /** Renders a Person JSON-LD block. Only the homepage should set this. */
  includePerson?: boolean
  /** Renders a Service JSON-LD block, for service-landing pages. */
  service?: ServiceEntry
  /** Renders an FAQPage JSON-LD block. Mirror the visible FAQ list on the page. */
  faqs?: FAQEntry[]
}

/** Guards against a stray "</script" inside JSON content from prematurely closing the tag. */
function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

export function SEO({
  title,
  description,
  path,
  type = "website",
  includePerson = false,
  service,
  faqs,
}: SEOProps) {
  const { siteUrl, siteName, defaultImage, defaultImageWidth, defaultImageHeight, sameAs } =
    useSiteConfig()
  const breadcrumbs = useBreadcrumbs()

  const url = `${siteUrl}${path}`

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
  }

  const serviceLd = service
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.name,
        serviceType: service.serviceType,
        description,
        url,
        provider: {
          "@type": "Person",
          name: siteName,
          url: siteUrl,
        },
      }
    : null

  const personLd = includePerson
    ? {
        "@context": "https://schema.org",
        "@type": "Person",
        name: siteName,
        url,
        image: defaultImage,
        sameAs,
      }
    : null

  const faqLd = faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }
    : null

  const breadcrumbLd = breadcrumbs.length
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.label,
          item: `${siteUrl}${crumb.href}`,
        })),
      }
    : null

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={defaultImage} />
      {defaultImageWidth && (
        <meta property="og:image:width" content={String(defaultImageWidth)} />
      )}
      {defaultImageHeight && (
        <meta property="og:image:height" content={String(defaultImageHeight)} />
      )}
      <meta property="og:image:alt" content={siteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={defaultImage} />
      <meta name="twitter:image:alt" content={siteName} />
      <script type="application/ld+json">{toJsonLd(websiteLd)}</script>
      {personLd && <script type="application/ld+json">{toJsonLd(personLd)}</script>}
      {breadcrumbLd && <script type="application/ld+json">{toJsonLd(breadcrumbLd)}</script>}
      {serviceLd && <script type="application/ld+json">{toJsonLd(serviceLd)}</script>}
      {faqLd && <script type="application/ld+json">{toJsonLd(faqLd)}</script>}
    </>
  )
}

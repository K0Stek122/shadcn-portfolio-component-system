import { execSync } from "node:child_process"
import { writeFile } from "node:fs/promises"

export type SitemapRoute = {
  path: string
  /** Source file backing this route — enables a `git log` last-modified lookup. */
  file?: string
}

export type SitemapOptions = {
  siteUrl: string
  outFile: string
  routes: SitemapRoute[]
  /** Absolute URLs hosted outside this app (e.g. a separate blog) to include alongside `routes`. */
  externalUrls?: string[]
  /** Working directory `git log` is run from. Defaults to `process.cwd()`. */
  cwd?: string
}

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function lastCommitDate(file: string, cwd: string): string | undefined {
  try {
    const output = execSync(`git log -1 --format=%cI -- "${file}"`, {
      cwd,
      encoding: "utf-8",
    }).trim()
    return output ? output.slice(0, 10) : undefined
  } catch {
    return undefined
  }
}

function urlEntry(loc: string, lastmod: string): string {
  return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
}

/** Generates a sitemap.xml from a site's route list, using each route's last git commit date. */
export async function generateSitemap({
  siteUrl,
  outFile,
  routes,
  externalUrls = [],
  cwd = process.cwd(),
}: SitemapOptions): Promise<void> {
  const today = new Date().toISOString().slice(0, 10)

  const entries = [
    ...routes.map(({ path, file }) =>
      urlEntry(`${siteUrl}${path}`, (file && lastCommitDate(file, cwd)) ?? today)
    ),
    ...externalUrls.map((url) => urlEntry(url, today)),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`

  await writeFile(outFile, xml)
  console.log(`Generated ${outFile} with ${entries.length} URLs.`)
}

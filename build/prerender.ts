import { mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"

export type PrerenderOptions = {
  /** The Vite client build output directory, e.g. "dist". */
  distDir: string
  /** Absolute path to the compiled SSR entry module exporting `render(path: string): string`. */
  ssrEntry: string
  /** Route paths to prerender, e.g. ["/", "/about"]. */
  routes: string[]
  /** SSR build output directory to delete once prerendering finishes, e.g. "dist-ssr". */
  cleanupSsrDir?: string
}

/**
 * <SEO>'s <title>/<meta>/<link> tags render inline inside the React tree (there's no real <head>
 * to hoist into during SSR), so they land in the middle of `appHtml`. Pull them back out here and
 * splice them into the template's actual <head>.
 */
function extractHead(appHtml: string): { head: string; body: string } {
  let head = ""
  let body = appHtml

  const titleMatch = body.match(/<title>[\s\S]*?<\/title>/)
  if (titleMatch) {
    head += titleMatch[0]
    body = body.replace(titleMatch[0], "")
  }

  for (const tag of body.match(/<(meta|link)\b[^>]*>/g) ?? []) {
    head += tag
    body = body.replace(tag, "")
  }

  return { head, body }
}

/**
 * Renders each route with a site's own SSR entry and writes a prerendered dist/<path>/index.html,
 * splicing the route's <SEO>-emitted head tags into the real <head>.
 */
export async function prerenderRoutes({
  distDir,
  ssrEntry,
  routes,
  cleanupSsrDir,
}: PrerenderOptions): Promise<void> {
  const rawTemplate = await readFile(join(distDir, "index.html"), "utf-8")
  // Strip the static title/description — each route injects its own via <SEO>.
  const template = rawTemplate
    .replace(/<title>[\s\S]*?<\/title>\s*\n?/, "")
    .replace(/<meta name="description"[^>]*>\s*\n?/, "")

  const { render } = await import(ssrEntry.replaceAll("\\", "/"))

  for (const routePath of routes) {
    const appHtml = render(routePath)
    const { head, body } = extractHead(appHtml)

    const page = template
      .replace("</head>", `${head}</head>`)
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`)

    // Root writes straight into dist/index.html; every other route gets its own dist/<path>/index.html.
    const outDir = routePath === "/" ? distDir : join(distDir, routePath)
    await mkdir(outDir, { recursive: true })
    await writeFile(join(outDir, "index.html"), page)
  }

  if (cleanupSsrDir) {
    await rm(cleanupSsrDir, { recursive: true, force: true })
  }

  console.log(`Prerendered ${routes.length} routes.`)
}

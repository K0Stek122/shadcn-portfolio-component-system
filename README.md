# portfolio-component-system

A shared React component library, built on shadcn/ui + Base UI, for sites that follow the same
layout: a hero header (photo, name, tagline, buttons), H2 + text/list sections, a card grid with
"learn more" dialogs, a contact dialog, SEO meta tags, breadcrumbs, and theming.

## Installing in a consumer site

This package isn't published to a registry yet. Point a consumer site's `package.json` at it
directly:

```json
{
  "dependencies": {
    "portfolio-component-system": "file:../portfolio-component-system"
  }
}
```

Peer dependencies (the consumer site must already have these): `react@^19`, `react-dom@^19`,
`react-router-dom@^7`.

### Wiring up Tailwind v4

Tailwind v4 doesn't scan `node_modules` by default. Add this to the consumer site's `index.css` so
Tailwind picks up utility classes used inside the library's compiled output:

```css
@source "../node_modules/portfolio-component-system/dist/**/*.js";
```

The library ships its own copies of the shadcn/Base UI primitives it needs internally, so
consumer sites do **not** need to run `npx shadcn add` for `button`/`dialog`/`alert-dialog`/etc. —
just make sure the site's own `src/index.css` defines the standard shadcn CSS variables
(`--background`, `--foreground`, `--primary`, …) since the library's classes reference them.

## Usage

```tsx
import { BrowserRouter } from "react-router-dom"
import {
  ShadcnProvider,
  Title,
  PortfolioHeader,
  ContactButton,
  GenericButton,
  Section,
  SplitContent,
  Paragraph,
  List,
  CardSection,
  ImgCard,
  IconCard,
  TextCard,
  Breadcrumbs,
  ThemeToggle,
  SEO,
} from "portfolio-component-system"

function App() {
  return (
    <BrowserRouter>
      <ShadcnProvider
        siteConfig={{
          siteUrl: "https://example.com",
          siteName: "Example Site",
          defaultImage: "https://example.com/og.png",
          sameAs: ["https://github.com/example"],
        }}
      >
        <SEO title="Home" description="…" path="/" includePerson />
        {/* "Home" is prepended automatically — pass only the trailing crumbs, or [] on the homepage. */}
        <Breadcrumbs items={[]} />

        {/* The page's own site title (e.g. "Example Site") — independent of the hero below. */}
        <Title>Example Site</Title>

        <PortfolioHeader name="Jane Doe" tagline="Open to work">
          <div className="flex flex-row flex-wrap items-center justify-center gap-4">
            <ContactButton email="jane@example.com" />
            <GenericButton name="CV" to="https://example.com/cv.pdf" />
          </div>
        </PortfolioHeader>

        <Section title="About Me">
          {/* A single <Paragraph> or <List> works too — SplitContent only draws the
              separator between the two columns when both `left` and `right` are given. */}
          <SplitContent
            left={<Paragraph>...</Paragraph>}
            right={
              <List>
                <li>...</li>
              </List>
            }
          />
        </Section>

        <CardSection title="Projects">
          <ImgCard title="..." description="..." image={{ src: "...", alt: "..." }} />
          <IconCard title="..." description="..." icon={SomeLucideIcon} />
          <TextCard title="..." description="..." />
        </CardSection>

        <ThemeToggle />
      </ShadcnProvider>
    </BrowserRouter>
  )
}
```

### Theming

`<ShadcnProvider theme={{ light: {...}, dark: {...} }}>` accepts CSS variable values pasted from
[shadcn's theme generator](https://ui.shadcn.com/themes) (variable names without the `--` prefix
are fine too), applied at runtime as an inline `<style>` override.

### Build tooling (sitemap + SSR prerendering)

The `portfolio-component-system/build` entry exports Node-only helpers a consumer site's own
build scripts can call:

```js
// scripts/build-seo.mjs
import { generateSitemap, prerenderRoutes } from "portfolio-component-system/build"

await generateSitemap({
  siteUrl: "https://example.com",
  outFile: "public/sitemap.xml",
  routes: [{ path: "/", file: "src/pages/home.tsx" }],
})

await prerenderRoutes({
  distDir: "dist",
  ssrEntry: new URL("../dist-ssr/entry-server.js", import.meta.url).pathname,
  routes: ["/"],
  cleanupSsrDir: "dist-ssr",
})
```

Each site still owns its own `entry-server.tsx` (the SSR render entry point is app-specific);
these helpers only generalize the sitemap XML generation and the head-splicing/prerender-to-disk
logic.

## Developing this library

- `pnpm dev` — runs the local Vite sandbox (`src/App.tsx`) for visually testing components as you
  build them.
- `pnpm build` — builds the publishable package (`dist/`) via `tsup`.
- `pnpm typecheck` / `pnpm lint` — as usual.

Adding a new bundled shadcn primitive:

```bash
npx shadcn@latest add <component>
```

This repo's `components.json` is configured for the `base-nova` (Base UI) style — keep all
primitives on Base UI, not Radix, to match the rest of the library.

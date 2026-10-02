import { Rocket, Sparkles } from "lucide-react"

import {
  Breadcrumbs,
  CardSection,
  ContactButton,
  GenericButton,
  IconCard,
  ImgCard,
  List,
  Paragraph,
  Section,
  SEO,
  ShadcnProvider,
  SplitContent,
  TextCard,
  ThemeToggle,
  Title,
  PortfolioHeader,
} from "@/index"

function Page() {
  return (
    <div className="flex min-h-svh w-full flex-col items-center gap-8 p-6">
      <SEO
        title="Component System Sandbox"
        description="Local smoke test for the portfolio-component-system library."
        path="/"
        includePerson
      />

      <Breadcrumbs items={[]} />

      <Title>Component System Sandbox</Title>

      <PortfolioHeader name="Ada Lovelace" tagline="Building things that compute.">
        <div className="flex flex-row flex-wrap items-center justify-center gap-4">
          <GenericButton name="My Portfolio" to="https://example.com" icon={Rocket} />
          <ContactButton email="ada@example.com" phone="+44 7000 000000" />
        </div>
      </PortfolioHeader>

      <Section title="About Me" withSeparator>
        <SplitContent
          left={
            <Paragraph className="mt-0">
              This is a smoke test of the shared component library, verifying that Section, its
              typography, and the Separator all render correctly together.
            </Paragraph>
          }
          right={
            <List className="mt-0">
              <li>Dialogs open and close</li>
              <li>Dark mode toggles with “d” or the floating toggle</li>
              <li>Theme overrides apply</li>
            </List>
          }
        />
      </Section>

      <CardSection title="Projects">
        <ImgCard
          title="Analytical Engine"
          description="A general-purpose mechanical computer design."
          image={{ src: "/vite.svg", alt: "Analytical Engine" }}
          details={["Programmable via punch cards", "Never fully built in her lifetime"]}
          demoLink="https://example.com"
          githubLink="https://example.com"
        />
        <IconCard
          title="Notes on the Engine"
          description="The first published algorithm intended for a machine."
          icon={Sparkles}
          details={["Considered the first computer program"]}
        />
        <TextCard
          title="Correspondence"
          description="Letters exchanged with Charles Babbage."
          details={["Spanned several years", "Covers the engine's design"]}
        />
      </CardSection>

      <ThemeToggle />
    </div>
  )
}

export function App() {
  return (
    <ShadcnProvider
      siteConfig={{
        siteUrl: "https://example.com",
        siteName: "Component System Sandbox",
        defaultImage: "https://example.com/og.png",
      }}
      theme={{
        light: { "--primary": "oklch(0.55 0.2 260)" },
        dark: { "--primary": "oklch(0.75 0.2 260)" },
      }}
    >
      <Page />
    </ShadcnProvider>
  )
}

export default App

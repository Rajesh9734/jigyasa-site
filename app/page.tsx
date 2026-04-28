import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhatsAppFloat } from "@/components/shared/whatsapp-float"
import { AboutUs } from "@/components/sections/about-us"
import { ContactMap } from "@/components/sections/contact-map"
import { CTASection } from "@/components/sections/cta-section"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { StatsBar } from "@/components/sections/stats-bar"
import { siteConfig } from "@/config/site"
import { sameAsLinks } from "@/config/social-links"

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: siteConfig.legalName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo-transparent.png`,
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  sameAs: sameAsLinks,
  areaServed: "Nepal",
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <AboutUs />
      <Services />
      <ContactMap />
      <StatsBar />
      <CTASection />
      <Footer />
      <WhatsAppFloat />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
    </main>
  )
}

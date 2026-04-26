import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { AboutUs } from "@/components/about-us"
import { Services } from "@/components/services"
import { MapSection } from "@/components/map-section"
import { StatsBar } from "@/components/stats-bar"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <AboutUs />
      <Services />
      <MapSection />
      <StatsBar />
      <CTASection />
      <Footer />
    </main>
  )
}

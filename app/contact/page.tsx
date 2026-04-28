import type { Metadata } from "next"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { ContactMap } from "@/components/sections/contact-map"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteConfig.name} to book NEPSE or FX classes and advisory consultations in Kathmandu, Nepal.`,
  alternates: {
    canonical: "/contact",
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white pt-16 md:pt-20">
      <Header />
      <ContactMap />
      <Footer />
    </main>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { BookOpenCheck, CheckCircle2, Clock3, LineChart, MapPin, Monitor } from "lucide-react"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { WhatsAppFloat } from "@/components/shared/whatsapp-float"
import { featuredCourse } from "@/config/course"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "NEPSE Practical Course",
  description: `Explore ${siteConfig.name}'s practical NEPSE course with chart reading, stock filtering, risk management, and guided market learning.`,
  alternates: {
    canonical: "/courses",
  },
}

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-white pt-16 md:pt-20">
      <Header />

      <section className="bg-[#f8fbff] pb-20 pt-10 lg:pb-28 lg:pt-10">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1 text-sm font-semibold text-[#2439A9] shadow-sm">
              <BookOpenCheck className="h-4 w-4" strokeWidth={1.8} />
              {featuredCourse.title}
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-[#0a1a2e] lg:text-6xl">
              Learn how to read the market before you trade it.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 lg:text-lg">
              {featuredCourse.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-md bg-[#2439A9] px-5 text-sm font-semibold text-white transition-all hover:bg-[#1f3190] active:translate-y-px active:scale-[0.98]"
              >
                Reserve Your Seat
              </Link>
              <Link
                href="/#services"
                className="inline-flex h-11 items-center justify-center rounded-md border-2 border-slate-300 px-5 text-sm font-semibold text-slate-700 transition-all hover:border-[#2439A9] hover:text-[#2439A9] active:translate-y-px active:scale-[0.98] active:bg-slate-50"
              >
                View All Services
              </Link>
            </div>
          </div>

          <div className="rounded-lg bg-[#e9edf5] p-5 sm:p-8">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="text-sm font-semibold text-[#0a1a2e]">
                    Course Structure
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    3 weeks of guided practical learning
                  </p>
                </div>
                <LineChart className="h-6 w-6 text-[#2439A9]" strokeWidth={1.7} />
              </div>
              <div className="mt-5 grid gap-3">
                {featuredCourse.curriculum.map((item, index) => (
                  <div key={item.title} className="rounded-md bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-[#0a1a2e]">
                      Week {index + 1}: {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#2563eb]">
                Class Options
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0a1a2e] lg:text-4xl">
                Choose the class format that fits your schedule.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <Monitor className="h-6 w-6 text-[#2439A9]" strokeWidth={1.7} />
                <h3 className="mt-4 font-semibold text-[#0a1a2e]">
                  Online Classes
                </h3>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  {featuredCourse.schedules
                    .filter((schedule) => schedule.type === "online")
                    .map((schedule) => (
                      <div key={schedule.label} className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4 text-slate-400" strokeWidth={1.7} />
                        {schedule.time}
                      </div>
                    ))}
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <MapPin className="h-6 w-6 text-[#a86a00]" strokeWidth={1.7} />
                <h3 className="mt-4 font-semibold text-[#0a1a2e]">
                  Physical Classes
                </h3>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  {featuredCourse.schedules
                    .filter((schedule) => schedule.type === "physical")
                    .map((schedule) => (
                      <div key={schedule.label} className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4 text-slate-400" strokeWidth={1.7} />
                        {schedule.time}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCourse.outcomes.map((outcome) => (
              <div key={outcome} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#2439A9]" strokeWidth={1.8} />
                <span className="text-sm font-medium text-slate-700">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  )
}

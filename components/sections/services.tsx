"use client"

import { forwardRef, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { CheckCircle2, ChevronRight, X } from "lucide-react"
import { services } from "@/config/services"

type Service = (typeof services)[number]

const primaryService = services[0]
const propFirmService = services[1]
const portfolioService = services[2]
const marketResearchService = services[3]

const primaryExtraPoints = [
  "Beginner-friendly structure",
  "Practical chart walkthroughs",
]

function InlineArrow({ expanded }: { expanded: boolean }) {
  if (expanded) {
    return (
      <ChevronRight
        className="ml-1 h-4 w-4 rotate-90 transition-transform"
        strokeWidth={2}
      />
    )
  }

  return (
    <svg
      className="ml-1 h-4 w-6 overflow-visible"
      viewBox="0 0 24 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 3L15 8L10 13"
        className="stroke-current transition-all duration-150 ease-out group-hover:translate-x-1 group-hover:opacity-0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 8H18L13 3M18 8L13 13"
        className="stroke-current opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0.5 group-hover:opacity-100"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ServiceDetail = forwardRef<
  HTMLDivElement,
  {
    service: Service
    onClose: () => void
  }
>(function ServiceDetail({ service, onClose }, ref) {
  return (
    <div
      ref={ref}
      className="mt-6 rounded-lg border border-[#dbe5ff] bg-white p-6 shadow-sm sm:mt-8 lg:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${service.bgColor}`}
          >
            <service.icon
              className={`h-6 w-6 ${service.iconColor}`}
              strokeWidth={1.5}
            />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#2563eb]">
              Service Detail
            </p>
            <h3 className="mt-1 text-2xl font-bold tracking-tight text-[#0a1a2e]">
              {service.title}
            </h3>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all hover:border-slate-300 hover:text-[#0a1a2e] active:scale-[0.94] active:bg-slate-50"
          aria-label="Close service detail"
        >
          <X className="h-4 w-4" strokeWidth={1.8} />
        </button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <p className="max-w-3xl text-base leading-7 text-slate-600">
          {service.description}
        </p>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Focus Areas
          </p>
          <ul className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-1">
            {service.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2563eb]" strokeWidth={1.8} />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center">
        {service.title === "NEPSE Practical Classes" && (
          <Link
            href="/courses"
            onClick={onClose}
            className="inline-flex h-11 items-center justify-center rounded-md border-2 border-[#2439A9] px-5 text-sm font-semibold text-[#2439A9] transition-all hover:bg-[#2439A9] hover:text-white active:translate-y-px active:scale-[0.98]"
          >
            View Course Details
          </Link>
        )}
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-11 items-center justify-center rounded-md border-2 border-slate-300 px-5 text-sm font-semibold text-slate-700 transition-all hover:border-[#2439A9] hover:bg-slate-50 hover:text-[#2439A9] active:translate-y-px active:scale-[0.98] active:bg-slate-100"
        >
          Back to Services
        </button>
      </div>
    </div>
  )
})

function ServiceCard({
  isPrimary = false,
  onToggle,
  selected,
  service,
}: {
  isPrimary?: boolean
  onToggle: () => void
  selected: boolean
  service: Service
}) {
  return (
    <article
      className={`flex h-full flex-col rounded-lg bg-white shadow-sm ring-1 ring-inset transition-shadow duration-300 hover:shadow-[0_10px_24px_rgba(15,23,42,0.06)] ${
        isPrimary ? "min-h-[300px] p-7 lg:p-8" : "min-h-[280px] p-6"
      } ${selected ? "ring-2 ring-[#2563eb]" : "ring-navy/5"}`}
    >
      <div
        className={`mb-4 flex shrink-0 items-center justify-center rounded-lg ${
          isPrimary ? "h-16 w-16" : "h-14 w-14"
        } ${service.bgColor}`}
      >
        <service.icon
          className={`${isPrimary ? "h-8 w-8" : "h-7 w-7"} ${service.iconColor}`}
          strokeWidth={1.5}
        />
      </div>
      <h3
        className={`mb-3 font-semibold text-[#0a1a2e] ${
          isPrimary ? "text-2xl tracking-tight sm:text-3xl" : "text-lg"
        }`}
      >
        {service.title}
      </h3>
      <p
        className={`leading-relaxed text-gray-500 ${
          isPrimary ? "max-w-2xl text-base" : "text-sm"
        }`}
      >
        {service.summary}
      </p>
      <ul
        className={`mt-5 grid gap-2 text-sm text-slate-600 ${
          isPrimary ? "sm:grid-cols-2" : ""
        }`}
      >
        {[...service.highlights.slice(0, isPrimary ? 3 : 2), ...(isPrimary ? primaryExtraPoints : [])].map((highlight) => (
          <li key={highlight} className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2563eb]" strokeWidth={1.8} />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        aria-expanded={selected}
        onClick={onToggle}
        className={`group mt-auto inline-flex w-fit items-center self-start text-left text-sm font-semibold text-[#2563eb] transition-all hover:text-blue-800 active:translate-y-px active:scale-[0.98] ${
          isPrimary ? "pt-8" : "pt-6"
        }`}
      >
        {selected ? "Hide Details" : "View Details"}
        <InlineArrow expanded={selected} />
      </button>
    </article>
  )
}

export function Services() {
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const detailRef = useRef<HTMLDivElement | null>(null)

  const selectedService = useMemo(
    () => services.find((service) => service.title === selectedTitle) ?? null,
    [selectedTitle],
  )

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash

      if (hash !== "#services" && hash !== "#courses") {
        setSelectedTitle(null)
      }
    }

    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)

    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  useEffect(() => {
    const section = sectionRef.current

    if (!section) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setSelectedTitle(null)
        }
      },
      { threshold: 0.08 },
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!selectedService || !detailRef.current) {
      return
    }

    detailRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    })
  }, [selectedService])

  return (
    <section ref={sectionRef} id="services" className="bg-white py-14 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h2 id="courses" className="text-2xl font-bold tracking-tight text-[#2439A9] sm:text-3xl">
                Services
              </h2>
              <div className="h-px w-12 bg-[#2563eb]" />
              <div className="h-2 w-2 rounded-full bg-[#2563eb]" />
            </div>
          </div>
        </div>

        {/* Service Cards */}
        <div className="rounded-xl bg-[#eef6ff] px-4 py-6 ring-1 ring-inset ring-blue-500/10 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
          <div className="space-y-6">
            <div className="services-top-row">
              <ServiceCard
                isPrimary
                onToggle={() =>
                  setSelectedTitle((current) =>
                    current === primaryService.title ? null : primaryService.title,
                  )
                }
                selected={selectedTitle === primaryService.title}
                service={primaryService}
              />
              <ServiceCard
                onToggle={() =>
                  setSelectedTitle((current) =>
                    current === propFirmService.title ? null : propFirmService.title,
                  )
                }
                selected={selectedTitle === propFirmService.title}
                service={propFirmService}
              />
              {(selectedTitle === primaryService.title ||
                selectedTitle === propFirmService.title) &&
                selectedService && (
                  <div className="services-row-detail" ref={detailRef}>
                    <ServiceDetail
                      service={selectedService}
                      onClose={() => setSelectedTitle(null)}
                    />
                  </div>
                )}
            </div>

            <div className="services-bottom-row">
              <ServiceCard
                onToggle={() =>
                  setSelectedTitle((current) =>
                    current === portfolioService.title ? null : portfolioService.title,
                  )
                }
                selected={selectedTitle === portfolioService.title}
                service={portfolioService}
              />
              <ServiceCard
                onToggle={() =>
                  setSelectedTitle((current) =>
                    current === marketResearchService.title
                      ? null
                      : marketResearchService.title,
                  )
                }
                selected={selectedTitle === marketResearchService.title}
                service={marketResearchService}
              />
              {(selectedTitle === portfolioService.title ||
                selectedTitle === marketResearchService.title) &&
                selectedService && (
                  <div className="services-row-detail" ref={detailRef}>
                    <ServiceDetail
                      service={selectedService}
                      onClose={() => setSelectedTitle(null)}
                    />
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

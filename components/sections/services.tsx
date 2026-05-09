"use client"

import { forwardRef, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { CheckCircle2, ChevronRight, X } from "lucide-react"
import { services } from "@/config/services"

type Service = (typeof services)[number]

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
    <section ref={sectionRef} id="services" className="bg-gray-50 py-14 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#2563eb]">
                Our Services
              </span>
              <div className="h-px w-12 bg-[#2563eb]" />
              <div className="h-2 w-2 rounded-full bg-[#2563eb]" />
            </div>
            <h2 id="courses" className="text-3xl font-bold tracking-tight text-navy lg:text-4xl">
              Build your financial future
            </h2>
            <p className="mt-3 max-w-3xl text-gray-500">
              Hands-on classes and expert advisory for NEPSE traders and long term wealth builders.
            </p>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div key={service.title} className="contents">
              <article
                className={`flex h-full min-h-[360px] flex-col rounded-lg bg-white p-6 shadow-sm ring-1 ring-inset transition-shadow duration-300 hover:shadow-[0_10px_24px_rgba(15,23,42,0.06)] ${
                  selectedTitle === service.title
                    ? "ring-2 ring-[#2563eb]"
                    : "ring-navy/5"
                }`}
              >
                <div
                  className={`mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-lg ${service.bgColor}`}
                >
                  <service.icon className={`h-7 w-7 ${service.iconColor}`} strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-[#0a1a2e]">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {service.summary}
                </p>
                <ul className="mt-5 space-y-2 text-sm text-slate-600">
                  {service.highlights.slice(0, 2).map((highlight) => (
                    <li key={highlight} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2563eb]" strokeWidth={1.8} />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  aria-expanded={selectedTitle === service.title}
                  onClick={() =>
                    setSelectedTitle((current) =>
                      current === service.title ? null : service.title,
                    )
                  }
                  className="group mt-auto inline-flex w-fit items-center self-start pt-6 text-left text-sm font-semibold text-[#2563eb] transition-all hover:text-blue-800 active:translate-y-px active:scale-[0.98]"
                >
                  {selectedTitle === service.title ? "Hide Details" : "View Details"}
                  <InlineArrow expanded={selectedTitle === service.title} />
                </button>
              </article>

              {selectedService?.title === service.title && (
                <div className="sm:hidden">
                  <ServiceDetail
                    ref={detailRef}
                    service={selectedService}
                    onClose={() => setSelectedTitle(null)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedService && (
          <div className="hidden sm:block">
            <ServiceDetail
              service={selectedService}
              onClose={() => setSelectedTitle(null)}
            />
          </div>
        )}
      </div>
    </section>
  )
}

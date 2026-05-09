"use client"

import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { testimonials } from "@/config/course"

const quoteColors = ["text-[#2f5bff]", "text-[#12b8b0]", "text-[#c77836]"]
const visibleCount = 3

export function Testimonials() {
  const [startIndex, setStartIndex] = useState(0)
  const canRotate = testimonials.length > visibleCount

  const visibleTestimonials = useMemo(() => {
    if (!canRotate) return testimonials

    return Array.from({ length: visibleCount }, (_, offset) => {
      return testimonials[(startIndex + offset) % testimonials.length]
    })
  }, [canRotate, startIndex])

  const moveTestimonials = (direction: "previous" | "next") => {
    if (!canRotate) return

    setStartIndex((current) => {
      if (direction === "next") {
        return (current + 1) % testimonials.length
      }

      return (current - 1 + testimonials.length) % testimonials.length
    })
  }

  return (
    <section className="bg-[#fbfcfe] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 flex items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#2563eb]">
              Student Feedback
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#0a1a2e] lg:text-4xl">
              What our students say
            </h2>
          </div>
          <div className="hidden items-end gap-8 md:flex">
            <p className="max-w-sm text-sm leading-6 text-slate-500">
              Practical learning feels different when students can connect
              charts, risk, and discipline to the Nepali market.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => moveTestimonials("previous")}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#2563eb] text-[#2563eb] transition-all hover:bg-[#2563eb] hover:text-white active:scale-[0.94]"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => moveTestimonials("next")}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#2563eb] text-[#2563eb] transition-all hover:bg-[#2563eb] hover:text-white active:scale-[0.94]"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {visibleTestimonials.map((testimonial, index) => (
            <figure
              key={`${testimonial.name}-${index}`}
              className="relative rounded-lg bg-white p-7 shadow-[0_18px_48px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/5 transition-shadow duration-300 hover:shadow-[0_24px_64px_rgba(15,23,42,0.13)]"
            >
              <div
                className={`absolute right-7 top-6 font-serif text-6xl font-bold leading-none ${quoteColors[index % quoteColors.length]}`}
                aria-hidden="true"
              >
                &quot;
              </div>
              <figcaption>
                <p className="pr-16 text-lg font-bold text-[#1f2937]">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {testimonial.role}
                </p>
              </figcaption>
              <blockquote className="mt-6 text-base leading-7 text-slate-700">
                {testimonial.quote}
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

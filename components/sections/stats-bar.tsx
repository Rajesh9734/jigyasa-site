"use client"

import { useEffect, useMemo, useRef, useState } from "react"

import { stats } from "@/config/stats"

const COUNT_DURATION = 1100

type ParsedStatValue = {
  decimalPlaces: number
  prefix: string
  suffix: string
  target: number
}

function parseStatValue(value: string): ParsedStatValue | null {
  const match = value.match(/^([^0-9]*)([0-9][0-9,.]*)(.*)$/)

  if (!match) {
    return null
  }

  const [, prefix, rawNumber, suffix] = match
  const normalizedNumber = rawNumber.replace(/,/g, "")
  const target = Number(normalizedNumber)

  if (!Number.isFinite(target)) {
    return null
  }

  return {
    decimalPlaces: normalizedNumber.includes(".")
      ? normalizedNumber.split(".")[1]?.length ?? 0
      : 0,
    prefix,
    suffix,
    target,
  }
}

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3)
}

function CountUpStatValue({
  delay,
  start,
  value,
}: {
  delay: number
  start: boolean
  value: string
}) {
  const parsedValue = useMemo(() => parseStatValue(value), [value])
  const [displayValue, setDisplayValue] = useState(
    () => parsedValue?.target ?? 0,
  )
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    if (!parsedValue || !start || hasAnimatedRef.current) {
      return
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    if (prefersReducedMotion) {
      setDisplayValue(parsedValue.target)
      return
    }

    hasAnimatedRef.current = true

    let animationFrame = 0
    const startTimeoutId = window.setTimeout(() => {
      const startTime = performance.now()
      setDisplayValue(0)

      const animateValue = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / COUNT_DURATION, 1)

        setDisplayValue(parsedValue.target * easeOutCubic(progress))

        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(animateValue)
        } else {
          setDisplayValue(parsedValue.target)
        }
      }

      animationFrame = window.requestAnimationFrame(animateValue)
    }, delay)

    return () => {
      window.clearTimeout(startTimeoutId)
      window.cancelAnimationFrame(animationFrame)
    }
  }, [delay, parsedValue, start])

  if (!parsedValue) {
    return <span>{value}</span>
  }

  const formattedValue = Number(displayValue).toLocaleString("en-US", {
    maximumFractionDigits: parsedValue.decimalPlaces,
    minimumFractionDigits: parsedValue.decimalPlaces,
  })

  return (
    <span aria-label={value} className="inline-block tabular-nums">
      {parsedValue.prefix}
      {formattedValue}
      {parsedValue.suffix}
    </span>
  )
}

function StatCard({
  index,
  stat,
}: {
  index: number
  stat: (typeof stats)[number]
}) {
  const [hasEntered, setHasEntered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cardNode = cardRef.current

    if (!cardNode) {
      return
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    const mobileQuery = window.matchMedia("(max-width: 639px)")

    if (prefersReducedMotion || mobileQuery.matches) {
      setHasEntered(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true)
          observer.disconnect()
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.25 },
    )

    observer.observe(cardNode)

    return () => observer.disconnect()
  }, [])

  const revealDelay = index * 90

  return (
    <div
      ref={cardRef}
      className={`flex min-h-32 items-start gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-all duration-700 ease-out ${
        hasEntered
          ? "translate-y-0 opacity-100"
          : "translate-y-0 opacity-100 sm:translate-y-6 sm:opacity-0"
      }`}
      style={{ transitionDelay: hasEntered ? `${revealDelay}ms` : "0ms" }}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#e8f0fe]">
        <stat.icon className="h-6 w-6 text-[#2439A9]" strokeWidth={1.8} />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold tracking-tight text-[#0a1a2e]">
          <CountUpStatValue
            delay={revealDelay + 120}
            start={hasEntered}
            value={stat.value}
          />
        </p>
        <p className="mt-1 text-sm font-semibold text-[#0a1a2e]">
          {stat.label}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {stat.description}
        </p>
      </div>
    </div>
  )
}

export function StatsBar() {
  return (
    <section className="relative z-20 border-b border-slate-200 bg-slate-50 py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard index={index} key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

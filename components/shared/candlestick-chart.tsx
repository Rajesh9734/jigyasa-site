"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface OHLCData {
  date: string
  open: number
  high: number
  low: number
  close: number
}

const OHLC_DATA: OHLCData[] = [
  { date: "2024-01-01", open: 100, high: 102, low: 98, close: 101 },
  { date: "2024-01-02", open: 101, high: 104, low: 100, close: 103 },
  { date: "2024-01-03", open: 103, high: 105, low: 101, close: 104 },
  { date: "2024-01-04", open: 104, high: 106, low: 102, close: 103 },
  { date: "2024-01-05", open: 103, high: 107, low: 102, close: 106 },
  { date: "2024-01-06", open: 106, high: 108, low: 104, close: 107 },
  { date: "2024-01-07", open: 107, high: 110, low: 105, close: 109 },
  { date: "2024-01-08", open: 109, high: 111, low: 107, close: 110 },
  { date: "2024-01-09", open: 110, high: 111, low: 106, close: 107 },
  { date: "2024-01-10", open: 107, high: 109, low: 104, close: 105 },
  { date: "2024-01-11", open: 105, high: 107, low: 102, close: 103 },
  { date: "2024-01-12", open: 103, high: 106, low: 101, close: 104 },
  { date: "2024-01-13", open: 104, high: 108, low: 103, close: 107 },
  { date: "2024-01-14", open: 107, high: 109, low: 105, close: 106 },
  { date: "2024-01-15", open: 106, high: 108, low: 104, close: 105 },
  { date: "2024-01-16", open: 105, high: 109, low: 104, close: 108 },
  { date: "2024-01-17", open: 108, high: 112, low: 107, close: 111 },
  { date: "2024-01-18", open: 111, high: 113, low: 109, close: 112 },
  { date: "2024-01-19", open: 112, high: 115, low: 111, close: 114 },
  { date: "2024-01-20", open: 114, high: 116, low: 112, close: 113 },
  { date: "2024-01-21", open: 113, high: 117, low: 112, close: 116 },
  { date: "2024-01-22", open: 116, high: 118, low: 114, close: 117 },
]

const SVG_WIDTH = 520
const SVG_HEIGHT = 300
const PADDING = { top: 24, right: 12, bottom: 20, left: 12 }
const CHART_WIDTH = SVG_WIDTH - PADDING.left - PADDING.right
const CHART_HEIGHT = SVG_HEIGHT - PADDING.top - PADDING.bottom

const MIN_PRICE = 96
const MAX_PRICE = 120
const PRICE_RANGE = MAX_PRICE - MIN_PRICE

export function CandlestickChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia?.("(max-width: 767px)")
    if (!mq) {
      setIsMobile(window.innerWidth < 768)
      setIsHydrated(true)
      return
    }
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    if (mq.addEventListener) {
      mq.addEventListener("change", handler)
    } else {
      mq.addListener(handler)
    }
    setIsHydrated(true)
    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener("change", handler)
      } else {
        mq.removeListener(handler)
      }
    }
  }, [])

  const priceToY = useCallback((price: number) => {
    return PADDING.top + ((MAX_PRICE - price) / PRICE_RANGE) * CHART_HEIGHT
  }, [])

  const candleSpacing = CHART_WIDTH / OHLC_DATA.length
  const candleWidth = candleSpacing * 0.52

  const hovered = hoveredIndex !== null ? OHLC_DATA[hoveredIndex] : null

  return (
    <div className="relative w-full">
      <div className="mb-2 hidden h-5 items-center justify-end md:flex">
        <AnimatePresence mode="wait">
          {hovered && (
            <motion.div
              key="ohlc"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.1 }}
              className="flex items-center gap-3 text-[11px]"
            >
              <span className="text-white/40">O: <span className="font-medium text-white/70">{hovered.open}</span></span>
              <span className="text-white/40">H: <span className="font-medium text-emerald-400">{hovered.high}</span></span>
              <span className="text-white/40">L: <span className="font-medium text-red-400">{hovered.low}</span></span>
              <span className="text-white/40">C: <span className={`font-medium ${hovered.close >= hovered.open ? "text-emerald-400" : "text-red-400"}`}>{hovered.close}</span></span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <svg
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        className="block w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {OHLC_DATA.map((candle, i) => {
          const x = PADDING.left + i * candleSpacing + candleSpacing / 2
          const isGreen = candle.close >= candle.open
          const bodyTop = priceToY(Math.max(candle.open, candle.close))
          const bodyBottom = priceToY(Math.min(candle.open, candle.close))
          const bodyHeight = Math.max(bodyBottom - bodyTop, 2)
          const wickTop = priceToY(candle.high)
          const wickBottom = priceToY(candle.low)
          const isHovered = hoveredIndex === i
          const color = isGreen ? "#34d399" : "#f87171"

          return (
            <g key={i}>
              {!isHydrated ? (
                <g className="pointer-events-none">
                  <line x1={x} y1={wickTop} x2={x} y2={bodyTop} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
                  <line x1={x} y1={bodyBottom} x2={x} y2={wickBottom} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
                  <rect x={x - candleWidth / 2} y={bodyTop} width={candleWidth} height={bodyHeight} fill={color} rx={1.5} opacity={1} />
                </g>
              ) : (
                <>
                  <rect
                    x={x - candleSpacing / 2}
                    y={PADDING.top}
                    width={candleSpacing}
                    height={CHART_HEIGHT}
                    fill="transparent"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="hidden md:block"
                  />

                  {isMobile ? (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.055, duration: 0.45, ease: "easeOut" }}
                      className="pointer-events-none"
                    >
                      <line x1={x} y1={wickTop} x2={x} y2={bodyTop} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
                      <line x1={x} y1={bodyBottom} x2={x} y2={wickBottom} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
                      <rect x={x - candleWidth / 2} y={bodyTop} width={candleWidth} height={bodyHeight} fill={color} rx={1.5} opacity={1} />
                    </motion.g>
                  ) : (
                    <motion.g
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{
                        opacity: 1,
                        scaleY: 1,
                        scale: isHovered ? 1.18 : 1,
                        y: isHovered ? -4 : 0,
                      }}
                      transition={{
                        opacity: { delay: i * 0.055, duration: 0.45, ease: "easeOut" },
                        scaleY: { delay: i * 0.055, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
                        scale: { duration: 0.2, ease: "easeOut" },
                        y: { duration: 0.2, ease: "easeOut" },
                      }}
                      style={{ transformOrigin: `${x}px ${wickBottom}px` }}
                      className="pointer-events-none"
                    >
                      <line x1={x} y1={wickTop} x2={x} y2={bodyTop} stroke={color} strokeWidth={isHovered ? 2 : 1.5} strokeLinecap="round" />
                      <line x1={x} y1={bodyBottom} x2={x} y2={wickBottom} stroke={color} strokeWidth={isHovered ? 2 : 1.5} strokeLinecap="round" />
                      <rect x={x - candleWidth / 2} y={bodyTop} width={candleWidth} height={bodyHeight} fill={color} rx={1.5} opacity={1} />
                    </motion.g>
                  )}
                </>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CandlestickChart } from "@/components/candlestick-chart"

export function Hero() {
  return (
    <section
      id="hero"
      // min-h-[600px] kept, but added more padding to prevent "shrinking" look
      className="relative min-h-[600px] overflow-hidden bg-gradient-to-b from-[#2237A5] via-[#0d2070] to-[#0F1B5C]"
    >
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-24 md:flex-row md:px-12 md:py-32 lg:py-40">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#f5a623]">
            Empowering Financial Success
          </p>
          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            Learn. Invest.
            <br />
            <span className="text-[#f5a623]">Succeed.</span>
          </h1>
          <p className="mb-8 max-w-lg text-lg text-white/70">
            NEPSE &amp; FX training, capital investment and advisory services to
            help you grow your wealth and achieve financial freedom.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
            <Button asChild className="rounded-full bg-[#f5a623] px-8 py-6 text-base font-semibold text-[#0F1B5C] shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e09610] hover:shadow-lg">
              <Link href="/contact">Explore Our Classes</Link>
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-2 border-white/60 bg-transparent px-8 py-6 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#0F1B5C] hover:shadow-lg"
            >
              Free Consultation
            </Button>
          </div>
        </div>

        {/* Right Content — Candlestick Chart */}
        <div className="relative flex-1 w-full max-w-2xl lg:max-w-none">
          <CandlestickChart />
        </div>
      </div>
    </section>
  )
}
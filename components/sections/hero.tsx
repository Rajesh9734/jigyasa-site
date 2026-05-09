import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CandlestickChart } from "@/components/shared/candlestick-chart"

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-gradient-to-b from-[#2237A5] via-[#0d2070] to-[#0F1B5C] md:min-h-[700px]"
    >
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 pb-20 pt-32 md:flex-row md:gap-12 md:px-12 md:py-32 lg:py-36">
        <div className="flex-1 text-center md:text-left lg:pt-4">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-white/55 md:text-sm">
            Empowering Financial Success
          </p>
          <h1 className="text-5xl font-bold leading-[0.98] tracking-tight text-white md:text-6xl lg:text-7xl">
            Learn. Invest.
            <br />
            <span className="text-[#FFB800]">Succeed.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/72">
            NEPSE &amp; FX training, capital investment and advisory services to
            help you grow your wealth and achieve financial freedom.
          </p>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
            <Button
              asChild
              className="hero-primary-button rounded-lg bg-[#FFBE16] px-8 py-6 text-base font-semibold text-[#0F1B5C] shadow-md shadow-black/15 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#0F1B5C] hover:shadow-lg"
            >
              <Link href="/courses">Explore Our Classes</Link>
            </Button>
            <Button
              variant="outline"
              className="rounded-lg border-2 border-white/60 bg-transparent px-8 py-6 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#0F1B5C] hover:shadow-lg"
            >
              Free Consultation
            </Button>
          </div>
        </div>

        <div className="relative flex-1 w-full max-w-2xl lg:max-w-none">
          <CandlestickChart />
        </div>
      </div>
    </section>
  )
}

import { Users, Award, Clock, Headphones } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[600px] overflow-hidden bg-gradient-to-b from-[#2237A5] via-[#0d2070] to-[#0F1B5C]"
    >

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-16 md:flex-row md:gap-12 md:px-12 md:py-20 lg:py-24">
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

        {/* Right Content — Stat Cards */}
        <div className="relative flex-1 w-full">

          {/* Mobile & Tablet: 2×2 grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:hidden">
            {[
              { icon: Users, value: "500+", label: "Students Trained" },
              { icon: Award, value: "90%+", label: "Success Rate" },
              { icon: Clock, value: "7+", label: "Years of Experience" },
              { icon: Headphones, value: null, label: "Support", title: "Dedicated" },
            ].map(({ icon: Icon, value, label, title }, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/30 bg-white/15 p-3 text-white shadow-lg backdrop-blur-md sm:p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/15">
                    <Icon className="h-5 w-5 text-[#f5a623]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white sm:text-xl">{value ?? title}</p>
                    <p className="text-xs text-white/75">{label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Absolute floating cards */}
          <div className="relative hidden h-[500px] w-full xl:block">
            {/* 500+ Students */}
            <div className="animate-float absolute left-10 top-24 z-10 rounded-xl border border-white/30 bg-white/15 p-4 text-white shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/15">
                  <Users className="h-5 w-5 text-[#f5a623]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">500+</p>
                  <p className="text-xs text-white/75">Students Trained</p>
                </div>
              </div>
            </div>

            {/* 90%+ Success Rate */}
            <div className="animate-float-delayed absolute right-28 top-16 z-10 rounded-xl border border-white/30 bg-white/15 p-4 text-white shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/15">
                  <Award className="h-5 w-5 text-[#f5a623]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">90%+</p>
                  <p className="text-xs text-white/75">Success Rate</p>
                </div>
              </div>
            </div>

            {/* 7+ Years */}
            <div className="animate-float-slow absolute bottom-40 left-5 z-10 rounded-xl border border-white/30 bg-white/15 p-4 text-white shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/15">
                  <Clock className="h-5 w-5 text-[#f5a623]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">7+</p>
                  <p className="text-xs text-white/75">Years of Experience</p>
                </div>
              </div>
            </div>

            {/* Dedicated Support */}
            <div className="animate-float absolute bottom-44 right-28 z-10 rounded-xl border border-white/30 bg-white/15 p-4 text-white shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/15">
                  <Headphones className="h-5 w-5 text-[#f5a623]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Dedicated</p>
                  <p className="text-xs text-white/75">Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
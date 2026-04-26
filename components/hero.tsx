import Image from "next/image"
import { ArrowRight, Users, Award, Clock, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"



export function Hero() {
  return (
    <section className="relative min-h-[600px] overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* ^^^ MAIN BACKGROUND: Change 'slate-900' and 'blue-900' above to other colors like 'purple-900', 'emerald-800', or 'gray-900' */}
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt="Trading background"
          fill
          className="object-cover opacity-40"
          priority
        />
        {/* ^^^ IMAGE OPACITY: Change 'opacity-40' above to 'opacity-20' (lighter) or 'opacity-80' (darker) */}
        
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-blue-900/60 to-transparent" />
        {/* ^^^ COLOR OVERLAY: Change the '/80' (80% opacity) and '/60' (60% opacity) above to adjust the darkness */}
      </div>

      {/* Stock Chart Numbers - Decorative */}
      <div className="absolute right-20 top-20 hidden text-white/20 text-sm font-mono lg:block">
        <div>12.002</div>
        <div className="mt-8">17.002</div>
        <div className="mt-8">25.01</div>
      </div>
      <div className="absolute right-8 top-32 hidden text-white/20 text-sm font-mono lg:block">
        <div>28.002</div>
        <div className="mt-16">27.10</div>
        <div className="mt-8">07.28</div>
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-16 lg:flex-row lg:px-12 lg:py-24">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#f5a623]">
            Empowering Financial Success
          </p>
          <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Learn. Invest.
            <br />
            <span className="text-[#f5a623]">Succeed.</span>
          </h1>
          <p className="mb-8 max-w-lg text-lg text-gray-300">
            NEPSE & FX training, capital investment and advisory services to
            help you grow your wealth and achieve financial freedom.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Button className="bg-[#f5a623] px-6 py-6 text-[#0a1a2e] hover:bg-[#d4900f]">
              Explore Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="border-white bg-transparent px-6 py-6 text-white hover:bg-white/10"
            >
              Free Consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right Content - Stats Cards & Graphic */}
        <div className="relative flex-1">
          {/* Floating Stats Cards */}
          <div className="relative h-[400px] w-full lg:h-[500px]">
            {/* 500+ Students Card */}
            <div className="animate-float absolute left-0 top-0 z-10 rounded-lg bg-white p-4 shadow-xl lg:left-10 lg:top-10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0a1a2e]">
                  <Users className="h-5 w-5 text-[#f5a623]" />
                </div>
                <div>
                  <p className="text-xl font-bold text-[#0a1a2e]">500+</p>
                  <p className="text-xs text-gray-500">Students Trained</p>
                </div>
              </div>
            </div>

            {/* 90%+ Success Rate Card */}
            <div className="animate-float-delayed absolute right-0 top-5 z-10 rounded-lg bg-white p-4 shadow-xl lg:right-20 lg:top-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f5a623]">
                  <Award className="h-5 w-5 text-[#0a1a2e]" />
                </div>
                <div>
                  <p className="text-xl font-bold text-[#0a1a2e]">90%+</p>
                  <p className="text-xs text-gray-500">Success Rate</p>
                </div>
              </div>
            </div>

            {/* 3+ Years Card */}
            <div className="animate-float-slow absolute bottom-32 left-0 z-10 rounded-lg bg-white p-4 shadow-xl lg:bottom-40 lg:left-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0a1a2e]">
                  <Clock className="h-5 w-5 text-[#f5a623]" />
                </div>
                <div>
                  <p className="text-xl font-bold text-[#0a1a2e]">3+</p>
                  <p className="text-xs text-gray-500">Years of Experience</p>
                </div>
              </div>
            </div>

            {/* Dedicated Support Card */}
            <div className="animate-float absolute bottom-10 right-0 z-10 rounded-lg bg-white p-4 shadow-xl lg:bottom-48 lg:right-20">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f5a623]">
                  <Headphones className="h-5 w-5 text-[#0a1a2e]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0a1a2e]">Dedicated</p>
                  <p className="text-xs text-gray-500">Support</p>
                </div>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </section>
  )
}

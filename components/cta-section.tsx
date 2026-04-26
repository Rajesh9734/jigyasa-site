import { ArrowRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#0a1a2e] via-[#1a3a5c] to-[#0a1a2e] py-20 lg:py-28">
      {/* Decorative background elements */}
      <div className="absolute right-0 top-0 h-full w-1/3 opacity-20">
        <div className="flex h-full items-end justify-end gap-2 pr-8 pb-8">
          <div className="h-24 w-4 rounded-t bg-blue-400" />
          <div className="h-32 w-4 rounded-t bg-blue-500" />
          <div className="h-40 w-4 rounded-t bg-blue-400" />
          <div className="h-28 w-4 rounded-t bg-blue-500" />
          <div className="h-36 w-4 rounded-t bg-blue-400" />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-12 lg:px-24">
        <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
          {/* Left Content */}
          <div>
            <h2 className="mb-3 text-2xl font-bold text-white lg:text-3xl">
              Start Your Financial Journey Today!
            </h2>
            <p className="max-w-xl text-gray-300">
              Join thousands of learners who are building their future with
              knowledge and smart financial decisions.
            </p>
          </div>

          {/* Right - Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row -ml-2">
            <Button className="bg-[#f5a623] px-8 py-6 text-[#0a1a2e] hover:bg-[#d4900f]">
              Join a Class Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="border-white bg-transparent px-8 py-6 text-white hover:bg-white/10"
            >
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Decorative icon */}
        <div className="absolute -right-4 bottom-4 opacity-10 lg:right-8">
          <TrendingUp className="h-24 w-24 text-white" />
        </div>
      </div>
    </section>
  )
}

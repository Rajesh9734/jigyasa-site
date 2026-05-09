import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="border-t border-slate-200 bg-[#f8fbff] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-2xl">
            <div className="mb-4 h-1 w-16 rounded-full bg-[#FFB800]" />
            <h2 className="text-2xl font-bold tracking-tight text-[#0a1a2e] lg:text-3xl">
              Start Your Financial Journey Today
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Join thousands of learners who are building their future with
              knowledge and smart financial decisions.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild className="min-h-12 w-full rounded-md bg-[#2439A9] px-8 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1f3190] hover:text-white hover:shadow-md sm:w-auto">
              <Link href="/contact">
                Join a Class Now
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="min-h-12 w-full rounded-md border-2 border-[#2439A9] bg-white px-8 text-base font-semibold text-[#2439A9] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2439A9] hover:text-white hover:shadow-md sm:w-auto"
            >
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

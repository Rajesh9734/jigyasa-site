import Link from "next/link"
import { BookOpenCheck, CheckCircle2, Clock3, LineChart, MapPin, Monitor } from "lucide-react"
import { featuredCourse } from "@/config/course"

export function FeaturedCourse() {
  return (
    <section id="courses" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-sm font-semibold uppercase tracking-wider text-[#2563eb]">
              Featured Course
            </span>
            <div className="h-px w-12 bg-[#2563eb]" />
            <div className="h-2 w-2 rounded-full bg-[#2563eb]" />
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-base font-semibold text-[#2439A9]">
              <BookOpenCheck className="h-5 w-5" strokeWidth={1.8} />
              {featuredCourse.title}
            </div>

            <h3 className="mt-6 max-w-xl text-4xl font-bold tracking-tight text-[#0a1a2e] lg:text-4.9xl">
              Build practical confidence in the NEPSE market.
            </h3>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              {featuredCourse.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#eef4ff] text-[#2439A9]">
                    <Monitor className="h-5 w-5" strokeWidth={1.7} />
                  </div>
                  <p className="font-semibold text-[#0a1a2e]">Online Classes</p>
                </div>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  {featuredCourse.schedules
                    .filter((schedule) => schedule.type === "online")
                    .map((schedule) => (
                      <div key={schedule.label} className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4 text-slate-400" strokeWidth={1.7} />
                        <span>{schedule.time}</span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#fff7dc] text-[#a86a00]">
                    <MapPin className="h-5 w-5" strokeWidth={1.7} />
                  </div>
                  <p className="font-semibold text-[#0a1a2e]">Physical Classes</p>
                </div>
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  {featuredCourse.schedules
                    .filter((schedule) => schedule.type === "physical")
                    .map((schedule) => (
                      <div key={schedule.label} className="flex items-center gap-2">
                        <Clock3 className="h-4 w-4 text-slate-400" strokeWidth={1.7} />
                        <span>{schedule.time}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <Link
              href="/courses"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-md bg-[#2439A9] px-5 text-sm font-semibold text-white transition-all hover:bg-[#1f3190] active:translate-y-px active:scale-[0.98]"
            >
              View Course Details
            </Link>
          </div>

          <div className="rounded-lg bg-[#e9edf5] p-5 sm:p-8">
            <div className="mx-auto max-w-md rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <p className="text-sm font-semibold text-[#0a1a2e]">
                    Practical Course Plan
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    3-week guided structure
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-[#2439A9]">
                  <LineChart className="h-5 w-5" strokeWidth={1.7} />
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {featuredCourse.outcomes.map((outcome, index) => (
                  <div
                    key={outcome}
                    className="flex items-center gap-3 rounded-md bg-slate-50 px-3 py-2.5"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-[#2439A9] ring-1 ring-slate-200">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-slate-700">
                      {outcome}
                    </span>
                    <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-500" strokeWidth={1.8} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

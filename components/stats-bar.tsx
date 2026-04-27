import { GraduationCap, BookOpen, Clock, ThumbsUp } from "lucide-react"

const stats = [
  {
    icon: GraduationCap,
    value: "500+",
    label: "Students Trained",
  },
  {
    icon: BookOpen,
    value: "50+",
    label: "Courses Conducted",
  },
  {
    icon: Clock,
    value: "7+",
    label: "Years of Experience",
  },
  {
    icon: ThumbsUp,
    value: "90%+",
    label: "Student Satisfaction",
  },
]

export function StatsBar() {
  return (
    <section className="border-y border-white/10 bg-gradient-to-r from-[#0A173F] via-[#102766] to-[#0A173F] py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center justify-center gap-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                <stat.icon className="h-6 w-6 text-[#f5a623]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-slate-300">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

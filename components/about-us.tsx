import Image from "next/image"
import { Target, BarChart3, Users } from "lucide-react"

const features = [
  {
    icon: Target,
    title: "Practical Learning",
  },
  {
    icon: BarChart3,
    title: "Real Market Exposure",
  },
  {
    icon: Users,
    title: "Expert Mentorship",
  },
]

export function AboutUs() {
  return (
    <section id="about" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Left - Image */}
          <div className="relative flex-1">
            {/* Decorative dots */}
            <div className="absolute -left-4 -top-4 grid grid-cols-4 gap-2">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-gray-300"
                />
              ))}
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/images/about-trading.jpg"
                alt="Trading workspace with multiple monitors"
                width={600}
                height={400}
                className="h-auto w-full object-cover"
              />
              {/* Logo overlay */}
              <div className="absolute bottom-4 left-4 rounded bg-[#0a1a2e]/80 px-3 py-2">
                <span className="text-sm font-bold text-white">JIGYASA</span>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="flex-1">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#f5a623]">
                About Us
              </span>
              <div className="h-px w-12 bg-[#f5a623]" />
              <div className="h-2 w-2 rounded-full bg-[#f5a623]" />
            </div>
            <h2 className="mb-6 text-3xl font-bold text-[#0a1a2e] lg:text-4xl">
              Who We Are
            </h2>
            <p className="mb-8 text-gray-600 leading-relaxed">
              Jigyasa Capital Pvt. Ltd. is a financial education and investment
              company dedicated to empowering individuals with the right
              knowledge, tools and guidance to make smarter financial decisions.
            </p>

            {/* Feature Icons */}
            <div className="flex flex-wrap gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#fff8eb]">
                    <feature.icon className="h-6 w-6 text-[#f5a623]" />
                  </div>
                  <span className="text-sm font-medium text-[#0a1a2e]">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

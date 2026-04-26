import { ArrowRight, TrendingUp, DollarSign, PiggyBank, Users } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: TrendingUp,
    title: "NEPSE Classes",
    description:
      "Learn to trade and invest in the Nepal Stock Exchange with structured and practical training.",
    bgColor: "bg-[#e8f4f8]",
    iconColor: "text-[#2d8bc9]",
  },
  {
    icon: DollarSign,
    title: "FX Classes",
    description:
      "Master the foreign exchange market with professional strategies and risk management.",
    bgColor: "bg-[#fff8eb]",
    iconColor: "text-[#f5a623]",
  },
  {
    icon: PiggyBank,
    title: "Capital Investment",
    description:
      "Smart investment opportunities designed to grow your capital safely and efficiently.",
    bgColor: "bg-[#e8f4f8]",
    iconColor: "text-[#2d8bc9]",
  },
  {
    icon: Users,
    title: "Advisory Services",
    description:
      "Get expert guidance on investments, portfolio planning and market opportunities.",
    bgColor: "bg-[#fff8eb]",
    iconColor: "text-[#f5a623]",
  },
]

export function Services() {
  return (
    <section id="services" className="bg-gray-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex items-center gap-3">
            <h2 id="courses" className="text-3xl font-bold text-[#0a1a2e]">
              Our Services
            </h2>
            <div className="h-px w-8 bg-[#f5a623]" />
            <div className="h-2 w-2 rounded-full bg-[#f5a623]" />
          </div>
          <p className="text-gray-500">
            Comprehensive solutions for your financial growth
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${service.bgColor}`}
              >
                <service.icon className={`h-7 w-7 ${service.iconColor}`} />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-[#0a1a2e]">
                {service.title}
              </h3>
              <p className="mb-4 text-sm text-gray-500 leading-relaxed">
                {service.description}
              </p>
              <Link
                href="#"
                className="inline-flex items-center text-sm font-medium text-[#f5a623] transition-colors hover:text-[#d4900f]"
              >
                Learn More
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

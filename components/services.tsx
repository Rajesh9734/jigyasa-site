import { ArrowRight, LineChart, ArrowRightLeft, Landmark, Network } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: LineChart,
    title: "NEPSE Classes",
    description:
      "Learn to trade and invest in the Nepal Stock Exchange with structured and practical training.",
    bgColor: "bg-gradient-to-br from-navy/5 to-navy/10 shadow-inner ring-1 ring-inset ring-navy/5",
    iconColor: "text-navy",
  },
  {
    icon: ArrowRightLeft,
    title: "FX Classes",
    description:
      "Master the foreign exchange market with professional strategies and risk management.",
    bgColor: "bg-gradient-to-br from-blue-600/5 to-blue-600/10 shadow-inner ring-1 ring-inset ring-blue-600/10",
    iconColor: "text-blue-600",
  },
  {
    icon: Landmark,
    title: "Capital Investment",
    description:
      "Smart investment opportunities designed to grow your capital safely and efficiently.",
    bgColor: "bg-gradient-to-br from-navy/5 to-navy/10 shadow-inner ring-1 ring-inset ring-navy/5",
    iconColor: "text-navy",
  },
  {
    icon: Network,
    title: "Advisory Services",
    description:
      "Get expert guidance on investments, portfolio planning and market opportunities.",
    bgColor: "bg-gradient-to-br from-blue-600/5 to-blue-600/10 shadow-inner ring-1 ring-inset ring-blue-600/10",
    iconColor: "text-blue-600",
  },
]

export function Services() {
  return (
    <section id="services" className="bg-gray-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-sm font-semibold uppercase tracking-wider text-[#2563eb]">
                Our Services
              </span>
              <div className="h-px w-12 bg-[#2563eb]" />
              <div className="h-2 w-2 rounded-full bg-[#2563eb]" />
            </div>
            <h2 id="courses" className="text-3xl font-bold tracking-tight text-navy lg:text-4xl">
              Build your financial future
            </h2>
            <p className="mt-3 max-w-3xl text-gray-500">
              Hands-on classes and expert advisory for NEPSE traders and long term wealth builders.
            </p>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-xl bg-white p-6 shadow-sm ring-1 ring-inset ring-navy/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${service.bgColor}`}
              >
                <service.icon className={`h-7 w-7 ${service.iconColor}`} strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-[#0a1a2e]">
                {service.title}
              </h3>
              <p className="mb-4 text-sm text-gray-500 leading-relaxed">
                {service.description}
              </p>
              <Link
                href="#"
                className="inline-flex items-center text-sm font-medium text-[#2563eb] transition-colors hover:text-blue-800"
              >
                Learn More
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

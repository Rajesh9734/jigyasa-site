import { ArrowRightLeft, Landmark, LineChart, Network } from "lucide-react"

export const services = [
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

export const serviceLinks = services.map(({ title }) => ({
  label: title,
  href: "#",
}))

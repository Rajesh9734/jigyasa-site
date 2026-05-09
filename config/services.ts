import { ArrowRightLeft, LineChart, PieChart, SearchCheck } from "lucide-react"

export const services = [
  {
    icon: LineChart,
    title: "NEPSE Practical Classes",
    summary:
      "Practical NEPSE training focused on charts, market basics, technical analysis, and risk management.",
    description:
      "Learn how to analyze the Nepal Stock Exchange through practical, chart-based training. Covers market basics, technical analysis, stock filtering, risk management, and trading psychology.",
    highlights: ["Chart-based sessions", "Risk management basics", "Stock filtering practice"],
    bgColor: "bg-gradient-to-br from-navy/5 to-navy/10 shadow-inner ring-1 ring-inset ring-navy/5",
    iconColor: "text-navy",
  },
  {
    icon: ArrowRightLeft,
    title: "Prop Firm Evaluation Training",
    summary:
      "Structured education on global market concepts, evaluation rules, risk control, and disciplined execution.",
    description:
      "Understand global market concepts and prop firm evaluation models through structured education focused on technical analysis, risk management, trading psychology, challenge rules, and disciplined execution.",
    highlights: ["Evaluation rule breakdowns", "Risk-controlled execution", "Trading psychology"],
    bgColor: "bg-gradient-to-br from-blue-600/5 to-blue-600/10 shadow-inner ring-1 ring-inset ring-blue-600/10",
    iconColor: "text-blue-600",
  },
  {
    icon: PieChart,
    title: "Portfolio Guidance & Investor Education",
    summary:
      "Educational guidance on portfolio structure, risk awareness, capital allocation, and long-term planning.",
    description:
      "Get educational guidance on portfolio structure, risk awareness, capital allocation concepts, and long-term investment planning. We do not manage funds on behalf of clients.",
    highlights: ["Portfolio structure", "Capital allocation concepts", "Long-term planning"],
    bgColor: "bg-gradient-to-br from-navy/5 to-navy/10 shadow-inner ring-1 ring-inset ring-navy/5",
    iconColor: "text-navy",
  },
  {
    icon: SearchCheck,
    title: "Market Research & Learning Support",
    summary:
      "Research-based learning support for market trends, sector movement, and stock behavior.",
    description:
      "Access research-based learning support to understand market trends, sector movement, stock behavior, and investment opportunities for educational decision-making.",
    highlights: ["Market trend context", "Sector movement review", "Stock behavior study"],
    bgColor: "bg-gradient-to-br from-blue-600/5 to-blue-600/10 shadow-inner ring-1 ring-inset ring-blue-600/10",
    iconColor: "text-blue-600",
  },
]

export const serviceLinks = services.map(({ title }) => ({
  label: title,
  href: "#",
}))

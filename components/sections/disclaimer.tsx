import { FileCheck2 } from "lucide-react"

export function Disclaimer() {
  return (
    <section className="border-b border-white/12 bg-[#07183A] py-8 text-white">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-start">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/7 text-white ring-1 ring-white/15">
            <FileCheck2 className="h-6 w-6" strokeWidth={1.7} />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">
              Disclaimer
            </h2>
            <p className="mt-2 max-w-5xl text-sm leading-7 text-white/72">
              Jigyasa Capital provides financial market education, research-based learning support, and skill-development training only. We do not provide investment guarantees, portfolio management services, or direct trading services. Prop firm-related training is provided for educational and evaluation-preparation purposes only.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

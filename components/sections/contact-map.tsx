import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactMap() {
  return (
    <section id="contact" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#2563eb]">
            Contact Us
          </span>
          <div className="h-px w-12 bg-[#2563eb]" />
          <div className="h-2 w-2 rounded-full bg-[#2563eb]" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-stretch">
          <div className="rounded-2xl border border-[#dbe5ff] bg-[#f8fbff] p-6 shadow-sm lg:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2563eb]">
              Get in touch
            </p>
            <h3 className="mt-2 text-2xl font-bold leading-tight text-[#0a1a2e] lg:text-3xl">
              Book a class or ask us anything
            </h3>

            <form className="mt-8 space-y-4" noValidate>
              <Input
                type="text"
                placeholder="Full name"
                className="h-11 border-slate-300 bg-white text-[#0a1a2e] placeholder:text-slate-500 focus-visible:border-[#2563eb] focus-visible:ring-[#2563eb]/30"
              />
              <Input
                type="tel"
                placeholder="Number"
                className="h-11 border-slate-300 bg-white text-[#0a1a2e] placeholder:text-slate-500 focus-visible:border-[#2563eb] focus-visible:ring-[#2563eb]/30"
              />
              <Input
                type="email"
                placeholder="Email"
                className="h-11 border-slate-300 bg-white text-[#0a1a2e] placeholder:text-slate-500 focus-visible:border-[#2563eb] focus-visible:ring-[#2563eb]/30"
              />
              <Textarea
                placeholder="Message"
                className="min-h-32 border-slate-300 bg-white text-[#0a1a2e] placeholder:text-slate-500 focus-visible:border-[#2563eb] focus-visible:ring-[#2563eb]/30"
              />

              <Button
                type="button"
                className="w-full rounded-md bg-[#2439A9] py-5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#2439A9] hover:text-white"
              >
                Send Message
              </Button>
            </form>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <iframe
              title="Jigyasa Capital location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.103051322673!2d85.34140277507979!3d27.68320967619641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb192cd37f3db5%3A0x5299f050595aa37!2sJigyasa%20Capital%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1777352130849!5m2!1sen!2snp"
              className="h-[360px] w-full border-0 md:h-[420px] lg:h-full lg:min-h-[520px]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

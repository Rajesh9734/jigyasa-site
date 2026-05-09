"use client"

import type { ChangeEvent, FormEvent } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { siteConfig } from "@/config/site"

type ContactFormData = {
  name: string
  phone: string
  email: string
  message: string
}

type SubmitStatus = "idle" | "loading" | "success" | "error"

const initialFormData: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  message: "",
}

export function ContactMap() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [status, setStatus] = useState<SubmitStatus>("idle")

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))

    if (status !== "idle") {
      setStatus("idle")
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch(siteConfig.contactEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        setStatus("error")
        return
      }

      setFormData(initialFormData)
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

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

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Full name"
                className="h-11 border-slate-300 bg-white text-[#0a1a2e] placeholder:text-slate-500 focus-visible:border-[#2563eb] focus-visible:ring-[#2563eb]/30"
                required
              />
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="Number"
                className="h-11 border-slate-300 bg-white text-[#0a1a2e] placeholder:text-slate-500 focus-visible:border-[#2563eb] focus-visible:ring-[#2563eb]/30"
              />
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Email"
                className="h-11 border-slate-300 bg-white text-[#0a1a2e] placeholder:text-slate-500 focus-visible:border-[#2563eb] focus-visible:ring-[#2563eb]/30"
                required
              />
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className="min-h-32 border-slate-300 bg-white text-[#0a1a2e] placeholder:text-slate-500 focus-visible:border-[#2563eb] focus-visible:ring-[#2563eb]/30"
                required
              />

              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-md bg-[#2439A9] py-5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#2439A9] hover:text-white disabled:bg-blue-400"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>

              <div aria-live="polite">
                {status === "success" && (
                  <p className="text-center text-sm font-medium text-green-600">
                    Message sent successfully!
                  </p>
                )}
                {status === "error" && (
                  <p className="text-center text-sm font-medium text-red-600">
                    Failed to send message. Please try again.
                  </p>
                )}
              </div>
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

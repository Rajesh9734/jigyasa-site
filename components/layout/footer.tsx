import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone } from "lucide-react"
import { footerQuickLinks } from "@/config/navigation"
import { serviceLinks } from "@/config/services"
import { logo, siteConfig } from "@/config/site"
import { socialLinks } from "@/config/social-links"
import { SocialIcon } from "@/components/shared/social-icon"

export function Footer() {
  return (
    <footer className="bg-[#08143A] pb-8 pt-14 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 grid gap-12 lg:grid-cols-[1.15fr_1fr_1.35fr_1.1fr]">
          <div>
            <Link href="/" className="mb-7 flex items-center gap-3">
              <div className="flex items-center">
                <Image
                  src={logo.default}
                  alt="Jigyasa Capital Logo"
                  width={58}
                  height={58}
                  className="h-14 w-14 object-contain"
                />
                <div className="ml-2 flex flex-col">
                  <span className="text-2xl font-bold leading-tight text-gold">
                    JIGYASA
                  </span>
                  <span className="block text-center text-sm font-semibold tracking-wider text-[#60a5fa]">
                    CAPITAL
                  </span>
                </div>
              </div>
            </Link>
            <div className="ml-3 mt-8 flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white/72 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FFB800]/45 hover:bg-white/12 hover:text-white"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon platform={social.platform} className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-1">
            <h3 className="mb-3.5 text-base font-semibold leading-6">Quick Links</h3>
            <ul className="space-y-1.5">
              {footerQuickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm leading-5 text-slate-300 transition-colors hover:text-[#f5a623]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-1">
            <h3 className="mb-3.5 text-base font-semibold leading-6">Services</h3>
            <ul className="space-y-1.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm leading-5 text-slate-300 transition-colors hover:text-[#f5a623]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-1">
            <h3 className="mb-5 text-base font-semibold leading-6">Contact Us</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3.5">
                <Phone className="mt-0.5 h-4 w-4 text-[#f5a623]" />
                <span className="text-sm leading-6 text-white/68">
                  {siteConfig.displayPhone}
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <Mail className="mt-0.5 h-4 w-4 text-[#f5a623]" />
                <span className="text-sm leading-6 text-white/68">
                  {siteConfig.email}
                </span>
              </li>
              <li className="flex items-start gap-3.5">
                <MapPin className="mt-0.5 h-4 w-4 text-[#f5a623]" />
                <span className="text-sm leading-6 text-white/68">
                  {siteConfig.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-400 lg:flex-row">
            <p>&copy; 2026 Jigyasa Capital Pvt. Ltd. All Rights Reserved.</p>
            <div className="flex gap-8">
              <Link href="#" className="transition-colors hover:text-[#f5a623]">
                Privacy Policy
              </Link>
              <Link href="#" className="transition-colors hover:text-[#f5a623]">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

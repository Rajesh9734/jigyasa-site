import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Linkedin, Phone, Mail, MapPin } from "lucide-react"

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
]

const servicesLinks = [
  { label: "NEPSE Classes", href: "#" },
  { label: "FX Classes", href: "#" },
  { label: "Capital Investment", href: "#" },
  { label: "Advisory Services", href: "#" },
]

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="bg-[#0a1a2e] pt-16 pb-8 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 grid gap-12 lg:grid-cols-4">
          {/* Logo & Description */}
          <div>
            <Link href="/" className="mb-6 flex items-center gap-2">
              <div className="flex items-center">
                <Image
                  src="/images/logo-transparent.png"
                  alt="Jigyasa Capital Logo"
                  width={50}
                  height={50}
                  className="h-12 w-12 object-contain"
                />
                <div className="ml-2 flex flex-col">
                  <span className="text-lg font-bold leading-tight text-[#f5a623]">
                    JIGYASA
                  </span>
                  <span className="text-[9px] font-semibold tracking-wider text-[#60a5fa]">
                    CAPITAL
                  </span>
                  <span className="text-[7px] text-gray-400">
                    Empowering Financial Success
                  </span>
                </div>
              </div>
            </Link>
            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a3a5c] text-gray-400 transition-colors hover:bg-[#f5a623] hover:text-[#0a1a2e]"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#f5a623]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Services</h3>
            <ul className="space-y-3">
              {servicesLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#f5a623]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-6 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#f5a623]" />
                <span className="text-sm text-gray-400">+977 9800000000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#f5a623]" />
                <span className="text-sm text-gray-400">
                  info@jigyasacapital.com
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[#f5a623]" />
                <span className="text-sm text-gray-400">Kathmandu, Nepal</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-500 lg:flex-row">
            <p>&copy; 2026 Jigyasa Capital Pvt. Ltd. All Rights Reserved.</p>
            <div className="flex gap-6">
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

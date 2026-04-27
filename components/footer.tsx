import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Linkedin, Phone, Mail, MapPin } from "lucide-react"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about" },
  { label: "Courses", href: "/#courses" },
  { label: "Services", href: "/#services" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact", href: "/#contact" },
]

const servicesLinks = [
  { label: "NEPSE Classes", href: "#" },
  { label: "FX Classes", href: "#" },
  { label: "Capital Investment", href: "#" },
  { label: "Advisory Services", href: "#" },
]

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/share/1CLkvoeRTB/", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/technicalanalyst123?igsh=MWFsM2p1c2thZXNnNA==", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@narayanchapagain5417?si=Jujuc0WYSvWHVrsE", label: "YouTube" },
  { icon: Linkedin, href: "https://www.tiktok.com/@technicalanalyst123?_r=1&_t=ZS-95r4q4MdsRB", label: "TikTok" },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#08143A] pt-16 pb-8 text-white">
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
                  <span className="text-xl font-bold leading-tight text-gold">
                    JIGYASA
                  </span>
                  <span className="block text-center text-xs font-semibold tracking-wider text-[#60a5fa]">
                    CAPITAL
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
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-300 transition-colors hover:bg-[#f5a623] hover:text-[#0a1a2e]"
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
                    className="text-sm text-slate-300 transition-colors hover:text-[#f5a623]"
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
                    className="text-sm text-slate-300 transition-colors hover:text-[#f5a623]"
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
                <span className="text-sm text-slate-300">+977 9800000000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#f5a623]" />
                <span className="text-sm text-slate-300">
                  info@jigyasacapital.com
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[#f5a623]" />
                <span className="text-sm text-slate-300">Kathmandu, Nepal</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-400 lg:flex-row">
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

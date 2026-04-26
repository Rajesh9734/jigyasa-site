"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Courses", href: "#courses" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
]

// Map each nav href to the actual section-level element ID used for scroll detection.
// "courses" is an h2 inside the "services" section, so both map to "services".
const hrefToSectionId: Record<string, string> = {
  "#services": "services",
  "#courses": "services",
  "#about": "about",
  "#contact": "contact",
}

// When scroll is inside a given section, which nav href should be active?
// This resolves the ambiguity where multiple nav items map to the same section.
const sectionIdToActiveHref: Record<string, string> = {
  services: "#services",
  about: "#about",
  contact: "#contact",
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [clickedHref, setClickedHref] = useState<string | null>(null)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50)

    // Determine active section based on scroll position
    const scrollPosition = window.scrollY + 120 // offset for header height

    // Check only real page sections (deepest first so they take priority)
    const sectionIds = ["contact", "about", "services"]
    let found = false

    for (const sectionId of sectionIds) {
      const element = document.getElementById(sectionId)
      if (element) {
        const rect = element.getBoundingClientRect()
        const top = window.scrollY + rect.top
        const height = rect.height
        if (scrollPosition >= top && scrollPosition < top + height) {
          // If user explicitly clicked a nav item that maps to this section,
          // keep that one highlighted (e.g. "Courses" within the "services" section)
          if (clickedHref && hrefToSectionId[clickedHref] === sectionId) {
            setActiveSection(clickedHref)
          } else {
            setActiveSection(sectionIdToActiveHref[sectionId] || "")
          }
          found = true
          break
        }
      }
    }

    if (!found) {
      if (window.scrollY < 100) {
        setActiveSection("#")
      } else {
        setActiveSection("")
      }
    }
  }, [clickedHref])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    handleScroll() // Run on mount
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // Clear the clickedHref after user scrolls away from that section
  useEffect(() => {
    if (!clickedHref) return
    const mappedSection = hrefToSectionId[clickedHref]
    if (!mappedSection) return

    const checkIfScrolledAway = () => {
      const element = document.getElementById(mappedSection)
      if (!element) return
      const rect = element.getBoundingClientRect()
      const top = window.scrollY + rect.top
      const height = rect.height
      const scrollPosition = window.scrollY + 120
      if (scrollPosition < top || scrollPosition >= top + height) {
        setClickedHref(null)
      }
    }

    window.addEventListener("scroll", checkIfScrolledAway)
    return () => window.removeEventListener("scroll", checkIfScrolledAway)
  }, [clickedHref])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const handleNavClick = (href: string) => {
    setClickedHref(href)
    setMobileMenuOpen(false)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/75 shadow-md backdrop-blur-md"
          : "bg-white shadow-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 md:h-16 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <Image
              src="/images/logo-transparent.png"
              alt="Jigyasa Capital Logo"
              width={50}
              height={50}
              className="h-12 w-12 object-contain"
            />
            <div className="ml-2 flex flex-col">
              <span className="text-xl font-bold leading-tight text-[#f5a623]">
                JIGYASA
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-[#2563eb]">
                CAPITAL
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop / Tablet Navigation (visible at md: 768px+) */}
        <nav className="hidden flex-1 items-center justify-center gap-4 text-xs md:flex md:gap-6 lg:gap-20 lg:text-sm">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => handleNavClick(item.href)}
              className={`font-medium transition-colors hover:text-[#2563eb] ${
                activeSection === item.href ? "text-[#2563eb]" : "text-[#0a1a2e]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Button (visible at md: 768px+) */}
        <Button className="hidden bg-[#f5a623] px-4 text-xs font-semibold text-[#0a1a2e] border border-[#f5a623]/30 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-[#f5a623] hover:text-[#0a1a2e] md:flex md:rounded-full lg:px-6 lg:text-sm">
          Join Class
        </Button>

        {/* Mobile Hamburger Button (visible below md: 768px) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg text-[#0a1a2e] transition-colors hover:bg-gray-100 md:hidden"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className="relative h-5 w-5">
            <Menu
              className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                mobileMenuOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
              }`}
            />
            <X
              className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                mobileMenuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay (only below md) */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel (only below md) */}
      <div
        className={`fixed right-0 top-0 z-40 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col pt-20 px-6">
          {/* Nav Items */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`rounded-lg px-4 py-3 text-base font-medium transition-all duration-200 ${
                  activeSection === item.href
                    ? "bg-[#e8f0fe] text-[#2563eb]"
                    : "text-[#0a1a2e] hover:bg-gray-50 hover:text-[#2563eb]"
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="my-6 h-px bg-gray-200" />

          {/* Mobile CTA Button */}
          <Button className="w-full rounded-full bg-[#f5a623] px-6 py-3 text-sm font-semibold text-[#0a1a2e] border border-[#f5a623]/30 shadow-sm transition-all duration-300 hover:bg-[#e5a600]">
            Join Class
          </Button>
        </div>
      </div>
    </header>
  )
}

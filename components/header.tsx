"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
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
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [isOverHero, setIsOverHero] = useState(pathname === "/")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [clickedHref, setClickedHref] = useState<string | null>(null)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50)

    let isCurrentlyOverHero = false
    const heroSection = document.getElementById("hero")
    if (pathname === "/" && heroSection) {
      const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
      const headerHeight = 72
      isCurrentlyOverHero = window.scrollY + headerHeight < heroBottom
    }
    setIsOverHero(isCurrentlyOverHero)

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
      if (isCurrentlyOverHero || window.scrollY < 100) {
        setActiveSection("#")
      } else {
        setActiveSection("")
      }
    }
  }, [clickedHref, pathname])

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

  const resolveNavHref = (href: string) => {
    if (pathname === "/") return href
    if (href === "#") return "/"
    return `/${href}`
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
        isOverHero
          ? "border-white/0 bg-white/[0.06] shadow-md backdrop-blur-md"
          : scrolled
            ? "border-slate-200 bg-white/85 shadow-md backdrop-blur-md"
            : "border-slate-100 bg-white shadow-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 md:h-16 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center">
            <Image
              src={isOverHero ? "/images/jigyasa_logo_white.png" : "/images/logo-transparent.png"}
              alt="Jigyasa Capital Logo"
              width={50}
              height={50}
              className="h-12 w-12 object-contain"
            />
            <div className="ml-2 flex flex-col">
              <span className="text-xl font-bold leading-tight text-[#f5a623]">
                JIGYASA
              </span>
              <span
                className={`block text-center text-[12px] font-semibold tracking-wider ${
                  isOverHero ? "text-white/85" : "text-[#2563eb]"
                }`}
              >
                CAPITAL
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop / Tablet Navigation (visible at md: 768px+) */}
        <nav className="hidden flex-1 items-center justify-start ml-6 gap-4 text-xs md:flex md:ml-8 md:gap-6 lg:ml-25 lg:gap-12 lg:text-sm">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={resolveNavHref(item.href)}
              onClick={() => handleNavClick(item.href)}
              className={`font-medium transition-colors ${
                isOverHero
                  ? "text-white/85 hover:text-[#ffd166]"
                  : "text-[#0a1a2e] hover:text-[#2439A9]"
              } ${
                activeSection === item.href
                  ? isOverHero
                    ? "text-[#ffd166]"
                    : "text-[#2439A9]"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Button (visible at md: 768px+) */}
        <Button
          asChild
          className={`hidden px-4 text-xs font-semibold  transition-all duration-300 md:flex md:rounded-md lg:px-6 lg:text-sm ${
            isOverHero
              ? "bg-[#ffffff] text-[#1a1a1a] shadow-sm hover:scale-105 hover:bg-[#ffffff] hover:text-[#0a1a2e]"
              : "bg-[#2439A9] text-white hover:bg-[#2439A9] hover:text-white border-0 shadow-sm hover:scale-105"
          }`}
        >
          <Link href="/contact">Join Class</Link>
        </Button>

        {/* Mobile Hamburger Button (visible below md: 768px) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`relative z-50 flex h-10 w-10 items-center justify-center rounded-lg transition-colors md:hidden ${
            isOverHero
              ? "text-white hover:bg-white/10"
              : "text-[#0a1a2e] hover:bg-gray-100"
          }`}
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
                href={resolveNavHref(item.href)}
                onClick={() => handleNavClick(item.href)}
                className={`rounded-lg px-4 py-3 text-base font-medium transition-all duration-200 ${
                  activeSection === item.href
                    ? "bg-amber-50 text-[#c98700]"
                    : "text-[#0a1a2e] hover:bg-gray-50 hover:text-[#c98700]"
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
          <Button
            asChild
            className={`w-full rounded-full px-6 py-3 text-sm font-semibold border shadow-sm transition-all duration-300 ${
              isOverHero
                ? "bg-[#f5a623] text-[#0a1a2e] border-[#f5a623]/30 hover:bg-[#e5a600]"
                : "bg-[#0ea5ff] text-white border-transparent hover:bg-[#0ea5ff]"
            }`}
          >
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              Join Class
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

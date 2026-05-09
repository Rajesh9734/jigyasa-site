"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Download, Mail, Menu, Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  hrefToSectionId,
  navItems,
  sectionIdToActiveHref,
} from "@/config/navigation"
import { logo, siteConfig } from "@/config/site"

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>
}

declare global {
  interface Window {
    __jigyasaInstallPrompt?: BeforeInstallPromptEvent | null
    __jigyasaCanInstall?: boolean
  }
}

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [isOverHero, setIsOverHero] = useState(pathname === "/")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [canInstallApp, setCanInstallApp] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [clickedHref, setClickedHref] = useState<string | null>(null)

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50)

    if (pathname === "/courses") {
      setActiveSection("/courses")
      setIsOverHero(false)
      return
    }

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
    const sectionIds = ["contact", "courses", "about", "services"]
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

  useEffect(() => {
    if (pathname === "/courses") {
      setActiveSection("/courses")
    }
  }, [pathname])

  useEffect(() => {
    const isStandalone = () =>
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator &&
        (navigator as Navigator & { standalone?: boolean }).standalone === true)

    const syncInstallPrompt = () => {
      const prompt = window.__jigyasaInstallPrompt || null
      setInstallPrompt(prompt)
      setCanInstallApp(Boolean(prompt && !isStandalone()))
    }

    syncInstallPrompt()

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()

      if (!isStandalone()) {
        window.__jigyasaInstallPrompt = event as BeforeInstallPromptEvent
        window.__jigyasaCanInstall = true
        setInstallPrompt(window.__jigyasaInstallPrompt)
        setCanInstallApp(true)
      }
    }

    const handleAppInstalled = () => {
      window.__jigyasaInstallPrompt = null
      window.__jigyasaCanInstall = false
      setInstallPrompt(null)
      setCanInstallApp(false)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)
    window.addEventListener("jigyasa-install-available", syncInstallPrompt)
    window.addEventListener("jigyasa-install-installed", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
      window.removeEventListener("jigyasa-install-available", syncInstallPrompt)
      window.removeEventListener("jigyasa-install-installed", handleAppInstalled)
    }
  }, [])

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

  const handleInstallApp = async () => {
    const prompt = installPrompt || window.__jigyasaInstallPrompt || null

    if (!prompt) {
      return
    }

    await prompt.prompt()
    await prompt.userChoice
    window.__jigyasaInstallPrompt = null
    window.__jigyasaCanInstall = false
    setInstallPrompt(null)
    setCanInstallApp(false)
    setMobileMenuOpen(false)
  }

  const resolveNavHref = (href: string) => {
    if (href.startsWith("/")) return href
    if (pathname === "/") return href
    if (href === "#") return "/"
    return `/${href}`
  }

  const useLightHeader = !mobileMenuOpen && isOverHero
  const headerLogo = useLightHeader ? logo.light : logo.default

  return (
    <>
    <header
      className={`fixed top-0 w-full border-b transition-all duration-300 ${
        mobileMenuOpen ? "z-[70]" : "z-50"
      } ${
        mobileMenuOpen
          ? "border-slate-200 bg-[#f8fbff] shadow-sm"
          : isOverHero
          ? "border-white/0 bg-white/[0.06] shadow-sm shadow-black/20 backdrop-blur-md"
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
              src={headerLogo}
              alt="Jigyasa Capital Logo"
              width={50}
              height={50}
              className="h-12 w-12 object-contain"
            />
            <div className="ml-2 flex flex-col">
              <span
                className={`text-xl font-bold leading-tight ${
                  useLightHeader ? "text-[#FFB800]" : "text-[#2439A9]"
                }`}
              >
                JIGYASA
              </span>
              <span
                className={`block text-center text-[12px] font-semibold tracking-wider ${
                  useLightHeader ? "text-white/85" : "text-[#2563eb]"
                }`}
              >
                CAPITAL
              </span>
            </div>
          </div>
          <span
            className={`rounded-full border px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide ${
              useLightHeader
                ? "border-white/30 bg-white/10 text-white/85"
                : "border-blue-100 bg-blue-50 text-[#2439A9]"
            }`}
            aria-label="Website beta"
            title="Website beta"
          >
            Beta
          </span>
        </Link>

        {/* Desktop / Tablet Navigation (visible at md: 768px+) */}
        <nav className="hidden flex-1 items-center justify-start ml-6 gap-4 text-xs md:flex md:ml-8 md:gap-6 lg:ml-25 lg:gap-12 lg:text-sm">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={resolveNavHref(item.href)}
              onClick={() => handleNavClick(item.href)}
              className={`font-medium transition-colors ${
                useLightHeader
                  ? "text-white/85 hover:text-[#ffd166]"
                  : "text-[#0a1a2e] hover:text-[#2439A9]"
              } ${
                activeSection === item.href
                  ? useLightHeader
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
            useLightHeader
              ? "bg-[#ffffff] text-[#1a1a1a] shadow-sm hover:-translate-y-0.5 hover:bg-[#ffffff] hover:text-[#0a1a2e] hover:shadow-md"
              : "bg-[#2439A9] text-white hover:-translate-y-0.5 hover:bg-[#1f3190] hover:text-white border-0 shadow-sm hover:shadow-md"
          }`}
        >
          <Link href="/contact">Join Class</Link>
        </Button>

        {/* Mobile Hamburger Button (visible below md: 768px) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`relative z-50 flex h-10 w-10 touch-manipulation items-center justify-center rounded-lg transition-colors md:hidden ${
            mobileMenuOpen
              ? "text-[#0a1a2e] hover:bg-gray-100"
              : isOverHero
                ? "text-white hover:bg-white/10"
                : "text-[#0a1a2e] hover:bg-gray-100"
          }`}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-controls="mobile-menu"
          aria-expanded={mobileMenuOpen}
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
    </header>

      {/* Mobile Full-Screen Menu (only below md) */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-[65px] z-[60] bg-[#f8fbff] transition-all duration-300 md:hidden ${
          mobileMenuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex h-full flex-col overflow-y-auto px-5 py-7">
          <nav className="flex flex-col gap-2">
            <p className="px-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Menu
            </p>
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={resolveNavHref(item.href)}
                onClick={() => handleNavClick(item.href)}
                className={`relative touch-manipulation rounded-md px-4 py-3.5 text-base font-semibold transition-all duration-200 ${
                  activeSection === item.href
                    ? "bg-blue-50 pl-5 text-[#2439A9] before:absolute before:left-0 before:top-3 before:h-6 before:w-1 before:rounded-full before:bg-[#2439A9]"
                    : "text-[#0a1a2e] hover:bg-white hover:text-[#2439A9]"
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <Button
              asChild
              className="h-12 w-full rounded-md border border-transparent bg-[#2439A9] px-6 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#1f3190] hover:text-white"
            >
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                Join Class
              </Link>
            </Button>
            <Button
              type="button"
              onClick={handleInstallApp}
              className="mt-3 h-12 w-full rounded-md border border-slate-200 bg-white px-6 text-sm font-semibold text-[#2439A9] shadow-sm transition-all duration-300 hover:bg-blue-50 hover:text-[#2439A9]"
            >
              <Download className="h-4 w-4" strokeWidth={1.8} />
              Install App
            </Button>
          </div>

          <div className="mt-auto border-t border-slate-200 pt-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Contact
            </p>
            <div className="space-y-3 text-sm font-medium text-slate-700">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-3 transition-colors hover:text-[#2439A9]"
              >
                <Phone className="h-4 w-4 text-[#2439A9]" strokeWidth={1.8} />
                {siteConfig.displayPhone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 transition-colors hover:text-[#2439A9]"
              >
                <Mail className="h-4 w-4 text-[#2439A9]" strokeWidth={1.8} />
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

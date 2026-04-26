"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Home", href: "#", active: true },
  { label: "Services", href: "#services" },
  { label: "Courses", href: "#courses" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/75 shadow-md backdrop-blur-md"
          : "bg-white shadow-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2 lg:h-16 lg:flex-row lg:items-center lg:justify-between lg:px-8">
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

        {/* Navigation */}
        <nav className="flex flex-1 flex-wrap items-center justify-center gap-4 text-xs sm:text-sm lg:gap-20">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`font-medium transition-colors hover:text-[#f5a623] ${
                item.active ? "text-[#f5a623]" : "text-[#0a1a2e]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Button className="hidden bg-[#0a1a2e] text-white hover:bg-[#1a2a3e] lg:flex">
          <User className="mr-2 h-4 w-4" />
          Join Class
        </Button>
      </div>
    </header>
  )
}

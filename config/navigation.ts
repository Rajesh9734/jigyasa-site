export const navItems = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Courses", href: "#courses" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export const footerQuickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/#about" },
  { label: "Courses", href: "/#courses" },
  { label: "Services", href: "/#services" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact", href: "/#contact" },
]

export const hrefToSectionId: Record<string, string> = {
  "#services": "services",
  "#courses": "services",
  "#about": "about",
  "#contact": "contact",
}

export const sectionIdToActiveHref: Record<string, string> = {
  services: "#services",
  about: "#about",
  contact: "#contact",
}

import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react"

export const socialLinks = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/share/1CLkvoeRTB/",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/technicalanalyst123?igsh=MWFsM2p1c2thZXNnNA==",
    label: "Instagram",
  },
  {
    icon: Youtube,
    href: "https://youtube.com/@narayanchapagain5417?si=Jujuc0WYSvWHVrsE",
    label: "YouTube",
  },
  {
    icon: Linkedin,
    href: "https://www.tiktok.com/@technicalanalyst123?_r=1&_t=ZS-95r4q4MdsRB",
    label: "TikTok",
  },
]

export const sameAsLinks = socialLinks.map((link) => link.href)

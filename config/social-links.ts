export const socialLinks = [
  {
    platform: "facebook",
    href: "https://www.facebook.com/share/1CLkvoeRTB/",
    label: "Facebook",
  },
  {
    platform: "instagram",
    href: "https://www.instagram.com/technicalanalyst123?igsh=MWFsM2p1c2thZXNnNA==",
    label: "Instagram",
  },
  {
    platform: "youtube",
    href: "https://youtube.com/@narayanchapagain5417?si=Jujuc0WYSvWHVrsE",
    label: "YouTube",
  },
  {
    platform: "tiktok",
    href: "https://www.tiktok.com/@jigyasacapital123?is_from_webapp=1&sender_device=pc",
    label: "TikTok",
  },
] as const

export const sameAsLinks = socialLinks.map((link) => link.href)

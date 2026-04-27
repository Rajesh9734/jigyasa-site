import Image from "next/image"

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/9779805673250"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-4 right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_10px_28px_rgba(0,0,0,0.2)] ring-1 ring-slate-200 transition-transform duration-300 hover:scale-105 md:bottom-5 md:right-5"
    >
      <Image
        src="/images/whatsapp_logo.png"
        alt="WhatsApp"
        width={38}
        height={38}
        className="h-9 w-9 object-contain"
      />
    </a>
  )
}
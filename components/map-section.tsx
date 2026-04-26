export function MapSection() {
  return (
    <section id="contact" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <h2 className="text-3xl font-bold text-[#0a1a2e]">Our Location</h2>
          <div className="h-px w-8 bg-[#f5a623]" />
          <div className="h-2 w-2 rounded-full bg-[#f5a623]" />
        </div>
        <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
          <iframe
            title="Jigyasa Capital location"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d883.2742299966611!2d85.3432856695698!3d27.6833991985123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjfCsDQxJzAwLjIiTiA4NcKwMjAnMzguMiJF!5e0!3m2!1sen!2snp!4v1777047359189!5m2!1sen!2snp"
            className="h-[320px] w-full border-0 lg:h-[420px]"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}

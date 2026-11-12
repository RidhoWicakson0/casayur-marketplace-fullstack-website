import { Truck, ShieldCheck, Headphones, Repeat } from "lucide-react"

const services = [
  {
    title: "Radius 20 KM",
    description: "Pengiriman cepat menjangkau hingga 20 km dari outlet utama.",
    icon: Truck,
  },
  {
    title: "Jam Operasional PO",
    description: "Sistem Preorder otomatis aktif setiap hari pukul 09.00 - 12.00.",
    icon: ShieldCheck,
  },
  {
    title: "Verifikasi WA / COD",
    description: "Pilihan bayar di tempat (COD) yang aman via WhatsApp.",
    icon: Headphones,
  },
  {
    title: "Gratis Ongkir",
    description: "Nikmati pengiriman tanpa biaya tambahan untuk area tertentu.",
    icon: Repeat,
  },
]

export function ServiceBento() {
  return (
    <section id="layanan" className="py-16 w-full">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col mb-10">
          <p className="text-sm uppercase tracking-wider text-emerald-600 font-bold">Layanan Kami</p>
          <h2 className="mt-2 text-3xl lg:text-4xl tracking-tight text-slate-900 dark:text-white font-extrabold">
            Solusi Kebutuhan Harian Anda
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <service.icon className="w-5 h-5" />
              </div>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

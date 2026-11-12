"use client"

import React, { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  { testimonial: "Sayur selalu segar dan pengiriman sangat cepat.", by: "Pelanggan Casayur", imgSrc: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=120&h=160&fit=crop" },
  { testimonial: "Layanan preorder membantu saya mengatur kebutuhan dapur.", by: "Pelanggan Casayur", imgSrc: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&h=160&fit=crop" },
  { testimonial: "Kualitas produk sesuai pesanan dan dikemas rapi.", by: "Pelanggan Casayur", imgSrc: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=120&h=160&fit=crop" },
  { testimonial: "Gratis ongkir sangat membantu belanja rutin.", by: "Pelanggan Casayur", imgSrc: "https://images.unsplash.com/photo-1540420773420-3365f57f5c7f?w=120&h=160&fit=crop" },
  { testimonial: "Pesanan datang tepat waktu dan produknya segar.", by: "Pelanggan Casayur", imgSrc: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=120&h=160&fit=crop" },
]

export function StaggerTestimonials() {
  const [cardSize, setCardSize] = useState(210)
  const [items, setItems] = useState(testimonials)

  useEffect(() => {
    const updateSize = () => setCardSize(window.matchMedia("(min-width: 640px)").matches ? 260 : 210)
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  const move = (steps: number) => {
    setItems((current) => {
      const next = [...current]
      if (steps > 0) {
        for (let i = 0; i < steps; i++) {
          const item = next.shift()!
          next.push(item)
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = next.pop()!
          next.unshift(item)
        }
      }
      return next
    })
  }

  return (
    <div className="relative h-[440px] w-full overflow-hidden bg-slate-50/70 dark:bg-slate-950/70">
      {items.map((item, index) => {
        const position = index - Math.floor(items.length / 2)
        const center = position === 0
        return (
          <article
            key={`${item.by}-${index}`}
            onClick={() => move(position)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") move(position)
            }}
            role="button"
            tabIndex={0}
            className={cn(
              "absolute left-1/2 top-1/2 cursor-pointer p-7 transition-all duration-500 ease-in-out",
              center ? "z-10 bg-emerald-600 text-white shadow-xl" : "z-0 bg-white/90 text-slate-800 shadow-md dark:bg-slate-900/90 dark:text-slate-100"
            )}
            style={{
              width: cardSize,
              height: cardSize,
              transform: `translate(-50%, -50%) translateX(${(cardSize / 1.45) * position}px) translateY(${center ? -28 : position % 2 ? 8 : -8}px) rotate(${center ? 0 : position % 2 ? 2 : -2}deg)`,
            }}
          >
            <img src={item.imgSrc} alt="" className="mb-5 h-14 w-12 object-cover" />
            <p className={cn("text-base font-medium sm:text-xl", !center && "dark:text-slate-100")}>“{item.testimonial}”</p>
            <p className={cn("absolute bottom-7 left-7 right-7 text-sm italic", center ? "text-white/80" : "text-slate-500 dark:text-slate-400")}>— {item.by}</p>
          </article>
        )
      })}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        <button onClick={() => move(-1)} aria-label="Testimoni sebelumnya" className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-700 shadow-md transition hover:bg-emerald-600 hover:text-white dark:bg-slate-900 dark:text-slate-200"><ChevronLeft /></button>
        <button onClick={() => move(1)} aria-label="Testimoni berikutnya" className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-700 shadow-md transition hover:bg-emerald-600 hover:text-white dark:bg-slate-900 dark:text-slate-200"><ChevronRight /></button>
      </div>
    </div>
  )
}

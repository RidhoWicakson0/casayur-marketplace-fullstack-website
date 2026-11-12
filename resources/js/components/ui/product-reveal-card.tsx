"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ShoppingCart, Star, Heart } from "lucide-react"
import { useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductRevealCardProps {
  name?: string
  price?: string
  originalPrice?: string
  image?: string
  description?: string
  rating?: number
  reviewCount?: number
  onAdd?: () => void
  onFavorite?: () => void
  enableAnimations?: boolean
  className?: string
}

export function ProductRevealCard({
  name = "Produk Segar Casayur",
  price = "Rp 25.000",
  originalPrice,
  image = "https://images.unsplash.com/photo-1540420773420-3365f57f5c7f?w=640&h=480&fit=crop",
  description = "Produk segar pilihan Casayur, dikemas rapi dan siap dikirim ke rumah.",
  rating = 4.8,
  reviewCount = 124,
  onAdd,
  onFavorite,
  enableAnimations = true,
  className,
}: ProductRevealCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const shouldAnimate = enableAnimations && !useReducedMotion()
  const discount = originalPrice ? Math.round(((Number(originalPrice.replace(/[^0-9]/g, "")) - Number(price.replace(/[^0-9]/g, ""))) / Number(originalPrice.replace(/[^0-9]/g, ""))) * 100) : 0

  const handleFavorite = () => {
    setIsFavorite((value) => !value)
    onFavorite?.()
  }

  return (
    <motion.article
      data-slot="product-reveal-card"
      initial="rest"
      whileHover={shouldAnimate ? "hover" : undefined}
      variants={{ rest: { y: 0 }, hover: { y: -6, transition: { type: "spring", stiffness: 300, damping: 30 } } }}
      className={cn("group relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100", className)}
    >
      <div className="relative overflow-hidden">
        <motion.img src={image} alt={name} width="640" height="480" loading="lazy" className="h-48 w-full object-cover" variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <button onClick={handleFavorite} aria-label={isFavorite ? `Hapus ${name} dari favorit` : `Tambah ${name} ke favorit`} className={cn("absolute right-3 top-3 rounded-full p-2 text-white backdrop-blur-sm", isFavorite ? "bg-emerald-600" : "bg-black/20 hover:bg-black/40")}>
          <Heart className={cn("h-4 w-4", isFavorite && "fill-current")} />
        </button>
        {discount > 0 && <div className="absolute left-3 top-3 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-bold text-amber-950">-{discount}%</div>}
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex text-amber-500">{[...Array(5)].map((_, i) => <Star key={i} className={cn("h-3.5 w-3.5", i < Math.floor(rating) && "fill-current")} />)}</span>
          <span>{rating} ({reviewCount})</span>
        </div>
        <div>
          <h3 className="font-bold leading-tight">{name}</h3>
          <div className="mt-1 flex items-baseline gap-2"><span className="text-lg font-extrabold text-emerald-700 dark:text-emerald-400">{price}</span>{originalPrice && <del className="text-sm text-slate-400">{originalPrice}</del>}</div>
        </div>
      </div>

      <motion.div variants={{ rest: { y: "100%", opacity: 0 }, hover: { y: 0, opacity: 1 } }} transition={{ type: "spring", stiffness: 350, damping: 28 }} className="absolute inset-0 flex flex-col justify-end bg-white/95 p-4 backdrop-blur-xl dark:bg-slate-900/95">
        <h4 className="font-semibold">Detail produk</h4>
        <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
        <motion.button onClick={onAdd} whileTap={shouldAnimate ? { scale: 0.97 } : undefined} className={cn(buttonVariants({ variant: "default" }), "mt-4 w-full bg-emerald-600 hover:bg-emerald-700")}><ShoppingCart className="mr-2 h-4 w-4" />Tambah ke keranjang</motion.button>
      </motion.div>
    </motion.article>
  )
}

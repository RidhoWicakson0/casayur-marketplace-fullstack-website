import { Link } from "@inertiajs/react"
import { ArrowUpRight } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { Product } from "@/types/casayur"

interface AppleCardCarouselProps {
  products: Product[]
  poOpen?: boolean
}

export function AppleCardCarousel({ products, poOpen = false }: AppleCardCarouselProps) {
  const cards = products.length > 0 ? products : [
    {
      id: 1,
      name: "Bayam Hijau Segar",
      category: "Sayuran Daun",
      price: 5000,
      unit: "ikat",
      stock: 15,
      is_po: false,
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "Wortel Brastagi",
      category: "Sayuran Umbi",
      price: 12000,
      unit: "500 gr",
      stock: 20,
      is_po: false,
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "Pakcoy Hidroponik",
      category: "Sayuran Daun",
      price: 8000,
      unit: "250 gr",
      stock: 12,
      is_po: true,
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      name: "Tomat Ceri Merah",
      category: "Sayuran Buah",
      price: 14000,
      unit: "250 gr",
      stock: 8,
      is_po: true,
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    },
  ]

  return (
    <div className="relative w-full">
      <Carousel opts={{ dragFree: true, align: "start" }} className="w-full">
        <CarouselContent className="-ml-4">
          {cards.map((item) => (
            <CarouselItem key={item.id} className="basis-[78%] sm:basis-[55%] md:basis-[48%] lg:basis-[46%] pl-4">
              <Link
                href={`/products`}
                className="group relative flex h-[340px] w-full flex-col justify-between overflow-hidden rounded-3xl border border-[--line] bg-[--surface] p-6 text-white transition-transform duration-300 hover:scale-[1.01]"
              >
                {/* Background image */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                
                {/* Dark gradient overlay ala Apple Card */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25" />

                {/* Top content */}
                <div className="relative z-10 flex items-start justify-between">
                  <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-md">
                    {item.is_po ? "Preorder" : "Ready Stock"}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4 text-white" />
                  </div>
                </div>

                {/* Bottom content */}
                <div className="relative z-10 space-y-1">
                  <p className="text-xs uppercase tracking-wider text-white/75">
                    {typeof item.category === "string" ? item.category : "Sayuran Segar"}
                  </p>
                  <h3 className="font-display text-2xl font-semibold leading-tight text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm font-medium text-[--turmeric]">
                    Rp {item.price?.toLocaleString("id-ID")} / {item.unit}
                  </p>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

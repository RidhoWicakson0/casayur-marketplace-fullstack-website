"use client"

import * as React from "react"
import { motion, AnimatePresence, MotionConfig } from "framer-motion"
import { ChevronDown, Shirt, Briefcase, Smartphone, Home, Layers } from "lucide-react"
import { cn } from "@/lib/utils"

function useClickAway(ref: React.RefObject<HTMLElement>, handler: (event: MouseEvent | TouchEvent) => void) {
  React.useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler])
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline"
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variant === "outline" && "border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

interface Category {
  id: string
  label: string
  icon: React.ElementType
}

const categories: Category[] = [
  { id: "all", label: "Semua", icon: Layers },
  { id: "ready", label: "Ready Stock", icon: Home },
  { id: "po", label: "Preorder", icon: Briefcase },
]

const IconWrapper = ({ icon: Icon }: { icon: React.ElementType }) => (
  <div className="w-4 h-4 mr-2">
    <Icon className="w-4 h-4" />
  </div>
)

export function FluidDropdown({ 
  onSelect, 
  defaultValue = "all" 
}: { 
  onSelect: (id: string) => void, 
  defaultValue?: string 
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedCategory, setSelectedCategory] = React.useState<Category>(
    categories.find(c => c.id === defaultValue) || categories[0]
  )
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  useClickAway(dropdownRef, () => setIsOpen(false))

  return (
    <MotionConfig reducedMotion="user">
      <div className="w-full max-w-[200px] relative" ref={dropdownRef}>
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full justify-between px-3 text-slate-700 dark:text-slate-200",
            "hover:bg-slate-50 dark:hover:bg-slate-800",
            "h-10",
          )}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span className="flex items-center">
            <IconWrapper icon={selectedCategory.icon} />
            {selectedCategory.label}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 opacity-50" />
          </motion.div>
        </Button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 0, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 0, height: 0 }}
              className="absolute left-0 right-0 top-full mt-2 z-50"
            >
              <div className="w-full rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-800 dark:bg-slate-900">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category)
                      onSelect(category.id)
                      setIsOpen(false)
                    }}
                    className={cn(
                      "flex w-full items-center px-3 py-2 text-sm rounded-md transition-colors",
                      "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800",
                      selectedCategory.id === category.id && "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                    )}
                  >
                    <IconWrapper icon={category.icon} />
                    {category.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}

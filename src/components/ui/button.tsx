'use client'

import React, { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { motion, HTMLMotionProps } from "framer-motion"

// Define ButtonProps but explicitly override children to be ReactNode
// to avoid conflicts with MotionValue types in standard React rendering
interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children?: React.ReactNode
  isLoading?: boolean
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'accent' | 'yellow'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, isLoading, variant = 'primary', size = 'md', disabled, ...props }, ref) => {
    const variants = {
      primary: "bg-brand-dark text-white hover:bg-brand-red shadow-lg",
      secondary: "bg-white text-brand-dark border border-gray-200 hover:bg-brand-red hover:text-white hover:border-brand-red",
      danger: "bg-red-600 text-white hover:bg-red-700 shadow-md",
      ghost: "hover:bg-gray-100 text-gray-600",
      outline: "border border-brand-dark bg-transparent text-brand-dark hover:bg-brand-dark hover:text-white",
      accent: "bg-brand-red text-white hover:bg-[#c91d23] shadow-lg shadow-brand-red/20",
      yellow: "bg-[#FFD700] text-brand-dark hover:bg-[#e6c200] shadow-md",
    }

    const sizes = {
      sm: "px-3 py-1.5 text-[10px] font-black uppercase tracking-widest",
      md: "px-6 py-2.5 text-xs font-black uppercase tracking-widest",
      lg: "px-10 py-4 text-sm font-black uppercase tracking-widest",
      icon: "p-2",
    }

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || (disabled as boolean)}
        {...(props as any)}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        <span className="relative z-10 flex items-center justify-center gap-2">
            {children}
        </span>
      </motion.button>
    )
  }
)
Button.displayName = "Button"

export { Button }

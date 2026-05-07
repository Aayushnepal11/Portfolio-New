import * as React from "react"
import { cn } from "@/lib/utils"

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

const badgeVariants: Record<BadgeVariant, string> = {
  default: "bg-[#00ff41] text-black hover:bg-[#00ff41]/80",
  secondary: "bg-zinc-800 text-zinc-300 hover:bg-zinc-700",
  destructive: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  outline: "border border-[#00ff41]/30 text-[#00ff41] hover:bg-[#00ff41]/10",
  ghost: "hover:bg-zinc-800 text-zinc-300",
  link: "text-[#00ff41] underline-offset-4 hover:underline"
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          badgeVariants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Badge.displayName = "Badge"

export { Badge }

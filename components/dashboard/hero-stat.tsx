"use client"

import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { AnimatedCounter } from "./animated-counter"
import { LucideIcon } from "lucide-react"

interface HeroStatProps {
  title: string
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  formatter?: (value: number) => string
  subValue?: string
  trend?: {
    value: string
    direction: "up" | "down" | "neutral"
  }
  icon?: LucideIcon
  className?: string
  valueClassName?: string
  accentColor?: "primary" | "success" | "warning" | "destructive" | "info"
  size?: "default" | "large" | "xl"
}

export function HeroStat({
  title,
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  formatter,
  subValue,
  trend,
  icon: Icon,
  className,
  valueClassName,
  accentColor = "primary",
  size = "default",
}: HeroStatProps) {
  const accentClasses = {
    primary: "border-l-primary from-primary/10 to-transparent",
    success: "border-l-success from-success/10 to-transparent",
    warning: "border-l-warning from-warning/10 to-transparent",
    destructive: "border-l-destructive from-destructive/10 to-transparent",
    info: "border-l-info from-info/10 to-transparent",
  }

  const iconBg = {
    primary: "bg-primary/20 text-primary",
    success: "bg-success/20 text-success",
    warning: "bg-warning/20 text-warning",
    destructive: "bg-destructive/20 text-destructive",
    info: "bg-info/20 text-info",
  }

  const trendColors = {
    up: "text-success bg-success/10",
    down: "text-destructive bg-destructive/10",
    neutral: "text-muted-foreground bg-secondary",
  }

  const sizeClasses = {
    default: "p-5",
    large: "p-6",
    xl: "p-8",
  }

  const valueSizes = {
    default: "text-3xl lg:text-4xl",
    large: "text-4xl lg:text-5xl",
    xl: "text-5xl lg:text-6xl",
  }

  return (
    <div
      className={cn(
        "relative bg-card border border-border rounded-xl border-l-4 overflow-hidden transition-all duration-500 hover:border-border/80 group",
        accentClasses[accentColor],
        sizeClasses[size],
        className
      )}
    >
      {/* Gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity duration-500 group-hover:opacity-70",
          accentClasses[accentColor]
        )}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {Icon && (
              <div
                className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110",
                  iconBg[accentColor]
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
            )}
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {title}
            </p>
          </div>
          {trend && (
            <div
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                trendColors[trend.direction]
              )}
            >
              {trend.direction === "up" && <ArrowUpRight className="h-3.5 w-3.5" />}
              {trend.direction === "down" && <ArrowDownRight className="h-3.5 w-3.5" />}
              <span>{trend.value}</span>
            </div>
          )}
        </div>

        <div className={cn("font-bold font-mono tracking-tight", valueSizes[size], valueClassName)}>
          <AnimatedCounter
            value={value}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals}
            formatter={formatter}
            duration={2500}
          />
        </div>

        {subValue && (
          <p className="text-sm text-muted-foreground mt-2 transition-colors group-hover:text-foreground/70">
            {subValue}
          </p>
        )}
      </div>
    </div>
  )
}

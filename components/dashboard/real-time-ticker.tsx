"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight, Minus, Activity } from "lucide-react"

interface TickerItem {
  label: string
  value: string
  change?: number
  trend?: "up" | "down" | "neutral"
}

interface RealTimeTickerProps {
  items: TickerItem[]
  className?: string
}

export function RealTimeTicker({ items, className }: RealTimeTickerProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [items.length])

  return (
    <div className={cn("overflow-hidden", className)}>
      <div className="flex items-center gap-8 animate-marquee">
        {[...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 shrink-0 px-4 py-2 bg-secondary/50 rounded-lg border border-border/50"
          >
            <span className="text-xs text-muted-foreground uppercase tracking-wide">{item.label}</span>
            <span className="text-sm font-mono font-semibold text-foreground">{item.value}</span>
            {item.change !== undefined && (
              <span
                className={cn(
                  "flex items-center gap-0.5 text-xs font-medium",
                  item.trend === "up" && "text-success",
                  item.trend === "down" && "text-destructive",
                  item.trend === "neutral" && "text-muted-foreground"
                )}
              >
                {item.trend === "up" && <ArrowUpRight className="h-3 w-3" />}
                {item.trend === "down" && <ArrowDownRight className="h-3 w-3" />}
                {item.trend === "neutral" && <Minus className="h-3 w-3" />}
                {item.change > 0 ? "+" : ""}
                {item.change}%
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

interface LiveMetricBarProps {
  metrics: Array<{
    label: string
    value: string
    color?: "primary" | "success" | "warning" | "destructive" | "info"
    pulse?: boolean
  }>
  className?: string
}

export function LiveMetricBar({ metrics, className }: LiveMetricBarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 px-6 py-3 bg-secondary/30 border-y border-border",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Activity className="h-4 w-4 text-primary" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Real-time Metrics
        </span>
      </div>
      <div className="flex items-center gap-6">
        {metrics.map((metric, idx) => {
          const colorClasses = {
            primary: "text-primary",
            success: "text-success",
            warning: "text-warning",
            destructive: "text-destructive",
            info: "text-info",
          }

          return (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{metric.label}:</span>
              <span
                className={cn(
                  "text-sm font-mono font-semibold",
                  colorClasses[metric.color || "foreground"]
                )}
              >
                {metric.pulse && (
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-current mr-1.5" />
                )}
                {metric.value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

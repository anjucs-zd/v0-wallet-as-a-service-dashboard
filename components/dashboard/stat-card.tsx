"use client"

import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  subValue?: string
  trend?: {
    value: string
    direction: "up" | "down" | "neutral"
  }
  className?: string
  valueClassName?: string
  accentColor?: "primary" | "success" | "warning" | "destructive" | "info"
}

export function StatCard({
  title,
  value,
  subValue,
  trend,
  className,
  valueClassName,
  accentColor = "primary",
}: StatCardProps) {
  const accentClasses = {
    primary: "border-l-primary",
    success: "border-l-success",
    warning: "border-l-warning",
    destructive: "border-l-destructive",
    info: "border-l-info",
  }

  const trendColors = {
    up: "text-success",
    down: "text-destructive",
    neutral: "text-muted-foreground",
  }

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-lg p-5 border-l-4 transition-all duration-300 hover:bg-secondary/30",
        accentClasses[accentColor],
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
        {trend && (
          <div className={cn("flex items-center gap-0.5 text-xs font-medium", trendColors[trend.direction])}>
            {trend.direction === "up" && <ArrowUpRight className="h-3 w-3" />}
            {trend.direction === "down" && <ArrowDownRight className="h-3 w-3" />}
            {trend.direction === "neutral" && <Minus className="h-3 w-3" />}
            <span>{trend.value}</span>
          </div>
        )}
      </div>
      <p className={cn("text-2xl lg:text-3xl font-bold mt-2 font-mono tracking-tight", valueClassName)}>
        {value}
      </p>
      {subValue && (
        <p className="text-xs text-muted-foreground mt-1">{subValue}</p>
      )}
    </div>
  )
}

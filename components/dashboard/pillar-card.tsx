"use client"

import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface PillarCardProps {
  icon: LucideIcon
  title: string
  description: string
  stats: Array<{
    label: string
    value: string
  }>
  status: "operational" | "monitoring" | "alert"
  className?: string
}

export function PillarCard({
  icon: Icon,
  title,
  description,
  stats,
  status,
  className,
}: PillarCardProps) {
  const statusConfig = {
    operational: {
      color: "bg-success",
      text: "Operational",
      textColor: "text-success",
    },
    monitoring: {
      color: "bg-warning",
      text: "Monitoring",
      textColor: "text-warning",
    },
    alert: {
      color: "bg-destructive",
      text: "Alert",
      textColor: "text-destructive",
    },
  }

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:border-primary/50 group",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={cn("h-2 w-2 rounded-full animate-pulse", statusConfig[status].color)} />
          <span className={cn("text-xs font-medium", statusConfig[status].textColor)}>
            {statusConfig[status].text}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
            <p className="text-lg font-bold font-mono text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

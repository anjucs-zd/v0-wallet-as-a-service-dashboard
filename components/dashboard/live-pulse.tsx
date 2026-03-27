"use client"

import { cn } from "@/lib/utils"

interface LivePulseProps {
  status?: "live" | "active" | "warning" | "critical"
  label?: string
  className?: string
}

export function LivePulse({ status = "live", label, className }: LivePulseProps) {
  const statusConfig = {
    live: {
      bg: "bg-success/10",
      border: "border-success/20",
      dot: "bg-success",
      text: "text-success",
      label: label || "Live",
    },
    active: {
      bg: "bg-primary/10",
      border: "border-primary/20",
      dot: "bg-primary",
      text: "text-primary",
      label: label || "Active",
    },
    warning: {
      bg: "bg-warning/10",
      border: "border-warning/20",
      dot: "bg-warning",
      text: "text-warning",
      label: label || "Warning",
    },
    critical: {
      bg: "bg-destructive/10",
      border: "border-destructive/20",
      dot: "bg-destructive",
      text: "text-destructive",
      label: label || "Critical",
    },
  }

  const config = statusConfig[status]

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-1 rounded-full border",
        config.bg,
        config.border,
        className
      )}
    >
      <div className="relative">
        <div className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
        <div
          className={cn(
            "absolute inset-0 h-1.5 w-1.5 rounded-full animate-ping",
            config.dot
          )}
        />
      </div>
      <span className={cn("text-xs font-medium", config.text)}>{config.label}</span>
    </div>
  )
}

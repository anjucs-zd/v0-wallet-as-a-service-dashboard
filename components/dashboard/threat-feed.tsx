"use client"

import { cn } from "@/lib/utils"
import { ShieldX, ShieldAlert, ShieldCheck, Clock } from "lucide-react"

interface ThreatEvent {
  id: string
  type: "blocked" | "screened" | "flagged"
  description: string
  source: string
  timestamp: string
  amount?: string
}

interface ThreatFeedProps {
  events: ThreatEvent[]
  className?: string
}

export function ThreatFeed({ events, className }: ThreatFeedProps) {
  const typeConfig = {
    blocked: {
      icon: ShieldX,
      color: "text-destructive",
      bg: "bg-destructive/10",
      label: "BLOCKED",
    },
    screened: {
      icon: ShieldCheck,
      color: "text-success",
      bg: "bg-success/10",
      label: "SCREENED",
    },
    flagged: {
      icon: ShieldAlert,
      color: "text-warning",
      bg: "bg-warning/10",
      label: "FLAGGED",
    },
  }

  return (
    <div className={cn("bg-card border border-border rounded-lg", className)}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Real-Time Compliance Feed</h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            <span>Live</span>
          </div>
        </div>
      </div>
      
      <div className="divide-y divide-border max-h-[320px] overflow-y-auto">
        {events.map((event) => {
          const config = typeConfig[event.type]
          const Icon = config.icon
          
          return (
            <div
              key={event.id}
              className="p-4 hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className={cn("p-2 rounded-lg", config.bg)}>
                  <Icon className={cn("h-4 w-4", config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn("text-xs font-bold uppercase tracking-wider", config.color)}>
                      {config.label}
                    </span>
                    {event.amount && (
                      <span className="text-xs font-mono text-muted-foreground">
                        {event.amount}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-foreground truncate">{event.description}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-muted-foreground">{event.source}</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{event.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

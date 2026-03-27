"use client"

import { cn } from "@/lib/utils"
import { ShieldX, ShieldAlert, ShieldCheck, Clock, ExternalLink } from "lucide-react"

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
      border: "border-destructive/20",
      label: "BLOCKED",
      pulse: true,
    },
    screened: {
      icon: ShieldCheck,
      color: "text-success",
      bg: "bg-success/10",
      border: "border-success/20",
      label: "CLEARED",
      pulse: false,
    },
    flagged: {
      icon: ShieldAlert,
      color: "text-warning",
      bg: "bg-warning/10",
      border: "border-warning/20",
      label: "FLAGGED",
      pulse: true,
    },
  }

  return (
    <div className={cn("bg-card border border-border rounded-xl overflow-hidden", className)}>
      <div className="p-4 border-b border-border bg-secondary/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Threat Detection Feed</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Real-time AML/Sanctions monitoring</p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-destructive/10 border border-destructive/20">
            <div className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />
            <span className="text-xs font-medium text-destructive">Monitoring</span>
          </div>
        </div>
      </div>
      
      <div className="divide-y divide-border max-h-[360px] overflow-y-auto">
        {events.map((event, idx) => {
          const config = typeConfig[event.type]
          const Icon = config.icon
          
          return (
            <div
              key={event.id}
              className={cn(
                "p-4 hover:bg-secondary/30 transition-all cursor-pointer group animate-fade-in",
                idx === 0 && "bg-secondary/20"
              )}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className={cn("p-2 rounded-lg border transition-transform group-hover:scale-110", config.bg, config.border)}>
                  <Icon className={cn("h-4 w-4", config.color)} />
                  {config.pulse && (
                    <span className={cn("absolute inset-0 rounded-lg animate-ping opacity-30", config.bg)} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn("text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded", config.bg, config.color)}>
                      {config.label}
                    </span>
                    {event.amount && (
                      <span className="text-xs font-mono font-semibold text-foreground">
                        {event.amount}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors">{event.description}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">{event.source}</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{event.timestamp}</span>
                    </div>
                    <ExternalLink className="h-3 w-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="p-3 border-t border-border bg-secondary/20">
        <button className="w-full text-xs text-primary font-medium hover:text-primary/80 transition-colors">
          View All Compliance Events
        </button>
      </div>
    </div>
  )
}

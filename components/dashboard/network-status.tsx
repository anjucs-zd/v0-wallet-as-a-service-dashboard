"use client"

import { cn } from "@/lib/utils"
import { Activity, CheckCircle2, Clock, Zap, Server } from "lucide-react"
import { AnimatedCounter } from "./animated-counter"

interface NetworkNode {
  name: string
  status: "online" | "syncing" | "offline"
  latency: string
  region: string
}

interface NetworkStatusProps {
  nodes: NetworkNode[]
  uptime: string
  lastBlock: string
  tps: string
  className?: string
}

export function NetworkStatus({
  nodes,
  uptime,
  lastBlock,
  tps,
  className,
}: NetworkStatusProps) {
  const statusConfig = {
    online: {
      color: "bg-success",
      text: "Online",
      textColor: "text-success",
      pulse: true,
    },
    syncing: {
      color: "bg-warning",
      text: "Syncing",
      textColor: "text-warning",
      pulse: true,
    },
    offline: {
      color: "bg-destructive",
      text: "Offline",
      textColor: "text-destructive",
      pulse: false,
    },
  }

  return (
    <div className={cn("bg-card border border-border rounded-xl overflow-hidden", className)}>
      <div className="p-4 border-b border-border bg-secondary/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-foreground">Infrastructure Status</h3>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 border border-success/20">
            <div className="h-1.5 w-1.5 rounded-full bg-success" />
            <span className="text-xs font-medium text-success">Operational</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-3 bg-secondary/50 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span className="text-xs">Uptime</span>
            </div>
            <p className="text-xl font-bold font-mono text-success">{uptime}</p>
          </div>
          <div className="text-center p-3 bg-secondary/50 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Clock className="h-3.5 w-3.5" />
              <span className="text-xs">Block Time</span>
            </div>
            <p className="text-xl font-bold font-mono text-foreground">{lastBlock}</p>
          </div>
          <div className="text-center p-3 bg-secondary/50 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Zap className="h-3.5 w-3.5" />
              <span className="text-xs">TPS</span>
            </div>
            <p className="text-xl font-bold font-mono text-primary">{tps}</p>
          </div>
        </div>

        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Node Health</p>

        <div className="space-y-2">
          {nodes.map((node, idx) => {
            const config = statusConfig[node.status]
            return (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors animate-fade-in group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={cn("h-2.5 w-2.5 rounded-full", config.color)} />
                    
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{node.name}</p>
                    <p className="text-xs text-muted-foreground">{node.region}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn("text-xs font-semibold", config.textColor)}>
                    {config.text}
                  </p>
                  <p className="text-xs font-mono text-muted-foreground">{node.latency}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

"use client"

import { cn } from "@/lib/utils"
import { Activity, CheckCircle2, Clock, Zap } from "lucide-react"

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
    },
    syncing: {
      color: "bg-warning",
      text: "Syncing",
      textColor: "text-warning",
    },
    offline: {
      color: "bg-destructive",
      text: "Offline",
      textColor: "text-destructive",
    },
  }

  return (
    <div className={cn("bg-card border border-border rounded-lg", className)}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-foreground">Network Status</h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-success">
            <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            <span>All Systems Operational</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span className="text-xs">Uptime</span>
            </div>
            <p className="text-lg font-bold font-mono text-success">{uptime}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Clock className="h-3.5 w-3.5" />
              <span className="text-xs">Last Block</span>
            </div>
            <p className="text-lg font-bold font-mono text-foreground">{lastBlock}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
              <Zap className="h-3.5 w-3.5" />
              <span className="text-xs">TPS</span>
            </div>
            <p className="text-lg font-bold font-mono text-foreground">{tps}</p>
          </div>
        </div>

        <div className="space-y-2">
          {nodes.map((node, idx) => {
            const config = statusConfig[node.status]
            return (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-lg bg-secondary/50"
              >
                <div className="flex items-center gap-2">
                  <div className={cn("h-2 w-2 rounded-full", config.color)} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{node.name}</p>
                    <p className="text-xs text-muted-foreground">{node.region}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn("text-xs font-medium", config.textColor)}>
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

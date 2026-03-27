"use client"

import { cn } from "@/lib/utils"
import {
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Shield,
  FileCheck,
  Users,
  ExternalLink,
  Activity,
} from "lucide-react"

type ActivityType = "transfer_in" | "transfer_out" | "policy_update" | "compliance" | "approval" | "user"

interface ActivityItem {
  id: string
  type: ActivityType
  title: string
  description: string
  timestamp: string
  amount?: string
  user?: string
}

interface ActivityFeedProps {
  activities: ActivityItem[]
  className?: string
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  const typeConfig: Record<
    ActivityType,
    { icon: typeof ArrowUpRight; color: string; bg: string; border: string }
  > = {
    tran
    transfer_out: {
      icon: ArrowUpRight,
      color: "text-info",
      bg: "bg-info/10",
      border: "border-info/20",
    },
    policy_update: {
      icon: FileCheck,
      color: "text-info",
      bg: "bg-info/10",
      border: "border-info/20",
    },
    compliance: {
      icon: Shield,
      color: "text-warning",
      bg: "bg-warning/10",
      border: "border-warning/20",
    },
    approval: {
      icon: CheckCircle2,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
    },
    user: {
      icon: Users,
      color: "text-muted-foreground",
      bg: "bg-secondary",
      border: "border-border",
    },
  }

  return (
    <div className={cn("bg-card border border-border rounded-xl overflow-hidden", className)}>
      <div className="p-4 border-b border-border bg-secondary/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Activity Stream</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Treasury operations and approvals</p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
            <Activity className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">Live</span>
          </div>
        </div>
      </div>

      <div className="divide-y divide-border max-h-[360px] overflow-y-auto">
        {activities.map((activity, idx) => {
          const config = typeConfig[activity.type]
          const Icon = config.icon

          return (
            <div
              key={activity.id}
              className={cn(
                "p-4 hover:bg-secondary/30 transition-all cursor-pointer group animate-fade-in",
                idx === 0 && "bg-secondary/20"
              )}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className={cn("p-2 rounded-lg shrink-0 border transition-transform group-hover:scale-110", config.bg, config.border)}>
                  <Icon className={cn("h-4 w-4", config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                      {activity.title}
                    </p>
                    {activity.amount && (
                      <span className={cn(
                        "text-sm font-mono font-semibold shrink-0",
                        activity.amount.startsWith("+") ? "text-success" : activity.amount.startsWith("-") ? "text-info" : "text-foreground"
                      )}>
                        {activity.amount}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    {activity.user && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                        {activity.user}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </span>
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
          View Full Activity Log
        </button>
      </div>
    </div>
  )
}

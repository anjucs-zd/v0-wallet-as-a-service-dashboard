"use client"

import { cn } from "@/lib/utils"
import {
  ArrowUpRight,
  ArrowDownRight,
  RotateCcw,
  Shield,
  FileCheck,
  Users,
} from "lucide-react"

type ActivityType = "transfer_in" | "transfer_out" | "policy_update" | "compliance" | "approval" | "user"

interface Activity {
  id: string
  type: ActivityType
  title: string
  description: string
  timestamp: string
  amount?: string
  user?: string
}

interface ActivityFeedProps {
  activities: Activity[]
  className?: string
}

export function ActivityFeed({ activities, className }: ActivityFeedProps) {
  const typeConfig: Record<
    ActivityType,
    { icon: typeof ArrowUpRight; color: string; bg: string }
  > = {
    transfer_in: {
      icon: ArrowDownRight,
      color: "text-success",
      bg: "bg-success/10",
    },
    transfer_out: {
      icon: ArrowUpRight,
      color: "text-info",
      bg: "bg-info/10",
    },
    policy_update: {
      icon: FileCheck,
      color: "text-info",
      bg: "bg-info/10",
    },
    compliance: {
      icon: Shield,
      color: "text-warning",
      bg: "bg-warning/10",
    },
    approval: {
      icon: RotateCcw,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    user: {
      icon: Users,
      color: "text-muted-foreground",
      bg: "bg-muted/10",
    },
  }

  return (
    <div className={cn("bg-card border border-border rounded-lg", className)}>
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Recent Activity</h3>
      </div>

      <div className="divide-y divide-border max-h-[400px] overflow-y-auto">
        {activities.map((activity) => {
          const config = typeConfig[activity.type]
          const Icon = config.icon

          return (
            <div
              key={activity.id}
              className="p-4 hover:bg-secondary/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className={cn("p-2 rounded-lg shrink-0", config.bg)}>
                  <Icon className={cn("h-4 w-4", config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-foreground truncate">
                      {activity.title}
                    </p>
                    {activity.amount && (
                      <span className="text-sm font-mono font-medium text-foreground shrink-0">
                        {activity.amount}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {activity.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    {activity.user && (
                      <span className="text-xs text-muted-foreground">
                        by {activity.user}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </span>
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

"use client"

import { cn } from "@/lib/utils"
import { FileCheck, Clock, AlertCircle, CheckCircle, XCircle, ChevronRight } from "lucide-react"


interface PolicyRule {
  id: string
  name: string
  status: "active" | "pending" | "disabled"
  compliance: number
  lastUpdated: string
}

interface PolicyPanelProps {
  totalPolicies: number
  activePolicies: number
  pendingApprovals: number
  complianceScore: number
  rules: PolicyRule[]
  className?: string
}

export function PolicyPanel({
  totalPolicies,
  activePolicies,
  pendingApprovals,
  complianceScore,
  rules,
  className,
}: PolicyPanelProps) {
  const statusConfig = {
    active: {
      icon: CheckCircle,
      color: "text-success",
      bg: "bg-success/10",
    },
    pending: {
      icon: Clock,
      color: "text-warning",
      bg: "bg-warning/10",
    },
    disabled: {
      icon: XCircle,
      color: "text-muted-foreground",
      bg: "bg-muted/10",
    },
  }

  return (
    <div className={cn("bg-card border border-border rounded-lg", className)}>
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-info/20 flex items-center justify-center">
              <FileCheck className="h-5 w-5 text-info" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Policy Engine</h3>
              <p className="text-xs text-muted-foreground">Automated governance controls</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-3 bg-secondary/50 rounded-lg">
            <p className="text-2xl font-bold font-mono text-foreground">{totalPolicies}</p>
            <p className="text-xs text-muted-foreground">Total Rules</p>
          </div>
          <div className="text-center p-3 bg-secondary/50 rounded-lg">
            <p className="text-2xl font-bold font-mono text-success">{activePolicies}</p>
            <p className="text-xs text-muted-foreground">Active</p>
          </div>
          <div className="text-center p-3 bg-secondary/50 rounded-lg">
            <p className="text-2xl font-bold font-mono text-warning">{pendingApprovals}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Compliance</span>
            <span className="font-mono font-bold text-success">{complianceScore}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
            <div 
              className="h-full bg-success transition-all duration-500" 
              style={{ width: `${complianceScore}%` }} 
            />
          </div>
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
          Active Policy Rules
        </p>
        <div className="space-y-2">
          {rules.map((rule) => {
            const config = statusConfig[rule.status]
            const Icon = config.icon
            
            return (
              <div
                key={rule.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className={cn("p-1.5 rounded", config.bg)}>
                    <Icon className={cn("h-3.5 w-3.5", config.color)} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{rule.name}</p>
                    <p className="text-xs text-muted-foreground">Updated {rule.lastUpdated}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs font-mono text-muted-foreground">{rule.compliance}%</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

"use client"

import { cn } from "@/lib/utils"
import { Shield, ShieldCheck, ShieldX, AlertTriangle, Globe, Ban } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts"

interface ComplianceMetric {
  label: string
  value: number
  change: number
  icon: typeof Shield
  color: string
}

interface CompliancePanelProps {
  totalScreened: string
  threatsBlocked: string
  sanctionsHits: string
  amlAlerts: string
  metrics: ComplianceMetric[]
  chartData: Array<{ name: string; blocked: number; flagged: number; cleared: number }>
  className?: string
}

export function CompliancePanel({
  totalScreened,
  threatsBlocked,
  sanctionsHits,
  amlAlerts,
  chartData,
  className,
}: CompliancePanelProps) {
  return (
    <div className={cn("bg-card border border-border rounded-lg", className)}>
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-destructive/20 flex items-center justify-center">
              <Shield className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Compliance & Security</h3>
              <p className="text-xs text-muted-foreground">AML/KYC/Sanctions monitoring</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 border border-success/20">
            <div className="h-1.5 w-1.5 rounded-full bg-success" />
            <span className="text-xs font-medium text-success">Protected</span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-secondary/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Globe className="h-3.5 w-3.5" />
              <span>Screened</span>
            </div>
            <p className="text-xl font-bold font-mono text-foreground">{totalScreened}</p>
          </div>
          <div className="bg-destructive/10 rounded-lg p-3 border border-destructive/20">
            <div className="flex items-center gap-2 text-xs text-destructive mb-1">
              <Ban className="h-3.5 w-3.5" />
              <span>Blocked</span>
            </div>
            <p className="text-xl font-bold font-mono text-destructive">{threatsBlocked}</p>
          </div>
          <div className="bg-warning/10 rounded-lg p-3 border border-warning/20">
            <div className="flex items-center gap-2 text-xs text-warning mb-1">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>Sanctions</span>
            </div>
            <p className="text-xl font-bold font-mono text-warning">{sanctionsHits}</p>
          </div>
          <div className="bg-info/10 rounded-lg p-3 border border-info/20">
            <div className="flex items-center gap-2 text-xs text-info mb-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>AML Alerts</span>
            </div>
            <p className="text-xl font-bold font-mono text-info">{amlAlerts}</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
          Weekly Screening Activity
        </p>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.01 260)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: "oklch(0.6 0 0)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "oklch(0.6 0 0)" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.12 0.01 260)",
                  border: "1px solid oklch(0.22 0.01 260)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "oklch(0.98 0 0)" }}
              />
              <Bar dataKey="cleared" stackId="a" fill="oklch(0.75 0.18 160)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="flagged" stackId="a" fill="oklch(0.8 0.15 80)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="blocked" stackId="a" fill="oklch(0.65 0.2 25)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-3">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-sm bg-success" />
            <span className="text-xs text-muted-foreground">Cleared</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-sm bg-warning" />
            <span className="text-xs text-muted-foreground">Flagged</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-sm bg-destructive" />
            <span className="text-xs text-muted-foreground">Blocked</span>
          </div>
        </div>
      </div>
    </div>
  )
}

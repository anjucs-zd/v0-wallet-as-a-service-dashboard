"use client"

import { cn } from "@/lib/utils"
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, Landmark, CircleDollarSign } from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

interface AssetAllocation {
  name: string
  balance: string
  allocation: number
  yield: string
  change: number
}

interface TreasuryPanelProps {
  totalAum: string
  dailyVolume: string
  averageYield: string
  assets: AssetAllocation[]
  chartData: Array<{ date: string; value: number; yield: number }>
  className?: string
}

export function TreasuryPanel({
  totalAum,
  dailyVolume,
  averageYield,
  assets,
  chartData,
  className,
}: TreasuryPanelProps) {
  return (
    <div className={cn("bg-card border border-border rounded-lg", className)}>
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Landmark className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Treasury Operations</h3>
              <p className="text-xs text-muted-foreground">Real-time asset management</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 border border-success/20">
            <div className="h-1.5 w-1.5 rounded-full bg-success" />
            <span className="text-xs font-medium text-success">Live</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-secondary/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <Wallet className="h-3.5 w-3.5" />
              <span>Total AUM</span>
            </div>
            <p className="text-xl font-bold font-mono text-foreground">{totalAum}</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <CircleDollarSign className="h-3.5 w-3.5" />
              <span>24h Volume</span>
            </div>
            <p className="text-xl font-bold font-mono text-foreground">{dailyVolume}</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Avg. Yield</span>
            </div>
            <p className="text-xl font-bold font-mono text-success">{averageYield}</p>
          </div>
        </div>
      </div>

      <div className="p-5 border-b border-border">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
          Treasury Performance (30D)
        </p>
        <div className="h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="treasuryGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.75 0.18 160)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="oklch(0.75 0.18 160)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.22 0.01 260)" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "oklch(0.6 0 0)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "oklch(0.6 0 0)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000000000).toFixed(0)}B`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.12 0.01 260)",
                  border: "1px solid oklch(0.22 0.01 260)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "oklch(0.98 0 0)" }}
                formatter={(value: number) => [`$${(value / 1000000000).toFixed(2)}B`, "AUM"]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="oklch(0.75 0.18 160)"
                strokeWidth={2}
                fill="url(#treasuryGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
          Asset Allocation & Yield
        </p>
        <div className="space-y-3">
          {assets.map((asset, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{asset.name.slice(0, 2)}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{asset.name}</p>
                  <p className="text-xs text-muted-foreground">{asset.allocation}% allocation</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono font-medium text-foreground">{asset.balance}</p>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-xs font-mono text-success">{asset.yield} APY</span>
                  <span
                    className={cn(
                      "text-xs flex items-center",
                      asset.change >= 0 ? "text-success" : "text-destructive"
                    )}
                  >
                    {asset.change >= 0 ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {Math.abs(asset.change)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

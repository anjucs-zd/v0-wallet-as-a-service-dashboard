"use client"

import { useState } from "react"
import { Header } from "@/components/dashboard/header"
import { HeroStat } from "@/components/dashboard/hero-stat"
import { TreasuryPanel } from "@/components/dashboard/treasury-panel"
import { CompliancePanel } from "@/components/dashboard/compliance-panel"
import { PolicyPanel } from "@/components/dashboard/policy-panel"
import { ThreatFeed } from "@/components/dashboard/threat-feed"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { NetworkStatus } from "@/components/dashboard/network-status"
import { SecurityRing, ThreatCounter } from "@/components/dashboard/security-ring"
import { AnimatedCounter, formatCurrency } from "@/components/dashboard/animated-counter"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Landmark,
  Shield,
  FileCheck,
  TrendingUp,
  Building2,
  Users,
  Globe,
  Zap,
  Ban,
  Lock,
  Server,
  BadgeCheck,
  DollarSign,
  LineChart,
  ArrowRightLeft,
  Activity,
  Wallet,
  Clock,
} from "lucide-react"

// Mock data for the dashboard
const treasuryChartData = [
  { date: "Mar 1", value: 2100000000, yield: 4.2 },
  { date: "Mar 5", value: 2150000000, yield: 4.3 },
  { date: "Mar 10", value: 2180000000, yield: 4.5 },
  { date: "Mar 15", value: 2220000000, yield: 4.4 },
  { date: "Mar 20", value: 2350000000, yield: 4.7 },
  { date: "Mar 25", value: 2420000000, yield: 4.8 },
  { date: "Mar 27", value: 2470000000, yield: 4.9 },
]

const treasuryAssets = [
  { name: "USDC", balance: "$1.24B", allocation: 50, yield: "5.2%", change: 2.4 },
  { name: "USDT", balance: "$620M", allocation: 25, yield: "4.8%", change: 1.2 },
  { name: "USD", balance: "$372M", allocation: 15, yield: "4.1%", change: 0.8 },
  { name: "AED Stablecoin", balance: "$248M", allocation: 10, yield: "3.9%", change: 3.1 },
]

const complianceChartData = [
  { name: "Mon", blocked: 12, flagged: 45, cleared: 2340 },
  { name: "Tue", blocked: 8, flagged: 38, cleared: 2890 },
  { name: "Wed", blocked: 15, flagged: 52, cleared: 3120 },
  { name: "Thu", blocked: 6, flagged: 41, cleared: 2780 },
  { name: "Fri", blocked: 19, flagged: 67, cleared: 3450 },
  { name: "Sat", blocked: 4, flagged: 28, cleared: 1890 },
  { name: "Sun", blocked: 3, flagged: 22, cleared: 1560 },
]

const policyRules = [
  { id: "1", name: "Transaction Limit Control", status: "active" as const, compliance: 100, lastUpdated: "2 hours ago" },
  { id: "2", name: "Multi-Sig Requirement (>$1M)", status: "active" as const, compliance: 100, lastUpdated: "1 day ago" },
  { id: "3", name: "Geo-Restriction Policy", status: "active" as const, compliance: 98, lastUpdated: "3 days ago" },
  { id: "4", name: "Velocity Check Rule", status: "pending" as const, compliance: 85, lastUpdated: "Pending approval" },
  { id: "5", name: "Whitelist Address Control", status: "active" as const, compliance: 100, lastUpdated: "5 days ago" },
]

const threatEvents = [
  { id: "1", type: "blocked" as const, description: "OFAC sanctioned address attempted transfer", source: "Chainalysis", timestamp: "2 min ago", amount: "$450,000" },
  { id: "2", type: "screened" as const, description: "High-value transaction cleared after KYC verification", source: "Internal AML", timestamp: "5 min ago", amount: "$12.5M" },
  { id: "3", type: "flagged" as const, description: "Unusual velocity pattern detected - pending review", source: "ML Engine", timestamp: "12 min ago", amount: "$890,000" },
  { id: "4", type: "blocked" as const, description: "Mixer-associated wallet blocked", source: "Elliptic", timestamp: "18 min ago", amount: "$125,000" },
  { id: "5", type: "screened" as const, description: "PEP transaction approved after enhanced due diligence", source: "Compliance Team", timestamp: "25 min ago", amount: "$5.2M" },
  { id: "6", type: "flagged" as const, description: "New counterparty requires review", source: "KYC Engine", timestamp: "32 min ago" },
]

const activities = [
  { id: "1", type: "transfer_in" as const, title: "Incoming Settlement", description: "From Abu Dhabi Commercial Bank", timestamp: "3 min ago", amount: "+$45.2M", user: "System" },
  { id: "2", type: "policy_update" as const, title: "Policy Rule Updated", description: "Transaction limit increased for verified corporates", timestamp: "15 min ago", user: "Sarah M." },
  { id: "3", type: "compliance" as const, title: "AML Alert Resolved", description: "False positive - legitimate treasury operation", timestamp: "28 min ago", user: "Ahmed K." },
  { id: "4", type: "transfer_out" as const, title: "Outgoing Wire", description: "To Emirates NBD", timestamp: "45 min ago", amount: "-$12.8M", user: "Treasury Ops" },
  { id: "5", type: "approval" as const, title: "Multi-Sig Approval", description: "Large transfer approved (3/3 signatures)", timestamp: "1 hour ago", amount: "$78.5M", user: "Executive Team" },
  { id: "6", type: "user" as const, title: "New User Added", description: "Compliance analyst role assigned", timestamp: "2 hours ago", user: "Admin" },
]

const networkNodes = [
  { name: "Primary Node", status: "online" as const, latency: "12ms", region: "UAE - Abu Dhabi" },
  { name: "Backup Node", status: "online" as const, latency: "18ms", region: "UAE - Dubai" },
  { name: "DR Node", status: "online" as const, latency: "45ms", region: "Singapore" },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Header />

      {/* Live Status Bar */}
      <div className="border-b border-border bg-card/50 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success" />
              <span className="text-xs font-medium text-foreground">System Operational</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>TPS: <span className="font-mono text-foreground">4,521</span></span>
              <span>Latency: <span className="font-mono text-foreground">12ms</span></span>
              <span>Block: <span className="font-mono text-foreground">#18,432,891</span></span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>Last sync: 2s ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          {/* Tab Navigation */}
          <div className="border-b border-border bg-card/30 px-4">
            <TabsList className="h-12 bg-transparent p-0 gap-1">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/30 border border-transparent rounded-lg px-4 h-9"
              >
                <Activity className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="treasury" 
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/30 border border-transparent rounded-lg px-4 h-9"
              >
                <Landmark className="h-4 w-4 mr-2" />
                Treasury
              </TabsTrigger>
              <TabsTrigger 
                value="compliance" 
                className="data-[state=active]:bg-destructive/10 data-[state=active]:text-destructive data-[state=active]:border-destructive/30 border border-transparent rounded-lg px-4 h-9"
              >
                <Shield className="h-4 w-4 mr-2" />
                Compliance
              </TabsTrigger>
              <TabsTrigger 
                value="policy" 
                className="data-[state=active]:bg-info/10 data-[state=active]:text-info data-[state=active]:border-info/30 border border-transparent rounded-lg px-4 h-9"
              >
                <FileCheck className="h-4 w-4 mr-2" />
                Policy
              </TabsTrigger>
              <TabsTrigger 
                value="activity" 
                className="data-[state=active]:bg-warning/10 data-[state=active]:text-warning data-[state=active]:border-warning/30 border border-transparent rounded-lg px-4 h-9"
              >
                <Zap className="h-4 w-4 mr-2" />
                Activity
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-auto">
            {/* Overview Tab */}
            <TabsContent value="overview" className="h-full m-0 p-4">
              <div className="space-y-4">
                {/* Hero Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  <HeroStat
                    title="Total Assets Under Management"
                    value={2470000000}
                    formatter={formatCurrency}
                    subValue="Across 4 institutional asset classes"
                    trend={{ value: "+8.2% MTD", direction: "up" }}
                    icon={Landmark}
                    accentColor="primary"
                    valueClassName="text-primary"
                    size="large"
                  />
                  <HeroStat
                    title="24h Transaction Volume"
                    value={312000000}
                    formatter={formatCurrency}
                    subValue="18,432 transactions processed"
                    trend={{ value: "+12.4%", direction: "up" }}
                    icon={ArrowRightLeft}
                    accentColor="info"
                    valueClassName="text-info"
                    size="large"
                  />
                  <HeroStat
                    title="Prevented Loss (MTD)"
                    value={124500000}
                    formatter={formatCurrency}
                    subValue="847 threats blocked this month"
                    trend={{ value: "100% blocked", direction: "up" }}
                    icon={Shield}
                    accentColor="destructive"
                    valueClassName="text-destructive"
                    size="large"
                  />
                  <HeroStat
                    title="Active Yield Return"
                    value={4.87}
                    suffix="%"
                    decimals={2}
                    subValue="$33.1M monthly interest"
                    trend={{ value: "+0.3%", direction: "up" }}
                    icon={TrendingUp}
                    accentColor="success"
                    valueClassName="text-success"
                    size="large"
                  />
                </div>

                {/* Secondary KPIs + Infrastructure */}
                <div className="grid grid-cols-12 gap-4">
                  {/* Left: KPI Grid */}
                  <div className="col-span-12 xl:col-span-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      <MetricCard icon={Wallet} label="Active Wallets" value={3842} suffix="" trend="+124 this week" trendColor="success" />
                      <MetricCard icon={Building2} label="Entities" value={47} suffix="" subtext="12 conglomerates" />
                      <MetricCard icon={Globe} label="Banks" value={28} suffix="" subtext="UAE & International" />
                      <MetricCard icon={Users} label="Users" value={1247} suffix="" subtext="Authorized operators" />
                      <MetricCard icon={Zap} label="API Calls" value={2.4} suffix="M" decimals={1} trend="99.9% success" trendColor="success" />
                      <MetricCard icon={Clock} label="Uptime" value={99.99} suffix="%" decimals={2} subtext="Since launch" valueColor="success" />
                    </div>

                    {/* Infrastructure Pillars */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <InfraPillarCard
                        icon={Landmark}
                        title="Treasury Infrastructure"
                        description="Institutional-grade liquidity management"
                        color="primary"
                        stats={[
                          { label: "Yield Pools", value: "4" },
                          { label: "Top APY", value: "5.2%" },
                          { label: "Monthly Yield", value: "$33M" },
                        ]}
                        onClick={() => setActiveTab("treasury")}
                      />
                      <InfraPillarCard
                        icon={Shield}
                        title="Compliance Engine"
                        description="Real-time AML/KYC/Sanctions screening"
                        color="destructive"
                        stats={[
                          { label: "Blocked", value: "847" },
                          { label: "AML Alerts", value: "156" },
                          { label: "Auto-Cleared", value: "99.87%" },
                        ]}
                        onClick={() => setActiveTab("compliance")}
                      />
                      <InfraPillarCard
                        icon={FileCheck}
                        title="Policy Governance"
                        description="Automated enforcement workflows"
                        color="info"
                        stats={[
                          { label: "Rules Active", value: "47" },
                          { label: "Enforced", value: "100%" },
                          { label: "Pending", value: "4" },
                        ]}
                        onClick={() => setActiveTab("policy")}
                      />
                    </div>
                  </div>

                  {/* Right: Security Ring + Quick Stats */}
                  <div className="col-span-12 xl:col-span-4 space-y-4">
                    <div className="bg-card border border-border rounded-xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-foreground">Security Status</h3>
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-success/10 border border-success/20 rounded-full">
                          <div className="h-1.5 w-1.5 rounded-full bg-success" />
                          <span className="text-xs font-medium text-success">Protected</span>
                        </div>
                      </div>
                      <SecurityRing score={98.7} label="Compliance Score" sublabel="Exceeds regulatory minimum" />
                      <div className="mt-4">
                        <ThreatCounter blocked={847} flagged={156} cleared={18} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <QuickStatCard icon={Server} label="HSM Modules" value="6" status="All operational" statusColor="success" />
                      <QuickStatCard icon={Lock} label="Cold Storage" value="$1.8B" status="73% of AUM" />
                      <QuickStatCard icon={DollarSign} label="Liquidity" value="$680M" status="Instant access" valueColor="success" />
                      <QuickStatCard icon={LineChart} label="Daily P&L" value="+$1.1M" status="Yield accrued" valueColor="success" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Treasury Tab */}
            <TabsContent value="treasury" className="h-full m-0 p-4">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 h-full">
                <div className="xl:col-span-2">
                  <TreasuryPanel
                    totalAum="$2.47B"
                    dailyVolume="$312M"
                    averageYield="4.87%"
                    assets={treasuryAssets}
                    chartData={treasuryChartData}
                  />
                </div>
                <div className="space-y-4">
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Treasury Quick Stats</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Cold Storage</span>
                        <span className="font-mono font-semibold text-foreground">$1.8B</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Hot Wallet</span>
                        <span className="font-mono font-semibold text-foreground">$680M</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Monthly Yield</span>
                        <span className="font-mono font-semibold text-success">+$33.1M</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-muted-foreground">Best Performing</span>
                        <span className="font-mono font-semibold text-primary">USDC @ 5.2%</span>
                      </div>
                    </div>
                  </div>
                  <ActivityFeed activities={activities.filter(a => a.type === "transfer_in" || a.type === "transfer_out" || a.type === "approval")} />
                </div>
              </div>
            </TabsContent>

            {/* Compliance Tab */}
            <TabsContent value="compliance" className="h-full m-0 p-4">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 h-full">
                <div className="xl:col-span-2">
                  <CompliancePanel
                    totalScreened="18,432"
                    threatsBlocked="847"
                    sanctionsHits="23"
                    amlAlerts="156"
                    metrics={[]}
                    chartData={complianceChartData}
                  />
                </div>
                <div className="space-y-4">
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Threat Intelligence</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-center">
                        <Ban className="h-5 w-5 text-destructive mx-auto mb-1" />
                        <p className="text-lg font-bold font-mono text-destructive"><AnimatedCounter value={23} duration={1500} /></p>
                        <p className="text-xs text-destructive/80">OFAC Hits</p>
                      </div>
                      <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 text-center">
                        <Shield className="h-5 w-5 text-warning mx-auto mb-1" />
                        <p className="text-lg font-bold font-mono text-warning"><AnimatedCounter value={89} duration={1500} /></p>
                        <p className="text-xs text-warning/80">PEP Checks</p>
                      </div>
                      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-center">
                        <Lock className="h-5 w-5 text-destructive mx-auto mb-1" />
                        <p className="text-lg font-bold font-mono text-destructive"><AnimatedCounter value={134} duration={1500} /></p>
                        <p className="text-xs text-destructive/80">Mixers Blocked</p>
                      </div>
                      <div className="bg-success/10 border border-success/20 rounded-lg p-3 text-center">
                        <BadgeCheck className="h-5 w-5 text-success mx-auto mb-1" />
                        <p className="text-lg font-bold font-mono text-success"><AnimatedCounter value={1247} duration={1500} /></p>
                        <p className="text-xs text-success/80">KYC Verified</p>
                      </div>
                    </div>
                  </div>
                  <ThreatFeed events={threatEvents} />
                </div>
              </div>
            </TabsContent>

            {/* Policy Tab */}
            <TabsContent value="policy" className="h-full m-0 p-4">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 h-full">
                <div className="xl:col-span-2">
                  <PolicyPanel
                    totalPolicies={47}
                    activePolicies={43}
                    pendingApprovals={4}
                    complianceScore={98.7}
                    rules={policyRules}
                  />
                </div>
                <div className="space-y-4">
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Governance Overview</h3>
                    <SecurityRing score={98.7} label="Policy Compliance" sublabel="All rules enforced" />
                  </div>
                  <NetworkStatus
                    nodes={networkNodes}
                    uptime="99.99%"
                    lastBlock="2.3s"
                    tps="4,521"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="h-full m-0 p-4">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 h-full">
                <div className="xl:col-span-2">
                  <ActivityFeed activities={activities} className="h-full" />
                </div>
                <div className="space-y-4">
                  <ThreatFeed events={threatEvents} />
                  <NetworkStatus
                    nodes={networkNodes}
                    uptime="99.99%"
                    lastBlock="2.3s"
                    tps="4,521"
                  />
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-3 bg-card/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">V</span>
            </div>
            <div>
              <span className="text-sm font-bold text-foreground tracking-wide">VAULT</span>
              <span className="text-xs text-muted-foreground ml-2">Institutional WaaS Infrastructure</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <BadgeCheck className="h-3.5 w-3.5 text-primary" />
              <span>ADGM FSRA Licensed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-primary" />
              <span>ISO 27001</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-primary" />
              <span>SOC 2 Type II</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Helper Components
function MetricCard({ 
  icon: Icon, 
  label, 
  value, 
  suffix = "", 
  decimals = 0, 
  trend, 
  trendColor, 
  subtext,
  valueColor 
}: { 
  icon: React.ElementType
  label: string
  value: number
  suffix?: string
  decimals?: number
  trend?: string
  trendColor?: "success" | "destructive" | "warning"
  subtext?: string
  valueColor?: "success" | "destructive" | "warning" | "primary"
}) {
  const colorClasses = {
    success: "text-success",
    destructive: "text-destructive",
    warning: "text-warning",
    primary: "text-primary"
  }
  
  return (
    <div className="bg-card border border-border rounded-lg p-4 transition-all hover:border-primary/50">
      <div className="flex items-center gap-2 text-muted-foreground mb-2">
        <Icon className="h-4 w-4" />
        <span className="text-xs uppercase tracking-wide">{label}</span>
      </div>
      <p className={`text-2xl font-bold font-mono ${valueColor ? colorClasses[valueColor] : "text-foreground"}`}>
        <AnimatedCounter value={value} decimals={decimals} suffix={suffix} duration={2000} />
      </p>
      {trend && (
        <p className={`text-xs mt-1 ${trendColor ? colorClasses[trendColor] : "text-muted-foreground"}`}>{trend}</p>
      )}
      {subtext && !trend && (
        <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
      )}
    </div>
  )
}

function InfraPillarCard({
  icon: Icon,
  title,
  description,
  color,
  stats,
  onClick
}: {
  icon: React.ElementType
  title: string
  description: string
  color: "primary" | "destructive" | "info"
  stats: { label: string; value: string }[]
  onClick?: () => void
}) {
  const colorClasses = {
    primary: "bg-primary/20 text-primary hover:border-primary/50 hover:shadow-primary/5",
    destructive: "bg-destructive/20 text-destructive hover:border-destructive/50 hover:shadow-destructive/5",
    info: "bg-info/20 text-info hover:border-info/50 hover:shadow-info/5"
  }

  return (
    <div 
      className={`group bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-all duration-300 cursor-pointer ${colorClasses[color].split(" ").slice(2).join(" ")}`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${colorClasses[color].split(" ").slice(0, 2).join(" ")}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{description}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {stats.map((stat, i) => (
          <div key={i} className="text-center p-2 bg-secondary/50 rounded-lg">
            <p className={`text-sm font-bold font-mono ${colorClasses[color].split(" ")[1]}`}>{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function QuickStatCard({
  icon: Icon,
  label,
  value,
  status,
  statusColor,
  valueColor
}: {
  icon: React.ElementType
  label: string
  value: string
  status: string
  statusColor?: "success" | "destructive" | "warning"
  valueColor?: "success" | "destructive" | "warning"
}) {
  const colorClasses = {
    success: "text-success",
    destructive: "text-destructive",
    warning: "text-warning"
  }

  return (
    <div className="bg-card border border-border rounded-lg p-3 transition-all hover:border-primary/30">
      <div className="flex items-center gap-2 text-muted-foreground mb-1">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-xs">{label}</span>
      </div>
      <p className={`text-lg font-bold font-mono ${valueColor ? colorClasses[valueColor] : "text-foreground"}`}>{value}</p>
      <p className={`text-xs mt-0.5 ${statusColor ? colorClasses[statusColor] : "text-muted-foreground"}`}>{status}</p>
    </div>
  )
}

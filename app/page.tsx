"use client"

import { Header } from "@/components/dashboard/header"
import { HeroStat } from "@/components/dashboard/hero-stat"
import { TreasuryPanel } from "@/components/dashboard/treasury-panel"
import { CompliancePanel } from "@/components/dashboard/compliance-panel"
import { PolicyPanel } from "@/components/dashboard/policy-panel"
import { ThreatFeed } from "@/components/dashboard/threat-feed"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { NetworkStatus } from "@/components/dashboard/network-status"
import { LiveMetricBar } from "@/components/dashboard/real-time-ticker"
import { SecurityRing, ThreatCounter } from "@/components/dashboard/security-ring"
import { AnimatedCounter, formatCurrency } from "@/components/dashboard/animated-counter"
import {
  Wallet,
  ShieldCheck,
  FileCheck,
  TrendingUp,
  Building2,
  Users,
  Globe,
  Zap,
  Landmark,
  Shield,
  Ban,
  Lock,
  Server,
  Clock,
  ArrowRightLeft,
  BadgeCheck,
  DollarSign,
  LineChart,
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
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Live Metrics Bar */}
      <LiveMetricBar
        metrics={[
          { label: "TPS", value: "4,521", color: "primary", pulse: true },
          { label: "Pending TX", value: "23", color: "warning" },
          { label: "Network", value: "99.99%", color: "success" },
          { label: "Gas", value: "12 gwei", color: "info" },
          { label: "Block", value: "#18,432,891", color: "primary" },
        ]}
      />

      <main className="p-4 lg:p-6 space-y-6">
        {/* Hero Stats - Main KPIs */}
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

        {/* Secondary KPIs Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <div className="bg-card border border-border rounded-lg p-4 transition-all hover:border-primary/50">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Wallet className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wide">Active Wallets</span>
            </div>
            <p className="text-2xl font-bold font-mono text-foreground">
              <AnimatedCounter value={3842} duration={2000} />
            </p>
            <p className="text-xs text-success mt-1">+124 this week</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 transition-all hover:border-primary/50">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Building2 className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wide">Entities</span>
            </div>
            <p className="text-2xl font-bold font-mono text-foreground">
              <AnimatedCounter value={47} duration={1500} />
            </p>
            <p className="text-xs text-muted-foreground mt-1">12 conglomerates</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 transition-all hover:border-primary/50">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Globe className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wide">Banks</span>
            </div>
            <p className="text-2xl font-bold font-mono text-foreground">
              <AnimatedCounter value={28} duration={1500} />
            </p>
            <p className="text-xs text-muted-foreground mt-1">UAE & International</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 transition-all hover:border-primary/50">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Users className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wide">Users</span>
            </div>
            <p className="text-2xl font-bold font-mono text-foreground">
              <AnimatedCounter value={1247} duration={2000} />
            </p>
            <p className="text-xs text-muted-foreground mt-1">Authorized operators</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 transition-all hover:border-primary/50">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Zap className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wide">API Calls</span>
            </div>
            <p className="text-2xl font-bold font-mono text-foreground">
              <AnimatedCounter value={2.4} decimals={1} suffix="M" duration={2000} />
            </p>
            <p className="text-xs text-success mt-1">99.9% success</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 transition-all hover:border-primary/50">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Clock className="h-4 w-4" />
              <span className="text-xs uppercase tracking-wide">Uptime</span>
            </div>
            <p className="text-2xl font-bold font-mono text-success">
              <AnimatedCounter value={99.99} decimals={2} suffix="%" duration={1500} />
            </p>
            <p className="text-xs text-muted-foreground mt-1">Since launch</p>
          </div>
        </div>

        {/* Infrastructure Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                <Landmark className="h-7 w-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground">Treasury Infrastructure</h3>
                <p className="text-sm text-muted-foreground mt-1">Institutional-grade liquidity management with automated yield optimization</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-5">
              <div className="text-center p-3 bg-secondary/50 rounded-lg">
                <p className="text-xl font-bold font-mono text-primary">
                  <AnimatedCounter value={4} duration={1000} />
                </p>
                <p className="text-xs text-muted-foreground mt-1">Yield Pools</p>
              </div>
              <div className="text-center p-3 bg-secondary/50 rounded-lg">
                <p className="text-xl font-bold font-mono text-success">5.2%</p>
                <p className="text-xs text-muted-foreground mt-1">Top APY</p>
              </div>
              <div className="text-center p-3 bg-secondary/50 rounded-lg">
                <p className="text-xl font-bold font-mono text-foreground">$33M</p>
                <p className="text-xs text-muted-foreground mt-1">Monthly Yield</p>
              </div>
            </div>
          </div>

          <div className="group bg-card border border-border rounded-xl p-6 hover:border-destructive/50 transition-all duration-300 hover:shadow-lg hover:shadow-destructive/5">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-xl bg-destructive/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                <Shield className="h-7 w-7 text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground">Compliance Engine</h3>
                <p className="text-sm text-muted-foreground mt-1">Real-time AML/KYC/Sanctions with ML-powered threat detection</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-5">
              <div className="text-center p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                <p className="text-xl font-bold font-mono text-destructive">
                  <AnimatedCounter value={847} duration={2000} />
                </p>
                <p className="text-xs text-destructive/80 mt-1">Blocked</p>
              </div>
              <div className="text-center p-3 bg-warning/10 rounded-lg border border-warning/20">
                <p className="text-xl font-bold font-mono text-warning">
                  <AnimatedCounter value={156} duration={1800} />
                </p>
                <p className="text-xs text-warning/80 mt-1">AML Alerts</p>
              </div>
              <div className="text-center p-3 bg-success/10 rounded-lg border border-success/20">
                <p className="text-xl font-bold font-mono text-success">99.87%</p>
                <p className="text-xs text-success/80 mt-1">Auto-Cleared</p>
              </div>
            </div>
          </div>

          <div className="group bg-card border border-border rounded-xl p-6 hover:border-info/50 transition-all duration-300 hover:shadow-lg hover:shadow-info/5">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-xl bg-info/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                <FileCheck className="h-7 w-7 text-info" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground">Policy Governance</h3>
                <p className="text-sm text-muted-foreground mt-1">Automated enforcement with multi-signature approval workflows</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-5">
              <div className="text-center p-3 bg-secondary/50 rounded-lg">
                <p className="text-xl font-bold font-mono text-info">
                  <AnimatedCounter value={47} duration={1500} />
                </p>
                <p className="text-xs text-muted-foreground mt-1">Rules Active</p>
              </div>
              <div className="text-center p-3 bg-secondary/50 rounded-lg">
                <p className="text-xl font-bold font-mono text-foreground">100%</p>
                <p className="text-xs text-muted-foreground mt-1">Enforced</p>
              </div>
              <div className="text-center p-3 bg-secondary/50 rounded-lg">
                <p className="text-xl font-bold font-mono text-warning">
                  <AnimatedCounter value={4} duration={1000} />
                </p>
                <p className="text-xs text-muted-foreground mt-1">Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Treasury */}
          <TreasuryPanel
            totalAum="$2.47B"
            dailyVolume="$312M"
            averageYield="4.87%"
            assets={treasuryAssets}
            chartData={treasuryChartData}
          />

          {/* Middle Column - Compliance */}
          <CompliancePanel
            totalScreened="18,432"
            threatsBlocked="847"
            sanctionsHits="23"
            amlAlerts="156"
            metrics={[]}
            chartData={complianceChartData}
          />

          {/* Right Column - Policy */}
          <PolicyPanel
            totalPolicies={47}
            activePolicies={43}
            pendingApprovals={4}
            complianceScore={98.7}
            rules={policyRules}
          />
        </div>

        {/* Security Overview Section */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Security & Compliance Overview</h3>
              <p className="text-sm text-muted-foreground">Real-time threat monitoring and compliance status</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 border border-success/20 rounded-full">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm font-medium text-success">All Systems Protected</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <SecurityRing score={98.7} label="Compliance Score" sublabel="Exceeds regulatory minimum" />
            
            <div className="md:col-span-3">
              <ThreatCounter blocked={847} flagged={156} cleared={18} />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Ban className="h-3.5 w-3.5" />
                    <span>OFAC Hits</span>
                  </div>
                  <p className="text-lg font-bold font-mono text-destructive">
                    <AnimatedCounter value={23} duration={1500} />
                  </p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Shield className="h-3.5 w-3.5" />
                    <span>PEP Checks</span>
                  </div>
                  <p className="text-lg font-bold font-mono text-warning">
                    <AnimatedCounter value={89} duration={1500} />
                  </p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Lock className="h-3.5 w-3.5" />
                    <span>Mixer Blocked</span>
                  </div>
                  <p className="text-lg font-bold font-mono text-destructive">
                    <AnimatedCounter value={134} duration={1500} />
                  </p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    <span>KYC Verified</span>
                  </div>
                  <p className="text-lg font-bold font-mono text-success">
                    <AnimatedCounter value={1247} duration={2000} />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Threat Feed */}
          <ThreatFeed events={threatEvents} className="lg:col-span-1" />

          {/* Activity Feed */}
          <ActivityFeed activities={activities} className="lg:col-span-1" />

          {/* Network Status & Key Metrics */}
          <div className="space-y-4">
            <NetworkStatus
              nodes={networkNodes}
              uptime="99.99%"
              lastBlock="2.3s"
              tps="4,521"
            />

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card border border-border rounded-lg p-4 transition-all hover:border-primary/30">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Server className="h-4 w-4" />
                  <span className="text-xs">HSM Modules</span>
                </div>
                <p className="text-xl font-bold font-mono text-foreground">
                  <AnimatedCounter value={6} duration={1000} />
                </p>
                <p className="text-xs text-success mt-1">All operational</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 transition-all hover:border-primary/30">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Lock className="h-4 w-4" />
                  <span className="text-xs">Cold Storage</span>
                </div>
                <p className="text-xl font-bold font-mono text-foreground">$1.8B</p>
                <p className="text-xs text-muted-foreground mt-1">73% of AUM</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 transition-all hover:border-primary/30">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-xs">Liquidity</span>
                </div>
                <p className="text-xl font-bold font-mono text-success">$680M</p>
                <p className="text-xs text-muted-foreground mt-1">Instant access</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 transition-all hover:border-primary/30">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <LineChart className="h-4 w-4" />
                  <span className="text-xs">Daily P&L</span>
                </div>
                <p className="text-xl font-bold font-mono text-success">+$1.1M</p>
                <p className="text-xs text-success mt-1">Yield accrued</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border pt-6 mt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">V</span>
                </div>
                <div>
                  <span className="text-sm font-bold text-foreground tracking-wide">VAULT</span>
                  <p className="text-xs text-muted-foreground">Institutional WaaS Infrastructure</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                <span>Licensed by ADGM FSRA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-primary" />
                <span>ISO 27001 Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-primary" />
                <span>SOC 2 Type II Compliant</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

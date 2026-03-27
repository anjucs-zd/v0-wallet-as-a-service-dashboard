"use client"

import { Header } from "@/components/dashboard/header"
import { StatCard } from "@/components/dashboard/stat-card"
import { TreasuryPanel } from "@/components/dashboard/treasury-panel"
import { CompliancePanel } from "@/components/dashboard/compliance-panel"
import { PolicyPanel } from "@/components/dashboard/policy-panel"
import { ThreatFeed } from "@/components/dashboard/threat-feed"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { NetworkStatus } from "@/components/dashboard/network-status"
import {
  Wallet,
  ShieldCheck,
  FileCheck,
  TrendingUp,
  Building2,
  Users,
  Globe,
  Zap,
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

      <main className="p-4 lg:p-6 space-y-6">
        {/* Hero Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Assets Under Management"
            value="$2.47B"
            subValue="Across 4 asset classes"
            trend={{ value: "+8.2%", direction: "up" }}
            accentColor="primary"
            valueClassName="text-primary"
          />
          <StatCard
            title="Transactions Screened (24h)"
            value="18,432"
            subValue="99.87% cleared automatically"
            trend={{ value: "+12.4%", direction: "up" }}
            accentColor="success"
          />
          <StatCard
            title="Threats Blocked (MTD)"
            value="847"
            subValue="$124.5M in prevented losses"
            trend={{ value: "+23%", direction: "up" }}
            accentColor="destructive"
          />
          <StatCard
            title="Active Yield (Avg)"
            value="4.87%"
            subValue="$33.1M monthly return"
            trend={{ value: "+0.3%", direction: "up" }}
            accentColor="success"
            valueClassName="text-success"
          />
        </div>

        {/* Infrastructure Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-lg p-5 flex items-center gap-4 hover:border-primary/50 transition-colors">
            <div className="h-14 w-14 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
              <Building2 className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Treasury Infrastructure</h3>
              <p className="text-sm text-muted-foreground">Institutional-grade liquidity management with yield optimization</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs text-success font-medium">4 Pools Active</span>
                <span className="text-xs text-muted-foreground">$2.47B AUM</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-5 flex items-center gap-4 hover:border-primary/50 transition-colors">
            <div className="h-14 w-14 rounded-xl bg-destructive/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-7 w-7 text-destructive" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Compliance Engine</h3>
              <p className="text-sm text-muted-foreground">Real-time AML/KYC/Sanctions screening with ML-powered detection</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs text-success font-medium">99.99% Uptime</span>
                <span className="text-xs text-muted-foreground">847 Threats Blocked</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-5 flex items-center gap-4 hover:border-primary/50 transition-colors">
            <div className="h-14 w-14 rounded-xl bg-info/20 flex items-center justify-center shrink-0">
              <FileCheck className="h-7 w-7 text-info" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Policy Governance</h3>
              <p className="text-sm text-muted-foreground">Automated policy enforcement with multi-signature controls</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs text-success font-medium">47 Rules Active</span>
                <span className="text-xs text-muted-foreground">100% Enforced</span>
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
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Users className="h-4 w-4" />
                  <span className="text-xs">Active Users</span>
                </div>
                <p className="text-xl font-bold font-mono text-foreground">1,247</p>
                <p className="text-xs text-muted-foreground mt-1">Across 12 entities</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Globe className="h-4 w-4" />
                  <span className="text-xs">Connected Banks</span>
                </div>
                <p className="text-xl font-bold font-mono text-foreground">28</p>
                <p className="text-xs text-muted-foreground mt-1">UAE & International</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Wallet className="h-4 w-4" />
                  <span className="text-xs">Active Wallets</span>
                </div>
                <p className="text-xl font-bold font-mono text-foreground">3,842</p>
                <p className="text-xs text-muted-foreground mt-1">Institutional grade</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Zap className="h-4 w-4" />
                  <span className="text-xs">API Calls (24h)</span>
                </div>
                <p className="text-xl font-bold font-mono text-foreground">2.4M</p>
                <p className="text-xs text-muted-foreground mt-1">99.9% success rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-border pt-6 mt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs">V</span>
                </div>
                <span className="text-sm font-semibold text-foreground">VAULT</span>
              </div>
              <span className="text-xs text-muted-foreground">
                Enterprise Wallet-as-a-Service Infrastructure
              </span>
            </div>
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <span>Licensed by ADGM FSRA</span>
              <span>ISO 27001 Certified</span>
              <span>SOC 2 Type II Compliant</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

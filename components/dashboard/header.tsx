"use client"

import { cn } from "@/lib/utils"
import { Bell, Settings, Search, ChevronDown, Building2, Shield, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "h-16 border-b border-border bg-card/95 backdrop-blur-xl sticky top-0 z-50",
        className
      )}
    >
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center animate-glow">
              <span className="text-primary-foreground font-bold text-lg">V</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-foreground">VAULT</span>
                <span className="px-1.5 py-0.5 bg-primary/20 rounded text-[10px] font-semibold text-primary uppercase tracking-wider">
                  Enterprise
                </span>
              </div>
              <span className="text-xs text-muted-foreground hidden sm:inline">
                Institutional Wallet-as-a-Service
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary border border-border hover:border-primary/50 transition-colors cursor-pointer">
            <Building2 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">IHC Group</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground ml-1" />
          </div>

          {/* Security Status */}
          <div className="hidden xl:flex items-center gap-4 ml-4">
            <div className="flex items-center gap-1.5 text-xs">
              <Lock className="h-3.5 w-3.5 text-success" />
              <span className="text-muted-foreground">HSM:</span>
              <span className="text-success font-medium">Active</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <Shield className="h-3.5 w-3.5 text-success" />
              <span className="text-muted-foreground">Compliance:</span>
              <span className="text-success font-medium">98.7%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary border border-border w-64 hover:border-primary/50 transition-colors">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search transactions, wallets..."
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
            />
            <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              /
            </kbd>
          </div>

          <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-destructive animate-pulse" />
            <span className="absolute top-0.5 right-0.5 h-3.5 w-3.5 rounded-full bg-destructive/30 animate-ping" />
          </Button>

          <Button variant="ghost" size="icon" className="hover:bg-primary/10">
            <Settings className="h-4 w-4 text-muted-foreground" />
          </Button>

          <div className="h-8 w-px bg-border mx-1" />

          <div className="flex items-center gap-3 pl-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/20">
              <span className="text-sm font-bold text-primary">AK</span>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-semibold text-foreground">Ahmed Khalil</p>
              <p className="text-xs text-muted-foreground">Chief Treasury Officer</p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground hidden lg:block" />
          </div>
        </div>
      </div>
    </header>
  )
}

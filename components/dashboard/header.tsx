"use client"

import { cn } from "@/lib/utils"
import { Bell, Settings, Search, ChevronDown, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        "h-16 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50",
        className
      )}
    >
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">V</span>
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-foreground">VAULT</span>
              <span className="text-xs text-muted-foreground ml-2 hidden sm:inline">
                Institutional WaaS
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary border border-border">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">IHC Group</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground ml-1" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary border border-border w-64">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search transactions..."
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
            />
            <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
          </Button>

          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4 text-muted-foreground" />
          </Button>

          <div className="h-8 w-px bg-border mx-1" />

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">AK</span>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-foreground">Ahmed Khalil</p>
              <p className="text-xs text-muted-foreground">Chief Treasury Officer</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Shield, ShieldCheck } from "lucide-react"
import { AnimatedCounter } from "./animated-counter"

interface SecurityRingProps {
  score: number
  label?: string
  sublabel?: string
  className?: string
}

export function SecurityRing({ score, label = "Security Score", sublabel, className }: SecurityRingProps) {
  const [animatedScore, setAnimatedScore] = useState(0)
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (animatedScore / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score)
    }, 300)
    return () => clearTimeout(timer)
  }, [score])

  const getScoreColor = (value: number) => {
    if (value >= 95) return "stroke-success"
    if (value >= 80) return "stroke-primary"
    if (value >= 60) return "stroke-warning"
    return "stroke-destructive"
  }

  const getScoreTextColor = (value: number) => {
    if (value >= 95) return "text-success"
    if (value >= 80) return "text-primary"
    if (value >= 60) return "text-warning"
    return "text-destructive"
  }

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div className="relative">
        <svg width="120" height="120" className="-rotate-90">
          {/* Background ring */}
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-secondary"
          />
          {/* Animated progress ring */}
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={cn("transition-all duration-1000 ease-out", getScoreColor(animatedScore))}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <ShieldCheck className={cn("h-5 w-5 mb-1", getScoreTextColor(animatedScore))} />
          <span className={cn("text-2xl font-bold font-mono", getScoreTextColor(animatedScore))}>
            <AnimatedCounter value={score} duration={1500} />
          </span>
        </div>
      </div>
      <p className="text-xs font-medium text-muted-foreground mt-2 uppercase tracking-wide">{label}</p>
      {sublabel && <p className="text-xs text-muted-foreground">{sublabel}</p>}
    </div>
  )
}

interface ThreatCounterProps {
  blocked: number
  flagged: number
  cleared: number
  className?: string
}

export function ThreatCounter({ blocked, flagged, cleared, className }: ThreatCounterProps) {
  return (
    <div className={cn("grid grid-cols-3 gap-3", className)}>
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center">
        <div className="text-3xl font-bold font-mono text-destructive">
          <AnimatedCounter value={blocked} duration={2000} />
        </div>
        <p className="text-xs text-destructive/80 mt-1 uppercase tracking-wide">Blocked</p>
      </div>
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 text-center">
        <div className="text-3xl font-bold font-mono text-warning">
          <AnimatedCounter value={flagged} duration={2000} />
        </div>
        <p className="text-xs text-warning/80 mt-1 uppercase tracking-wide">Flagged</p>
      </div>
      <div className="bg-success/10 border border-success/20 rounded-lg p-4 text-center">
        <div className="text-3xl font-bold font-mono text-success">
          <AnimatedCounter value={cleared} duration={2000} suffix="K" />
        </div>
        <p className="text-xs text-success/80 mt-1 uppercase tracking-wide">Cleared</p>
      </div>
    </div>
  )
}

"use client"

import { Cloud, Database, Cpu } from "lucide-react"
import { CloudProvider } from "@/types/types"

interface CloudProviderLogoProps {
  provider: CloudProvider
  size?: number
  className?: string
}

const providerConfig = {
  aws: {
    icon: Database,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    name: "AWS"
  },
  azure: {
    icon: Cloud,
    color: "text-blue-500", 
    bgColor: "bg-blue-50",
    name: "Azure"
  },
  gcp: {
    icon: Cpu,
    color: "text-green-500",
    bgColor: "bg-green-50",
    name: "GCP"
  }
} as const

export function CloudProviderLogo({ 
  provider, 
  size = 20, 
  className = "" 
}: CloudProviderLogoProps) {
  const config = providerConfig[provider]
  
  if (!config) {
    return (
      <div className={`inline-flex items-center justify-center bg-muted rounded px-2 py-1 ${className}`}>
        <span className="text-xs font-medium text-muted-foreground">
          {provider.toUpperCase()}
        </span>
      </div>
    )
  }

  const Icon = config.icon

  return (
    <div 
      className={`inline-flex items-center gap-2 ${className}`}
      data-testid="cloud-provider-logo"
    >
      <div className={`p-1.5 rounded-md ${config.bgColor}`}>
        <Icon 
          size={size} 
          className={`${config.color} flex-shrink-0`}
          data-testid="cloud-provider-icon"
        />
      </div>
      <span className="text-sm font-medium hidden sm:inline">
        {config.name}
      </span>
    </div>
  )
}
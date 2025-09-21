"use client"

import { CloudConfig, REGIONS } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Edit, Loader2 } from "lucide-react"

interface CloudTableProps {
  configs: CloudConfig[]
  loading: boolean
  onEdit: (id: string) => void
}

export function CloudTable({ configs, loading, onEdit }: CloudTableProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2 text-muted-foreground">Loading cloud configurations...</span>
      </div>
    )
  }

  if (configs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No cloud configurations found</p>
        <p className="text-sm text-muted-foreground mt-2">
          Create your first cloud configuration to get started
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Cloud Groups</TableHead>
            <TableHead>Regions</TableHead>
            <TableHead>Event Sources</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {configs.map((config) => (
            <TableRow key={config.id}>
              <TableCell>
                <div>
                  <div className="font-medium text-foreground hover:text-[#3b36cf] transition-colors duration-200">{config.name}</div>
                  {config.description && (
                    <div className="text-sm text-muted-foreground">
                      {config.description}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="uppercase">
                  {config.provider}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={config.isActive ? "default" : "secondary"} 
                       className={config.isActive ? "bg-[#3b36cf] hover:bg-[#342db8] text-white" : ""}>
                  {config.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {config.cloudGroupName?.map((group: string) => (
                    <Badge key={group} variant="secondary" className="text-xs">
                      {group}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {config.regionList.slice(0, 3).map((region: string) => (
                    <Badge key={region} variant="outline" className="text-xs">
                      {REGIONS[region] || region}
                    </Badge>
                  ))}
                  {config.regionList.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{config.regionList.length - 3} more
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {config.eventSource?.slice(0, 2).map((source: string) => (
                    <Badge key={source} variant="outline" className="text-xs">
                      {source}
                    </Badge>
                  ))}
                  {config.eventSource && config.eventSource.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{config.eventSource.length - 2} more
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {config.updatedAt ? (
                  <time className="text-sm text-muted-foreground">
                    {new Date(config.updatedAt).toLocaleDateString()}
                  </time>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => config.id && onEdit(config.id)}
                  className="h-8 w-8 p-0 hover:bg-[#f0efff] hover:text-[#3b36cf] hover-scale transition-all duration-200"
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit {config.name}</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
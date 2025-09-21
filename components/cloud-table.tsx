"use client"

import { CloudConfig, REGIONS } from "@/types/types"
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
import { Edit, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import { useMemo, useCallback, useState, memo } from "react"

interface CloudTableProps {
  configs: CloudConfig[]
  loading: boolean
  onEdit: (id: string) => void
}

interface TableRowProps {
  config: CloudConfig
  onEdit: (id: string) => void
}

const ITEMS_PER_PAGE = 50

const CloudTableRow = memo(({ config, onEdit }: TableRowProps) => {
  const handleEdit = useCallback(() => {
    if (config.id) {
      onEdit(config.id)
    }
  }, [config.id, onEdit])

  const cloudGroups = useMemo(() => {
    return config.cloudGroupName?.map((group: string) => (
      <Badge key={group} variant="secondary" className="text-xs">
        {group}
      </Badge>
    ))
  }, [config.cloudGroupName])

  const regions = useMemo(() => {
    const regionBadges = config.regionList.slice(0, 3).map((region: string) => (
      <Badge key={region} variant="outline" className="text-xs">
        {REGIONS[region] || region}
      </Badge>
    ))

    if (config.regionList.length > 3) {
      regionBadges.push(
        <Badge key="more" variant="outline" className="text-xs">
          +{config.regionList.length - 3} more
        </Badge>
      )
    }

    return regionBadges
  }, [config.regionList])

  const eventSources = useMemo(() => {
    if (!config.eventSource) return null

    const sourceBadges = config.eventSource.slice(0, 2).map((source: string) => (
      <Badge key={source} variant="outline" className="text-xs">
        {source}
      </Badge>
    ))

    if (config.eventSource.length > 2) {
      sourceBadges.push(
        <Badge key="more" variant="outline" className="text-xs">
          +{config.eventSource.length - 2} more
        </Badge>
      )
    }

    return sourceBadges
  }, [config.eventSource])

  const formattedDate = useMemo(() => {
    return config.updatedAt
      ? new Date(config.updatedAt).toLocaleDateString()
      : "-"
  }, [config.updatedAt])

  return (
    <TableRow>
      <TableCell className="min-w-[140px]">
        <div>
          <div className="font-medium text-foreground hover:text-[#3b36cf] transition-colors duration-200">
            {config.name}
          </div>
          {config.description && (
            <div className="text-sm text-muted-foreground">
              {config.description}
            </div>
          )}
        </div>
      </TableCell>
      <TableCell className="min-w-[80px]">
        <Badge variant="outline" className="uppercase">
          {config.provider}
        </Badge>
      </TableCell>
      <TableCell className="min-w-[80px]">
        <Badge
          variant={config.isActive ? "default" : "secondary"}
          className={config.isActive ? "bg-[#3b36cf] hover:bg-[#342db8] text-white" : ""}
        >
          {config.isActive ? "Active" : "Inactive"}
        </Badge>
      </TableCell>
      <TableCell className="min-w-[120px] hidden md:table-cell">
        <div className="flex flex-wrap gap-1">
          {cloudGroups}
        </div>
      </TableCell>
      <TableCell className="min-w-[120px] hidden lg:table-cell">
        <div className="flex flex-wrap gap-1">
          {regions}
        </div>
      </TableCell>
      <TableCell className="min-w-[120px] hidden xl:table-cell">
        <div className="flex flex-wrap gap-1">
          {eventSources}
        </div>
      </TableCell>
      <TableCell className="min-w-[100px] hidden sm:table-cell">
        <time className="text-sm text-muted-foreground">
          {formattedDate}
        </time>
      </TableCell>
      <TableCell className="text-right min-w-[80px] w-[80px]">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleEdit}
          className="h-8 w-8 p-0 hover:bg-[#f0efff] hover:text-[#3b36cf] hover-scale transition-all duration-200"
        >
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit {config.name}</span>
        </Button>
      </TableCell>
    </TableRow>
  )
})

CloudTableRow.displayName = "CloudTableRow"

export function CloudTable({ configs, loading, onEdit }: CloudTableProps) {
  const [currentPage, setCurrentPage] = useState(0)

  const memoizedOnEdit = useCallback(onEdit, [onEdit])

  const paginatedConfigs = useMemo(() => {
    const startIndex = currentPage * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return configs.slice(startIndex, endIndex)
  }, [configs, currentPage])

  const totalPages = useMemo(() => {
    return Math.ceil(configs.length / ITEMS_PER_PAGE)
  }, [configs.length])

  const handlePreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }, [])

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
  }, [totalPages])

  const paginationInfo = useMemo(() => {
    const startItem = currentPage * ITEMS_PER_PAGE + 1
    const endItem = Math.min((currentPage + 1) * ITEMS_PER_PAGE, configs.length)
    return { startItem, endItem, totalItems: configs.length }
  }, [currentPage, configs.length])

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
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[140px]">Name</TableHead>
              <TableHead className="min-w-[80px]">Provider</TableHead>
              <TableHead className="min-w-[80px]">Status</TableHead>
              <TableHead className="min-w-[120px] hidden md:table-cell">Cloud Groups</TableHead>
              <TableHead className="min-w-[120px] hidden lg:table-cell">Regions</TableHead>
              <TableHead className="min-w-[120px] hidden xl:table-cell">Event Sources</TableHead>
              <TableHead className="min-w-[100px] hidden sm:table-cell">Updated</TableHead>
              <TableHead className="text-right min-w-[80px] w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedConfigs.map((config) => (
              <CloudTableRow
                key={config.id}
                config={config}
                onEdit={memoizedOnEdit}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            Showing {paginationInfo.startItem} to {paginationInfo.endItem} of{" "}
            {paginationInfo.totalItems} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <div className="text-sm font-medium">
              Page {currentPage + 1} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
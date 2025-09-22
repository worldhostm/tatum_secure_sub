"use client"

import { CloudConfig, REGIONS } from "@/types/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CloudProviderLogo } from "@/components/cloud-provider-logo"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Edit, Loader2, ChevronLeft, ChevronRight, Trash2, Power, PowerOff } from "lucide-react"
import { useMemo, useCallback, useState, memo, useEffect, useRef } from "react"

interface CloudTableProps {
  configs: CloudConfig[]
  loading: boolean
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

interface TableRowProps {
  config: CloudConfig
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  showShadow: boolean
}

const ITEMS_PER_PAGE = 50

const CloudTableRow = memo(({ config, onEdit, onDelete, showShadow }: TableRowProps) => {
  const onEditClick = useCallback(() => {
    if (config.id) {
      onEdit(config.id)
    }
  }, [config.id, onEdit])

  const onDeleteClick = useCallback(() => {
    if (config.id) {
      onDelete(config.id)
    }
  }, [config.id, onDelete])

  const cloudGroups = useMemo(() => {
    return config.cloudGroupName?.map((group: string) => (
      <Badge key={group} variant="secondary" className="text-xs bg-[#f0efff] text-[#3b36cf] border-[#e0dfff] hover:bg-[#e8e7ff]">
        {group}
      </Badge>
    ))
  }, [config.cloudGroupName])

  const regions = useMemo(() => {
    const regionBadges = config.regionList.slice(0, 3).map((region: string) => (
      <Badge key={region} variant="outline" className="text-xs bg-[#f0efff] text-[#3b36cf] border-[#e0dfff] hover:bg-[#e8e7ff]">
        {REGIONS[region] || region}
      </Badge>
    ))

    if (config.regionList.length > 3) {
      regionBadges.push(
        <Badge key="more" variant="outline" className="text-xs bg-[#f0efff] text-[#3b36cf] border-[#e0dfff] hover:bg-[#e8e7ff]">
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
      <TableCell className={`min-w-[140px] sticky left-0 bg-white z-20 border-r ${showShadow ? 'shadow-lg' : ''}`}>
        <div>
          <div className="font-medium text-foreground hover:text-[#3b36cf] transition-colors duration-200">
            {config.name}
          </div>
          {/* {config.description && (
            <div className="text-sm text-muted-foreground">
              {config.description}
            </div>
          )} */}
        </div>
      </TableCell>
      <TableCell className="min-w-[100px]">
        <CloudProviderLogo provider={config.provider} size={20} />
      </TableCell>
      <TableCell className="min-w-[80px]">
        <Badge
          variant={config.isActive ? "default" : "secondary"}
          className={config.isActive ? "bg-[#3b36cf] hover:bg-[#342db8] text-white" : ""}
        >
          {config.isActive ? "Active" : "Inactive"}
        </Badge>
      </TableCell>
      <TableCell className="min-w-[120px]">
        <div className="flex flex-wrap gap-1">
          {cloudGroups}
        </div>
      </TableCell>
      <TableCell className="min-w-[120px]">
        <div className="flex flex-wrap gap-1">
          {regions}
        </div>
      </TableCell>
      <TableCell className="min-w-[120px]">
        <div className="flex flex-wrap gap-1">
          {eventSources}
        </div>
      </TableCell>
      <TableCell className="min-w-[100px]">
        <time className="text-sm text-muted-foreground">
          {formattedDate}
        </time>
      </TableCell>
      <TableCell className="min-w-[100px]">
        <div className="flex items-center gap-2">
          {config.isActive ? (
            <Power className="h-4 w-4 text-green-500" />
          ) : (
            <PowerOff className="h-4 w-4 text-gray-400" />
          )}
          <span className="text-sm font-medium">
            {config.isActive ? "ON" : "OFF"}
          </span>
        </div>
      </TableCell>
      <TableCell className="min-w-[100px]">
        <Badge 
          variant={config.scheduleScanEnabled ? "default" : "secondary"}
          className={config.scheduleScanEnabled 
            ? "bg-[#3b36cf] hover:bg-[#342db8] text-white" 
            : "bg-gray-100 text-gray-600"
          }
        >
          {config.scheduleScanEnabled ? "Set" : "Not set"}
        </Badge>
      </TableCell>
      <TableCell className="text-center w-[60px] sticky right-[60px] bg-white z-20 border-l shadow-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={onEditClick}
          className="h-8 w-8 p-0 hover:bg-[#f0efff] transition-all duration-200"
        >
          <Edit className="h-4 w-4 text-[#3b36cf]" />
          <span className="sr-only">Edit {config.name}</span>
        </Button>
      </TableCell>
      <TableCell className="text-center w-[60px] sticky right-0 bg-white z-20 border-l shadow-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={onDeleteClick}
          className="h-8 w-8 p-0 hover:bg-red-50 transition-all duration-200"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
          <span className="sr-only">Delete {config.name}</span>
        </Button>
      </TableCell>
    </TableRow>
  )
})

CloudTableRow.displayName = "CloudTableRow"

export function CloudTable({ configs, loading, onEdit, onDelete }: CloudTableProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [showShadow, setShowShadow] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const memoizedOnEdit = useCallback(onEdit, [onEdit])
  const memoizedOnDelete = useCallback(onDelete, [onDelete])

  useEffect(() => {
    const onScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft } = scrollRef.current
        setShowShadow(scrollLeft > 0)
      }
    }

    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', onScroll)
      // 초기 상태 체크
      onScroll()
      
      return () => {
        scrollElement.removeEventListener('scroll', onScroll)
      }
    }
  }, [])

  const paginatedConfigs = useMemo(() => {
    const startIndex = currentPage * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return configs.slice(startIndex, endIndex)
  }, [configs, currentPage])

  const totalPages = useMemo(() => {
    return Math.ceil(configs.length / ITEMS_PER_PAGE)
  }, [configs.length])

  const onPreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }, [])

  const onNextPage = useCallback(() => {
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
        <div className="relative">
          <div ref={scrollRef} className="overflow-x-auto">
            <Table className="relative min-w-[1200px]">
              <TableHeader>
                <TableRow>
                  <TableHead className={`min-w-[140px] sticky left-0 bg-white z-20 border-r ${showShadow ? 'shadow-lg' : ''}`}>Name</TableHead>
                  <TableHead className="min-w-[100px]">Provider</TableHead>
                  <TableHead className="min-w-[80px]">Status</TableHead>
                  <TableHead className="min-w-[120px]">Cloud Groups</TableHead>
                  <TableHead className="min-w-[120px]">Regions</TableHead>
                  <TableHead className="min-w-[120px]">Event Sources</TableHead>
                  <TableHead className="min-w-[100px]">Updated</TableHead>
                  <TableHead className="min-w-[100px]">User Action</TableHead>
                  <TableHead className="min-w-[100px]">Scan Schedule</TableHead>
                  <TableHead className="text-center w-[60px] sticky right-[60px] bg-white z-20 border-l shadow-sm">Edit</TableHead>
                  <TableHead className="text-center w-[60px] sticky right-0 bg-white z-20 border-l shadow-sm">Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedConfigs.map((config) => (
                  <CloudTableRow
                    key={config.id}
                    config={config}
                    onEdit={memoizedOnEdit}
                    onDelete={memoizedOnDelete}
                    showShadow={showShadow}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
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
              onClick={onPreviousPage}
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
              onClick={onNextPage}
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
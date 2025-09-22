"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CloudDialog } from "./cloud-dialog"
import { CloudTable } from "./cloud-table"
import { CloudConfig } from "@/types/types"
import { cloudApi } from "@/lib/api"
import { Plus } from "lucide-react"
import { toast } from "sonner"

export function CloudListPage() {
  const [cloudConfigs, setCloudConfigs] = useState<CloudConfig[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingConfig, setEditingConfig] = useState<CloudConfig | undefined>()

  useEffect(() => {
    loadCloudConfigs()
  }, [])

  const loadCloudConfigs = async () => {
    try {
      setLoading(true)
      const configs = await cloudApi.getCloudConfigs()
      setCloudConfigs(configs)
    } catch (error) {
      console.error("Failed to load cloud configs:", error)
      toast.error("Failed to load cloud configurations")
    } finally {
      setLoading(false)
    }
  }

  const onCreateNew = () => {
    setEditingConfig(undefined)
    setDialogOpen(true)
  }

  const onEditConfig = async (id: string) => {
    try {
      const config = await cloudApi.getCloudConfig(id)
      if (config) {
        setEditingConfig(config)
        setDialogOpen(true)
      }
    } catch (error) {
      console.error("Failed to load cloud config:", error)
      toast.error("Failed to load cloud configuration details")
    }
  }

  const onDeleteConfig = async (id: string) => {
    try {
      await cloudApi.deleteCloudConfig(id)
      toast.success("Cloud configuration deleted successfully")
      loadCloudConfigs()
    } catch (error) {
      console.error("Failed to delete cloud config:", error)
      toast.error("Failed to delete cloud configuration")
    }
  }

  const onDialogClose = () => {
    setDialogOpen(false)
    setEditingConfig(undefined)
  }

  const onSaveSuccess = () => {
    onDialogClose()
    loadCloudConfigs()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Cloud Configurations</h1>
          <p className="text-muted-foreground">
            Manage your cloud provider configurations and integrations
          </p>
        </div>
        <Button onClick={onCreateNew} className="flex items-center gap-2 bg-[#3b36cf] hover:bg-[#342db8] text-white hover-lift">
          <Plus className="h-4 w-4" />
          Create Cloud Configuration
        </Button>
      </div>

      <CloudTable 
        configs={cloudConfigs} 
        loading={loading} 
        onEdit={onEditConfig}
        onDelete={onDeleteConfig}
      />

      <CloudDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        config={editingConfig}
        onSuccess={onSaveSuccess}
      />
    </div>
  )
}
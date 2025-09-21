"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  CloudConfig,
  CloudConfigFormData,
  CloudConfigSchema,
  CloudProvider,
  PROVIDER_CONFIGS,
  CLOUD_GROUP_NAMES,
  REGIONS
} from "@/types/types"
import { cloudApi } from "@/lib/api"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MultiSelect, Option } from "@/components/ui/multi-select"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

interface CloudDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  config?: CloudConfig
  onSuccess: () => void
}

export function CloudDialog({ open, onOpenChange, config, onSuccess }: CloudDialogProps) {
  const [loading, setLoading] = useState(false)
  const isEditing = !!config

  const form = useForm<CloudConfigFormData>({
    resolver: zodResolver(CloudConfigSchema),
    defaultValues: {
      name: "",
      description: "",
      provider: "aws",
      cloudGroupName: [],
      regionList: ["global"],
      credentials: {},
      eventSource: [],
      isActive: true,
      eventProcessEnabled: true,
      userActivityEnabled: true,
      scheduleScanEnabled: false,
      proxyUrl: "",
    },
  })

  const watchedProvider = form.watch("provider")
  const providerConfig = PROVIDER_CONFIGS[watchedProvider]

  useEffect(() => {
    if (open && config) {
      const credentials = {
        aws: config.provider === "aws" ? config.credentials : undefined,
        azure: config.provider === "azure" ? config.credentials : undefined,
        gcp: config.provider === "gcp" ? config.credentials : undefined,
      }
      
      form.reset({
        name: config.name,
        description: config.description || "",
        provider: config.provider,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cloudGroupName: (config.cloudGroupName || []) as any,
        regionList: config.regionList,
        credentials,
        eventSource: config.eventSource || [],
        isActive: config.isActive ?? true,
        eventProcessEnabled: config.eventProcessEnabled ?? true,
        userActivityEnabled: config.userActivityEnabled ?? true,
        scheduleScanEnabled: config.scheduleScanEnabled ?? false,
        proxyUrl: config.proxyUrl || "",
      })
    } else if (open && !config) {
      form.reset({
        name: "",
        description: "",
        provider: "aws",
        cloudGroupName: [],
        regionList: ["global"],
        credentials: {},
        eventSource: [],
        isActive: true,
        eventProcessEnabled: true,
        userActivityEnabled: true,
        scheduleScanEnabled: false,
        proxyUrl: "",
      })
    }
  }, [open, config, form])

  useEffect(() => {
    const currentEventSources = form.getValues("eventSource")
    const newProviderSources = providerConfig.eventSources
    
    const validSources = currentEventSources.filter(source => 
      newProviderSources.includes(source)
    )
    
    if (validSources.length === 0 && newProviderSources.length > 0) {
      form.setValue("eventSource", [newProviderSources[0]])
    } else if (validSources.length !== currentEventSources.length) {
      form.setValue("eventSource", validSources)
    }
  }, [watchedProvider, form, providerConfig])

  const onSubmit = async (data: CloudConfigFormData) => {
    try {
      setLoading(true)
      
      if (isEditing && config?.id) {
        await cloudApi.updateCloudConfig(config.id, data)
        toast.success("Cloud configuration updated successfully")
      } else {
        await cloudApi.createCloudConfig(data)
        toast.success("Cloud configuration created successfully")
      }
      
      onSuccess()
    } catch (error) {
      console.error("Failed to save cloud config:", error)
      toast.error(
        isEditing 
          ? "Failed to update cloud configuration" 
          : "Failed to create cloud configuration"
      )
    } finally {
      setLoading(false)
    }
  }

  const handleProviderChange = (provider: CloudProvider) => {
    form.setValue("provider", provider)
    form.setValue("credentials", {})
    form.setValue("eventSource", [])
  }

  const cloudGroupOptions: Option[] = CLOUD_GROUP_NAMES.map(group => ({
    value: group,
    label: group.charAt(0).toUpperCase() + group.slice(1)
  }))

  const regionOptions: Option[] = Object.entries(REGIONS).map(([key, value]) => ({
    value: key,
    label: value
  }))

  const eventSourceOptions: Option[] = providerConfig.eventSources.map(source => ({
    value: source,
    label: source.charAt(0).toUpperCase() + source.slice(1).replace(/-/g, ' ')
  }))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white border-2 border-gray-200 shadow-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Cloud Configuration" : "Create Cloud Configuration"}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "Update the cloud configuration settings below."
              : "Configure a new cloud provider integration."
            }
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Configuration Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., Production AWS" 
                        {...field} 
                        className="focus:ring-[#3b36cf] focus:border-[#3b36cf] transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief description of this configuration..."
                        {...field}
                        className="focus:ring-[#3b36cf] focus:border-[#3b36cf] transition-all duration-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="provider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cloud Provider</FormLabel>
                    <Select 
                      onValueChange={handleProviderChange} 
                      value={field.value}
                      disabled={watchedProvider !== "aws"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a cloud provider" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(PROVIDER_CONFIGS).map((config) => (
                          <SelectItem 
                            key={config.provider} 
                            value={config.provider}
                            disabled={config.disabled}
                          >
                            {config.provider.toUpperCase()}
                            {config.disabled && " (Coming Soon)"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cloudGroupName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cloud Groups</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={cloudGroupOptions}
                          selected={field.value}
                          onSelectionChange={field.onChange}
                          placeholder="Select cloud groups..."
                        />
                      </FormControl>
                      <FormDescription>
                        Select one or more cloud groups for this configuration.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="regionList"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Regions</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={regionOptions}
                          selected={field.value}
                          onSelectionChange={field.onChange}
                          placeholder="Select regions..."
                        />
                      </FormControl>
                      <FormDescription>
                        Global region is required and automatically included.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {providerConfig.credentialFields.map((credField) => {
                const fieldName = `credentials.${watchedProvider}.${credField.key}` as const
                return (
                  <FormField
                    key={credField.key}
                    control={form.control}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    name={fieldName as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {credField.label}
                          {credField.required && <span className="text-red-500 ml-1">*</span>}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type={credField.type}
                            placeholder={credField.placeholder}
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              })}

              <FormField
                control={form.control}
                name="eventSource"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Sources</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={eventSourceOptions}
                        selected={field.value}
                        onSelectionChange={field.onChange}
                        placeholder="Select event sources..."
                      />
                    </FormControl>
                    <FormDescription>
                      Choose the event sources to monitor for this provider.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Active Configuration
                      </FormLabel>
                      <FormDescription>
                        Enable this configuration to start monitoring events.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={loading}
                className="hover:border-[#a89fff] hover:text-[#3b36cf] transition-all duration-200"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-[#3b36cf] hover:bg-[#342db8] text-white hover-lift focus-brand disabled:opacity-50 disabled:hover:bg-[#3b36cf]"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? "Update Configuration" : "Create Configuration"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
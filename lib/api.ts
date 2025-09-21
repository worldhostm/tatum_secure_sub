import { CloudConfig, CloudConfigFormData } from "@/types"
import { mockCloudConfigs } from "./data"

const mockData = [...mockCloudConfigs]

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const cloudApi = {
  async getCloudConfigs(): Promise<CloudConfig[]> {
    await delay(500)
    return [...mockData]
  },

  async getCloudConfig(id: string): Promise<CloudConfig | null> {
    await delay(500)
    const config = mockData.find(config => config.id === id)
    return config ? { ...config } : null
  },

  async createCloudConfig(data: CloudConfigFormData): Promise<CloudConfig> {
    await delay(500)
    
    const newConfig: CloudConfig = {
      ...data,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      credentials: data.credentials[data.provider] as any,
      credentialType: "ACCESS_KEY",
      eventProcessEnabled: data.eventProcessEnabled ?? true,
      userActivityEnabled: data.userActivityEnabled ?? true,
      scheduleScanEnabled: data.scheduleScanEnabled ?? false,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    mockData.push(newConfig)
    console.log("Create Cloud Config Payload:", data)
    return { ...newConfig }
  },

  async updateCloudConfig(id: string, data: CloudConfigFormData): Promise<CloudConfig> {
    await delay(500)
    
    const index = mockData.findIndex(config => config.id === id)
    if (index === -1) {
      throw new Error("Cloud config not found")
    }

    const updatedConfig: CloudConfig = {
      ...data,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      credentials: data.credentials[data.provider] as any,
      credentialType: mockData[index].credentialType || "ACCESS_KEY",
      eventProcessEnabled: data.eventProcessEnabled ?? mockData[index].eventProcessEnabled ?? true,
      userActivityEnabled: data.userActivityEnabled ?? mockData[index].userActivityEnabled ?? true,
      scheduleScanEnabled: data.scheduleScanEnabled ?? mockData[index].scheduleScanEnabled ?? false,
      id,
      createdAt: mockData[index].createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    mockData[index] = updatedConfig
    console.log("Update Cloud Config Payload:", data)
    return { ...updatedConfig }
  },

  async deleteCloudConfig(id: string): Promise<void> {
    await delay(500)
    
    const index = mockData.findIndex(config => config.id === id)
    if (index === -1) {
      throw new Error("Cloud config not found")
    }

    mockData.splice(index, 1)
    console.log("Delete Cloud Config ID:", id)
  }
}
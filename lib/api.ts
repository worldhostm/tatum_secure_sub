import { CloudConfig, CloudConfigFormData } from "@/types/types"
import { mockCloudConfigs } from "./data"

const STORAGE_KEY = 'cloud-configs'

// localStorage에서 데이터 로드, 없으면 기본 mockData 사용
const loadFromStorage = (): CloudConfig[] => {
  if (typeof window === 'undefined') return [...mockCloudConfigs]
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Failed to load from localStorage:', error)
  }
  
  return [...mockCloudConfigs]
}

// localStorage에 데이터 저장
const saveToStorage = (data: CloudConfig[]) => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('Failed to save to localStorage:', error)
  }
}

let mockData = loadFromStorage()

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const cloudApi = {
  async getCloudConfigs(): Promise<CloudConfig[]> {
    await delay(500)
    mockData = loadFromStorage() // 항상 최신 데이터 로드
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
    saveToStorage(mockData) // localStorage에 저장
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
    saveToStorage(mockData) // localStorage에 저장
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
    saveToStorage(mockData) // localStorage에 저장
    console.log("Delete Cloud Config ID:", id)
  }
}
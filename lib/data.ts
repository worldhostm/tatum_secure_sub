import { CloudConfig } from "@/types"

export const mockCloudConfigs: CloudConfig[] = [
  {
    id: "1",
    name: "Production AWS",
    description: "Main production environment for AWS services",
    provider: "aws",
    cloudGroupName: ["production"],
    regionList: ["global", "us-east-1", "us-west-2"],
    credentials: {
      accessKeyId: "AKIA********18",
      secretAccessKey: "*********************",
      roleArn: "arn:aws:iam::123456789012:role/ProductionRole"
    },
    credentialType: "ACCESS_KEY",
    eventSource: ["cloudtrail", "cloudwatch"],
    eventProcessEnabled: true,
    userActivityEnabled: true,
    scheduleScanEnabled: false,
    isActive: true,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T15:45:00Z"
  },
  {
    id: "2", 
    name: "Development AWS",
    description: "Development and testing environment",
    provider: "aws",
    cloudGroupName: ["development", "testing"],
    regionList: ["global", "us-east-1"],
    credentials: {
      accessKeyId: "AKIA********12",
      secretAccessKey: "*********************"
    },
    credentialType: "ACCESS_KEY",
    eventSource: ["cloudtrail", "config"],
    eventProcessEnabled: true,
    userActivityEnabled: false,
    scheduleScanEnabled: true,
    isActive: true,
    createdAt: "2024-01-10T09:15:00Z",
    updatedAt: "2024-01-18T11:20:00Z"
  },
  {
    id: "3",
    name: "Staging Environment", 
    description: "Pre-production staging environment",
    provider: "aws",
    cloudGroupName: ["staging"],
    regionList: ["global", "us-west-2", "eu-west-1"],
    credentials: {
      accessKeyId: "AKIA********34",
      secretAccessKey: "*********************"
    },
    credentialType: "ACCESS_KEY",
    eventSource: ["cloudtrail", "cloudwatch", "inspector"],
    eventProcessEnabled: true,
    userActivityEnabled: true,
    scheduleScanEnabled: false,
    isActive: false,
    createdAt: "2024-01-08T14:22:00Z", 
    updatedAt: "2024-01-16T16:30:00Z"
  },
  {
    id: "4",
    name: "Multi-Region Setup",
    description: "Global multi-region configuration",
    provider: "aws",
    cloudGroupName: ["production", "qa"],
    regionList: ["global", "us-east-1", "us-west-2", "eu-west-1", "ap-southeast-1"],
    credentials: {
      accessKeyId: "AKIA********56",
      secretAccessKey: "*********************"
    },
    credentialType: "ACCESS_KEY",
    eventSource: ["cloudtrail", "cloudwatch", "config", "inspector"],
    eventProcessEnabled: true,
    userActivityEnabled: true,
    scheduleScanEnabled: true,
    isActive: true,
    createdAt: "2024-01-05T08:00:00Z",
    updatedAt: "2024-01-22T12:45:00Z"
  }
]
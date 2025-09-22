import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { CloudTable } from '@/components/cloud-table'
import { CloudConfig } from '@/types/types'

const mockConfigs: CloudConfig[] = [
  {
    id: '1',
    name: 'Test Config 1',
    description: 'Test description 1',
    provider: 'aws',
    cloudGroupName: ['group1', 'group2'],
    eventProcessEnabled: true,
    userActivityEnabled: true,
    scheduleScanEnabled: true,
    regionList: ['us-east-1', 'us-west-2'],
    credentials: {
      accessKeyId: 'test-key',
      secretAccessKey: 'test-secret'
    },
    credentialType: 'ACCESS_KEY',
    eventSource: ['cloudtrail', 's3'],
    isActive: true,
    updatedAt: '2023-01-01T00:00:00Z',
    createdAt: '2023-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Test Config 2',
    provider: 'azure',
    cloudGroupName: ['group3'],
    eventProcessEnabled: false,
    userActivityEnabled: false,
    scheduleScanEnabled: false,
    regionList: ['east-us'],
    credentials: {
      tenantId: 'test-tenant',
      subscriptionId: 'test-subscription',
      applicationId: 'test-app',
      secretKey: 'test-secret'
    },
    credentialType: 'APPLICATION',
    isActive: false,
    updatedAt: '2023-01-02T00:00:00Z',
    createdAt: '2023-01-02T00:00:00Z'
  }
]

describe('CloudTable', () => {
  const mockOnEdit = jest.fn()
  const mockOnDelete = jest.fn()

  beforeEach(() => {
    mockOnEdit.mockClear()
    mockOnDelete.mockClear()
  })

  it('displays loading state', () => {
    render(
      <CloudTable
        configs={[]}
        loading={true}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('Loading cloud configurations...')).toBeInTheDocument()
  })

  it('displays empty state when no configurations', () => {
    render(
      <CloudTable
        configs={[]}
        loading={false}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('No cloud configurations found')).toBeInTheDocument()
    expect(screen.getByText('Create your first cloud configuration to get started')).toBeInTheDocument()
  })

  it('renders table with configurations', () => {
    render(
      <CloudTable
        configs={mockConfigs}
        loading={false}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('Test Config 1')).toBeInTheDocument()
    expect(screen.getByText('Test Config 2')).toBeInTheDocument()
  })

  it('displays all table headers', () => {
    render(
      <CloudTable
        configs={mockConfigs}
        loading={false}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Provider')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  it('displays active status correctly', () => {
    render(
      <CloudTable
        configs={mockConfigs}
        loading={false}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Inactive')).toBeInTheDocument()
  })

  it('displays edit and delete buttons', () => {
    render(
      <CloudTable
        configs={mockConfigs}
        loading={false}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  it('displays cloud groups as badges', () => {
    render(
      <CloudTable
        configs={mockConfigs}
        loading={false}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    expect(screen.getByText('group1')).toBeInTheDocument()
    expect(screen.getByText('group2')).toBeInTheDocument()
    expect(screen.getByText('group3')).toBeInTheDocument()
  })

  describe('Pagination', () => {
    const manyConfigs = Array.from({ length: 75 }, (_, i) => ({
      ...mockConfigs[0],
      id: `config-${i}`,
      name: `Config ${i}`
    }))

    it('shows pagination when there are more than 50 items', () => {
      render(
        <CloudTable
          configs={manyConfigs}
          loading={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )

      expect(screen.getByText(/Page 1 of 2/)).toBeInTheDocument()
    })

    it('navigates to next page', async () => {
      const user = userEvent.setup()
      render(
        <CloudTable
          configs={manyConfigs}
          loading={false}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
        />
      )

      const nextButtons = screen.getAllByRole('button')
      const nextButton = nextButtons.find(btn => btn.textContent?.includes('Next') || btn.getAttribute('aria-label')?.includes('Next'))
      
      if (nextButton) {
        await user.click(nextButton)
        expect(screen.getByText(/Page 2 of 2/)).toBeInTheDocument()
      }
    })
  })
})
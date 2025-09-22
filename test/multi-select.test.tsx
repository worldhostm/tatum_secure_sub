import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { MultiSelect, Option } from '@/components/ui/multi-select'

const mockOptions: Option[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
]

describe('MultiSelect', () => {
  const mockOnSelectionChange = jest.fn()

  beforeEach(() => {
    mockOnSelectionChange.mockClear()
  })

  it('renders with placeholder when no items selected', () => {
    render(
      <MultiSelect
        options={mockOptions}
        selected={[]}
        onSelectionChange={mockOnSelectionChange}
        placeholder="Select items..."
      />
    )

    expect(screen.getByText('Select items...')).toBeInTheDocument()
  })

  it('displays selected items as badges', () => {
    render(
      <MultiSelect
        options={mockOptions}
        selected={['option1', 'option2']}
        onSelectionChange={mockOnSelectionChange}
      />
    )

    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument()
  })

  it('opens dropdown when clicked', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect
        options={mockOptions}
        selected={[]}
        onSelectionChange={mockOnSelectionChange}
      />
    )

    const trigger = screen.getByRole('combobox')
    await user.click(trigger)

    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
    expect(screen.getByText('Option 3')).toBeInTheDocument()
  })

  it('selects item when clicked', async () => {
    const user = userEvent.setup()
    render(
      <MultiSelect
        options={mockOptions}
        selected={[]}
        onSelectionChange={mockOnSelectionChange}
      />
    )

    const trigger = screen.getByRole('combobox')
    await user.click(trigger)

    const option = screen.getByText('Option 1')
    await user.click(option)

    expect(mockOnSelectionChange).toHaveBeenCalledWith(['option1'])
  })

  it('is disabled when disabled prop is true', () => {
    render(
      <MultiSelect
        options={mockOptions}
        selected={[]}
        onSelectionChange={mockOnSelectionChange}
        disabled={true}
      />
    )

    const trigger = screen.getByRole('combobox')
    expect(trigger).toBeDisabled()
  })

  it('applies custom className', () => {
    const customClass = 'custom-test-class'
    render(
      <MultiSelect
        options={mockOptions}
        selected={[]}
        onSelectionChange={mockOnSelectionChange}
        className={customClass}
      />
    )

    const trigger = screen.getByRole('combobox')
    expect(trigger).toHaveClass(customClass)
  })
})
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { CloudProviderLogo } from '@/components/cloud-provider-logo'

describe('CloudProviderLogo', () => {
  it('renders AWS provider logo', () => {
    render(<CloudProviderLogo provider="aws" size={20} />)
    
    const logo = screen.getByTestId('cloud-provider-logo')
    expect(logo).toBeInTheDocument()
    
    const providerName = screen.getByText('AWS')
    expect(providerName).toBeInTheDocument()
  })

  it('renders Azure provider logo', () => {
    render(<CloudProviderLogo provider="azure" size={20} />)
    
    const logo = screen.getByTestId('cloud-provider-logo')
    expect(logo).toBeInTheDocument()
    
    const providerName = screen.getByText('Azure')
    expect(providerName).toBeInTheDocument()
  })

  it('renders GCP provider logo', () => {
    render(<CloudProviderLogo provider="gcp" size={20} />)
    
    const logo = screen.getByTestId('cloud-provider-logo')
    expect(logo).toBeInTheDocument()
    
    const providerName = screen.getByText('GCP')
    expect(providerName).toBeInTheDocument()
  })

  it('renders with custom size', () => {
    render(<CloudProviderLogo provider="aws" size={32} />)
    
    const icon = screen.getByTestId('cloud-provider-icon')
    expect(icon).toHaveAttribute('width', '32')
    expect(icon).toHaveAttribute('height', '32')
  })

  it('renders with default size', () => {
    render(<CloudProviderLogo provider="aws" />)
    
    const icon = screen.getByTestId('cloud-provider-icon')
    expect(icon).toHaveAttribute('width', '20')
    expect(icon).toHaveAttribute('height', '20')
  })

  it('applies custom className', () => {
    const customClass = 'custom-test-class'
    render(<CloudProviderLogo provider="aws" className={customClass} />)
    
    const logo = screen.getByTestId('cloud-provider-logo')
    expect(logo).toHaveClass(customClass)
  })
})
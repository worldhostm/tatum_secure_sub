import { cn } from '@/lib/utils'

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    const result = cn('class1', 'class2')
    expect(result).toContain('class1')
    expect(result).toContain('class2')
  })

  it('handles conditional classes', () => {
    const condition = true
    const result = cn('base-class', condition && 'conditional-class')
    expect(result).toContain('base-class')
    expect(result).toContain('conditional-class')
  })

  it('ignores falsy values', () => {
    const result = cn('class1', false, null, undefined, '', 'class2')
    expect(result).toContain('class1')
    expect(result).toContain('class2')
  })

  it('handles arrays of classes', () => {
    const result = cn(['class1', 'class2'], 'class3')
    expect(result).toContain('class1')
    expect(result).toContain('class2')
    expect(result).toContain('class3')
  })

  it('handles objects with boolean values', () => {
    const result = cn({
      'active': true,
      'disabled': false,
      'visible': true
    })
    expect(result).toContain('active')
    expect(result).toContain('visible')
    expect(result).not.toContain('disabled')
  })

  it('handles empty input', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('handles complex conditional logic', () => {
    const isActive = true
    const isDisabled = false
    const size = 'large'
    
    const result = cn(
      'base-button',
      isActive && 'active-state',
      isDisabled && 'disabled-state',
      size === 'large' && 'large-size',
      size !== 'large' && size === 'small' && 'small-size'
    )
    
    expect(result).toContain('base-button')
    expect(result).toContain('active-state')
    expect(result).toContain('large-size')
    expect(result).not.toContain('disabled-state')
    expect(result).not.toContain('small-size')
  })
})
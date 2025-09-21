# Color Scheme Guide

## 🎨 Brand Color: #3B36CF

This document outlines the color scheme implementation for the Cloud Configuration Management application, featuring the brand color `#3B36CF` as the primary accent color.

## Color Philosophy

- **Text**: Default black (`#171717` in light mode, `#ededed` in dark mode)
- **Accent**: Brand color `#3B36CF` for hover states, buttons, and emphasis
- **Background**: Clean white/dark backgrounds for optimal readability
- **Interactive Elements**: Brand color highlights on hover and focus states

## Brand Color Palette

```css
Brand Color Variations:
- 50:  #f0efff (Very Light)
- 100: #e4e1ff (Light) 
- 200: #cbc6ff (Light Medium)
- 300: #a89fff (Medium Light)
- 400: #7e6cff (Medium)
- 500: #3b36cf (Primary Brand - Main)
- 600: #342db8 (Medium Dark)
- 700: #2d249e (Dark)
- 800: #261e84 (Darker)
- 900: #1f1a6b (Very Dark)
- 950: #141152 (Darkest)
```

## CSS Variables

The following CSS variables are defined in `globals.css`:

```css
:root {
  --primary: 247 71% 50%; /* #3B36CF */
  --ring: 247 71% 50%; /* #3B36CF for focus rings */
  /* Other semantic colors... */
}
```

## Usage Guidelines

### 1. Text Colors

#### Primary Text
```tsx
// Default black text
<h1 className="text-foreground">Cloud Configurations</h1>

// Brand color for emphasis
<span className="text-brand-500">Important Information</span>

// Hover effect with brand color
<div className="text-foreground hover:text-brand-500 transition-colors duration-200">
  Hoverable Text
</div>
```

#### Secondary Text
```tsx
// Muted text for descriptions
<p className="text-muted-foreground">Subtitle or description</p>
```

### 2. Interactive Elements

#### Buttons
```tsx
// Primary button with brand color
<Button className="bg-[#3b36cf] hover:bg-[#342db8] text-white hover-lift">
  Primary Action
</Button>

// Secondary button with brand hover
<Button variant="outline" className="hover:border-[#a89fff] hover:text-[#3b36cf]">
  Secondary Action
</Button>
```

#### Modal/Dialog Components
```tsx
// Modal with transparent background and white content
<DialogOverlay className="bg-transparent" />
<DialogContent className="bg-white border-2 border-gray-200 shadow-2xl">
  <DialogTitle className="text-black">Modal Title</DialogTitle>
  <DialogDescription className="text-gray-600">Description</DialogDescription>
</DialogContent>

// Close button with hover effect
<DialogClose className="hover:bg-gray-100 focus:ring-[#3b36cf]">
  <X className="h-4 w-4" />
</DialogClose>
```

#### Form Inputs
```tsx
// Input with brand focus state
<Input 
  className="focus:ring-brand-500 focus:border-brand-500 transition-all duration-200"
  placeholder="Enter value..."
/>
```

### 3. Status Indicators

#### Badges
```tsx
// Active status with brand color
<Badge className="bg-brand-500 hover:bg-brand-600 text-white">
  Active
</Badge>

// Secondary badges with brand tint
<Badge className="bg-brand-100 text-brand-700 hover:bg-brand-200">
  Tag
</Badge>
```

#### Icons
```tsx
// Icon with hover effect
<Edit className="h-4 w-4 hover:text-brand-500 transition-colors" />
```

### 4. Hover Effects

#### Custom Hover Classes
```css
/* Defined in globals.css */
.hover-lift {
  transition: all 0.2s ease-out;
}
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 14px 0 rgba(59, 54, 207, 0.15);
}

.hover-scale {
  transition: transform 0.2s ease-out;
}
.hover-scale:hover {
  transform: scale(1.05);
}
```

#### Usage Examples
```tsx
// Card with lift effect
<div className="hover-lift cursor-pointer">
  Interactive Card
</div>

// Button with scale effect
<Button className="hover-scale">
  Scale on Hover
</Button>
```

## Component-Specific Implementation

### 1. Cloud List Page
- **Main Button**: Brand color background with lift effect
- **Title**: Black text with subtle brand color on interaction
- **Description**: Muted gray text

### 2. Data Table
- **Row Items**: Black text with brand color hover
- **Status Badges**: Brand color for active states
- **Edit Buttons**: Ghost style with brand color hover and scale effect

### 3. Dialog Forms
- **Modal Background**: Transparent overlay (no dark background)
- **Modal Content**: Pure white background (#ffffff) with gray border
- **Form Labels**: Black text for clarity
- **Input Fields**: Brand color focus rings and borders
- **Submit Buttons**: Brand color background with lift animation
- **Cancel Buttons**: Outline style with brand color hover
- **Close Button**: Light gray hover effect with brand color focus ring

### 4. Multi-Select Components
- **Selected Items**: Light brand background with darker brand text
- **Trigger Button**: Brand color focus states
- **Dropdown Items**: Brand color selection states

## Accessibility Considerations

### Color Contrast
- All text maintains WCAG AA compliance (4.5:1 contrast ratio minimum)
- Brand color `#3B36CF` has sufficient contrast against white backgrounds
- Dark mode variants provide appropriate contrast ratios

### Focus Indicators
```tsx
// Accessible focus styles
<button className="focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:outline-none">
  Accessible Button
</button>
```

### Color Blindness
- Interactive states don't rely solely on color
- Hover effects include transform animations for additional feedback
- Icons and text labels provide context beyond color

## Animation Guidelines

### Transition Timing
- **Color Changes**: 200ms for smooth color transitions
- **Transform Effects**: 200ms for hover animations
- **Scale Effects**: 200ms ease-out for button interactions

### Easing Functions
```css
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); /* ease-out */
```

## Development Best Practices

### 1. Consistent Class Naming
```tsx
// Use semantic class names
<div className="text-brand-hover">...</div>
<button className="bg-brand hover:bg-brand-600">...</button>
```

### 2. Utility Classes
```css
/* Custom utilities in globals.css */
.text-brand-hover { @apply hover:text-brand-500 transition-colors duration-200; }
.bg-brand-hover { @apply hover:bg-brand-500 transition-colors duration-200; }
.border-brand-hover { @apply hover:border-brand-500 transition-colors duration-200; }
.focus-brand { @apply focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:outline-none; }
```

### 3. Component Composition
```tsx
// Reusable branded components
const BrandButton = ({ children, ...props }) => (
  <Button 
    className="bg-brand-500 hover:bg-brand-600 text-white hover-lift focus-brand"
    {...props}
  >
    {children}
  </Button>
)
```

## Testing Brand Colors

### Visual Regression Testing
- Test hover states across all interactive elements
- Verify focus indicators are visible and accessible
- Check color consistency across different screen sizes

### Accessibility Testing
- Use tools like axe-core to verify contrast ratios
- Test with screen readers for proper color announcements
- Validate keyboard navigation with focus indicators

## Future Considerations

### Dark Mode Support
The color system includes dark mode variants:
```css
.dark {
  --primary: 247 71% 60%; /* Slightly lighter for dark backgrounds */
}
```

### Theme Customization
The system can be extended for multiple brand colors:
```tsx
// Potential multi-brand support
const themes = {
  default: '#3B36CF',
  alternate: '#2563EB',
  accent: '#7C3AED'
}
```

---

## Quick Reference

### Most Common Classes
- `text-brand-500` - Brand colored text
- `bg-brand-500` - Brand colored background
- `hover:text-brand-500` - Brand color on hover
- `focus:ring-brand-500` - Brand colored focus ring
- `hover-lift` - Lift animation on hover
- `focus-brand` - Complete focus styling

### Color Values
- **Primary Brand**: `#3B36CF`
- **HSL**: `hsl(247, 71%, 50%)`
- **RGB**: `rgb(59, 54, 207)`

This color scheme creates a cohesive, professional, and accessible user interface that emphasizes the brand color while maintaining excellent readability and user experience.
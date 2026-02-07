# ChainSchool: On-Chain Kitchen - UI Style Guide

## Design Philosophy

ChainSchool's visual identity is **"Doodles meets Codédex, with Adventure Time energy"** — friendly, approachable, and educational without being childish.

### Core Principles
- **Calm over Loud**: Soft colors instead of neon gradients
- **Friendly over Corporate**: Hand-drawn feeling with imperfect lines
- **Clear over Clever**: Educational clarity trumps visual tricks
- **Cozy over Cool**: Warm, welcoming atmosphere

## Visual Direction

### Color Palette
```css
/* Primary Colors */
--duck-yellow: #fef3c7      /* Mascot and accents */
--kitchen-cream: #fef7ed    /* Background warmth */
--ingredient-orange: #fed7aa /* Secondary actions */

/* Neutral Base */
--paper-white: #ffffff      /* Cards and containers */
--soft-gray: #f9fafb       /* Subtle backgrounds */
--text-charcoal: #374151   /* Primary text */
--text-gray: #6b7280       /* Secondary text */

/* Status Colors */
--success-green: #d1fae5   /* Completed actions */
--warning-amber: #fef3c7   /* Waiting states */
--error-rose: #ffe4e6      /* Error states */

/* Interactive */
--button-blue: #dbeafe     /* Primary actions */
--hover-blue: #bfdbfe      /* Hover states */
```

### Typography
- **Headlines**: Clean, rounded sans-serif (system fonts: SF Pro, Segoe UI)
- **Body Text**: Readable, comfortable line height (1.6)
- **Code/Addresses**: Monospace for blockchain data
- **Sizes**:
  - H1: 2.5rem (40px)
  - H2: 2rem (32px)
  - H3: 1.5rem (24px)
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)

### Layout & Spacing
- **Card-based design** for each tutorial step
- **Generous whitespace** (24px+ between major elements)
- **Soft rounded corners** (12px border radius)
- **Gentle shadows** for depth without harshness
- **Max content width**: 1200px
- **Mobile-first** responsive design

## Component Patterns

### Duck Mascot
- **Friendly guide character** that appears throughout
- **Calm expressions** — never overly excited or manic
- **Helpful poses** — pointing, explaining, celebrating small wins
- **Consistent style** — soft yellow, simple shapes
- **Size variants**: Large (tutorial introductions), Small (tooltips)

### Cards & Containers
```css
.tutorial-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #f3f4f6;
}

.step-container {
  background: #fef7ed;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
}
```

### Buttons
```css
/* Primary Action */
.btn-primary {
  background: #dbeafe;
  color: #1e40af;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 500;
  border: none;
  transition: background 0.2s ease;
}

.btn-primary:hover {
  background: #bfdbfe;
}

/* Secondary Action */
.btn-secondary {
  background: #f9fafb;
  color: #374151;
  border: 1px solid #e5e7eb;
}
```

### Loading States
- **Soft pulse animations** instead of harsh spinners
- **Duck animations** for longer operations
- **Progress indicators** with warm colors
- **Encouraging micro-copy** ("Cooking your dish..." "Mixing ingredients...")

### Blockchain Data Display
```css
.address-display {
  font-family: 'SF Mono', 'Monaco', monospace;
  background: #f9fafb;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #6b7280;
  border: 1px solid #e5e7eb;
}

.transaction-hash {
  /* Similar styling for tx hashes */
  word-break: break-all;
}
```

## Screen-Specific Guidelines

### Welcome Screen
- **Large duck illustration** welcoming users
- **Soft introduction** to ChainSchool concept
- **Clear next step** (Connect Wallet)
- **Testnet emphasis** with friendly warning styling

### Tutorial Steps (Faucet, Shop, etc.)
- **Step counter** at top (1 of 6, 2 of 6...)
- **Clear section titles** with explanatory subtext
- **Duck tooltip** for educational context
- **Visual feedback** for successful actions

### Transaction States
- **Pending**: Soft yellow background with gentle animation
- **Success**: Light green with checkmark and celebration
- **Error**: Light red with helpful retry messaging
- **No harsh reds or angry colors**

## Interactive Elements

### Form Inputs
```css
.input-field {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 16px;
  background: white;
  transition: border-color 0.2s ease;
}

.input-field:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

### Educational Tooltips
- **Duck icon** triggers
- **Soft rounded bubbles**
- **Friendly explanatory text**
- **Easy dismiss** (click outside)

### Progress Feedback
- **Subtle success animations**
- **Encouraging copy** ("Nice work!", "Almost there!")
- **Visual confirmation** without overwhelming celebration

## Animation Guidelines

### Micro-interactions
- **200-300ms transitions** for hover states
- **Ease-out timing** functions for natural feel
- **Scale transforms** (0.95-1.0) for button presses
- **Opacity fades** for state changes

### Duck Animations
- **Gentle bouncing** for excitement
- **Head tilts** for curiosity
- **Wing waves** for hellos/goodbyes
- **Never frantic or jarring**

### Page Transitions
- **Smooth card slides** between tutorial steps
- **Fade overlays** for loading states
- **No jarring cuts** or harsh animations

## Accessibility & Usability

### Color Contrast
- **WCAG AA compliance** minimum
- **Test with colorblind simulators**
- **No color-only information conveyance**

### Typography
- **16px minimum** for body text
- **Clear hierarchy** with size and weight
- **Generous line spacing** for readability

### Interactive Elements
- **44px minimum** touch targets
- **Clear focus indicators**
- **Keyboard navigation** support

## Technical Implementation

### Tailwind CSS Classes
Use Tailwind's utility classes aligned with our design tokens:
- `bg-amber-50` for duck yellow
- `text-gray-700` for readable text
- `rounded-xl` for soft corners
- `shadow-sm` for gentle elevation

### Custom CSS Variables
Define color tokens as CSS custom properties for easy theming and consistency across components.

---

This style guide ensures ChainSchool feels welcoming to Web3 beginners while maintaining a polished, educational appearance that builds confidence rather than intimidation.
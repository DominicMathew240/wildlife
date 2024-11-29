# Components Directory

This directory contains reusable components used throughout the wildlife conservation website.

## Components Overview

### Header Components
- **Header.js**: Main navigation header with logo and menu items.
- **StickyHeader.js**: Top banner with contact information and quick links.

### Interactive Elements
- **CarouselAnimal.js**: Interactive carousel displaying wildlife images with descriptions.
  - Features auto-scroll, navigation dots, and hover effects
  - Shows 3 images at a time with responsive grid layout
  
- **CarouselHero.js**: Main hero section carousel using Flowbite components.
  - Includes navigation controls and slide indicators
  - Supports 5 rotating banner images

### Data Visualization
- **AnimalChart.js**: Dynamic chart component using Chart.js
  - Displays animal population data over time
  - Supports different animal types via props
  - Uses gradient fill for visual appeal

### Layout Components
- **Footer.js**: Site footer with:
  - Company information
  - Navigation links
  - Contact details
  - Call-to-action button

### Modal Components
- **ThankYouModal.js**: Donation confirmation modal
  - Animated entrance with Framer Motion
  - Confetti celebration effect
  - Displays donation amount and donor name
  - Responsive design with mobile support

## Usage Example

```javascript
import Header from './components/Header'
import StickyHeader from './components/StickyHeader'
import CarouselAnimal from './components/CarouselAnimal'

function App() {
  return (
    <>
      <StickyHeader />
      <Header />
      <CarouselAnimal />
    </>
  )
}
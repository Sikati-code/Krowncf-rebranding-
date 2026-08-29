# Krown Creative Factory - Premium Graphic Design Marketplace

A comprehensive, bilingual (English/French) graphic design marketplace built with React 19, TypeScript, Vite, and modern web technologies. Features dynamic language switching, premium animations, and a complete brand identity showcase with training enrollment functionality.

## 🌟 Project Overview

Krown Creative Factory is Africa's premier destination for culturally suited design assets. The platform serves as a marketplace for premium graphic designs, templates, and creative assets, with a focus on African cultural heritage combined with modern design aesthetics. The site also offers professional training programs and workshops for aspiring designers.

## 🌐 Live Links
- Live site: [https://app-liart-psi-22.vercel.app](https://app-liart-psi-22.vercel.app/)
- Deployment details: [https://vercel.com/sikati-codes-projects/app/9m3591jGqC7aPfdcEqSwNX84j2uD](https://vercel.com/sikati-codes-projects/app/9m3591jGqC7aPfdcEqSwNX84j2uD)

### Key Features
- **Dynamic Language Switching**: Instant English/French translation across all pages
- **Dynamic Location Display**: Lagos, Nigeria (English) / Yaoundé, Cameroun (French)
- **Training Enrollment System**: Interactive modal with pricing plans (Full Course vs Materials Only)
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Premium Animations**: Framer Motion-powered smooth transitions and effects
- **Interactive Components**: Floating CTA, shopping cart, login modal, and dynamic forms
- **Comprehensive UI Library**: 50+ shadcn/ui components built with Radix UI

## 🛠️ Technical Stack

### Core Technologies
- **React 19.2.0**: Latest React with improved performance and features
- **TypeScript 5.9.3**: Type-safe development with full type coverage
- **Vite 7.2.4**: Lightning-fast build tool and dev server
- **React Router 7.6.1**: Client-side routing with smooth navigation

### UI & Styling
- **Tailwind CSS 3.4.19**: Utility-first CSS framework for rapid styling
- **Framer Motion 12.41.0**: Production-ready motion library for React animations
- **Radix UI**: Comprehensive set of accessible UI primitives (Accordion, Dialog, Dropdown, etc.)
- **Lucide React 0.562.0**: Beautiful, consistent icon library
- **shadcn/ui**: Pre-built component library with 50+ customizable components

### State Management & Forms
- **React Context API**: Language state, translations, and shopping cart state
- **React Hook Form 7.70.0**: Performant form handling
- **Zod 4.3.5**: Schema validation for forms

### Additional Libraries
- **Embla Carousel 8.6.0**: Carousel/slider components
- **Recharts 2.15.4**: Chart library for data visualization
- **date-fns 4.1.0**: Date manipulation utilities
- **Sonner 2.0.7**: Toast notifications
- **next-themes 0.4.6**: Theme management (dark mode ready)

### Development Tools
- **ESLint 9.39.1**: Code linting and quality enforcement
- **TypeScript Compiler**: Type checking and compilation
- **PostCSS 8.5.6**: CSS processing
- **Autoprefixer 10.4.23**: CSS vendor prefixing

## 📁 Project Structure

```
app/
├── public/
│   └── assets/
│       ├── background.png              # Main background pattern
│       ├── logo.png                    # Compact logo (enlarged in header)
│       ├── KCF Logo Rebrand Main.jpg   # Full branding logo
│       ├── KCF Logo Rebrand New.png    # New logo variant
│       ├── favicon.png                 # Browser favicon (to be added)
│       ├── favicon.ico                 # ICO format favicon (to be added)
│       └── apple-touch-icon.png        # iOS app icon (to be added)
├── src/
│   ├── components/
│   │   ├── ui/                         # shadcn/ui component library (50+ components)
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── ... (40+ more components)
│   │   ├── AnimatedLogoSilhouette.tsx  # Animated background logo
│   │   ├── Cart.tsx                    # Shopping cart component
│   │   ├── EnrollmentModal.tsx         # Training enrollment modal with pricing
│   │   ├── Footer.tsx                  # Footer with navigation
│   │   ├── FloatingCTA.tsx             # Floating branding survey button
│   │   ├── Header.tsx                  # Navigation header
│   │   ├── LanguageToggle.tsx          # Language switcher
│   │   ├── LoginModal.tsx              # Authentication modal
│   │   ├── LogoMarquee.tsx             # Scrolling logo showcase
│   │   └── LogoSlideshow.tsx           # Logo slideshow component
│   ├── contexts/
│   │   ├── CartContext.tsx             # Shopping cart state management
│   │   └── LanguageContext.tsx         # Language & translation state (100+ keys)
│   ├── hooks/
│   │   └── use-mobile.ts              # Mobile detection hook
│   ├── lib/
│   │   └── utils.ts                    # Utility functions (cn helper)
│   ├── pages/
│   │   ├── About.tsx                   # About page wrapper
│   │   ├── Contact.tsx                # Contact page wrapper
│   │   ├── Home.tsx                   # Main home page (all sections)
│   │   └── Latest.tsx                 # Latest content page
│   ├── sections/
│   │   ├── About.tsx                   # About section with team & badges
│   │   ├── Categories.tsx              # Design categories showcase
│   │   ├── Contact.tsx                # Contact form, chat widget, location
│   │   ├── Entertainment.tsx          # Music & entertainment section
│   │   ├── Events.tsx                  # Events calendar with auto-slideshow
│   │   ├── Hero.tsx                    # Hero section with particles & search
│   │   ├── Latest.tsx                  # Latest content section
│   │   ├── LogoPortfolio.tsx           # Brand portfolio showcase
│   │   ├── Podcasts.tsx                # Podcast section with audio player
│   │   └── Training.tsx               # Training & workshops with enrollment
│   ├── App.tsx                         # React Router configuration
│   ├── App.css                         # Additional app styles
│   ├── index.css                       # Global styles & Tailwind directives
│   └── main.tsx                        # Application entry point
├── components.json                     # shadcn/ui configuration
├── eslint.config.js                    # ESLint configuration
├── index.html                          # HTML entry point with SEO meta tags
├── package.json                        # Dependencies & scripts
├── postcss.config.js                   # PostCSS configuration
├── tailwind.config.js                  # Tailwind CSS configuration
├── tsconfig.json                       # TypeScript project references
├── tsconfig.app.json                   # App TypeScript config
├── tsconfig.node.json                  # Node TypeScript config
└── vite.config.ts                      # Vite build configuration
```

## 🎯 Core Functionalities

### 1. Dynamic Language System

**Implementation**: `src/contexts/LanguageContext.tsx`

The language system uses React Context to provide:
- Language state management ('en' | 'fr')
- Translation function `t(key)` for all text content
- Dynamic location switching based on language
- Persistent language preference across page navigation

**Translation Keys Structure**:
```typescript
translations = {
  en: {
    'location.flag': '🇳🇬',
    'location.full': 'Lagos, Nigeria',
    'nav.home': 'Home',
    'hero.title1': 'Unleash Your',
    // ... 100+ translation keys
  },
  fr: {
    'location.flag': '🇨🇲',
    'location.full': 'Yaoundé, Cameroun',
    'nav.home': 'Accueil',
    'hero.title1': 'Libérez Votre',
    // ... corresponding French translations
  }
}
```

**Usage in Components**:
```typescript
const { t } = useLanguage();
<h1>{t('hero.title1')}</h1>
```

### 2. Routing System

**Implementation**: `src/App.tsx`

Current routing structure:
```typescript
<Routes>
  <Route path="/" element={<Home />} />        // Main home page
  <Route path="/about" element={<About />} />  // About page
  <Route path="/contact" element={<Contact />} /> // Contact page
  <Route path="/latest" element={<Latest />} /> // Latest content page
</Routes>
```

**Navigation**:
- Header logo links to `/`
- Footer logo links to `/`
- Section links use `#section` format for smooth scrolling within Home page
- All internal navigation uses React Router

### 3. Training Enrollment System

**Implementation**: `src/components/EnrollmentModal.tsx` and `src/sections/Training.tsx`

The training section features an interactive enrollment modal with:
- **Two Pricing Plans**:
  - Full Course: Live sessions, mentorship, complete access (₦100,000 - ₦150,000)
  - Materials Only: Self-paced learning with notes and templates (₦50,000)
- **Course Offerings**:
  - Font Creation (₦150,000, 6 weeks)
  - Professional Logo Creation (₦150,000, 8 weeks)
  - Basics of Graphics Design (₦100,000, 4 weeks)
  - Brand Identity (₦100,000, 12 weeks)
- **Interactive Selection**: Visual plan selection with radio buttons
- **Animated Modal**: Framer Motion-powered transitions
- **Payment Integration**: "Proceed to Payment" button (ready for backend integration)

### 4. Section Components

#### Hero Section (`src/sections/Hero.tsx`)
- Particle animation background using HTML5 Canvas
- Animated text with typing effect
- Statistics display with animated counters
- Search functionality
- Logo slideshow integration

#### Categories Section (`src/sections/Categories.tsx`)
- Heading: "Popular Template Categories" (bilingual)
- 24 design categories with translation keys
- Main grid displays first 8 categories
- "View All Categories" button opens modal with all 24 categories
- Modal features responsive grid (1-4 columns), sticky header, and smooth animations
- Hover effects and animations
- Full translation support for all category names

#### Training Section (`src/sections/Training.tsx`)
- Workshop and training program showcase with enrollment modal
- Card-based layout with hover effects
- Fully localized content
- Pricing plans (Full Course vs Materials Only)

#### Podcasts Section (`src/sections/Podcasts.tsx`)
- Podcast episode showcase
- Audio player integration
- Dynamic content display

#### Entertainment Section (`src/sections/Entertainment.tsx`)
- Music and entertainment content
- Artist profiles
- Streaming platform links

#### Events Section (`src/sections/Events.tsx`)
- Event calendar display with auto-slideshow
- Registration functionality
- Date and location information

#### Latest Section (`src/sections/Latest.tsx`)
- Latest content showcase
- Dynamic content display
- Translation support

#### Logo Portfolio Section (`src/sections/LogoPortfolio.tsx`)
- Brand identity showcase
- Logo marquee animation
- Portfolio gallery

#### About Section (`src/sections/About.tsx`)
- Company introduction with animated text
- Team member profiles with social links
- Dynamic counters for statistics
- Founder badge system

#### Contact Section (`src/sections/Contact.tsx`)
- Contact form with validation
- Direct contact methods (Email, WhatsApp, Messenger)
- Dynamic office location based on language
- Chat widget functionality

### 5. Floating CTA Component

**Implementation**: `src/components/FloatingCTA.tsx`

Features:
- Transparent button design
- Clean logo display without box
- Text: "Need Branding Let's Work Together"
- Professional submit button with gradient animation
- Survey form with 6 questions:
  1. Brand Name
  2. Brand Description
  3. Target Audience
  4. Brand Colors
  5. Logo Type (Icon, Text, Initials, Combination)
  6. Brand Value/Emotion

### 6. Header & Navigation

**Implementation**: `src/components/Header.tsx`

Features:
- Fixed positioning with scroll effects
- Enlarged logo display (w-64 h-40 sm:w-72 sm:h-44) with object-contain
- Brand text removed from header (logo only)
- Responsive mobile menu
- Language toggle integration
- Cart functionality
- Login modal trigger
- Smooth scroll to sections

### 7. Footer Component

**Implementation**: `src/components/Footer.tsx`

Features:
- Newsletter subscription form
- Quick links navigation
- Social media links
- Dynamic location display
- Copyright information
- Brand description

## 🎨 Design System

### Color Palette
- **Primary Red**: `krown-red` (#DC2626) - Brand accent color
- **Dark Red**: `krown-red-dark` (#B91C1C) - Gradient accent
- **Orange**: `krown-orange` (#E85D04) - Secondary accent
- **Background**: `krown-dark` (#111111) / `krown-black` (#0A0A0A) - Dark theme base
- **Card**: `krown-card` (#161616) - Card background
- **Text**: White with opacity variations

### Typography
- Font family: Inter, system-ui, -apple-system, sans-serif
- Headings: Bold with gradient effects
- Body: Regular with good contrast
- Responsive sizing for all breakpoints

### Animations
- **Framer Motion**: Primary animation library
- **Transitions**: Smooth 0.3s - 0.8s durations
- **Hover Effects**: Scale, color, and shadow changes
- **Scroll Animations**: Reveal on scroll with viewport detection
- **Particle Effects**: Canvas-based background animation
- **Custom Keyframes**: fade-in, slide-in, float, pulse-glow, gradient-shift

### Utility Classes
- `.glass` - Glass morphism effect
- `.glass-card` - Card with glass effect
- `.text-gradient` - Gradient text
- `.hover-lift` - Lift on hover
- `.glow-orange` - Orange glow effect

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, pnpm, or yarn package manager

### Installation

```bash
# Navigate to project directory
cd "c:/Users/SIKATI/Documents/Kimi_Agent_Krown UI Revamp/app"

# Install dependencies (using npm)
npm install

# Or using pnpm
pnpm install

# Or using yarn
yarn install
```

### Development

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Or with pnpm
pnpm dev

# Or with yarn
yarn dev
```

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

### Development Server
The development server runs on `http://localhost:3000` with:
- Hot Module Replacement (HMR)
- Fast refresh
- TypeScript checking
- ESLint integration
- Path alias support (@/ for src/)

## 📊 Translation Coverage

All sections have been fully localized with 124+ translation keys:

- ✅ Navigation (Header, Footer)
- ✅ Hero Section
- ✅ Logo Portfolio
- ✅ Categories (24 category translations in EN and FR)
- ✅ Training
- ✅ Podcasts
- ✅ Entertainment
- ✅ Events
- ✅ Latest
- ✅ Contact Page (form, chat, location)
- ✅ About Page (intro, team, badges)

## 🔧 Configuration Files

### TypeScript Configuration
- **tsconfig.json**: Project references configuration with path aliases
- **tsconfig.app.json**: App-specific TypeScript config
- **tsconfig.node.json**: Node/build tool TypeScript config
- Strict type checking enabled
- Path aliases configured (@/ for src/)
- React types included

### Vite Configuration (`vite.config.ts`)
- React plugin with Kimi inspect for development
- Path aliases (@/ for src/)
- Development server on port 3000
- Base path configured for relative paths
- Build optimization settings

### Tailwind Configuration (`tailwind.config.js`)
- Custom color palette (krown theme)
- Custom animations and keyframes
- Dark mode support
- Custom shadows (glass, glow)
- Border radius system

### ESLint Configuration
- React-specific linting rules
- TypeScript integration
- Code quality enforcement
- React refresh plugin

## 🚀 Deployment

### Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# For production deployment
vercel --prod
```

### Netlify Deployment

```bash
# Build the project
npm run build

# Deploy the dist folder to Netlify
# Or use Netlify CLI
npm i -g netlify-cli
netlify deploy --prod
```

### Other Platforms

The project can be deployed to any static hosting service that supports Vite builds:
- GitHub Pages
- AWS S3 + CloudFront
- Cloudflare Pages
- Firebase Hosting

### Environment Variables

Currently, the project doesn't require any environment variables. However, for future backend integration, you may need:

```env
VITE_API_URL=your_api_url
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
VITE_GOOGLE_ANALYTICS_ID=your_ga_id
```

## 🎨 Customization

### Updating Training Prices

Edit `src/sections/Training.tsx`:

```typescript
const courses = [
  {
    id: 1,
    title: 'Font Creation',
    price: '₦150,000',  // Update price here
    // ... other fields
  },
  // ... other courses
];
```

### Updating Materials Only Price

Edit `src/components/EnrollmentModal.tsx`:

```typescript
<span className="font-bold text-yellow-500">₦50,000</span>  // Line 104
```

### Updating Categories

To modify the categories list, edit `src/sections/Categories.tsx`:

```typescript
const categories = [
  {
    id: 1,
    name: 'Workers Day',
    translationKey: 'categories.workers_day',
    description: 'Celebrate labor day with professional designs',
    items: '450 items',
    icon: PartyPopper,
    gradient: 'from-orange-500/20 to-red-500/20',
    iconColor: 'text-orange-400',
  },
  // ... add or modify categories
];
```

Then add corresponding translations in `src/contexts/LanguageContext.tsx`:

```typescript
// English
'categories.workers_day': 'Workers Day',

// French
'categories.workers_day': 'Journée des Travailleurs',
```

### Updating Translation Text

Edit `src/contexts/LanguageContext.tsx`:

```typescript
const translations = {
  en: {
    'nav.home': 'Home',  // Add or modify keys
    // ... other translations
  },
  fr: {
    'nav.home': 'Accueil',
    // ... other translations
  },
};
```

### Updating Logos

Replace files in `public/assets/`:
- `logo.png` - Compact logo for header (currently enlarged to w-64 h-40)
- `KCF Logo Rebrand Main.jpg` - Full branding logo
- `KCF Logo Rebrand New.png` - Logo variant
- `favicon.png` - Browser favicon (add to public/assets/)
- `favicon.ico` - ICO format favicon (optional, for older browsers)
- `apple-touch-icon.png` - iOS app icon (180x180px recommended)

### Updating Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  krown: {
    red: "#DC2626",        // Update brand colors
    "red-dark": "#B91C1C",
    orange: "#E85D04",
    // ... other colors
  },
}
```

### Adding New UI Components

The project uses shadcn/ui. To add new components:

```bash
# Example: Add a new component
npx shadcn@latest add [component-name]
```

Components are added to `src/components/ui/`.

## 📝 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Implement proper error handling
- Write descriptive component names
- Use meaningful variable names

### Component Structure
```typescript
// 1. Imports
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// 2. Types/Interfaces
interface Props {
  // prop definitions
}

// 3. Component
export default function ComponentName({ prop }: Props) {
  // 4. Hooks
  const [state, setState] = useState();
  
  // 5. Effects
  useEffect(() => {
    // effect logic
  }, []);
  
  // 6. Handlers
  const handleClick = () => {
    // handler logic
  };
  
  // 7. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Git Workflow
- Use feature branches for new features
- Write descriptive commit messages
- Create pull requests for review
- Use conventional commit format

## 🐛 Known Issues & Limitations

1. **Form Submissions**: Currently client-side only, no backend integration
2. **Authentication**: Login modal is UI-only, no actual auth implementation
3. **Cart**: Shopping cart is visual only, no persistence
4. **Payment**: Enrollment modal payment button is UI-only, requires backend integration
5. **Images**: Static assets, no optimization or CDN
6. **Favicon Files**: favicon.png, favicon.ico, and apple-touch-icon.png need to be added to public/assets/ folder

## 📄 License

© 2026 Krown Creative Factory. All rights reserved.

## 👥 Team

Krown Creative Factory - Premium Graphic Design Marketplace
- Lagos, Nigeria (English)
- Yaoundé, Cameroun (French)

---

**Project Status**: ✅ Production Ready  
**Last Updated**: August 2026  
**Version**: 1.0.0
**Developed by**: Genicore

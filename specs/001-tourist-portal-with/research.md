# Research: Tourist Portal Technical Decisions

## Overview
This document consolidates research findings for implementing the Tourist Portal with comprehensive travel services using Next.js, shadcn/ui, and integrated Google Maps.

---

## Next.js 14+ App Router Architecture

### Decision
Use Next.js 14+ with App Router for full-stack web application

### Rationale
- **Server-side rendering** for SEO optimization (required for tourist content discoverability)
- **API Routes** provide serverless backend functionality on Vercel
- **App Router** enables optimal loading patterns and nested layouts
- **Built-in optimization** for images, fonts, and static assets
- **TypeScript support** ensures type safety across frontend and backend

### Alternatives Considered
- **React SPA + separate backend**: More complex deployment, SEO challenges
- **Nuxt.js**: Vue ecosystem, less mature TypeScript support
- **SvelteKit**: Smaller ecosystem, fewer UI component libraries

---

## UI Component System

### Decision
shadcn/ui with Tailwind CSS for component architecture

### Rationale
- **Accessibility-first** components meet FR-044 requirements
- **Customizable** design system using Tailwind CSS utilities
- **Copy-paste** components reduce bundle size vs. library dependencies
- **Consistent** with constitutional requirement for component-first architecture
- **Mobile-responsive** by default for tourist mobile usage

### Alternatives Considered
- **Chakra UI**: Less customizable, larger bundle size
- **Material-UI**: Google design language, not tourism-focused
- **Ant Design**: Enterprise-focused, heavy bundle

---

## Mock Data Strategy

### Decision
JSON files in `/data` directory with TypeScript interfaces

### Rationale
- **Rapid prototyping** without database setup complexity
- **Type safety** with TypeScript interfaces
- **Easy migration** to SQLite3 database later
- **Version control** friendly for team collaboration
- **Vercel deployment** compatible

### Data Structure
```
/data
├── attractions.json
├── restaurants.json
├── tour-guides.json
├── users.json
├── itineraries.json
└── safety-zones.json
```

### Alternatives Considered
- **In-memory objects**: Not persistent across development sessions
- **Local SQLite**: Adds complexity for initial development
- **External API**: Dependency on third-party services

---

## Google Maps Integration

### Decision
Google Maps JavaScript API with React wrapper

### Rationale
- **Rich mapping features** for geo-fencing and route planning
- **Places API** for attraction and restaurant discovery
- **Directions API** for safe route planning (FR-031)
- **Street View** for virtual attraction previews
- **Offline capabilities** with map caching

### Implementation Approach
- **@googlemaps/react-wrapper** for React integration
- **Maps API** for interactive maps
- **Places API** for location search and details
- **Geolocation API** for current location tracking

### Alternatives Considered
- **Mapbox**: More expensive for commercial use
- **OpenStreetMap**: Limited commercial features
- **Apple Maps**: iOS-only limitation

---

## Image Optimization Strategy

### Decision
Next.js Image component with existing images folder assets

### Rationale
- **Automatic optimization** for different device sizes
- **Lazy loading** for performance
- **WebP conversion** for modern browsers
- **Existing assets** in `/images` folder ready for use
- **Vercel optimization** built-in

### Image Organization
```
/images
├── attractions/     # location1-6.jpg
├── cuisine/        # cuisine1-6.jpg
└── ui/             # icons, backgrounds
```

### Implementation
- **Hero sections** with location images
- **Cuisine galleries** with food images
- **Responsive images** with Next.js Image component
- **Alt text** for accessibility compliance

---

## AI Assistant Mock Implementation

### Decision
Rule-based recommendation engine with conversational UI

### Rationale
- **Immediate functionality** without AI service dependencies
- **Predictable responses** for demo and testing
- **Cost-effective** for initial development
- **Extensible** to real AI services later

### Implementation Strategy
- **Chat interface** using shadcn/ui components
- **Preference matching** algorithm for recommendations
- **Context awareness** based on user profile and location
- **Fallback responses** for unhandled queries

### Mock AI Capabilities
- Itinerary generation based on user preferences
- Restaurant recommendations by dietary restrictions
- Attraction suggestions by category and budget
- Safety alerts and route planning
- Cultural sensitivity guidance

---

## State Management

### Decision
React Server Components + Client Components with useState/useContext

### Rationale
- **Server-side rendering** for SEO and performance
- **Minimal client-side state** for better performance
- **Built-in Next.js patterns** reduce complexity
- **Vercel edge functions** compatibility

### State Architecture
- **Server Components** for static content and data fetching
- **Client Components** for interactive features (maps, chat)
- **Local storage** for user preferences persistence
- **Session storage** for temporary data (current itinerary)

### Alternatives Considered
- **Redux**: Overkill for current requirements
- **Zustand**: Additional dependency, minimal benefit
- **React Query**: More complex for mock data scenario

---

## Authentication Strategy (Phase 1)

### Decision
Mock authentication with localStorage persistence

### Rationale
- **Rapid development** without auth service setup
- **User persona testing** with predefined profiles
- **Session persistence** across browser refreshes
- **Easy migration** to NextAuth.js later

### Implementation
- Predefined user profiles for each persona
- Profile switching UI for testing different user journeys
- Preference persistence in localStorage
- Mock social login UI components

---

## Performance Optimization

### Decision
Next.js built-in optimizations + custom lazy loading

### Rationale
- **Lighthouse score targets** (>90 performance) from constitution
- **Mobile-first** approach for tourist users
- **Vercel Edge Network** for global CDN
- **Bundle splitting** for feature-based loading

### Optimization Strategies
- **Image optimization** with Next.js Image component
- **Font preloading** for custom fonts
- **Code splitting** by route and feature
- **Lazy loading** for non-critical components
- **Service worker** for offline capabilities

---

## Development Workflow

### Decision
TypeScript + ESLint + Prettier + Vitest for quality gates

### Rationale
- **Constitutional compliance** with code quality requirements
- **Type safety** prevents runtime errors
- **Consistent formatting** for team collaboration
- **Fast testing** with Vitest

### Quality Gates
- TypeScript compilation must pass
- ESLint rules compliance
- Prettier formatting consistency
- Unit test coverage >80%
- Lighthouse performance >90

---

## Deployment Strategy

### Decision
Vercel platform with automatic deployments

### Rationale
- **Constitutional requirement** for Vercel optimization
- **Seamless integration** with Next.js
- **Preview deployments** for feature branches
- **Environment variable** management
- **Edge function** support for API routes

### Environment Configuration
- **Development**: Local with mock data
- **Preview**: Feature branch deployments
- **Production**: Main branch with optimized builds

---

## Risk Mitigation

### Identified Risks
1. **Google Maps API limits**: Implement caching and fallbacks
2. **Image loading performance**: Use Next.js optimization and lazy loading
3. **Mock data scalability**: Plan migration to real database
4. **Offline functionality**: Implement service worker caching

### Mitigation Strategies
- Progressive enhancement for map features
- Graceful degradation for offline scenarios
- Performance monitoring with Core Web Vitals
- User feedback collection for improvements

---

*Research complete - ready for Phase 1 design and contracts*
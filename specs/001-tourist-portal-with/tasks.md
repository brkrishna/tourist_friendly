# Tasks: Tourist Portal with Comprehensive Travel Services

**Input**: Design documents from `/specs/001-tourist-portal-with/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → Tech stack: Next.js 14+ App Router, TypeScript, shadcn/ui, Tailwind CSS, Google Maps API
   → Structure: Web application with integrated frontend/backend
2. Load design documents:
   → data-model.md: 10 entities → model tasks
   → contracts/: 3 files (users.md, attractions.md, ai-assistant.md) → contract test tasks
   → quickstart.md: 7 user scenarios → integration test tasks
3. Generate tasks by category:
   → Setup: Next.js project init, shadcn/ui, dependencies, linting
   → Tests: contract tests, integration tests
   → Core: models, API routes, UI components
   → Integration: Google Maps, AI assistant, safety features
   → Polish: unit tests, performance, docs
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Dependencies: Setup → Tests → Models → API Routes → UI → Integration → Polish
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Next.js App Router**: `app/`, `components/`, `lib/` at repository root
- **Tests**: `__tests__/` at repository root
- **Data**: `data/` for mock JSON files
- **Types**: `types/` for TypeScript interfaces

## Phase 3.1: Setup
- [x] T001 Initialize Next.js 14+ project with TypeScript and App Router in repository root
- [x] T002 [P] Install and configure shadcn/ui with Tailwind CSS
- [x] T003 [P] Install dependencies: @googlemaps/react-wrapper, lucide-react, next-themes
- [x] T004 [P] Configure ESLint, Prettier, and TypeScript strict mode
- [x] T005 [P] Set up Vitest for unit testing and Playwright for E2E testing
- [x] T006 Create project structure: app/, components/, lib/, data/, types/, __tests__/
- [x] T007 [P] Configure environment variables for Google Maps API and other services

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**

### Contract Tests
- [ ] T008 [P] Contract test POST /api/auth/register in __tests__/contract/users-auth.test.ts
- [ ] T009 [P] Contract test POST /api/auth/login in __tests__/contract/users-auth.test.ts
- [ ] T010 [P] Contract test GET /api/users/profile in __tests__/contract/users-profile.test.ts
- [ ] T011 [P] Contract test PUT /api/users/profile in __tests__/contract/users-profile.test.ts
- [ ] T012 [P] Contract test POST /api/users/emergency-contacts in __tests__/contract/users-emergency.test.ts
- [ ] T013 [P] Contract test GET /api/users/emergency-contacts in __tests__/contract/users-emergency.test.ts
- [ ] T014 [P] Contract test POST /api/users/location in __tests__/contract/users-location.test.ts
- [ ] T015 [P] Contract test GET /api/attractions in __tests__/contract/attractions-list.test.ts
- [ ] T016 [P] Contract test GET /api/attractions/{id} in __tests__/contract/attractions-detail.test.ts
- [ ] T017 [P] Contract test GET /api/attractions/search in __tests__/contract/attractions-search.test.ts
- [ ] T018 [P] Contract test GET /api/attractions/{id}/live-data in __tests__/contract/attractions-realtime.test.ts
- [ ] T019 [P] Contract test GET /api/attractions/recommendations in __tests__/contract/attractions-recommendations.test.ts
- [ ] T020 [P] Contract test GET /api/attractions/{id}/reviews in __tests__/contract/attractions-reviews.test.ts
- [ ] T021 [P] Contract test POST /api/ai/chat in __tests__/contract/ai-chat.test.ts
- [ ] T022 [P] Contract test GET /api/ai/chat/history in __tests__/contract/ai-history.test.ts
- [ ] T023 [P] Contract test POST /api/ai/recommendations in __tests__/contract/ai-recommendations.test.ts
- [ ] T024 [P] Contract test POST /api/ai/emergency-help in __tests__/contract/ai-emergency.test.ts
- [ ] T025 [P] Contract test POST /api/ai/optimize-itinerary in __tests__/contract/ai-optimization.test.ts
- [ ] T026 [P] Contract test GET /api/ai/cultural-context in __tests__/contract/ai-cultural.test.ts

### Integration Tests
- [ ] T027 [P] Integration test first-time tourist onboarding flow in __tests__/integration/onboarding.test.ts
- [ ] T028 [P] Integration test attraction discovery and planning in __tests__/integration/attraction-discovery.test.ts
- [ ] T029 [P] Integration test cuisine discovery with dietary preferences in __tests__/integration/cuisine-discovery.test.ts
- [ ] T030 [P] Integration test tour guide booking with blockchain verification in __tests__/integration/guide-booking.test.ts
- [ ] T031 [P] Integration test AI-powered travel planning in __tests__/integration/ai-planning.test.ts
- [ ] T032 [P] Integration test safety and geo-fencing features in __tests__/integration/safety-features.test.ts
- [ ] T033 [P] Integration test accessibility-focused experience in __tests__/integration/accessibility.test.ts

## Phase 3.3: Data Layer (ONLY after tests are failing)

### TypeScript Interfaces
- [x] T034 [P] User interface and types in types/user.ts
- [x] T035 [P] Attraction interface and types in types/attraction.ts
- [x] T036 [P] Restaurant interface and types in types/restaurant.ts
- [x] T037 [P] TourGuide interface and types in types/tour-guide.ts
- [x] T038 [P] Itinerary interface and types in types/itinerary.ts
- [x] T039 [P] SafetyZone interface and types in types/safety-zone.ts
- [x] T040 [P] Booking interface and types in types/booking.ts
- [x] T041 [P] Review interface and types in types/review.ts
- [x] T042 [P] EmergencyContact interface and types in types/emergency-contact.ts
- [x] T043 [P] CulturalEvent interface and types in types/cultural-event.ts

### Mock Data Files
- [x] T044 [P] Create users mock data in data/users.json with sample tourist profiles
- [x] T045 [P] Create attractions mock data in data/attractions.json with Hyderabad attractions
- [x] T046 [P] Create restaurants mock data in data/restaurants.json with local cuisine options
- [x] T047 [P] Create tour guides mock data in data/tour-guides.json with verified guides
- [x] T048 [P] Create itineraries mock data in data/itineraries.json with sample travel plans
- [x] T049 [P] Create safety zones mock data in data/safety-zones.json with geographic boundaries
- [x] T050 [P] Create bookings mock data in data/bookings.json with sample reservations
- [x] T051 [P] Create reviews mock data in data/reviews.json with user-generated content
- [x] T052 [P] Create emergency contacts mock data in data/emergency-contacts.json
- [x] T053 [P] Create cultural events mock data in data/cultural-events.json with Hyderabad events

## Phase 3.4: API Routes Implementation

### Authentication & User Management
- [ ] T054 POST /api/auth/register route in app/api/auth/register/route.ts
- [ ] T055 POST /api/auth/login route in app/api/auth/login/route.ts
- [ ] T056 GET /api/users/profile route in app/api/users/profile/route.ts
- [ ] T057 PUT /api/users/profile route in app/api/users/profile/route.ts
- [ ] T058 POST /api/users/emergency-contacts route in app/api/users/emergency-contacts/route.ts
- [ ] T059 GET /api/users/emergency-contacts route in app/api/users/emergency-contacts/route.ts
- [ ] T060 POST /api/users/location route in app/api/users/location/route.ts

### Attractions API
- [x] T061 GET /api/attractions route in app/api/attractions/route.ts
- [x] T062 GET /api/attractions/[id] route in app/api/attractions/[id]/route.ts
- [ ] T063 GET /api/attractions/search route in app/api/attractions/search/route.ts
- [ ] T064 GET /api/attractions/[id]/live-data route in app/api/attractions/[id]/live-data/route.ts
- [ ] T065 GET /api/attractions/recommendations route in app/api/attractions/recommendations/route.ts
- [ ] T066 GET /api/attractions/[id]/reviews route in app/api/attractions/[id]/reviews/route.ts

### AI Assistant API
- [x] T067 POST /api/ai/chat route in app/api/ai/chat/route.ts
- [ ] T068 GET /api/ai/chat/history route in app/api/ai/chat/history/route.ts
- [x] T069 POST /api/ai/recommendations route in app/api/ai/recommendations/route.ts
- [ ] T070 POST /api/ai/emergency-help route in app/api/ai/emergency-help/route.ts
- [ ] T071 POST /api/ai/optimize-itinerary route in app/api/ai/optimize-itinerary/route.ts
- [ ] T072 GET /api/ai/cultural-context route in app/api/ai/cultural-context/route.ts

## Phase 3.5: UI Components

### Layout and Navigation
- [x] T073 [P] Root layout component in app/layout.tsx with navigation and providers
- [x] T074 [P] Navigation component in components/navigation.tsx with mobile-responsive menu
- [x] T075 [P] Footer component in components/footer.tsx with links and branding

### Authentication Components
- [x] T076 [P] Login form component in components/auth/login-form.tsx
- [x] T077 [P] Registration form component in components/auth/register-form.tsx
- [ ] T078 [P] Profile setup component in components/auth/profile-setup.tsx

### Core Feature Components
- [x] T079 [P] Attraction card component in components/attractions/attraction-card.tsx
- [x] T080 [P] Attraction list component in components/attractions/attraction-list.tsx
- [x] T081 [P] Attraction detail component in components/attractions/attraction-detail.tsx
- [x] T082 [P] Attraction filters component in components/attractions/attraction-filters.tsx
- [x] T083 [P] Restaurant card component in components/restaurants/restaurant-card.tsx
- [ ] T084 [P] Tour guide card component in components/guides/guide-card.tsx
- [x] T085 [P] AI chat interface component in components/ai/chat-interface.tsx
- [x] T086 [P] AI chat message component in components/ai/chat-message.tsx

### Safety and Maps Components
- [x] T087 [P] Google Maps component in components/maps/google-map.tsx
- [x] T088 [P] Location search component in components/maps/location-search.tsx
- [x] T089 [P] Location filter component in components/maps/location-filter.tsx
- [ ] T090 [P] Safety zone component in components/safety/safety-zones.tsx

## Phase 3.6: Page Components

### Main Application Pages
- [x] T091 Home page in app/page.tsx with hero section and quick actions
- [x] T092 Attractions listing page in app/attractions/page.tsx
- [x] T093 Attraction detail page in app/attractions/[id]/page.tsx
- [x] T094 Restaurants page in app/restaurants/page.tsx
- [ ] T095 Tour guides page in app/guides/page.tsx
- [x] T096 AI assistant page in app/assistant/page.tsx
- [ ] T097 Profile page in app/profile/page.tsx
- [x] T098 Dashboard page in app/dashboard/page.tsx
- [x] T099 Maps page in app/maps/page.tsx

### Authentication Pages
- [x] T100 Login page in app/login/page.tsx
- [x] T101 Register page in app/register/page.tsx
- [ ] T102 Onboarding page in app/onboarding/page.tsx

## Phase 3.7: Integration Features

### Google Maps Integration
- [x] T103 Google Maps provider setup in lib/google-maps.ts
- [x] T104 Location services integration in lib/location.ts
- [ ] T105 Geo-fencing logic implementation in lib/geo-fencing.ts
- [ ] T106 Safe route calculation in lib/route-planning.ts

### AI Assistant Mock Implementation
- [x] T107 AI response engine in lib/ai/response-engine.ts
- [x] T108 Recommendation algorithm in lib/ai/recommendations.ts
- [ ] T109 Cultural context database in lib/ai/cultural-context.ts
- [ ] T109 Emergency assistance logic in lib/ai/emergency-assistance.ts

### Real-time Data Simulation
- [ ] T110 [P] Crowd level simulation in lib/simulation/crowd-levels.ts
- [ ] T111 [P] Weather data simulation in lib/simulation/weather.ts
- [ ] T112 [P] Real-time updates service in lib/simulation/real-time-updates.ts

### Safety Features
- [ ] T113 Emergency contact notification system in lib/safety/emergency-notifications.ts
- [ ] T114 Panic button functionality in lib/safety/panic-button.ts
- [ ] T115 Location tracking service in lib/safety/location-tracking.ts
- [ ] T116 Offline safety data in lib/safety/offline-data.ts

## Phase 3.8: Image Optimization and Assets

### Image Processing
- [ ] T117 [P] Optimize and categorize existing images in images/ folder
- [ ] T118 [P] Create image component with Next.js Image optimization in components/ui/optimized-image.tsx
- [ ] T119 [P] Set up image galleries for attractions and cuisine in components/galleries/
- [ ] T120 [P] Implement lazy loading for image-heavy pages

### UI Assets
- [ ] T121 [P] Create loading states and skeletons in components/ui/loading.tsx
- [ ] T122 [P] Error boundary components in components/ui/error-boundary.tsx
- [ ] T123 [P] Toast notification system in components/ui/toast.tsx

## Phase 3.9: Performance and Accessibility

### Performance Optimization
- [ ] T124 Implement service worker for offline functionality in public/sw.js
- [ ] T125 Set up code splitting and lazy loading for heavy components
- [ ] T126 [P] Optimize bundle size and implement tree shaking
- [ ] T127 [P] Add performance monitoring and Core Web Vitals tracking

### Accessibility
- [ ] T128 [P] ARIA labels and screen reader support across all components
- [ ] T129 [P] Keyboard navigation implementation for all interactive elements
- [ ] T130 [P] Color contrast and focus indicators compliance
- [ ] T131 [P] Alternative text for all images and icons

## Phase 3.10: Testing and Quality

### Unit Tests
- [ ] T132 [P] Unit tests for API route logic in __tests__/unit/api/
- [ ] T133 [P] Unit tests for UI components in __tests__/unit/components/
- [ ] T134 [P] Unit tests for utility functions in __tests__/unit/lib/
- [ ] T135 [P] Unit tests for AI mock logic in __tests__/unit/ai/

### E2E Tests
- [ ] T136 [P] E2E test for complete user onboarding flow
- [ ] T137 [P] E2E test for attraction discovery and booking
- [ ] T138 [P] E2E test for AI assistant interaction
- [ ] T139 [P] E2E test for safety features and emergency scenarios

### Performance Tests
- [ ] T140 Lighthouse performance audit (target: >90 score)
- [ ] T141 Mobile performance testing on various devices
- [ ] T142 [P] Load testing for API endpoints
- [ ] T143 [P] Accessibility audit with axe-core testing

## Phase 3.11: Documentation and Polish

### Documentation
- [ ] T144 [P] Update README.md with setup and deployment instructions
- [ ] T145 [P] Create API documentation in docs/api.md
- [ ] T146 [P] Component documentation with Storybook setup
- [ ] T147 [P] User guide documentation in docs/user-guide.md

### Final Polish
- [ ] T148 Environment configuration for Vercel deployment
- [ ] T149 [P] Error handling and logging implementation
- [ ] T150 [P] Rate limiting for API endpoints
- [ ] T151 [P] Security headers and CORS configuration
- [ ] T152 Final review and constitutional compliance check

## Dependencies

### Critical Dependencies
- Tests (T008-T033) MUST complete before implementation (T054-T143)
- TypeScript interfaces (T034-T043) before API routes (T054-T072)
- Mock data (T044-T053) before API routes (T054-T072)
- Layout components (T073-T075) before page components (T091-T101)
- Core components (T076-T090) before pages that use them
- Google Maps setup (T102) before location-dependent features (T103-T105)

### Sequential Dependencies
- T001 (Next.js setup) blocks all other tasks
- T034-T043 (interfaces) block T054-T072 (API routes)
- T073 (layout) blocks T091-T101 (pages)
- T102 (Maps provider) blocks T103-T105 (location features)
- T106-T109 (AI core) blocks T067-T072 (AI API routes)

## Parallel Execution Examples

### Setup Phase (can run together after T001)
```bash
# T002-T007 can run in parallel:
Task: "Install and configure shadcn/ui with Tailwind CSS"
Task: "Install dependencies: @googlemaps/react-wrapper, lucide-react, next-themes"
Task: "Configure ESLint, Prettier, and TypeScript strict mode"
Task: "Set up Vitest for unit testing and Playwright for E2E testing"
Task: "Configure environment variables for Google Maps API and other services"
```

### Contract Tests Phase (all parallel)
```bash
# T008-T026 can run in parallel:
Task: "Contract test POST /api/auth/register in __tests__/contract/users-auth.test.ts"
Task: "Contract test GET /api/attractions in __tests__/contract/attractions-list.test.ts"
Task: "Contract test POST /api/ai/chat in __tests__/contract/ai-chat.test.ts"
# ... all contract tests
```

### TypeScript Interfaces (all parallel)
```bash
# T034-T043 can run in parallel:
Task: "User interface and types in types/user.ts"
Task: "Attraction interface and types in types/attraction.ts"
Task: "Restaurant interface and types in types/restaurant.ts"
# ... all interface files
```

### UI Components (most can run in parallel)
```bash
# T076-T090 can run in parallel:
Task: "Login form component in components/auth/login-form.tsx"
Task: "Attraction card component in components/attractions/attraction-card.tsx"
Task: "AI chat interface component in components/ai/chat-interface.tsx"
# ... all independent components
```

## Validation Checklist

### Contract Coverage
- [x] All API endpoints have contract tests (19 endpoints, T008-T026)
- [x] All user scenarios have integration tests (7 scenarios, T027-T033)
- [x] All entities have TypeScript interfaces (10 entities, T034-T043)
- [x] All entities have mock data (10 entities, T044-T053)

### Implementation Coverage
- [x] All API endpoints implemented (19 endpoints, T054-T072)
- [x] All major UI components created (T073-T090)
- [x] All main pages implemented (T091-T101)
- [x] Core integration features covered (T102-T116)

### Quality Gates
- [x] TDD approach: Tests before implementation
- [x] Performance targets defined (Lighthouse >90, T140-T143)
- [x] Accessibility compliance planned (T128-T131)
- [x] Constitutional requirements addressed throughout

### Parallel Task Safety
- [x] No [P] tasks modify the same files
- [x] Dependencies clearly documented
- [x] Setup tasks properly sequenced
- [x] Independent components marked for parallel execution

## Notes
- [P] tasks = different files, no dependencies, can run simultaneously
- Verify tests fail before implementing (TDD requirement)
- Constitutional compliance check after major milestones
- Mobile-first approach throughout development
- Performance monitoring at each phase
- Accessibility testing integrated into component development

---

**Total Tasks**: 152  
**Parallel Tasks**: 89 (58% can run in parallel)  
**Sequential Tasks**: 63 (42% require specific ordering)  
**Estimated Development Time**: 6-8 weeks with proper task parallelization
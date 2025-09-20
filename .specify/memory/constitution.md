<!--
Sync Impact Report:
Version change: 0.0.0 → 1.0.0
Modified principles: Initial creation for Next.js web app
Added sections: Technology Stack Requirements, Development Workflow
Templates requiring updates: ✅ Constitution aligned with plan and spec templates
Follow-up TODOs: None
-->

# Tourist Friendly Constitution

## Core Principles

### I. Component-First Architecture
All UI features MUST be built using shadcn/ui components with Tailwind CSS utilities; Components MUST be reusable, accessible, and responsive by default; Custom components MUST follow shadcn patterns and be independently testable; No inline styles outside of Tailwind utilities allowed.

Rationale: Ensures consistent design system, maintainable UI code, and leverages the best practices of the shadcn/ui ecosystem for professional-grade interfaces.

### II. API-Route Integration
Every user interaction that requires data MUST use Next.js API routes; API routes MUST handle validation, database operations, and error responses; Database queries MUST use proper SQLite3 patterns with error handling; All API endpoints MUST be tested with both success and failure scenarios.

Rationale: Provides type-safe full-stack integration, proper separation of concerns, and ensures reliable data handling in the serverless Vercel environment.

### III. Database Schema Management
SQLite3 schema changes MUST be versioned and documented; All database operations MUST use prepared statements for security; Database migrations MUST be reversible and tested; Data models MUST include proper constraints and indexes for performance.

Rationale: Ensures data integrity, security, and maintainable database evolution as the tourist application grows in complexity and usage.

### IV. Vercel-Optimized Deployment
All features MUST work in Vercel's serverless environment; Static assets MUST be optimized (images via next/image, fonts preloaded); Build process MUST not exceed Vercel limits (function size, execution time); Environment variables MUST be properly configured for production.

Rationale: Guarantees reliable deployment, optimal performance, and cost-effective hosting on Vercel's platform.

### V. Performance & SEO First
Pages MUST achieve Lighthouse scores: Performance >90, SEO >95, Accessibility >90; Next.js App Router patterns MUST be used for optimal loading; All tourist-facing content MUST be SEO optimized with proper meta tags; Images and content MUST be optimized for mobile-first experience.

Rationale: Ensures excellent user experience for tourists browsing on various devices and networks, with discoverability through search engines.

## Technology Stack Requirements

**Core Stack**: Next.js 14+ with App Router, TypeScript, Tailwind CSS, shadcn/ui, SQLite3
**Deployment**: Vercel platform with proper environment configuration
**Testing**: Vitest for unit tests, Playwright for E2E testing
**Code Quality**: ESLint with Next.js config, Prettier for formatting, TypeScript strict mode
**Database**: SQLite3 with proper indexing and query optimization for tourist data
**Security**: Input validation, SQL injection protection, proper CORS configuration

## Development Workflow

**Feature Development**: Feature specification → Component design → API design → Database schema → Tests → Implementation
**Code Review**: All changes require TypeScript compilation, ESLint passing, tests passing, Lighthouse score validation
**Testing Gates**: Unit tests for components and API routes, integration tests for user flows, E2E tests for critical tourist journeys
**Deployment**: Automatic Vercel deployment on main branch, preview deployments for pull requests
**Performance Monitoring**: Regular Lighthouse audits, Core Web Vitals tracking, database query performance analysis

## Governance

This constitution supersedes all development practices; All features and changes MUST comply with the five core principles; Principle violations require explicit justification and architectural review; All pull requests MUST verify constitutional compliance before merge; Constitution amendments require version increment and impact analysis documentation.

**Version**: 1.0.0 | **Ratified**: 2025-09-19 | **Last Amended**: 2025-09-19
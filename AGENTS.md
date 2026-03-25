# Get Outta Here

A flight search web application that helps users find Mediterranean escape flights. Built with Next.js, TypeScript, and Tailwind CSS. Deployed on Vercel.

## Core Commands

- Install dependencies: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Type check: `npx tsc --noEmit`
- Test: `npm test`
- Format: `npx prettier --write .`

## Project Layout

```
├── src/
│   ├── app/              → Next.js App Router pages and layouts
│   ├── components/       → Reusable UI components
│   │   ├── ui/           → Base design system components
│   │   ├── search/       → Search form and related components
│   │   ├── flights/      → Flight cards, results grid, skeleton loaders
│   │   └── animations/   → Animation components and motion primitives
│   ├── lib/              → Utilities, API clients, helpers
│   ├── hooks/            → Custom React hooks
│   ├── types/            → Shared TypeScript type definitions
│   └── styles/           → Global styles, Tailwind config extensions
├── public/               → Static assets (images, fonts, icons)
├── .factory/             → Factory Droid skills and configuration
├── AGENTS.md             → This file
└── package.json
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with 8-point spacing system
- **Animations**: Framer Motion (motion) for UI animations, GSAP for complex sequences
- **State**: React Query / SWR for server state, Zustand for client state
- **Deployment**: Vercel
- **Testing**: Vitest + React Testing Library

## Flight APIs

- Primary: Amadeus Self-Service API (flight offers search, airport lookup)
- Fallback: Mock data with realistic Mediterranean flight results
- API keys stored in `.env.local`, never committed

## Design System (from Figma)

- **Theme**: Dark mode. Black (`#000`) background, dark gray (`#222`) cards, salmon pink (`#ff9595`) accents.
- **Typography**: Monospace italic (ABC Social Mono -> use JetBrains Mono Italic or IBM Plex Mono Light Italic). Helvetica Neue for mobile labels.
- **Spacing**: 8-point grid (8, 16, 24, 32, 40, 48px). Card padding 16px. Section gaps 48px inside cards.
- **Colors**: `#000` bg, `#222` card bg, `#ff9595` accent, `#fff` labels, `#868686` borders, `#8c8c8c` muted text.
- **Responsive**: Mobile-first. sm: 640px, md: 768px, lg: 1024px, xl: 1200px.
- **Grid**: 4 columns on xl+, 1 column below (per Figma).
- **Border radius**: 8px on cards and inputs.
- **Figma file**: `Ojw2ZsT9w024q1nYbPCwb6`. Use Figma MCP tools to extract exact design context.

## Conventions

- TypeScript strict mode, no `any` types, no `@ts-ignore`.
- Component files: PascalCase (e.g., `FlightCard.tsx`).
- Hooks: camelCase with `use` prefix (e.g., `useFlightSearch.ts`).
- All API responses must be typed with interfaces.
- Handle loading, error, and empty states for every data-dependent component.
- Respect `prefers-reduced-motion` for all animations.
- All inputs must have proper labels and ARIA attributes.
- Never commit secrets, API keys, or `.env.local` files.

## Git Workflow

- Branch from `main` with descriptive names: `feature/`, `fix/`, `ui/`.
- Run `npm run lint && npx tsc --noEmit` before committing.
- Atomic commits with clear messages.
- PR descriptions must summarize the behavior change.

## Key Components

- `Header`: Brand name "Get Outta Here" + tagline
- `SearchForm`: Departure city, departure date, return date inputs
- `ResultsGrid`: Responsive grid of flight cards (4 cols xl, 1 col mobile)
- `FlightCard`: Destination, description, outbound flight details, return flight details, prices (Basic + With luggage in SEK), "Book" CTA
- `DataRow`: Reusable two-column row (white label, salmon value, gray border top/bottom)
- `SkeletonCard`: Loading placeholder with animation
- `EmptyState`: Friendly message before search

## Figma Integration

When implementing UI, always check for Figma design references first. Use the Figma MCP tools available in the Droid to:
1. Get design context from Figma nodes
2. Extract colors, spacing, typography from designs
3. Match implementation to design specifications
4. Export assets when needed

## Accessibility

- Semantic HTML throughout
- Keyboard navigation for all interactive elements
- Visible focus states
- Proper ARIA labels on form inputs
- Mobile-friendly date inputs
- Color contrast meets WCAG AA
- Screen reader friendly flight card content

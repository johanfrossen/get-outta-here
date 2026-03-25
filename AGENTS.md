# Get Outta Here

A flight search web application that helps users find Mediterranean escape flights. Built with Next.js, TypeScript, and Tailwind CSS. Deployed on Vercel.

## Session Start -- Read This First

When starting a new session on this project:
1. Read this entire `AGENTS.md` to understand the project state.
2. Check `.factory/MISSION.md` for the mission plan, milestone details, and the **Mission Log** at the bottom to see what's been completed.
3. After completing any significant work, **update this file** with new components, commands, APIs, decisions, and current status.
4. After completing a milestone, **append a Mission Log entry** to `.factory/MISSION.md`.

## Current Status

- **Phase**: Milestone 5 complete -- all milestones done
- **Milestones completed**: M1 (Foundation), M2 (Search UI), M3 (Animations), M4 (API), M5 (Features & Polish)
- **Next step**: Deploy to Vercel, add RAPIDAPI_KEY env var
- **Repository**: https://github.com/johanfrossen/get-outta-here
- **What exists**: Full app with Sky Scrapper API (Skyscanner data, free tier), currency selector (SEK/EUR/GBP/USD), recent searches, favorites, surprise me, booking links to Skyscanner, SEO meta tags. No mock data. 23 passing tests.

## Core Commands

- Install dependencies: `npm install`
- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Type check: `npm run typecheck`
- Test: `npm test`
- Test (watch): `npm run test:watch`
- Format: `npm run format`

**Note**: npm scripts use direct `node node_modules/...` paths instead of `.bin` symlinks because the project directory path contains special characters that break symlinks.

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
- **Animations**: Framer Motion for UI animations (hero text, card stagger, flip rows, price counter)
- **State**: Custom hooks with localStorage persistence (currency, favorites, recent searches)
- **Deployment**: Vercel
- **Testing**: Vitest + React Testing Library

## Flight APIs

- **Primary**: Sky Scrapper API via RapidAPI (Skyscanner data). Free tier ($0/mo). API key in `RAPIDAPI_KEY` env var.
- **No mock fallback**: Shows "No flights found" with helpful message when API returns empty or is unavailable.
- **Why not Amadeus**: Amadeus self-service portal is being decommissioned (July 2026), new signups are broken.
- **Why not Kiwi.com**: Tequila portal login is broken (magic link auth failing for new accounts).
- API keys stored in `.env.local`, never committed. See `.env.local.example`.

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

- `Header` (in page.tsx): "GET OUTTA HERE" brand title, 41px desktop centered, 27px mobile left-aligned
- `SearchForm` (`components/search/SearchForm.tsx`): Desktop: 4 inputs horizontal + search button. Mobile: stacked vertical with different labels. Form validation (required fields, return >= departure).
- `ResultsGrid` (`components/flights/ResultsGrid.tsx`): 4-col xl grid, 1-col mobile. Handles loading/empty/no-results states.
- `FlightCard` (`components/flights/FlightCard.tsx`): Desktop shows "Departure from" row. Mobile shows From/To rows. Sections: header, outbound flight, return flight, price, Book CTA.
- `DataRow` (`components/ui/DataRow.tsx`): Two-column row (white label, salmon value, 0.5px gray border top/bottom, 40px height)
- `Button` (`components/ui/Button.tsx`): Primary (salmon bg, black text) and outline variants, 48px height
- `Input` (`components/ui/Input.tsx`): Responsive input (32px desktop, 48px mobile), salmon border
- `Card` (`components/ui/Card.tsx`): Dark gray bg (#222), 16px padding, 8px radius
- `SkeletonCard` (`components/flights/SkeletonCard.tsx`): Pulse-animated dark placeholders matching card structure
- `EmptyState` (`components/flights/EmptyState.tsx`): Pre-search message in salmon
- `HeroText` (`components/animations/HeroText.tsx`): Staggered character-by-character fade-up reveal
- `StaggerGrid` / `StaggerItem` (`components/animations/StaggerGrid.tsx`): Cascading card entrance with 0.05s delays
- `FlipRow` (`components/animations/FlipRow.tsx`): Airport split-flap display effect for data rows
- `PriceCounter` (`components/animations/PriceCounter.tsx`): RAF-based count-up ticker from 0 to value

### API Routes & Hooks
- `app/api/flights/route.ts`: GET endpoint. Params: from, fromSkyId, fromEntityId, departureDate, returnDate, currency. Searches via Sky Scrapper API. Returns empty array with message if unavailable.
- `app/api/airports/route.ts`: GET endpoint. Params: term. Returns airport suggestions with skyId/entityId.
- `hooks/useFlightSearch.ts`: Client-side hook wrapping /api/flights with loading/error/source state.
- `hooks/useAirportSearch.ts`: Debounced (300ms) airport autocomplete hook wrapping /api/airports.
- `lib/skyscrapper.ts`: Server-side Sky Scrapper (Skyscanner) API client via RapidAPI. Batched search (3 at a time with 600ms delay) across 13 Mediterranean destinations. Generates Skyscanner booking URLs.

### M5 Features
- `CurrencySelector` (`components/ui/CurrencySelector.tsx`): Toggle SEK/EUR/GBP/USD, persisted in localStorage
- `FavoriteButton` (`components/ui/FavoriteButton.tsx`): Heart icon on flight cards, persisted in localStorage
- `RecentSearches` (`components/search/RecentSearches.tsx`): Last 5 searches as salmon-outlined chips
- `SurpriseMe` (`components/search/SurpriseMe.tsx`): Random origin + dates, triggers search
- `hooks/useLocalStorage.ts`: Generic localStorage hook + useCurrency, useRecentSearches, useFavorites

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

## Architecture Decisions

_Record non-obvious technical choices here as the project evolves._

| Decision | Choice | Rationale | Date |
|---|---|---|---|
| Framework | Next.js 15 App Router | Vercel-native deploy, API routes for key protection, SSR | 2026-03-25 |
| Styling | Tailwind CSS v4 | 8pt grid maps directly, rapid iteration | 2026-03-25 |
| Animation | Framer Motion + GSAP | FM for React integration, GSAP for complex timelines | 2026-03-25 |
| Flight API | Sky Scrapper (RapidAPI) | Amadeus dead, Kiwi broken; free Skyscanner data | 2026-03-25 |
| Desktop grid | 4 columns (not 6) | Figma design shows 4 cards per row at 1440px | 2026-03-25 |
| Theme | Dark mode only | Figma design is black bg with salmon accents | 2026-03-25 |
| Currency default | SEK | Figma mockups show SEK pricing | 2026-03-25 |
| Production font | JetBrains Mono Italic (or IBM Plex Mono) | Replace Figma's unlicensed ABC Social Mono trial | 2026-03-25 |
| npm scripts | Direct node_modules paths | Directory path has special chars breaking .bin symlinks | 2026-03-25 |
| API batching | 3 concurrent + 600ms delay | Avoids RapidAPI free tier rate limits | 2026-03-25 |

## Documentation Rules

- **This file (AGENTS.md)** must be updated after every milestone or significant change.
- **`.factory/MISSION.md`** must have a Mission Log entry appended after each milestone.
- **Components**: Add JSDoc comments explaining purpose, props, and usage.
- **API routes**: Document request/response shapes and error handling in code and here.
- **New patterns**: If you introduce a new hook, utility, or pattern, add it to the relevant section above.

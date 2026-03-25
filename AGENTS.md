<coding_guidelines>
# Get Outta Here

A flight search web application that helps users find Mediterranean escape flights. Built with Next.js, TypeScript, and Tailwind CSS. Deployed on Vercel.

## Session Start -- Read This First

When starting a new session on this project:
1. Read this entire `AGENTS.md` to understand the project state.
2. Check `.factory/MISSION.md` for the mission plan, milestone details, and the **Mission Log** at the bottom to see what's been completed.
3. After completing any significant work, **update this file** with new components, commands, APIs, decisions, and current status.
4. After completing a milestone, **append a Mission Log entry** to `.factory/MISSION.md`.

## Current Status

- **Phase**: All milestones complete. Ready for Vercel deployment.
- **Milestones completed**: M1 (Foundation), M2 (Search UI), M3 (Animations), M4 (API), M5 (Features & Polish), Final Audit, API Migration
- **Next step**: Deploy to Vercel, add `TRAVELPAYOUTS_TOKEN` env var
- **Repository**: https://github.com/johanfrossen/get-outta-here
- **What exists**: Full app with Travelpayouts/Aviasales Data API (free, unlimited requests), currency selector (SEK/EUR/GBP/USD), favorites, booking links to Aviasales, SEO meta tags. No mock data. 23 passing tests.
- **Removed features**: SurpriseMe button and RecentSearches (removed per user request, files still exist but not wired into page.tsx)
- **Date inputs**: Text fields with YYYY-MM-DD format (not native date pickers)

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
│   │   ├── api/flights/  → Flight search API route (proxies to Travelpayouts)
│   │   └── api/airports/ → Airport autocomplete API route (public Travelpayouts endpoint)
│   ├── components/       → Reusable UI components
│   │   ├── ui/           → Base design system components
│   │   ├── search/       → Search form and related components
│   │   ├── flights/      → Flight cards, results grid, skeleton loaders
│   │   └── animations/   → Animation components and motion primitives
│   ├── lib/              → Utilities, API clients, helpers
│   │   └── travelpayouts.ts → Server-side Travelpayouts API client
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
- **State**: Custom hooks with localStorage persistence (currency, favorites)
- **Deployment**: Vercel
- **Testing**: Vitest + React Testing Library

## Flight API -- Travelpayouts (Aviasales Data API)

- **Provider**: Travelpayouts / Aviasales Data API
- **Cost**: Completely free, unlimited requests (rate-limited to 1000/hour)
- **Auth**: Single API token in `X-Access-Token` header or `token` query param
- **Env var**: `TRAVELPAYOUTS_TOKEN` (in `.env.local`, never committed)
- **How it works**: Returns cached flight price data from Aviasales user searches (last 48 hours). Data is real but may not cover all routes/dates. Returns price, airline, flight number, departure/return times, transfers, duration, and a booking link.
- **Endpoints used**:
  - `https://api.travelpayouts.com/aviasales/v3/prices_for_dates` -- Flight price search by origin/destination/dates/currency
  - `https://autocomplete.travelpayouts.com/places2` -- Airport/city autocomplete (public, no token needed)
- **Destinations searched**: 13 Mediterranean cities (BCN, NCE, FCO, ATH, MLA, DBV, SPU, PMI, NAP, MRS, VCE, LIS, AGP)
- **No mock fallback**: Shows "No flights found" with helpful message when API returns empty or is unavailable
- **Booking links**: Deep links to Aviasales search results
- **Signup**: https://passport.travelpayouts.com/registration (email + password only, no phone verification)
- **Token location**: https://app.travelpayouts.com/profile/api-token

### API History (why we're on Travelpayouts)

| API tried | What happened |
|---|---|
| Amadeus Self-Service | Portal being decommissioned July 2026, signups broken |
| Kiwi.com Tequila | Magic link login broken for new accounts |
| Sky Scrapper (RapidAPI) | Worked but only 20 requests/month free (exhausted in 1 search) |
| SerpAPI Google Flights | Required phone number verification |
| Travelpayouts/Aviasales | Works. Free, unlimited, email-only signup |

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
- Run `npm run lint && npm run typecheck` before committing.
- Atomic commits with clear messages.
- PR descriptions must summarize the behavior change.

## Key Components

- `Header` (in page.tsx): "GET OUTTA HERE" brand title, 41px desktop centered, 27px mobile left-aligned
- `SearchForm` (`components/search/SearchForm.tsx`): Desktop: 4 inputs horizontal + search button. Mobile: stacked vertical with different labels. Form validation (required fields, return >= departure). Date inputs are text fields (YYYY-MM-DD format). Airport autocomplete dropdown on "From" field.
- `ResultsGrid` (`components/flights/ResultsGrid.tsx`): 4-col xl grid, 1-col mobile. Handles loading/empty/no-results states.
- `FlightCard` (`components/flights/FlightCard.tsx`): Desktop shows "Departure from" row. Mobile shows From/To rows. Sections: header, outbound flight, return flight, price, Book CTA. Favorite button in header.
- `DataRow` (`components/ui/DataRow.tsx`): Two-column row (white label, salmon value, 0.5px gray border top/bottom, 40px height)
- `Button` (`components/ui/Button.tsx`): Primary (salmon bg, black text) and outline variants, 48px height
- `Input` (`components/ui/Input.tsx`): Responsive input (32px desktop, 48px mobile), salmon border
- `Card` (`components/ui/Card.tsx`): Dark gray bg (#222), 16px padding, 8px radius, hover glow
- `CurrencySelector` (`components/ui/CurrencySelector.tsx`): Toggle SEK/EUR/GBP/USD, persisted in localStorage
- `FavoriteButton` (`components/ui/FavoriteButton.tsx`): Heart icon on flight cards, persisted in localStorage
- `SkeletonCard` (`components/flights/SkeletonCard.tsx`): Dark shimmer loading placeholder matching card structure
- `EmptyState` (`components/flights/EmptyState.tsx`): Pre-search message in salmon
- `HeroText` (`components/animations/HeroText.tsx`): Staggered character-by-character fade-up reveal
- `StaggerGrid` / `StaggerItem` (`components/animations/StaggerGrid.tsx`): Cascading card entrance with 0.05s delays
- `FlipRow` (`components/animations/FlipRow.tsx`): Airport split-flap display effect for data rows
- `PriceCounter` (`components/animations/PriceCounter.tsx`): RAF-based count-up ticker from 0 to value

### API Routes & Hooks
- `app/api/flights/route.ts`: GET endpoint. Params: `from` (IATA code), `departureDate`, `returnDate`, `currency`. Searches 13 Mediterranean destinations via Travelpayouts. Returns `{ flights, source: "aviasales" }` or empty array with message.
- `app/api/airports/route.ts`: GET endpoint. Params: `term`. Returns airport suggestions from Travelpayouts public autocomplete (no token needed).
- `hooks/useFlightSearch.ts`: Client-side hook wrapping /api/flights with loading/error/source state. Sends `fromCode` (IATA) as the `from` param.
- `hooks/useAirportSearch.ts`: Debounced (300ms) airport autocomplete hook wrapping /api/airports. Airport type has: code, name, city, country, type.
- `lib/travelpayouts.ts`: Server-side Travelpayouts API client. Parallel search across 13 Mediterranean destinations (no batching needed -- unlimited requests). Maps API response to Flight model. Generates Aviasales booking URLs. Also exports airport autocomplete.

### Removed Features
- `RecentSearches` (`components/search/RecentSearches.tsx`): File exists but NOT wired into page.tsx (removed per user request)
- `SurpriseMe` (`components/search/SurpriseMe.tsx`): File exists but NOT wired into page.tsx (removed per user request). Still references old skyId/entityId types.

### localStorage Features
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
- Text date inputs (YYYY-MM-DD) for easy typing
- Color contrast meets WCAG AA
- Screen reader friendly flight card content

## Architecture Decisions

| Decision | Choice | Rationale | Date |
|---|---|---|---|
| Framework | Next.js 15 App Router | Vercel-native deploy, API routes for key protection, SSR | 2026-03-25 |
| Styling | Tailwind CSS v4 | 8pt grid maps directly, rapid iteration | 2026-03-25 |
| Animation | Framer Motion | React integration, reduced-motion support built in | 2026-03-25 |
| Flight API | Travelpayouts (Aviasales) | Free, unlimited, email-only signup. After Amadeus, Kiwi, Sky Scrapper all failed. | 2026-03-25 |
| Desktop grid | 4 columns (not 6) | Figma design shows 4 cards per row at 1440px | 2026-03-25 |
| Theme | Dark mode only | Figma design is black bg with salmon accents | 2026-03-25 |
| Currency default | SEK | Figma mockups show SEK pricing | 2026-03-25 |
| Production font | JetBrains Mono Italic | Replace Figma's unlicensed ABC Social Mono trial | 2026-03-25 |
| npm scripts | Direct node_modules paths | Directory path has special chars breaking .bin symlinks | 2026-03-25 |
| Date inputs | Text (YYYY-MM-DD) | User preference over native date pickers for typing ease | 2026-03-25 |
| No mock data | Empty state with message | User preference: show "unavailable" instead of fake data | 2026-03-25 |

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `TRAVELPAYOUTS_TOKEN` | Yes | Travelpayouts API token. Get from https://app.travelpayouts.com/profile/api-token |

For Vercel deployment, add `TRAVELPAYOUTS_TOKEN` in Project Settings > Environment Variables.

## Documentation Rules

- **This file (AGENTS.md)** must be updated after every milestone or significant change.
- **`.factory/MISSION.md`** must have a Mission Log entry appended after each milestone.
- **Components**: Add JSDoc comments explaining purpose, props, and usage.
- **API routes**: Document request/response shapes and error handling in code and here.
- **New patterns**: If you introduce a new hook, utility, or pattern, add it to the relevant section above.
</coding_guidelines>

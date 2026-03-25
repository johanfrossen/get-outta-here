# Mission: Build "Get Outta Here" Flight Search Application

## Overview

Build a fully responsive, full-screen flight search web application for the brand "Get Outta Here." Users search for Mediterranean escape flights by entering a departure city, dates, and passenger count. The destination is always "Any Mediterranean city" -- the product promise is spontaneous discovery. The app must feel alive with motion, match the Figma designs precisely, and integrate real flight data via the Amadeus API.

## Important: Figma is the source of truth

Before making ANY visual decisions (colors, typography, spacing, layout, card design, component styles), you MUST consult the Figma designs using the Figma MCP tools available in this project. The Figma files define the exact visual identity, color palette, typography, spacing, component designs, and layout structure. Do not guess or invent visual styles -- extract them from Figma first.

When Figma context is needed:
1. Use `get_design_context` to extract code-ready design specs from Figma nodes.
2. Use `get_screenshot` to visually reference designs during implementation.
3. Use `get_variable_defs` to extract design tokens (colors, spacing, typography).
4. Use `get_metadata` to understand page/component structure.
5. Match implementation to Figma pixel-perfectly: colors, spacing, typography, border-radius, shadows, layout.

If Figma files are not yet connected when a milestone begins, use sensible defaults from the brainstorm (Mediterranean palette, 8pt spacing, clean modern sans-serif) but flag that Figma alignment is pending and must be done before the milestone is considered complete.

## Tech Stack (locked in)

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 (App Router) | Vercel-native, API routes, SSR/SSG |
| Language | TypeScript (strict mode) | Type safety throughout |
| Styling | Tailwind CSS v4 | Rapid development, 8pt spacing maps directly |
| Animation (UI) | Framer Motion | Best React animation library, layout animations |
| Animation (complex) | GSAP | Timeline-based sequences, departure board flip |
| Flight API | Amadeus Self-Service API | Comprehensive free tier, real flight data |
| Client state | Zustand | Lightweight, minimal boilerplate |
| Server state | React Query (TanStack Query) | Caching, refetching, loading states |
| Testing | Vitest + React Testing Library | Fast, modern, React-native |
| Package manager | npm | Simplicity |

## Project Structure

Follow the structure defined in `AGENTS.md`:
```
src/
  app/              -> Next.js App Router pages and layouts
  components/
    ui/             -> Base design system components (Button, Input, etc.)
    search/         -> SearchForm and related components
    flights/        -> FlightCard, ResultsGrid, SkeletonCard
    animations/     -> Animation components and motion primitives
  lib/              -> API clients, utilities, helpers
  hooks/            -> Custom React hooks
  types/            -> Shared TypeScript type definitions
  styles/           -> Global styles, Tailwind extensions
public/             -> Static assets
```

## Design System Rules

- **Spacing**: Strict 8-point grid. All padding, margins, and gaps must be multiples of 8px (8, 16, 24, 32, 40, 48, etc.).
- **Typography**: Extract from Figma. Fallback: bold geometric sans for headlines (Plus Jakarta Sans or Outfit), clean sans for body (Inter).
- **Colors**: Extract from Figma. Fallback: Mediterranean-inspired palette -- warm neutrals, ocean blues, terracotta/coral accents.
- **Responsive breakpoints**: Mobile-first. sm: 640px, md: 768px, lg: 1024px, xl: 1200px.
- **Grid**: 6 columns on xl+ screens, 1 column below xl. No intermediate 2/3/4-column layouts.
- **Cards**: Consistent height, clear visual hierarchy (destination large, description small, times and prices grouped).
- **Motion**: Always respect `prefers-reduced-motion`. Animations should feel smooth, not jarring.

---

## Milestones

### Milestone 1: Project Foundation & Design System

**Goal**: Bootable Next.js project with design tokens extracted from Figma, base components, and CI-ready tooling.

**Features**:
1. Initialize Next.js 15 with App Router, TypeScript strict mode, Tailwind CSS v4.
2. Configure ESLint, Prettier, Vitest, React Testing Library.
3. Set up the project directory structure per the spec above.
4. **Connect to Figma** (critical): Extract design tokens -- colors, typography, spacing, shadows, border-radius -- using Figma MCP tools. Create Tailwind theme extensions from these tokens.
5. Build base UI components from Figma: Button, Input, DatePicker wrapper, Card container.
6. Create the app layout shell (full-screen, fluid, responsive).
7. Set up `.gitignore`, `.env.local.example`, and environment variable patterns.
8. Push to GitHub repo `johanfrossen/get-outta-here`.

**Validation**: `npm run build`, `npm run lint`, `npx tsc --noEmit`, and `npm test` all pass. Base components render correctly. Design tokens match Figma.

---

### Milestone 2: Core Search UI

**Goal**: Complete search interface with form validation, results grid, flight cards, and mock data -- visually matching Figma designs.

**Features**:
1. **Header component**: Brand name "Get Outta Here" + tagline. Style from Figma.
2. **SearchForm component**:
   - Departure city text input with autocomplete-ready structure.
   - Departure date input (mobile-friendly native date or custom picker per Figma).
   - Return date input with validation (cannot be before departure).
   - Passenger count selector (1-9).
   - "Search flights" primary CTA button.
   - Inline validation errors for all fields.
   - All inputs with proper labels, ARIA attributes, keyboard navigation.
3. **ResultsGrid component**:
   - Responsive grid: 6 columns on xl+, 1 column below.
   - Gap spacing per 8pt system.
4. **FlightCard component** (each card contains):
   - Destination name (e.g., "Barcelona, Spain").
   - Brief description (1-2 lines, why it's appealing).
   - Departure flight time (e.g., "Departs 08:15").
   - Return flight time (e.g., "Returns 19:40").
   - Base fare price (e.g., "EUR 129").
   - Fare with luggage price (e.g., "EUR 179"), labeled "+ luggage". Always higher than base.
   - "View deal" CTA button.
5. **SkeletonCard component**: Loading placeholder with shimmer animation.
6. **EmptyState component**: Friendly message before search (e.g., "Pick your dates -- your Mediterranean options will appear here.").
7. **Mock data**: At least 18 Mediterranean destinations (Barcelona, Nice, Rome, Athens, Valletta, Dubrovnik, Split, Palma, Naples, Marseille, Venice, Santorini, Lisbon, Malaga, Sardinia, Mykonos, Hvar, Kotor) with plausible times and prices.
8. **Search behavior**: On submit, show skeleton loading for 600-900ms, then display results.

**Validation**: Full search flow works end-to-end with mock data. 6-column grid visible on desktop. Cards stacked on mobile. All form validation works. Visual match to Figma. All tests pass.

---

### Milestone 3: Animations & Motion

**Goal**: Layer in animations that make the app feel alive and on-brand, following Figma motion specs where defined.

**Features**:
1. **Hero text reveal**: "Get Outta Here" title animates with staggered letter/word fade-up on page load. Framer Motion.
2. **Tagline rotation**: Tagline cycles through variants with fade transitions: "Mediterranean escapes, instantly." / "Your beach is waiting." / "Life's too short for cold weather." (or copy from Figma).
3. **Ambient gradient background**: Slow-moving gradient that shifts between Mediterranean palette colors. Pure CSS or canvas. Subtle, not distracting.
4. **Card entrance stagger**: Flight cards animate in with a cascading stagger (0.05s delay between cards). Scale up + fade in. Framer Motion `staggerChildren`.
5. **Departure board flip effect**: When results first load, card content "flips" into view like an airport split-flap display. GSAP or Framer Motion.
6. **Skeleton shimmer**: Loading skeletons with a traveling highlight shimmer, not static gray.
7. **Hover card lift**: Cards lift with increased shadow + slight scale on hover. CSS transition or Framer Motion.
8. **Search button pulse**: Subtle breathing pulse on the CTA when form is valid and ready to submit.
9. **Price counter animation**: Prices count up from 0 to final value when cards appear. Framer Motion `useMotionValue`.
10. **Reduced motion**: Wrap all animations to respect `prefers-reduced-motion`. Provide instant/static fallbacks.

**Validation**: All animations render smoothly at 60fps. No layout shift (CLS). Reduced motion mode works. Visual match to any Figma motion specs. Tests pass.

---

### Milestone 4: Amadeus Flight API Integration

**Goal**: Replace mock data with real flight search results from the Amadeus API, with proper error handling and fallbacks.

**Features**:
1. **Amadeus API client**: Server-side API route (`app/api/flights/route.ts`) that proxies requests to Amadeus. API key stored in `.env.local`, never exposed to client.
2. **Authentication flow**: Amadeus OAuth2 token management (client credentials grant, token caching).
3. **Airport/city autocomplete**: Use Amadeus Airport & City Search API for the departure city input. Debounced search with dropdown results.
4. **Flight offers search**: Use Amadeus Flight Offers Search API. Query params: origin, departure date, return date, number of passengers, destination = multiple Mediterranean airport codes.
5. **Response mapping**: Map Amadeus API responses to the FlightCard data model (destination name, times, base price, luggage price, airline info).
6. **Mediterranean destination list**: Hardcode IATA codes for target destinations (BCN, NCE, FCO, ATH, MLA, DBV, SPU, PMI, NAP, MRS, VCE, JTR, LIS, AGP, OLB, JMK, etc.).
7. **Error handling**: API failures, rate limits, empty results. Show user-friendly messages. Fall back to mock data gracefully.
8. **Caching**: Cache flight results with React Query (stale time, refetch intervals).
9. **Loading states**: Skeleton cards during API calls. Proper error states with retry.

**Validation**: Real flight data appears from Amadeus API. Autocomplete works for departure cities. Fallback to mock data works when API is unavailable. No API keys exposed in client bundle. All tests pass.

---

### Milestone 5: Additional Features & Polish

**Goal**: Add the remaining user-facing features and polish the complete experience.

**Features**:
1. **Currency selector**: Toggle between EUR, SEK, GBP, USD. Store preference in localStorage. Convert displayed prices (client-side conversion with approximate rates, or use Amadeus currency parameter).
2. **Recent searches**: Save last 5 searches to localStorage. Display as quick-access chips above the search form.
3. **Favorites/wishlist**: Heart icon on each FlightCard. Save favorited destinations to localStorage. Accessible from a "Saved" section or modal.
4. **"Surprise me" button**: Random destination picker. Selects a random Mediterranean city and auto-triggers search with current dates. Fun, on-brand feature.
5. **Weather/temperature preview on cards**: Show current weather and temperature for each destination on the FlightCard (use a free weather API like Open-Meteo, or static seasonal data).
6. **Responsive polish**: Final pass on all breakpoints. Test on real mobile viewport sizes (375px, 390px, 414px, 768px, 1024px, 1440px).
7. **Accessibility audit**: Keyboard navigation through all interactive elements. Screen reader testing. Focus management after search. Color contrast verification.
8. **Performance optimization**: Lighthouse audit targeting 90+ on all metrics. Image optimization, code splitting, font optimization.
9. **SEO basics**: Meta tags, Open Graph tags, structured data for the main page.

**Validation**: All features work across desktop and mobile. Lighthouse performance 90+. Accessibility score 90+. localStorage features persist across sessions. Weather data displays on cards. All tests pass. Final visual match to Figma.

---

## Skills Available

The following Factory Droid skills are installed and should be used during this mission:

- **vibe-coding**: For rapid prototyping and building the app from scratch. Use for Milestones 1-2.
- **brainstorm**: For creative decisions about animations, UX patterns, and design direction when Figma doesn't specify.
- **frontend-ui-integration**: For implementing UI features against the Amadeus API. Use for Milestones 4-5.
- **product-management**: For feature scoping decisions if scope questions arise.

## Figma MCP Integration

This project has Figma MCP tools available. During every milestone, before implementing visual components:
1. Check Figma for the relevant design specs.
2. Extract exact values (colors, spacing, typography, shadows, border-radius).
3. Match implementation to Figma.
4. If Figma doesn't cover something, use the design system defaults from this document and flag it.

## Constraints

- Never commit API keys or secrets. Use `.env.local` for all sensitive values.
- No `any` types in TypeScript. No `@ts-ignore`.
- Every data-dependent component must handle loading, error, and empty states.
- All animations must respect `prefers-reduced-motion`.
- 8-point spacing system is mandatory -- no arbitrary pixel values.
- Do NOT set up Vercel deployment -- that will be handled separately.
- Push all code to `johanfrossen/get-outta-here` on GitHub.

## Repository

- GitHub: https://github.com/johanfrossen/get-outta-here
- Branch strategy: `main` is the default branch. Feature work on `feature/*` branches, merged to `main`.

## Success Criteria

The mission is complete when:
1. The app builds and runs without errors (`npm run build`, `npm run dev`).
2. All tests pass (`npm test`).
3. Lint and type checks pass (`npm run lint`, `npx tsc --noEmit`).
4. Real flight data loads from Amadeus API with mock data fallback.
5. All animations run smoothly at 60fps with reduced-motion fallbacks.
6. Responsive layout works: 6-col grid on xl+, 1-col on mobile.
7. All features (search, favorites, recent searches, currency, surprise me, weather) work.
8. Visual implementation matches Figma designs.
9. Lighthouse performance and accessibility scores are 90+.
10. Code is pushed to GitHub.

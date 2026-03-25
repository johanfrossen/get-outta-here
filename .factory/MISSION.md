# Mission: Build "Get Outta Here" Flight Search Application

## Overview

Build a fully responsive, full-screen flight search web application for the brand "Get Outta Here." Users search for Mediterranean escape flights by entering a departure city, dates, and passenger count. The destination is always "Any Mediterranean city" -- the product promise is spontaneous discovery. The app must feel alive with motion, match the Figma designs precisely, and integrate real flight data via the Amadeus API.

## Figma Source

- **File**: https://www.figma.com/design/Ojw2ZsT9w024q1nYbPCwb6/Fllight-thing?node-id=0-1
- **File key**: `Ojw2ZsT9w024q1nYbPCwb6`
- **Desktop view**: node `5:742` (1440px wide)
- **Mobile view**: node `1:1690` (402px wide)
- **Flight card component (desktop)**: node `1:765` (342x769px)
- **Flight card component (mobile)**: node `7:1233` (370px wide)
- **Search input component**: node `6:1094` (225x63px)

Use the Figma MCP tools (`get_design_context`, `get_screenshot`, `get_variable_defs`, `get_metadata`) to extract exact specs during implementation. The Figma designs are the visual source of truth.

---

## Design System (extracted from Figma)

### Colors
| Token | Value | Usage |
|---|---|---|
| `background` | `#000000` (pure black) | Page background |
| `card-bg` | `#222222` | Flight card background |
| `accent` | `#ff9595` (salmon pink) | Title, input borders, data values, section headers, CTA bg |
| `text-primary` | `#ffffff` (white) | Labels, row names |
| `text-muted` | `#8c8c8c` | Mobile form labels |
| `border` | `#868686` | Card row separators (0.5px top + bottom) |
| `cta-text` | `#000000` (black) | Text on salmon pink CTA buttons |

### Typography
| Element | Font | Weight/Style | Size |
|---|---|---|---|
| Desktop title | ABC Social Mono Variable | Hairline Italic | ~41px |
| Card headings | ABC Social Mono Variable | Thin Italic | 24px |
| Card body/rows | ABC Social Mono Variable | Thin Italic | 12px |
| CTA button text | ABC Social Mono Variable | Thin Italic | 18px |
| Mobile title | Helvetica Neue | Regular | 27px |
| Mobile form labels | Helvetica Neue | Regular | 16px |

**Note**: "ABC Social Mono Variable" is an unlicensed trial font in Figma. For production, use a similar monospace italic font. Options: JetBrains Mono (italic), IBM Plex Mono (light italic), or Space Mono (italic). The aesthetic is: monospace, thin/light weight, italic. This gives the entire UI a distinctive technical/editorial feel.

### Spacing & Layout
- **8-point grid**: All spacing multiples of 8px
- **Page padding**: Desktop 24px left, 48px top. Mobile 16px sides, 48px top.
- **Card padding**: 16px all sides
- **Card border-radius**: 8px
- **Input border-radius**: 8px
- **Card gap**: 8px between cards
- **Section gap inside cards**: 48px between major sections
- **Row height**: 40px per data row
- **Row gap inside sections**: 16px between section header and rows
- **CTA button height**: 48px

### Responsive Grid
| Breakpoint | Columns | Card width |
|---|---|---|
| Desktop (xl: 1200px+) | 4 columns | ~342px each, 8px gap |
| Mobile (below xl) | 1 column | Full width (~370px) |

**IMPORTANT**: The Figma shows 4 cards per row on desktop, NOT 6. This is a change from the original spec.

---

## Tech Stack (locked in)

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 (App Router) | Vercel-native, API routes, SSR/SSG |
| Language | TypeScript (strict mode) | Type safety throughout |
| Styling | Tailwind CSS v4 | Rapid development, design token mapping |
| Animation (UI) | Framer Motion | Best React animation library |
| Animation (complex) | GSAP | Timeline-based sequences |
| Flight API | Amadeus Self-Service API | Comprehensive free tier, real flight data |
| Client state | Zustand | Lightweight, minimal boilerplate |
| Server state | React Query (TanStack Query) | Caching, refetching, loading states |
| Testing | Vitest + React Testing Library | Fast, modern |
| Package manager | npm | Simplicity |

## Project Structure

```
src/
  app/              -> Next.js App Router pages and layouts
  components/
    ui/             -> Base design system (Button, Input, DataRow)
    search/         -> SearchForm (desktop inline + mobile stacked)
    flights/        -> FlightCard, ResultsGrid, SkeletonCard
    animations/     -> Motion primitives (text reveal, stagger, etc.)
  lib/              -> API clients (Amadeus), utilities, helpers
  hooks/            -> Custom React hooks (useFlightSearch, useLocalStorage)
  types/            -> Shared TypeScript type definitions
  styles/           -> Global styles, font imports, Tailwind extensions
public/             -> Static assets, fonts
```

---

## Milestones

### Milestone 1: Project Foundation & Design System

**Goal**: Bootable Next.js project with Figma design tokens, base components, and tooling.

**Features**:
1. Initialize Next.js 15 with App Router, TypeScript strict mode, Tailwind CSS v4.
2. Configure ESLint, Prettier, Vitest, React Testing Library.
3. Set up directory structure per the spec above.
4. **Extract Figma design tokens** using Figma MCP tools from file `Ojw2ZsT9w024q1nYbPCwb6`. Create Tailwind theme with exact colors (`#000`, `#222`, `#ff9595`, `#868686`, `#8c8c8c`), spacing (8pt grid), border-radius (8px), and typography scale.
5. Set up monospace italic font (JetBrains Mono Italic or IBM Plex Mono Light Italic as production substitute for "ABC Social Mono Variable").
6. Build base components matching Figma:
   - **DataRow**: Two-column row (white label left, salmon value right) with top/bottom 0.5px gray border, 40px height. Used throughout flight cards.
   - **Button**: Salmon pink bg, black text, 48px height, 8px radius, full-width.
   - **Input**: Transparent bg with salmon pink 1px border, 8px radius. Desktop: 32px height, 12px text. Mobile: 48px height, 16px text.
   - **Card**: Dark gray bg (#222), 16px padding, 8px radius.
7. Create the app layout: full-screen black background, fluid, responsive.
8. Set up `.gitignore`, `.env.local.example`.
9. Push to GitHub repo `johanfrossen/get-outta-here`.

**Validation**: `npm run build`, `npm run lint`, `npx tsc --noEmit` pass. Base components render matching Figma screenshots.

---

### Milestone 2: Core Search UI & Flight Cards

**Goal**: Complete search-to-results flow with form validation, flight cards, and mock data matching Figma pixel-perfectly.

**Features**:
1. **Header**: "GET OUTTA HERE" in monospace italic, salmon pink, centered. Desktop ~41px, mobile 27px left-aligned.
2. **SearchForm -- Desktop** (reference Figma node `6:1094`):
   - 4 inputs in horizontal row with 8px gap, centered below title.
   - Each input: 225px wide, 32px height, salmon border, 8px radius.
   - Labels above: "From", "To", "Leaving date", "Return date" in white 12px.
   - Placeholder text in salmon: "Add destination", "Any Mediterranean city", "Add", "Add".
   - "To" field shows "Any Mediterranean city" (non-editable/disabled).
3. **SearchForm -- Mobile** (reference Figma node `1:1690`):
   - Stacked vertical inputs, full-width, 16px gap.
   - Input height: 48px, text 16px.
   - Labels in gray (#8c8c8c): "Where you are getting out from", "Destination", "Leaving date", "Returning date".
4. **Form validation**: Require departure city + both dates. Return date >= departure date. Inline errors.
5. **ResultsGrid**:
   - Desktop: 4 columns, 8px gap. Cards fill available width.
   - Mobile: 1 column, full-width cards.
   - 72px gap between search area and results grid.
6. **FlightCard -- Desktop** (reference Figma node `1:765`):
   - Dark gray card (#222), 16px padding, 8px radius.
   - **Header section**: Destination name (24px, salmon, uppercase) + description (12px, salmon).
   - **"Flight outta here" section**: Section header (12px, salmon) + rows:
     - "Departure from" / Airport name
     - "Departure time" / XX:XX AM
     - "Landing time" / XX:XX AM
   - **"Flight back" section**: Same structure for return flight.
   - **"Flight price" section**: Section header (12px, salmon) + rows:
     - "Basic" / XXXX SEK
     - "With 1 luggage" / XXXX SEK
   - **CTA**: "Book: [Destination name]" button, salmon bg, black text, 48px, full-width.
   - 48px gap between major sections inside card.
7. **FlightCard -- Mobile** (reference Figma node `7:1233`):
   - Same structure but adds "From" and "To" airport rows in each flight section.
   - Full-width (370px in Figma, responsive in implementation).
8. **SkeletonCard**: Loading placeholder matching card dimensions, shimmer animation on dark bg.
9. **EmptyState**: Message before search in salmon on black.
10. **Mock data**: 18+ Mediterranean destinations with plausible times and SEK prices. Destinations: Barcelona, Nice, Rome, Athens, Valletta, Dubrovnik, Split, Palma de Mallorca, Naples, Marseille, Venice, Santorini, Lisbon, Malaga, Sardinia, Mykonos, Hvar, Kotor.
11. **Search behavior**: On submit, show skeleton loading (600-900ms), then display results.

**Validation**: Full search flow works. 4-column grid on desktop, 1-column on mobile. Cards match Figma screenshots. All form validation works. Tests pass.

---

### Milestone 3: Animations & Motion

**Goal**: Layer in animations that bring the dark UI to life. The monospace italic + salmon-on-black aesthetic should feel technical, premium, and alive.

**Features**:
1. **Hero text reveal**: "GET OUTTA HERE" title animates with staggered letter-by-letter or word-by-word fade-up on load. Monospace character-by-character feels especially good. Framer Motion.
2. **Tagline rotation** (optional, not in Figma): If adding a tagline, cycle through variants with fade: "Mediterranean escapes, instantly." / "Your next getaway is one search away." Salmon pink, smaller text below title.
3. **Card entrance stagger**: Flight cards cascade in with staggered delays (0.05s between cards). Fade + subtle slide up. Framer Motion `staggerChildren`.
4. **Departure board flip effect**: Card data rows flip into view like an airport split-flap display. Each row animates sequentially within the card. GSAP or Framer Motion.
5. **Skeleton shimmer**: Dark shimmer effect (subtle lighter gray traveling across #222 cards). Not a bright white shimmer -- match the dark aesthetic.
6. **Hover card lift**: Cards gain a subtle glow (salmon pink shadow or border brightening) + slight scale on hover. Fits the dark theme.
7. **Search button pulse**: Subtle breathing animation on CTA when form is valid. Salmon pink glow effect.
8. **Price counter**: Prices count up from 0 to final value. Monospace font makes this look like a ticker.
9. **Input focus animation**: Salmon border brightens or gains a subtle glow on focus.
10. **Reduced motion**: All animations wrapped to respect `prefers-reduced-motion`. Static fallbacks.

**Validation**: All animations 60fps. No CLS. Reduced motion works. Dark theme animations feel premium, not flashy. Tests pass.

---

### Milestone 4: Amadeus Flight API Integration

**Goal**: Replace mock data with real flight data from Amadeus API.

**Features**:
1. **API route**: `app/api/flights/route.ts` proxying to Amadeus. Keys in `.env.local`.
2. **Amadeus OAuth2**: Token management with caching.
3. **Airport autocomplete**: Amadeus Airport & City Search for departure input. Debounced, dropdown styled in dark theme (black bg, salmon accents).
4. **Flight offers search**: Query multiple Mediterranean IATA codes (BCN, NCE, FCO, ATH, MLA, DBV, SPU, PMI, NAP, MRS, VCE, JTR, LIS, AGP, OLB, JMK).
5. **Response mapping**: Map to FlightCard model -- destination name, airport codes, departure/landing times, base price (SEK), luggage price (SEK), airline.
6. **SEK as default currency**: Prices display in SEK by default (matching Figma).
7. **Error handling**: API failures, rate limits, empty results. Fallback to mock data.
8. **Caching**: React Query with appropriate stale times.
9. **Loading states**: Skeleton cards with dark shimmer during API calls.

**Validation**: Real Amadeus data renders in cards. Autocomplete works. Mock fallback works. No keys in client. Tests pass.

---

### Milestone 5: Additional Features & Polish

**Goal**: Ship-ready feature set with all extras.

**Features**:
1. **Currency selector**: Toggle EUR/SEK/GBP/USD. Styled as small UI element in dark theme. Persist in localStorage.
2. **Recent searches**: Last 5 in localStorage. Display as salmon-outlined chips.
3. **Favorites**: Heart icon on cards (salmon when active). Save to localStorage.
4. **"Surprise me"**: Random destination button. Salmon CTA style. Auto-triggers search.
5. **Weather preview**: Temperature/condition on each card (Open-Meteo API or static seasonal).
6. **Passenger count**: Selector in search form (not in current Figma -- add as small UI element matching style).
7. **Responsive polish**: Test 375px, 390px, 414px, 768px, 1024px, 1440px.
8. **Accessibility**: Keyboard nav, screen reader, focus management, color contrast (salmon on black needs verification -- may need lighter salmon for small text).
9. **Performance**: Lighthouse 90+ all metrics. Font optimization (subset monospace font). Code splitting.
10. **SEO**: Meta tags, Open Graph, structured data.

**Validation**: All features work across devices. Lighthouse 90+. Accessibility 90+. localStorage persists. Tests pass. Final Figma match confirmed.

---

## Skills Available

- **vibe-coding**: Rapid prototyping, Milestones 1-2.
- **brainstorm**: Creative decisions for animations and UX where Figma doesn't specify.
- **frontend-ui-integration**: UI features against Amadeus API, Milestones 4-5.
- **product-management**: Feature scoping if needed.

## Documentation Requirements (CRITICAL)

Documentation is a first-class deliverable. Every milestone must produce documentation alongside code.

### What to document

1. **AGENTS.md** (root): Keep this file continuously updated as the single source of truth for any new Droid session. After each milestone, update it with:
   - Current project status (which milestones are complete, what's in progress)
   - Any new commands, scripts, or workflows added
   - New components and their locations
   - API integrations and how they work
   - Environment variables needed and how to set them up
   - Known issues or gotchas discovered during implementation

2. **Component documentation**: Each major component should have a brief JSDoc comment explaining its purpose, props, and usage.

3. **API documentation**: Document all API routes, request/response shapes, and error handling in code comments and in AGENTS.md.

4. **Architecture decisions**: When making non-obvious technical choices (e.g., why a specific animation library for a specific effect, why a certain caching strategy), add a brief note in AGENTS.md under a "Decisions" section.

### Self-updating mission log

After completing each milestone, append a **Mission Log** entry at the bottom of this file (`MISSION.md`) with:
- Date completed
- What was built (files created/modified)
- What works
- What changed from the original plan (if anything)
- Any blockers or issues encountered
- What the next milestone should focus on

Format:
```
## Mission Log

### Milestone 1 -- [date]
**Status**: Complete
**What was built**: [summary]
**Files**: [key files created]
**Changes from plan**: [any deviations]
**Issues**: [any blockers found]
**Next**: [what M2 should prioritize]
```

### AGENTS.md as session bootstrap

The goal is that any new Droid session opening this project can read AGENTS.md and immediately understand:
- What the project is and what it does
- The current state (what's done, what's next)
- How to run, build, test, and lint
- The tech stack and key patterns
- Where everything lives in the codebase
- What APIs are integrated and how they work

This means AGENTS.md must be a **living document** that grows with the project, not a static initial spec.

## Constraints

- Never commit API keys or secrets. Use `.env.local`.
- No `any` types. No `@ts-ignore`.
- Every data component: loading, error, empty states.
- All animations: `prefers-reduced-motion` respected.
- 8-point spacing: no arbitrary pixel values.
- Do NOT set up Vercel deployment.
- Push all code to `johanfrossen/get-outta-here` on GitHub.
- **Always update AGENTS.md** after completing any milestone or significant change.
- **Always append to Mission Log** in this file after each milestone.

## Repository

- GitHub: https://github.com/johanfrossen/get-outta-here
- Branch: `main` default. Feature work on `feature/*` branches.

## Success Criteria

1. App builds and runs without errors.
2. All tests pass.
3. Lint and type checks pass.
4. Real Amadeus flight data with mock fallback.
5. Animations smooth at 60fps with reduced-motion fallbacks.
6. 4-column desktop grid, 1-column mobile (matching Figma).
7. All features working (search, favorites, recent, currency, surprise me, weather).
8. Visual match to Figma designs (dark theme, salmon accents, monospace italic).
9. Lighthouse 90+ performance and accessibility.
10. Code pushed to GitHub.
11. **AGENTS.md is fully up-to-date** with current project state, commands, components, APIs, and architecture.
12. **Mission Log below is complete** with entries for each finished milestone.

---

## Mission Log

_Entries will be appended here after each milestone is completed._

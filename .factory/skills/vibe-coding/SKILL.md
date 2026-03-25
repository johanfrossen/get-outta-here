---
name: vibe-coding
description: Rapidly prototype and build modern, responsive web applications from scratch using current frameworks and libraries. Use when you want to quickly create a new web app with full local control, creative flow, and modern best practices. Local alternative to Lovable, Bolt, and v0.
---
# Skill: Vibe coding

## Purpose

Rapidly prototype and build modern, responsive web applications from scratch using current frameworks, libraries, and best practices. This skill handles everything from initial project setup to implementing features, styling, and basic deployment configuration with a focus on creative flow and quick iteration.

## When to use this skill

- You want to **rapidly prototype** a new web application idea.
- You're in a **creative flow** and want to build something quickly without context switching.
- You want to use **modern frameworks** like React, Next.js, Vue, Svelte, or similar.
- You prefer **local development** with full control rather than hosted builder environments.
- You want to **experiment and iterate fast** on designs and features.

## Key differences from Lovable/Bolt/v0

Unlike hosted vibe-coding tools (Lovable, Bolt, v0):

- **Runs locally**: All code lives on your machine, not in a hosted environment.
- **No infrastructure lock-in**: You control deployment, hosting, and infrastructure choices.
- **Framework flexibility**: Not limited to a specific tech stack; can use any modern framework.
- **Full backend support**: Can integrate with any backend, run local servers, use databases, etc.
- **Version control native**: Built with git workflows in mind from the start.

## Inputs

- **Application description**: Purpose, key features, and target users.
- **Technology preferences**: Desired frameworks (React/Next.js/Vue/Svelte), styling approach (Tailwind/CSS-in-JS/CSS Modules), and any specific libraries.
- **Feature requirements**: Core functionality, user flows, and data models.
- **Design direction**: Style preferences, color schemes, Figma references.
- **Deployment target**: Where you plan to host (Vercel, Netlify, AWS, self-hosted, etc.).

## Out of scope

- Managing production infrastructure or cloud provider accounts.
- Creating complex backend microservices architecture (use service-integration skill instead).
- Mobile native app development (iOS/Android).

## Conventions and best practices

### Framework selection
- **Always search for the most current documentation** from official sources before implementing.
- Example: Search https://nextjs.org/docs for Next.js, https://react.dev for React, etc.
- **Never hardcode outdated commands or patterns** -- always verify current best practices.

### Project initialization
1. Search official docs for the latest initialization command (e.g., `npx create-next-app@latest`).
2. Use TypeScript by default for type safety.
3. Set up ESLint and Prettier for code quality.
4. Initialize git repository from the start.

### Architecture patterns
- **Component-based**: Break UI into small, reusable components.
- **Type-safe**: Use TypeScript throughout for better developer experience.
- **Responsive by default**: Mobile-first design approach.
- **Accessibility first**: Semantic HTML, ARIA labels, keyboard navigation.
- **Performance-conscious**: Code splitting, lazy loading, optimized images.

### Styling approach
- Use modern CSS frameworks (Tailwind CSS recommended for rapid development).
- Implement consistent design system with reusable tokens for colors, spacing, typography.
- Support light/dark mode when appropriate.
- Ensure proper contrast ratios and accessibility.
- Use 8-point spacing system (padding/margins/gaps as multiples of 8px).

### State and data
- Choose appropriate state management (React Context, Zustand, Redux) based on complexity.
- Use modern data fetching patterns (React Query, SWR, or framework built-ins like Next.js App Router).
- Implement proper loading, error, and empty states.

### Animations and motion
- Use Framer Motion (motion) for React-based animations.
- GSAP for complex timeline-based animations.
- CSS animations for simple transitions.
- Always respect `prefers-reduced-motion` media query.

### Backend integration
- If backend is needed, set up API routes or server components appropriately.
- For databases, use type-safe ORMs (Prisma, Drizzle) when possible.
- Implement proper error handling and validation.

## Required behavior

1. **Research current best practices**: Before any implementation, search for and reference the latest official documentation.
2. **Initialize properly**: Set up project with all necessary tooling, configs, and directory structure.
3. **Implement features incrementally**: Build and test features one at a time.
4. **Write clean, maintainable code**: Follow framework conventions and best practices.
5. **Handle edge cases**: Loading states, errors, empty states, validation.
6. **Ensure accessibility**: Proper semantic HTML, ARIA labels, keyboard navigation.
7. **Test critical paths**: Write tests for core functionality.

## Required artifacts

- Fully initialized project with all configuration files.
- Clean, well-organized component and page structure.
- Styling implementation (Tailwind config, CSS modules, or chosen approach).
- **Tests** for critical user flows and business logic.
- **.gitignore** properly configured.
- **Package.json** with clear scripts and dependencies.

## Verification

Run the following commands (adjust based on package manager and setup):

```bash
npm install
npm run type-check   # or tsc --noEmit
npm run lint
npm test
npm run build
npm run dev
```

The skill is complete when:

- All commands run successfully without errors.
- The application builds and runs in development mode.
- Core features work as specified across different screen sizes.
- Accessibility checks pass.
- Tests cover critical user paths.

## Safety and escalation

- **External dependencies**: Always verify package security and maintenance status before adding dependencies.
- **Environment secrets**: Never commit API keys, secrets, or credentials. Use `.env.local` and document in README.
- **Framework limitations**: If requirements exceed framework capabilities, suggest alternatives or clarify constraints.

---
name: frontend-ui-integration
description: Implement or extend a user-facing workflow in a web application, integrating with existing backend APIs. Use when the feature is primarily a UI/UX change backed by existing APIs, affects only the web frontend, and requires following design system, routing, and testing conventions.
---
# Skill: Frontend UI integration

## Purpose

Implement or extend a user-facing workflow in the "Get Outta Here" web application, integrating with **existing backend APIs** and following our **design system, routing, and testing conventions**.

## When to use this skill

- The feature is primarily a **UI/UX change** backed by one or more existing APIs.
- The backend contracts, auth model, and core business rules **already exist**.
- The change affects **only** the web frontend (no schema or service ownership changes).

## Inputs

- **Feature description**: short narrative of the user flow and outcomes.
- **Relevant APIs**: endpoints, request/response types, and links to source definitions.
- **Target routes/components**: paths, component names, or feature modules.
- **Design references**: Figma links or existing screens to mirror.
- **Guardrails**: performance limits, accessibility requirements, and any security constraints.

## Out of scope

- Creating new backend services or changing persistent data models.
- Modifying authentication/authorization flows.
- Introducing new frontend frameworks or design systems.

## Conventions

- **Framework**: Next.js with React and TypeScript.
- **Routing**: App Router with file-based routing.
- **Styling**: Tailwind CSS with 8-point spacing system.
- **State management**: React Query / SWR for server state, Zustand or React Context for client state.
- **Animations**: Framer Motion for component animations, GSAP for complex sequences.
- **Figma integration**: Reference Figma designs for layout, spacing, colors, and typography. Use Figma MCP tools when available.

## Required behavior

1. Implement the UI changes with **strong typing** for all props and API responses.
2. Handle loading, empty, error, and success states using existing primitives.
3. Ensure the UI is **keyboard accessible** and screen-reader friendly.
4. Follow mobile-first responsive design.
5. Use the 8-point spacing system consistently.

## Required artifacts

- Updated components and hooks in the appropriate feature module.
- **Unit tests** for core presentation logic.
- **Integration or component tests** for the new flow.
- Minimal **PR description text** summarizing the behavior change.

## Implementation checklist

1. Locate the relevant feature module and existing components.
2. Confirm the backend APIs and types, updating shared TypeScript types if needed.
3. Implement the UI, wiring in API calls via the existing data layer.
4. Add or update tests to cover the new behavior and edge cases.
5. Run the required validation commands (see below).

## Verification

Run the following:

```bash
npm run lint
npm run test
npm run type-check
npm run build
```

The skill is complete when:

- All tests, linters, and type checks pass.
- The new UI behaves as specified across normal, error, and boundary cases.
- No unrelated files or modules are modified.

## Safety and escalation

- If the requested change requires backend contract changes, **stop** and request a backend-focused task instead.
- If design references conflict with existing accessibility standards, favor accessibility and highlight the discrepancy.

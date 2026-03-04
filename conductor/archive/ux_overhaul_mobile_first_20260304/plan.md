# Plan: Platform-Wide UX Overhaul & Mobile-First Optimization

## Phase 1: Technical Fixes (Carousel & Tooltips)
Goal: Stabilize core hero components and resolve stacking issues.

- [x] Task: Implement infinite auto-slide loop for the Brand Logo Carousel using Framer Motion or CSS animation.
- [x] Task: Audit `z-index` values in `src/components/v2/sections/hero.tsx` and related components.
- [x] Task: Test tooltip visibility against all overlapping UI elements (Navbar, Modals).
- [x] Task: Conductor - User Manual Verification 'Phase 1: Technical Fixes' (Protocol in workflow.md)

## Phase 2: Global Contact & Link Verification
Goal: Ensure 100% data legitimacy across all routes.

- [x] Task: Create a comprehensive audit script/grep to find all hardcoded phone numbers, emails, and links.
- [x] Task: Standardize all instances to +971 2 555 5443, 800 76278, and info@smartmotor.ae.
- [x] Task: Verify every social media handle (Instagram, TikTok, etc.) points to official Smart Motor profiles.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Data Legitimacy' (Protocol in workflow.md)

## Phase 3: Global Image Asset Inventory
Goal: Map out all current placeholders and define requirements.

- [x] Task: Traverse the entire `src/` directory to identify every `<img>` and `<Image>` tag.
- [x] Task: Generate a master markdown table: `[Page] | [Component] | [Current File] | [Dimensions] | [Ideal Asset Description]`.
- [x] Task: Define "Ideal Asset" descriptions for 100+ placeholders adhering to the luxury aesthetic.
- [x] Task: Conductor - User Manual Verification 'Phase 3: Image Audit' (Protocol in workflow.md)

## Phase 4: Mobile-First Architectural Refinement (Public & Customer)
Goal: Ensure the marketing and customer experience is superior on small screens.

- [x] Task: Refactor Public Pages (Home, About, Services, Hub) for 320px+ viewport optimization.
- [x] Task: Refactor Customer Portal (Dashboard, Fleet, Bookings) for enhanced mobile usability.
- [x] Task: Optimize the 4-screen booking flow for one-handed mobile operation.
- [x] Task: Conductor - User Manual Verification 'Phase 4: Mobile Public/Customer' (Protocol in workflow.md)

## Phase 5: Mobile-First Architectural Refinement (Admin OS)
Goal: Bring the management engine to the palm of the hand.

- [x] Task: Optimize Admin Dashboards and Data Tables for mobile (scrollable views or card-based mobile fallbacks).
- [x] Task: Ensure complex forms (Service Config, Studio) are fully functional on mobile.
- [x] Task: Verify that Passkey/Biometric login works seamlessly on mobile browsers.
- [x] Task: Conductor - User Manual Verification 'Phase 5: Mobile Admin OS' (Protocol in workflow.md)

## Phase 6: Rich Interaction & Micro-Animations
Goal: Add the final layer of luxury through feedback and transitions.

- [x] Task: Implement global hover states (subtle scale, silver-shine highlights) for all buttons and links.
- [x] Task: Add Framer Motion "Luminous" entry animations for page sections.
- [x] Task: Refine error/feedback toasts to match the premium theme.
- [x] Task: Conductor - User Manual Verification 'Phase 6: Rich Interactions' (Protocol in workflow.md)

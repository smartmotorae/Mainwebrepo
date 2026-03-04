# Plan: Unified Authentication System Cleanup & Implementation

## Phase 1: Session Management Consolidation
Goal: Unify all session-related utilities and cookie naming conventions.

- [x] Task: Audit `src/lib/auth-utils.ts`, `src/lib/user-session.ts`, `src/lib/session.ts`, and `src/app/actions/firebase-auth.ts`.
- [x] Task: Consolidate session logic into a single, robust source of truth (preferring `src/lib/auth-utils.ts` or `src/lib/session.ts`).
- [x] Task: Standardize on a single session cookie name (e.g., `__session`) across all components and actions.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Session Consolidation'

## Phase 2: Login & Logout Flow Refinement
Goal: Implement unified, secure server-side login and logout handling.

- [x] Task: Refactor `/api/auth/login` to use the unified session creation logic (setting the `__session` cookie).
- [x] Task: Refactor `/api/auth/logout` and all sign-out routes to use the unified session revocation logic.
- [x] Task: Implement/Verify Role-Based Access Control (RBAC) during session creation (assigning 'admin' or 'customer' roles).
- [x] Task: Conductor - User Manual Verification 'Phase 2: Flow Refinement'

## Phase 3: User & Admin Dashboard Integration
Goal: Ensure the new auth system correctly protects user and admin routes.

- [x] Task: Update `AdminLayout` to use the unified session verification.
- [x] Task: Update User Dashboard (`/user/dashboard`) to use the same unified session verification.
- [x] Task: Verify that role-based redirection is working correctly for both users and admins.
- [x] Task: Conductor - User Manual Verification 'Phase 3: Dashboard Integration'

## Phase 4: Cleanup & Final Verification
Goal: Remove all redundant auth code and verify system stability.

- [x] Task: Delete `src/lib/user-session.ts` and any other redundant auth utility files.
- [x] Task: Remove any remaining NextAuth configuration or dependencies if present.
- [x] Task: Run full build and type-check to ensure zero breakage.
- [x] Task: Conductor - User Manual Verification 'Phase 4: Final Verification'

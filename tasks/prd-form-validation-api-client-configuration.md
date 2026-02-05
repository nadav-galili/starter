# PRD: Form Validation & API Client Configuration

## Overview
Set up form validation using React Hook Form with Zod schemas, and configure TanStack Query with fetch for API communication. This PRD establishes the data fetching and form handling patterns for the React Native Expo starter app, integrating with the Zustand store foundation from PRD 1.

## Goals
- Establish type-safe form validation patterns using React Hook Form + Zod
- Configure TanStack Query for server state management
- Implement environment-based API URL configuration
- Provide automatic authentication token injection from Zustand auth store
- Set up centralized error handling with toast notifications
- Implement basic retry logic for failed requests

## Quality Gates

These commands must pass for every user story:
- `npx expo lint` - Linting
- `npx tsc --noEmit` - Type checking

For UI-related stories, also include:
- Verify in Expo Go/simulator using dev-browser skill

## User Stories

### US-001: Install and Configure React Hook Form
As a developer, I want React Hook Form installed and configured so that I can build performant forms with minimal re-renders.

**Acceptance Criteria:**
- [ ] Install `react-hook-form` package
- [ ] Create a `src/lib/form.ts` file exporting common form utilities
- [ ] Export typed `useForm` wrapper with default configuration
- [ ] Add example usage comments in the file

### US-002: Install and Configure Zod Validation
As a developer, I want Zod configured with React Hook Form so that I can define type-safe validation schemas.

**Acceptance Criteria:**
- [ ] Install `zod` and `@hookform/resolvers` packages
- [ ] Create `src/lib/validation.ts` for common validation schemas
- [ ] Export reusable schema fragments (email, password, phone, etc.)
- [ ] Integrate zodResolver as default resolver in form utilities

### US-003: Set Up Environment Configuration
As a developer, I want environment-based API URL configuration so that I can target different backends for dev/staging/prod.

**Acceptance Criteria:**
- [ ] Create `src/config/env.ts` for environment configuration
- [ ] Define API_BASE_URL with environment variable support
- [ ] Support development, staging, and production environments
- [ ] Add `.env.example` file documenting required variables
- [ ] Update `.gitignore` to exclude `.env` files if not already

### US-004: Install and Configure TanStack Query
As a developer, I want TanStack Query configured so that I have a robust server state management solution.

**Acceptance Criteria:**
- [ ] Install `@tanstack/react-query` package
- [ ] Create `src/lib/query-client.ts` with QueryClient configuration
- [ ] Configure default stale time, cache time, and retry settings
- [ ] Set up QueryClientProvider in app layout (`app/_layout.tsx`)
- [ ] Enable React Query DevTools for development (if available for RN)

### US-005: Create API Client with Fetch
As a developer, I want a configured fetch-based API client so that I have a consistent way to make HTTP requests.

**Acceptance Criteria:**
- [ ] Create `src/lib/api-client.ts` with typed fetch wrapper
- [ ] Support GET, POST, PUT, PATCH, DELETE methods
- [ ] Automatically prepend API_BASE_URL to relative paths
- [ ] Include proper headers (Content-Type, Accept)
- [ ] Return typed responses with proper error handling

### US-006: Implement Automatic Auth Token Injection
As a developer, I want authentication tokens automatically injected into API requests so that authenticated endpoints work seamlessly.

**Acceptance Criteria:**
- [ ] Integrate with Zustand auth store from PRD 1
- [ ] Automatically read token from auth store
- [ ] Inject Authorization header when token exists
- [ ] Skip injection for unauthenticated requests (configurable)

### US-007: Set Up Centralized Error Handling
As a user, I want to see toast notifications for API errors so that I know when something goes wrong.

**Acceptance Criteria:**
- [ ] Install a toast notification library (e.g., `react-native-toast-message` or `burnt`)
- [ ] Create `src/lib/toast.ts` with typed toast utilities
- [ ] Configure toast provider in app layout
- [ ] Create error handler that displays user-friendly error messages
- [ ] Integrate error handler with API client

### US-008: Configure Query Retry Logic
As a developer, I want basic retry logic for failed requests so that transient network errors are handled gracefully.

**Acceptance Criteria:**
- [ ] Configure retry count (default: 3 retries)
- [ ] Implement exponential backoff between retries
- [ ] Skip retry for 4xx client errors (except 408, 429)
- [ ] Document retry behavior in code comments

### US-009: Create Example API Hook
As a developer, I want an example query hook so that I have a reference pattern for building API integrations.

**Acceptance Criteria:**
- [ ] Create `src/hooks/api/use-example-query.ts` as a template
- [ ] Demonstrate proper typing with TanStack Query
- [ ] Show query key conventions
- [ ] Include comments explaining the pattern
- [ ] Create corresponding example in `src/lib/api/example.ts` for the API call

### US-010: Create Example Mutation Hook
As a developer, I want an example mutation hook so that I have a reference pattern for POST/PUT/DELETE operations.

**Acceptance Criteria:**
- [ ] Create `src/hooks/api/use-example-mutation.ts` as a template
- [ ] Demonstrate optimistic updates pattern
- [ ] Show error handling with toast notifications
- [ ] Show cache invalidation after mutation
- [ ] Include comments explaining the pattern

## Functional Requirements
- FR-1: React Hook Form must be the standard form library for all forms
- FR-2: Zod must be used for all form validation schemas
- FR-3: All API requests must go through the centralized API client
- FR-4: Authentication tokens must be automatically injected when available
- FR-5: API errors must display user-friendly toast notifications
- FR-6: Failed requests must retry up to 3 times with exponential backoff
- FR-7: Environment variables must control API base URL

## Non-Goals
- Pre-built form UI components (just validation setup)
- Offline request queuing (basic retry only)
- Request caching to persistent storage
- WebSocket or real-time subscriptions
- GraphQL support
- Request cancellation on unmount (TanStack Query handles this)

## Technical Considerations
- Use Zustand auth store created in PRD 1 for token management
- Follow existing project structure from PRD 1
- Ensure all exports are properly typed for TypeScript inference
- Consider bundle size when choosing toast library
- TanStack Query DevTools may have limited support in React Native

## Success Metrics
- All form validation is handled through React Hook Form + Zod
- API client successfully injects auth tokens from Zustand store
- Toast notifications appear on API errors
- Example hooks serve as clear patterns for future development
- Type safety maintained throughout form and API layers

## Open Questions
- Should we add request/response interceptors for logging in development?
- Preferred toast library for React Native (react-native-toast-message vs burnt vs other)?
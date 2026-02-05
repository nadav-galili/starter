# PRD: React Native Expo Boilerplate - Foundation

## Overview
Create the foundational layer of a reusable React Native Expo boilerplate template. This PRD covers project initialization, folder structure, Expo Router navigation setup, NativeWind/Tailwind theming with dark mode support, and base UI components. The boilerplate will be backend-agnostic with a repository pattern for future backend integrations.

## Goals
- Initialize a well-structured Expo project with TypeScript
- Establish a scalable type-based folder structure
- Configure Expo Router for file-based navigation
- Set up NativeWind with dark mode (system preference + manual toggle)
- Create foundational UI components using NativeWind
- Define repository pattern interfaces for Auth, User, Storage, Database, Analytics, and Notifications
- Include a working Home screen demonstrating navigation, theming, and base components

## Quality Gates

These commands must pass for every user story:
- `npx expo lint` - Linting
- `npx tsc --noEmit` - Type checking

For UI stories, also include:
- Verify in Expo Go or simulator that the UI renders correctly

## User Stories

### US-001: Initialize Expo Project with TypeScript
As a developer, I want a properly configured Expo project with TypeScript so that I have a solid foundation to build upon.

**Acceptance Criteria:**
- [ ] Create new Expo project using `npx create-expo-app` with TypeScript template
- [ ] Configure `tsconfig.json` with strict mode enabled
- [ ] Add path aliases (`@/` pointing to `src/`)
- [ ] Verify project runs with `npx expo start`

### US-002: Establish Folder Structure
As a developer, I want a clear type-based folder structure so that code organization is consistent and scalable.

**Acceptance Criteria:**
- [ ] Create `/src` directory as the main source folder
- [ ] Create `/src/components` for reusable UI components
- [ ] Create `/src/screens` for screen components
- [ ] Create `/src/hooks` for custom React hooks
- [ ] Create `/src/services` for API/backend services
- [ ] Create `/src/repositories` for repository interfaces and implementations
- [ ] Create `/src/stores` for Zustand state stores
- [ ] Create `/src/utils` for utility functions
- [ ] Create `/src/types` for TypeScript type definitions
- [ ] Create `/src/constants` for app constants (colors, spacing, etc.)
- [ ] Create `/src/assets` for images, fonts, and static assets
- [ ] Add `index.ts` barrel exports in each directory

### US-003: Configure Expo Router Navigation
As a developer, I want file-based routing with Expo Router so that navigation is intuitive and follows modern patterns.

**Acceptance Criteria:**
- [ ] Install and configure Expo Router
- [ ] Set up `/app` directory for route definitions
- [ ] Create root `_layout.tsx` with stack navigator
- [ ] Create `index.tsx` as the home route
- [ ] Configure typed routes for TypeScript support
- [ ] Verify navigation works in Expo Go

### US-004: Set Up NativeWind with Tailwind CSS
As a developer, I want NativeWind configured so that I can use Tailwind CSS classes for styling.

**Acceptance Criteria:**
- [ ] Install NativeWind and its dependencies (use stable version)
- [ ] Create `tailwind.config.js` with content paths configured
- [ ] Configure `babel.config.js` for NativeWind
- [ ] Add NativeWind types to TypeScript config
- [ ] Create `global.css` with Tailwind directives
- [ ] Verify Tailwind classes work on a test component

### US-005: Implement Dark Mode Theming
As a user, I want the app to support dark mode with system preference detection and manual toggle so that I can use the app comfortably in any lighting.

**Acceptance Criteria:**
- [ ] Create theme constants (light/dark color palettes)
- [ ] Implement `useColorScheme` hook that detects system preference
- [ ] Create `ThemeContext` for manual theme override
- [ ] Store theme preference in AsyncStorage
- [ ] Configure NativeWind for dark mode (`dark:` prefix classes)
- [ ] Theme persists across app restarts
- [ ] System preference is respected when no manual override is set

### US-006: Create Base UI Components - Typography
As a developer, I want typography components so that text styling is consistent throughout the app.

**Acceptance Criteria:**
- [ ] Create `Text` component with variants (h1, h2, h3, body, caption, label)
- [ ] Text component supports dark mode automatically
- [ ] Text component accepts custom className for overrides
- [ ] Export from `/src/components/ui/Text.tsx`

### US-007: Create Base UI Components - Button
As a developer, I want a Button component so that interactive elements are consistent.

**Acceptance Criteria:**
- [ ] Create `Button` component with variants (primary, secondary, outline, ghost)
- [ ] Support sizes (sm, md, lg)
- [ ] Support disabled state with visual feedback
- [ ] Support loading state with ActivityIndicator
- [ ] Button supports dark mode automatically
- [ ] Export from `/src/components/ui/Button.tsx`

### US-008: Create Base UI Components - Input
As a developer, I want an Input component so that form fields are consistent.

**Acceptance Criteria:**
- [ ] Create `Input` component with label support
- [ ] Support error state with error message display
- [ ] Support disabled state
- [ ] Support secure text entry (password fields)
- [ ] Input supports dark mode automatically
- [ ] Export from `/src/components/ui/Input.tsx`

### US-009: Create Base UI Components - Card
As a developer, I want a Card component so that content containers are consistent.

**Acceptance Criteria:**
- [ ] Create `Card` component with padding and border radius
- [ ] Support variants (elevated, outlined, filled)
- [ ] Card supports dark mode automatically
- [ ] Export from `/src/components/ui/Card.tsx`

### US-010: Create Base UI Components - Container
As a developer, I want layout components so that screen structure is consistent.

**Acceptance Criteria:**
- [ ] Create `Container` component for screen-level padding
- [ ] Create `SafeAreaContainer` that wraps SafeAreaView
- [ ] Support centered content variant
- [ ] Components support dark mode automatically
- [ ] Export from `/src/components/ui/Container.tsx`

### US-011: Define Repository Pattern Interfaces
As a developer, I want repository interfaces defined so that backend implementations can be swapped easily.

**Acceptance Criteria:**
- [ ] Create `IAuthRepository` interface (signIn, signUp, signOut, getCurrentUser, resetPassword)
- [ ] Create `IUserRepository` interface (getProfile, updateProfile, deleteAccount)
- [ ] Create `IStorageRepository` interface (upload, download, delete, getUrl)
- [ ] Create `IDatabaseRepository` interface (generic CRUD operations)
- [ ] Create `IAnalyticsRepository` interface (track, identify, screen, reset)
- [ ] Create `INotificationRepository` interface (register, unregister, getToken, onMessage)
- [ ] All interfaces in `/src/repositories/interfaces/`
- [ ] Create placeholder/mock implementations for development

### US-012: Set Up Zustand Store Foundation
As a developer, I want Zustand configured with a base store so that state management patterns are established.

**Acceptance Criteria:**
- [ ] Install Zustand
- [ ] Create `useThemeStore` for theme state (colorScheme, toggleTheme, setTheme)
- [ ] Configure AsyncStorage persistence for theme store
- [ ] Create store TypeScript types
- [ ] Export from `/src/stores/`

### US-013: Create Home Screen
As a developer, I want a working Home screen so that I can validate the foundation setup works correctly.

**Acceptance Criteria:**
- [ ] Create Home screen at `/app/index.tsx`
- [ ] Display app title using Typography component
- [ ] Include theme toggle Button that switches light/dark mode
- [ ] Display current theme state in a Card component
- [ ] Include sample Input field demonstrating the component
- [ ] Use Container/SafeAreaContainer for layout
- [ ] All components render correctly in both light and dark mode
- [ ] Verify in Expo Go on iOS and Android

## Functional Requirements
- FR-1: The project must use Expo SDK 52+ with TypeScript strict mode
- FR-2: All source code must reside in the `/src` directory with path alias `@/`
- FR-3: Navigation must use Expo Router with typed routes
- FR-4: All UI components must support dark mode via NativeWind `dark:` prefix
- FR-5: Theme preference must persist in AsyncStorage
- FR-6: Repository interfaces must be generic enough to support any backend
- FR-7: All components must be properly typed with TypeScript

## Non-Goals
- Backend implementation (Supabase, Clerk, etc.) - covered in PRD 3
- Authentication flows and screens - covered in PRD 3
- Form validation library setup - covered in PRD 2
- API client configuration - covered in PRD 2
- Onboarding screens - covered in PRD 3
- Settings screens - covered in PRD 3
- Push notification implementation - covered in PRD 3
- Analytics implementation - covered in PRD 3

## Technical Considerations
- Use Expo's built-in `useColorScheme` as the base for system theme detection
- NativeWind version should be determined at implementation time for stability
- AsyncStorage should use `@react-native-async-storage/async-storage`
- Consider using `expo-font` for custom fonts if needed later
- Repository pattern should use TypeScript generics for type safety

## Success Metrics
- All quality gates pass (lint, typecheck)
- App runs without errors in Expo Go
- Theme toggle works correctly with persistence
- All base components render in both light and dark mode
- Folder structure matches specification
- Repository interfaces are properly typed

## Open Questions
- Should we include a specific icon library (Lucide, Phosphor) in this PRD or defer to PRD 2?
- Should we add a splash screen configuration in this phase?
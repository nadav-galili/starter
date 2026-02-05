# React Native Expo Starter Boilerplate Plan

## Overview
Create a production-ready React Native Expo starter/boilerplate for building Productivity and Consumer/Social apps with a modern, well-structured tech stack.

---

## Tech Stack Summary

### Core Framework
- **React Native** with **Expo** (managed workflow)
- **Expo Router** for file-based navigation (tab-based structure)
- **TypeScript** for type safety
- **NativeWind v4** (Tailwind CSS for React Native)

### State Management & Data
- **Zustand** - client state management
- **TanStack Query** + native fetch - server state & caching
- **TanStack Form** - form handling with validation
- **MMKV** - fast local storage

### Backend & Auth (Flexible)
- Option A: **Supabase** (PostgreSQL, auth, storage)
- Option B: **Node.js + PostgreSQL + Clerk**
- **Clerk** - primary auth provider (Google, Apple, Email)

### UI & Styling
- Custom component library (no external UI kit)
- Dark mode support (system + manual toggle)
- **expo-image** - optimized image handling
- **lucide-react-native** - icon library
- **react-native-date-picker** - native date/time picker
- **Reanimated + Gesture Handler** - animations
- **expo-haptics** - haptic feedback
- **react-native-safe-area-context** - safe areas
- **Sonner Native** - toast notifications
- Expo Router modals

### Analytics & Monitoring
- **PostHog** - product analytics, feature flags, session replay
- **Sentry** - crash reporting & error monitoring

### Monetization
- **RevenueCat** - in-app purchases & subscriptions

### Internationalization
- **i18next** with **react-i18next** and **expo-localization**

### Infrastructure
- **EAS Build + Submit** - CI/CD pipeline
- **expo-updates** - OTA updates
- **ESLint + Prettier + Husky** - code quality with pre-commit hooks
- **Jest + React Testing Library** - testing
- Deep linking (basic structure ready)
- App version checking / force update logic
- Network connectivity detection with UI feedback

### Additional Features
- **expo-sharing** / react-native-share - social sharing
- Swipeable onboarding with permission pre-screens
- Splash screen with asset preloading
- Keyboard handling (KeyboardAvoidingView)
- Rate limiting / request throttling utilities

---

## Project Structure (Type-Based)

```
starter-app/
├── app/                          # Expo Router - screens & navigation
│   ├── (auth)/                   # Auth group (sign-in, sign-up, forgot-password)
│   │   ├── sign-in.tsx
│   │   ├── sign-up.tsx
│   │   └── forgot-password.tsx
│   ├── (tabs)/                   # Main tabbed navigation
│   │   ├── _layout.tsx           # Tab bar configuration
│   │   ├── index.tsx             # Home tab
│   │   ├── profile.tsx           # Profile tab
│   │   └── settings.tsx          # Settings tab
│   ├── (onboarding)/             # Onboarding flow
│   │   └── index.tsx
│   ├── _layout.tsx               # Root layout
│   ├── +not-found.tsx            # 404 screen
│   └── modal.tsx                 # Example modal route
│
├── components/                   # Reusable UI components
│   ├── ui/                       # Base UI primitives
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Text.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── forms/                    # Form components
│   │   ├── FormField.tsx
│   │   └── ...
│   ├── layout/                   # Layout components
│   │   ├── Screen.tsx            # Base screen wrapper with safe area
│   │   ├── KeyboardAvoid.tsx
│   │   └── ...
│   ├── feedback/                 # Feedback components
│   │   ├── LoadingSpinner.tsx
│   │   ├── EmptyState.tsx
│   │   └── NetworkBanner.tsx
│   └── onboarding/               # Onboarding components
│       ├── OnboardingSlide.tsx
│       └── PermissionScreen.tsx
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts
│   ├── useTheme.ts
│   ├── useHaptics.ts
│   ├── useNetworkStatus.ts
│   ├── useAppState.ts
│   ├── useDebounce.ts
│   ├── useThrottle.ts
│   └── ...
│
├── services/                     # API & external services
│   ├── api/                      # API client & endpoints
│   │   ├── client.ts             # Fetch wrapper with interceptors
│   │   └── endpoints/
│   ├── analytics/                # Analytics abstraction
│   │   ├── posthog.ts
│   │   └── index.ts
│   ├── auth/                     # Auth service (Clerk wrapper)
│   │   └── index.ts
│   ├── storage/                  # Local storage (MMKV wrapper)
│   │   └── index.ts
│   └── sharing/                  # Social sharing utilities
│       └── index.ts
│
├── stores/                       # Zustand stores
│   ├── useAuthStore.ts
│   ├── useThemeStore.ts
│   ├── useOnboardingStore.ts
│   └── ...
│
├── lib/                          # Utilities & helpers
│   ├── utils.ts                  # General utilities
│   ├── constants.ts              # App constants
│   ├── validation.ts             # Zod schemas
│   └── linking.ts                # Deep linking config
│
├── i18n/                         # Internationalization
│   ├── index.ts                  # i18next config
│   └── locales/
│       ├── en.json
│       └── ...
│
├── theme/                        # Theming
│   ├── colors.ts                 # Color palette (light/dark)
│   ├── spacing.ts
│   └── index.ts
│
├── types/                        # TypeScript types
│   ├── navigation.ts
│   ├── api.ts
│   └── ...
│
├── assets/                       # Static assets
│   ├── images/
│   ├── fonts/
│   └── animations/               # Lottie files if any
│
├── __tests__/                    # Test files
│
├── .husky/                       # Git hooks
│   └── pre-commit
│
├── app.json                      # Expo config
├── eas.json                      # EAS Build config
├── package.json
├── tsconfig.json
├── tailwind.config.js            # NativeWind config
├── metro.config.js
├── babel.config.js
├── .env.example
├── .eslintrc.js
├── .prettierrc
└── CLAUDE.md                     # Project documentation
```

---

## Implementation Phases

### Phase 1: Project Initialization
1. Create new Expo project with `create-expo-app`
2. Configure TypeScript
3. Set up NativeWind v4
4. Configure ESLint + Prettier + Husky
5. Set up folder structure
6. Configure app.json and eas.json

### Phase 2: Core Infrastructure
1. Set up Expo Router with tab navigation structure
2. Configure MMKV storage
3. Set up Zustand stores (auth, theme, onboarding)
4. Create base UI components (Button, Input, Text, Card)
5. Implement Screen wrapper with safe areas
6. Set up theming (light/dark mode)

### Phase 3: Authentication
1. Integrate Clerk SDK
2. Create auth screens (sign-in, sign-up, forgot-password)
3. Implement useAuth hook
4. Set up protected routes
5. Add social auth (Google, Apple)

### Phase 4: Analytics & Monitoring
1. Integrate PostHog SDK
2. Create analytics abstraction layer
3. Integrate Sentry for error tracking
4. Set up feature flags infrastructure

### Phase 5: API Layer
1. Create fetch wrapper with error handling
2. Set up TanStack Query provider
3. Create example API hooks
4. Implement rate limiting utilities

### Phase 6: Forms & Validation
1. Set up TanStack Form
2. Create FormField components
3. Set up Zod validation schemas
4. Create example forms (profile edit, etc.)

### Phase 7: UI Features
1. Implement onboarding flow with slides
2. Add permission pre-screens
3. Set up Sonner Native toasts
4. Create NetworkBanner component
5. Implement haptic feedback hooks
6. Set up keyboard handling

### Phase 8: Example Screens
1. Home screen with example content
2. Profile screen with edit functionality
3. Settings screen (theme toggle, language, etc.)
4. Full auth flow screens

### Phase 9: Additional Features
1. Set up RevenueCat for IAP
2. Implement social sharing
3. Add app version checking / force update
4. Configure expo-updates for OTA
5. Set up i18next with example translations
6. Configure deep linking

### Phase 10: Testing & Polish
1. Write unit tests for hooks and utilities
2. Write component tests
3. Create splash screen with asset preloading
4. Final code cleanup and documentation
5. Create CLAUDE.md with project guide

---

## Key Dependencies

```json
{
  "dependencies": {
    "expo": "~52.x",
    "expo-router": "~4.x",
    "expo-image": "~2.x",
    "expo-haptics": "~14.x",
    "expo-sharing": "~13.x",
    "expo-splash-screen": "~0.29.x",
    "expo-updates": "~0.27.x",
    "expo-localization": "~16.x",

    "nativewind": "^4.x",
    "tailwindcss": "^3.x",

    "zustand": "^5.x",
    "@tanstack/react-query": "^5.x",
    "@tanstack/react-form": "^0.x",
    "react-native-mmkv": "^3.x",

    "@clerk/clerk-expo": "^2.x",

    "posthog-react-native": "^3.x",
    "@sentry/react-native": "^6.x",

    "react-native-purchases": "^8.x",

    "i18next": "^24.x",
    "react-i18next": "^15.x",

    "react-native-reanimated": "~3.x",
    "react-native-gesture-handler": "~2.x",
    "react-native-safe-area-context": "^5.x",

    "lucide-react-native": "^0.x",
    "react-native-date-picker": "^5.x",
    "sonner-native": "^0.x",

    "zod": "^3.x",
    "@react-native-community/netinfo": "^11.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "eslint": "^9.x",
    "prettier": "^3.x",
    "husky": "^9.x",
    "lint-staged": "^15.x",
    "jest": "^29.x",
    "@testing-library/react-native": "^12.x"
  }
}
```

---

## Example Screens to Include

### Auth Flow
- Sign In (email + social buttons)
- Sign Up (with email verification flow)
- Forgot Password
- Password Reset

### Onboarding
- 3-4 swipeable intro slides
- Permission explanation screens (optional notifications, tracking)

### Main App (Tabs)
- **Home**: Example content with pull-to-refresh, loading states, empty state
- **Profile**: User info display, edit profile functionality
- **Settings**: Theme toggle, language selector, account actions, app info

### Modals
- Example modal using Expo Router modal routes

---

## Configuration Files to Create

1. `app.json` - Expo config with all plugins
2. `eas.json` - EAS Build profiles (development, preview, production)
3. `tsconfig.json` - TypeScript config
4. `tailwind.config.js` - NativeWind/Tailwind config
5. `metro.config.js` - Metro bundler config for NativeWind
6. `babel.config.js` - Babel config
7. `.eslintrc.js` - ESLint rules
8. `.prettierrc` - Prettier config
9. `.env.example` - Environment variables template
10. `CLAUDE.md` - Project documentation for Claude Code

---

## Notes

- Backend is kept flexible (Supabase vs custom) - provide both patterns as comments/docs
- Clerk is the primary auth solution for simplicity
- All external services (PostHog, Sentry, RevenueCat) should have easy toggle/mock for development
- Focus on developer experience - clear patterns, good types, minimal boilerplate

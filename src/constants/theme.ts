// Theme color palettes for light and dark modes

export const colors = {
  light: {
    background: '#ffffff',
    foreground: '#000000',
    card: '#f5f5f5',
    cardForeground: '#1a1a1a',
    primary: '#2563eb',
    primaryForeground: '#ffffff',
    secondary: '#f1f5f9',
    secondaryForeground: '#0f172a',
    muted: '#f1f5f9',
    mutedForeground: '#64748b',
    border: '#e2e8f0',
    destructive: '#dc2626',
    destructiveForeground: '#ffffff',
  },
  dark: {
    background: '#0a0a0a',
    foreground: '#fafafa',
    card: '#1a1a1a',
    cardForeground: '#fafafa',
    primary: '#3b82f6',
    primaryForeground: '#ffffff',
    secondary: '#1e293b',
    secondaryForeground: '#f8fafc',
    muted: '#1e293b',
    mutedForeground: '#94a3b8',
    border: '#334155',
    destructive: '#b91c1c',
    destructiveForeground: '#ffffff',
  },
} as const;

export type ThemeMode = 'light' | 'dark' | 'system';
export type ColorScheme = 'light' | 'dark';

export const THEME_STORAGE_KEY = '@theme_preference';

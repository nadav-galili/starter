import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';
import { ThemeContext } from '../hooks/useTheme';
import type { ColorScheme, ThemeMode } from '../constants';
import { THEME_STORAGE_KEY } from '../constants';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemColorScheme = useSystemColorScheme();
  const { setColorScheme } = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load stored theme preference on mount
  useEffect(() => {
    async function loadThemePreference() {
      try {
        const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (stored && (stored === 'light' || stored === 'dark' || stored === 'system')) {
          setThemeModeState(stored as ThemeMode);
        }
      } catch (error) {
        console.warn('Failed to load theme preference:', error);
      } finally {
        setIsLoaded(true);
      }
    }
    loadThemePreference();
  }, []);

  // Resolve the actual color scheme based on mode and system preference
  const colorScheme: ColorScheme = useMemo(() => {
    if (themeMode === 'system') {
      return systemColorScheme ?? 'light';
    }
    return themeMode;
  }, [themeMode, systemColorScheme]);

  // Update NativeWind color scheme whenever resolved color changes
  useEffect(() => {
    if (isLoaded) {
      setColorScheme(colorScheme);
    }
  }, [colorScheme, isLoaded, setColorScheme]);

  // Save theme preference and update state
  const setThemeMode = useCallback(async (mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      colorScheme,
      themeMode,
      setThemeMode,
      isDark: colorScheme === 'dark',
    }),
    [colorScheme, themeMode, setThemeMode]
  );

  // Don't render children until theme is loaded to prevent flash
  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

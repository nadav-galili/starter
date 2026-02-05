import '../global.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';

import { ThemeProvider } from '../src/components';
import { queryClient } from '../src/lib';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Home' }} />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

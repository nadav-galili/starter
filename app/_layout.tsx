import '../global.css';
import { Stack } from 'expo-router';
import { ThemeProvider } from '../src/components';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
      </Stack>
    </ThemeProvider>
  );
}

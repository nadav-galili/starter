import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useTheme } from '../src/hooks';
import { Text } from '../src/components';
import { Button } from '../src/components/ui/Button';
import { Card } from '../src/components/ui/Card';
import { Input } from '../src/components/ui/Input';
import { SafeAreaContainer } from '../src/components/ui/Container';
import type { ThemeMode } from '../src/constants';

export default function HomeScreen() {
  const { themeMode, setThemeMode, isDark, colorScheme } = useTheme();
  const [sampleText, setSampleText] = useState('');

  const themeModes: ThemeMode[] = ['system', 'light', 'dark'];

  const toggleTheme = () => {
    const currentIndex = themeModes.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % themeModes.length;
    setThemeMode(themeModes[nextIndex]);
  };

  return (
    <SafeAreaContainer edges={['top', 'bottom']}>
      <View className="flex-1 justify-center px-4">
        <Text variant="h1" className="mb-2 text-center">
          Welcome to Starter
        </Text>
        <Text variant="body" className="text-muted-foreground mb-8 text-center">
          Your Expo Router app is ready!
        </Text>

        <Card variant="outlined" className="mb-6">
          <Text variant="label" className="text-muted-foreground mb-2">
            Current Theme State
          </Text>
          <Text variant="body" className="mb-1">
            Mode: <Text variant="body" className="font-semibold">{themeMode}</Text>
          </Text>
          <Text variant="body" className="mb-1">
            Color Scheme: <Text variant="body" className="font-semibold">{colorScheme}</Text>
          </Text>
          <Text variant="body">
            Is Dark: <Text variant="body" className="font-semibold">{isDark ? 'Yes' : 'No'}</Text>
          </Text>
        </Card>

        <View className="mb-6">
          <Button onPress={toggleTheme} variant="primary" size="lg" className="mb-4">
            Toggle Theme ({themeMode})
          </Button>

          <View className="flex-row gap-2 justify-center">
            {themeModes.map((mode) => (
              <Button
                key={mode}
                onPress={() => setThemeMode(mode)}
                variant={themeMode === mode ? 'primary' : 'secondary'}
                size="sm"
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Button>
            ))}
          </View>
        </View>

        <Input
          label="Sample Input"
          placeholder="Type something here..."
          value={sampleText}
          onChangeText={setSampleText}
          className="mb-4"
        />

        {sampleText.length > 0 && (
          <Card variant="filled" className="bg-muted">
            <Text variant="caption" className="text-muted-foreground">
              You typed: {sampleText}
            </Text>
          </Card>
        )}
      </View>

      <StatusBar style={isDark ? 'light' : 'dark'} />
    </SafeAreaContainer>
  );
}

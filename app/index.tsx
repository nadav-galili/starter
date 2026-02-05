import { StatusBar } from 'expo-status-bar';
import { Pressable, Text as RNText, View } from 'react-native';
import { useTheme } from '../src/hooks';
import { Text } from '../src/components';
import { Container } from '../src/components/ui/Container';
import type { ThemeMode } from '../src/constants';

export default function HomeScreen() {
  const { themeMode, setThemeMode, isDark } = useTheme();

  const themeModes: ThemeMode[] = ['system', 'light', 'dark'];

  return (
    <Container centered>
      <Text variant="h1" className="mb-2">Welcome to Starter</Text>
      <Text variant="body" className="text-muted-foreground mb-4">
        Your Expo Router app is ready!
      </Text>

      <View className="mb-8 items-center">
        <Text variant="label" className="text-muted-foreground mb-2">Typography Variants</Text>
        <Text variant="h1">Heading 1</Text>
        <Text variant="h2">Heading 2</Text>
        <Text variant="h3">Heading 3</Text>
        <Text variant="body">Body text</Text>
        <Text variant="caption">Caption text</Text>
        <Text variant="label">Label text</Text>
      </View>

      <View className="flex-row gap-2">
        {themeModes.map((mode) => (
          <Pressable
            key={mode}
            onPress={() => setThemeMode(mode)}
            className={`px-4 py-2 rounded-lg ${
              themeMode === mode
                ? 'bg-primary'
                : 'bg-secondary'
            }`}
          >
            <RNText
              className={`capitalize ${
                themeMode === mode
                  ? 'text-primary-foreground'
                  : 'text-secondary-foreground'
              }`}
            >
              {mode}
            </RNText>
          </Pressable>
        ))}
      </View>

      <StatusBar style={isDark ? 'light' : 'dark'} />
    </Container>
  );
}

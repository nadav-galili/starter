import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../src/hooks';
import type { ThemeMode } from '../src/constants';

export default function HomeScreen() {
  const { themeMode, setThemeMode, isDark } = useTheme();

  const themeModes: ThemeMode[] = ['system', 'light', 'dark'];

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-2xl font-bold mb-2 text-foreground">
        Welcome to Starter
      </Text>
      <Text className="text-base text-muted-foreground mb-8">
        Your Expo Router app is ready!
      </Text>

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
            <Text
              className={`capitalize ${
                themeMode === mode
                  ? 'text-primary-foreground'
                  : 'text-secondary-foreground'
              }`}
            >
              {mode}
            </Text>
          </Pressable>
        ))}
      </View>

      <StatusBar style={isDark ? 'light' : 'dark'} />
    </View>
  );
}

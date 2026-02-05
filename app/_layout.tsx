import "../global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "burnt/web";
import { Stack } from "expo-router";
import { Platform } from "react-native";

import { ThemeProvider } from "../src/components";
import { queryClient } from "../src/lib";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Home" }} />
        </Stack>
        {Platform.OS === "web" && <Toaster position="bottom-right" />}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

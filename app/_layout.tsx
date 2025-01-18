import { Stack } from "expo-router";
import StoreProvider from "@/store/store.provider";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <StoreProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'fade_from_bottom',
          animationDuration: 200,
          presentation: 'modal',
        }}
      />
    </StoreProvider>
  );
}

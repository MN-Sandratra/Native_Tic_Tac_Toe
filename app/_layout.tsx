import { Stack } from 'expo-router';
import StoreProvider from '@/store/store.provider';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { initAnonymousAuth } from '@/utils/firebase/config';

export default function RootLayout() {
  useEffect(() => {
    initAnonymousAuth().catch((err) => {
      console.error('Auth error:', err);
    });
  }, []);

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

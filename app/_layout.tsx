import { Stack } from 'expo-router';
import StoreProvider from '@/store/store.provider';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { initAnonymousAuth } from '@/utils/firebase/config';
import { useAppDispatch } from '@/store/store.hook';
import { loadLanguage } from '@/store/slices/settingsSlice';

function AppInit() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    initAnonymousAuth().catch((err) => console.error('Auth error:', err));
    dispatch(loadLanguage());
  }, []);

  return null;
}

export default function RootLayout() {
  return (
    <StoreProvider>
      <AppInit />
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

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';

SplashScreen.preventAutoHideAsync();

export const useLoadFonts = () => {
  const [fontsLoaded] = useFonts({
    PressStart2P: require('@/assets/fonts/PressStart2P-Regular.ttf'),
    'ChakraPetch-Bold': require('@/assets/fonts/ChakraPetch-Bold.ttf'),
    'ChakraPetch-SemiBold': require('@/assets/fonts/ChakraPetch-SemiBold.ttf'),
    'SpaceGrotesk-Bold': require('@/assets/fonts/SpaceGrotesk-Bold.ttf'),
    'SpaceGrotesk-Medium': require('@/assets/fonts/SpaceGrotesk-Medium.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return { fontsLoaded, onLayoutRootView };
};

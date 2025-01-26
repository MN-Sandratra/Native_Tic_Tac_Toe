import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 768;

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    'PressStart2P': require('@/assets/fonts/PressStart2P-Regular.ttf'),
    'ChakraPetch-Bold': require('@/assets/fonts/ChakraPetch-Bold.ttf'),
    'ChakraPetch-SemiBold': require('@/assets/fonts/ChakraPetch-SemiBold.ttf'),
    'SpaceGrotesk-Bold': require('@/assets/fonts/SpaceGrotesk-Bold.ttf'),
    'SpaceGrotesk-Medium': require('@/assets/fonts/SpaceGrotesk-Medium.ttf'),
  });

  const currentYear =new Date().getFullYear()

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const router = useRouter();

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F172A', '#1E293B']}
        style={StyleSheet.absoluteFill}
      />

      <TouchableOpacity style={styles.settingsButton} onPress={() => {}}>
        <FontAwesome5 name="cog" size={20} color="#fff" />
      </TouchableOpacity>
      
      <View style={styles.content} onLayout={onLayoutRootView}>
        <View style={styles.titleContainer}>
          <View style={styles.logoContainer}>
            <View style={styles.logoBox}>
              <Text style={[styles.symbol, styles.symbolX]}>X</Text>
              <Text style={[styles.symbol, styles.symbolO]}>O</Text>
            </View>
            <Text style={styles.logoText}>TIC TAC TOE</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>SELECT MODE</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.menuButton}
              onPress={() => router.push('/(game)/player-select')}
            >
              <View style={styles.buttonContent}>
                <View style={styles.iconContainer}>
                  <FontAwesome5 name="user-friends" size={20} color="#818CF8" />
                </View>
                <View style={styles.buttonTextContainer}>
                  <Text style={styles.menuText}>LOCAL MULTIPLAYER</Text>
                  <Text style={styles.buttonSubtext}>Play with a friend</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuButton}>
              <View style={styles.buttonContent}>
                <View style={styles.iconContainer}>
                  <FontAwesome5 name="robot" size={20} color="#F472B6" />
                </View>
                <View style={styles.buttonTextContainer}>
                  <Text style={styles.menuText}>VS AI</Text>
                  <Text style={styles.buttonSubtext}>Challenge the computer</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.copyright}>© {currentYear} Tic Tac Toe - Sandratra</Text>
        <Text style={styles.version}>v1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingsButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  symbol: {
    fontFamily: 'PressStart2P',
    fontSize: isLargeScreen ? 48 : 36,
    marginHorizontal: 8,
  },
  symbolX: {
    color: '#818CF8',
  },
  symbolO: {
    color: '#F472B6',
  },
  logoText: {
    fontFamily: 'ChakraPetch-Bold',
    fontSize: isLargeScreen ? 24 : 20,
    color: '#fff',
    letterSpacing: 4,
  },
  menuContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 20,
    marginTop:20,
    borderRadius: 20,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 16,
  },
  menuTitle: {
    fontFamily: 'ChakraPetch-SemiBold',
    fontSize: isLargeScreen ? 20 : 18,
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 2,
  },
  menuButton: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  buttonTextContainer: {
    flex: 1,
  },
  menuText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: isLargeScreen ? 16 : 14,
    color: '#fff',
    marginBottom: 2,
  },
  buttonSubtext: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: isLargeScreen ? 12 : 10,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  copyright: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 4,
  },
  version: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.3)',
  },
});

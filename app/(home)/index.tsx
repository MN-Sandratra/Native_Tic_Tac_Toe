import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Footer } from '@/components/footer';
import { Logo } from '@/components/logo';
import { useLoadFonts } from '@/hooks/useLoadFont';
import { MenuButton } from '@/components/menuButton';
import { useAppDispatch } from '@/store/store.hook';
import { setGameMode } from '@/store/slices/gameSlice';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 768;

export default function HomeScreen() {
  const { fontsLoaded, onLayoutRootView } = useLoadFonts();
  const dispatch = useAppDispatch();
  const router = useRouter();

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F172A', '#1E293B']} style={StyleSheet.absoluteFill} />

      <TouchableOpacity style={styles.settingsButton} onPress={() => {}}>
        <FontAwesome5 name="cog" size={20} color="#fff" />
      </TouchableOpacity>

      <View style={styles.content} onLayout={onLayoutRootView}>
        <View style={styles.titleContainer}>
          <Logo />
        </View>

        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>SELECT MODE</Text>

          <View style={styles.buttonContainer}>
            <MenuButton
              icon="user-friends"
              iconColor="#818CF8"
              title="LOCAL MULTIPLAYER"
              subtitle="Play with a friend"
              onPress={() => {
                dispatch(setGameMode('solo'));
                router.push('/(game)/player-select');
              }}
            />

            <MenuButton
              icon="wifi"
              iconColor="#34D399"
              title="ONLINE MULTIPLAYER"
              subtitle="Invite or join a remote match"
              onPress={() => {
                dispatch(setGameMode('multiplayer'));
                router.push('/(online)/lobby');
              }}
            />

            <MenuButton
              icon="robot"
              iconColor="#F472B6"
              title="VS AI"
              subtitle="Challenge the computer"
            />
          </View>
        </View>
      </View>

      <Footer />
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
  menuContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    padding: 20,
    marginTop: 20,
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
});

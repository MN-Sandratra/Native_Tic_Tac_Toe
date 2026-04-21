import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/store.hook';
import { setPlayer, resetPlayers } from '@/store/slices/playerSlice';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 768;

export default function PlayerSelectScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [playerName, setPlayerName] = useState('');

  const player1 = useAppSelector((state) => state.players.player1);

  const isPlayer2Setup = !!player1;
  const currentSymbol = isPlayer2Setup ? (player1.symbol === 'X' ? 'O' : 'X') : 'X';

  const handleContinue = () => {
    if (playerName.trim()) {
      dispatch(
        setPlayer({
          playerNumber: isPlayer2Setup ? 2 : 1,
          name: playerName.trim(),
          symbol: currentSymbol,
        })
      );
      if (isPlayer2Setup) {
        router.push('/(game)/play');
      } else {
        setPlayerName('');
      }
    }
  };

  const handleResetPlayer1 = () => {
    dispatch(resetPlayers());
    setPlayerName('');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F172A', '#1E293B']} style={StyleSheet.absoluteFill} />

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <FontAwesome5 name="arrow-left" size={20} color="#fff" />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.logoBox}>
          <Text style={[styles.symbol, styles.symbolX]}>X</Text>
          <Text style={[styles.symbol, styles.symbolO]}>O</Text>
        </View>

        <BlurView intensity={60} tint="dark" style={styles.glassBox}>
          <Text style={[styles.title, isPlayer2Setup && { color: '#DDD6FE' }]}>
            {isPlayer2Setup ? 'PLAYER 2 SETUP' : 'PLAYER 1 SETUP'}
          </Text>

          {isPlayer2Setup && (
            <View style={styles.player1Card}>
              <FontAwesome5 name="user" size={14} color="#818CF8" style={{ marginRight: 8 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.player1Label}>PLAYER 1</Text>
                <Text style={styles.player1Name}>{player1.name}</Text>
              </View>
              <View style={styles.symbolBadge}>
                <Text style={styles.symbolBadgeText}>{player1.symbol}</Text>
              </View>
              <TouchableOpacity style={styles.deleteButton} onPress={handleResetPlayer1}>
                <FontAwesome5 name="trash" size={14} color="#FF4B4B" />
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.label}>YOUR NAME</Text>
          <TextInput
            style={styles.input}
            value={playerName}
            onChangeText={setPlayerName}
            placeholder="Enter your name"
            placeholderTextColor="rgba(255,255,255,0.5)"
            autoCapitalize="words"
          />

          <View style={styles.symbolRow}>
            <Text style={styles.label}>YOUR SYMBOL</Text>
            <View
              style={[
                styles.symbolDisplay,
                isPlayer2Setup && { backgroundColor: 'rgba(124,58,237,0.1)' },
              ]}>
              <Text style={[styles.symbolText, isPlayer2Setup && { color: '#7C3AED' }]}>
                {currentSymbol}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.continueButton, !playerName.trim() && styles.disabledButton]}
            onPress={handleContinue}
            disabled={!playerName.trim()}>
            <Text style={styles.continueButtonText}>
              {isPlayer2Setup ? 'START GAME' : 'NEXT PLAYER'}
            </Text>
          </TouchableOpacity>
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  logoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    marginTop: isLargeScreen ? 40 : 20,
  },
  symbol: {
    fontFamily: 'PressStart2P',
    fontSize: isLargeScreen ? 32 : 24,
    marginHorizontal: 4,
  },
  symbolX: { color: '#818CF8' },
  symbolO: { color: '#F472B6' },
  glassBox: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.07)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 6 },
    }),
  },
  title: {
    fontFamily: 'ChakraPetch-Bold',
    fontSize: isLargeScreen ? 22 : 18,
    color: '#fff',
    marginBottom: 16,
    letterSpacing: 2,
  },
  player1Card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(129,140,248,0.10)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(129,140,248,0.3)',
  },
  player1Label: {
    fontFamily: 'ChakraPetch-SemiBold',
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
  },
  player1Name: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 15,
    color: '#fff',
  },
  symbolBadge: {
    backgroundColor: 'rgba(129,140,248,0.2)',
    borderRadius: 8,
    padding: 6,
    marginRight: 8,
  },
  symbolBadgeText: {
    fontFamily: 'PressStart2P',
    fontSize: 14,
    color: '#818CF8',
  },
  deleteButton: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255,75,75,0.1)',
  },
  label: {
    fontFamily: 'ChakraPetch-SemiBold',
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    alignSelf: 'flex-start',
    marginBottom: 6,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    color: '#fff',
    borderRadius: 10,
    padding: 12,
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 15,
    width: '100%',
    marginBottom: 14,
  },
  symbolRow: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  symbolDisplay: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  symbolText: {
    fontFamily: 'PressStart2P',
    fontSize: 26,
    color: '#818CF8',
  },
  continueButton: {
    width: '100%',
    height: 46,
    backgroundColor: '#818CF8',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: 'rgba(129,140,248,0.4)',
  },
  continueButtonText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 15,
    color: '#fff',
    letterSpacing: 1,
  },
});

import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
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
  const [playerName, setPlayerName] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const player1 = useAppSelector(state => state.players.player1);

  const isPlayer2Setup = !!player1;
  const currentSymbol = isPlayer2Setup ? (player1.symbol === 'X' ? 'O' : 'X') : 'X';

  const handleContinue = () => {
    if (playerName.trim()) {
      dispatch(setPlayer({
        playerNumber: isPlayer2Setup ? 2 : 1,
        name: playerName.trim(),
        symbol: currentSymbol,
      }));

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

  // Définir les couleurs en fonction du joueur
  const gradientColors = isPlayer2Setup 
    ? ['#4A1D96', '#7C3AED'] // Violet pour le joueur 2
    : ['#0F172A', '#1E293B']; // Bleu foncé pour le joueur 1

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F172A', '#1E293B']}
        style={StyleSheet.absoluteFill}
      />

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
      >
        <FontAwesome5 name="arrow-left" size={20} color="#fff" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[
          styles.title,
          { color: isPlayer2Setup ? '#DDD6FE' : '#ffffff' }
        ]}>
          {isPlayer2Setup ? 'PLAYER 2 SETUP' : 'PLAYER 1 SETUP'}
        </Text>

        {isPlayer2Setup && (
          <View style={styles.player1Info}>
            <View style={styles.player1Card}>
              <Text style={styles.player1Label}>PLAYER 1</Text>
              <Text style={styles.player1Name}>{player1.name}</Text>
              <View style={styles.symbolBadge}>
                <Text style={styles.symbolBadgeText}>{player1.symbol}</Text>
              </View>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={handleResetPlayer1}
              >
                <FontAwesome5 name="trash" size={16} color="#FF4B4B" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>YOUR NAME</Text>
          <BlurView intensity={20} tint="dark" style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={playerName}
              onChangeText={setPlayerName}
              placeholder="Enter your name"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />
          </BlurView>
        </View>

        <View style={styles.symbolContainer}>
          <Text style={styles.label}>YOUR SYMBOL</Text>
          <View style={[
            styles.symbolDisplay,
            isPlayer2Setup && { backgroundColor: 'rgba(124, 58, 237, 0.1)' }
          ]}>
            <Text style={[
              styles.symbolText,
              isPlayer2Setup && { color: '#7C3AED' }
            ]}>
              {currentSymbol}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.continueButton, !playerName.trim() && styles.disabledButton]}
          onPress={handleContinue}
          disabled={!playerName.trim()}
        >
          <Text style={styles.continueButtonText}>
            {isPlayer2Setup ? 'START GAME' : 'NEXT PLAYER'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
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
  title: {
    fontFamily: 'ChakraPetch-Bold',
    fontSize: isLargeScreen ? 32 : 28,
    color: '#fff',
    marginBottom: 40,
    letterSpacing: 2,
  },
  player1Info: {
    marginBottom: 30,
    width: '100%',
    maxWidth: 400,
  },
  player1Card: {
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 16,
    alignItems: 'center',
  },
  player1Label: {
    fontFamily: 'ChakraPetch-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
  player1Name: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 20,
    color: '#fff',
    marginVertical: 10,
  },
  symbolBadge: {
    backgroundColor: 'rgba(129, 140, 248, 0.2)',
    borderRadius: 10,
    padding: 10,
  },
  symbolBadgeText: {
    fontFamily: 'PressStart2P',
    fontSize: 24,
    color: '#818CF8',
  },
  inputContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 30,
  },
  label: {
    fontFamily: 'ChakraPetch-SemiBold',
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  inputWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  input: {
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
    color: '#fff',
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  symbolContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 40,
    alignItems: 'center',
  },
  symbolDisplay: {
    width: 80,
    height: 80,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolText: {
    fontFamily: 'PressStart2P',
    fontSize: 32,
    color: '#818CF8',
  },
  continueButton: {
    width: '100%',
    maxWidth: 400,
    height: 50,
    backgroundColor: '#818CF8',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: 'rgba(129, 140, 248, 0.5)',
  },
  continueButtonText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 16,
    color: '#fff',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 75, 75, 0.1)',
  },
}); 
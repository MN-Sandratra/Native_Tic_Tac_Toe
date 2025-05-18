import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import * as Clipboard from 'expo-clipboard';
import LobbyButton from '@/components/lobbyButton';
import { PlayerList } from '@/components/playerList';
import { useAppDispatch, useAppSelector } from '@/store/store.hook';
import { createRoom, joinRoom, setPlayers } from '@/store/slices/lobbySlice';
import { LobbyService } from '@/services/lobby/lobbyService';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 768;

export default function LobbyScreen() {
  const [playerName, setPlayerName] = useState('');
  const [copyMessage, setCopyMessage] = useState('');
  const [roomInput, setRoomInput] = useState('');
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { roomCode, players, error, createLoading, joinLoading, inLobby } = useAppSelector(
    (state) => state.lobby
  );

  const handleCreateRoom = async () => {
    if (!playerName.trim()) return;

    dispatch(createRoom(playerName));
  };

  const handleJoinRoom = async () => {
    if (!playerName.trim() || !roomInput.trim()) return;

    dispatch(joinRoom({ roomCode: roomInput.toUpperCase(), playerName }));
  };

  const handleCopyRoomCode = async () => {
    if (roomCode) {
      await Clipboard.setStringAsync(roomCode);

      setCopyMessage('Room code copied!');
      setTimeout(() => setCopyMessage(''), 2000);
    }
  };

  const handleStartGame = () => {};

  useEffect(() => {
    if (!roomCode || !inLobby) return;

    LobbyService.listen(roomCode, (players) => {
      dispatch(setPlayers(players));
    });
  }, [roomCode, inLobby]);

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
        {inLobby}

        {!inLobby ? (
          <BlurView intensity={60} tint="dark" style={styles.glassBox}>
            <Text style={styles.title}>Online Lobby</Text>
            {!!error && <Text style={styles.errorText}>{error}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Your name"
              placeholderTextColor="rgba(255,255,255,0.5)"
              value={playerName}
              onChangeText={setPlayerName}
              autoCapitalize="words"
            />
            <View style={styles.row}>
              <LobbyButton
                onPress={handleCreateRoom}
                loading={createLoading}
                icon={<FontAwesome5 name="plus" size={18} color="#818CF8" style={styles.icon} />}>
                Create
              </LobbyButton>
              <Text style={styles.or}>OR</Text>
              <TextInput
                style={[styles.input, { flex: 1, minWidth: 80 }]}
                placeholder="Room code"
                placeholderTextColor="rgba(255,255,255,0.5)"
                value={roomInput}
                onChangeText={setRoomInput}
                autoCapitalize="characters"
                maxLength={5}
              />
              <LobbyButton
                onPress={handleJoinRoom}
                loading={joinLoading}
                icon={
                  <FontAwesome5 name="sign-in-alt" size={18} color="#818CF8" style={styles.icon} />
                }>
                Join
              </LobbyButton>
            </View>
          </BlurView>
        ) : (
          <BlurView intensity={80} tint="dark" style={styles.lobbyGlassBox}>
            <Text style={styles.lobbyTitle}>Room Code</Text>
            <View style={styles.roomCodeCard}>
              <FontAwesome5 name="hashtag" size={18} color="#818CF8" style={{ marginRight: 8 }} />
              <Text style={styles.roomCode}>{roomCode}</Text>
              <TouchableOpacity onPress={handleCopyRoomCode} style={styles.copyButton}>
                <FontAwesome5 name="copy" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            {!!copyMessage && <Text style={styles.copySuccess}>{copyMessage}</Text>}
            <Text style={styles.lobbySubtitle}>Players in lobby</Text>
            <PlayerList players={players} />
            {players && players.length < 2 ? (
              <View style={styles.waitingBox}>
                <ActivityIndicator size="small" color="#FCD34D" style={{ marginBottom: 6 }} />
                <Text style={styles.waiting}>Waiting for another player...</Text>
              </View>
            ) : (
              <LobbyButton
                onPress={handleStartGame}
                loading={false}
                icon={<FontAwesome5 name="play" size={18} color="#fff" style={styles.icon} />}
                style={styles.startButton}>
                Start Game
              </LobbyButton>
            )}
          </BlurView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  errorText: {
    color: '#F87171',
    fontFamily: 'ChakraPetch-SemiBold',
    marginBottom: 8,
    fontSize: 13,
  },
  copySuccess: {
    color: '#34D399',
    fontSize: 13,
    marginTop: 6,
    fontFamily: 'ChakraPetch-SemiBold',
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
  logoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    marginTop: isLargeScreen ? 40 : 20,
  },
  or: {
    color: '#fff',
    marginHorizontal: 6,
    fontFamily: 'ChakraPetch-Bold',
    fontSize: 14,
  },
  symbol: {
    fontFamily: 'PressStart2P',
    fontSize: isLargeScreen ? 32 : 24,
    marginHorizontal: 4,
  },
  symbolX: {
    color: '#818CF8',
  },
  symbolO: {
    color: '#F472B6',
  },
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
  lobbyGlassBox: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 22,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.10)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
      },
      android: { elevation: 8 },
    }),
  },
  title: {
    fontFamily: 'ChakraPetch-Bold',
    fontSize: isLargeScreen ? 28 : 22,
    color: '#fff',
    marginBottom: 24,
    letterSpacing: 2,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    color: '#fff',
    borderRadius: 10,
    padding: 12,
    margin: 6,
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 15,
    minWidth: 100,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    width: '100%',
    maxWidth: 420,
  },
  lobbyTitle: {
    fontFamily: 'ChakraPetch-Bold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
    letterSpacing: 2,
  },
  roomCodeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(129,140,248,0.13)',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#818CF8',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
  },
  roomCode: {
    fontFamily: 'PressStart2P',
    fontSize: 18,
    color: '#818CF8',
    letterSpacing: 4,
    marginRight: 6,
  },
  copyButton: {
    marginLeft: 6,
    padding: 2,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  lobbySubtitle: {
    fontFamily: 'ChakraPetch-SemiBold',
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
    marginTop: 4,
  },
  waitingBox: {
    alignItems: 'center',
    marginTop: 6,
  },
  waiting: {
    color: '#FCD34D',
    fontSize: 14,
    fontFamily: 'ChakraPetch-Bold',
    marginTop: 2,
  },
  startButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#10B981',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  startButtonText: {
    color: '#fff',
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 15,
    marginLeft: 8,
  },
  icon: {
    marginRight: 2,
  },
});

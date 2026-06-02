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
import { BlurView } from 'expo-blur';
import { useAppDispatch } from '@/store/store.hook';
import { setGameMode, setDifficulty, setAiSymbol } from '@/store/slices/gameSlice';
import { setPlayer, resetPlayers } from '@/store/slices/playerSlice';
import { useTranslation } from '@/hooks/useTranslation';
import type { Difficulty } from '@/store/slices/gameSlice';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 768;

const DIFFICULTIES: { key: Difficulty; color: string; icon: string }[] = [
  { key: 'easy', color: '#34D399', icon: 'smile' },
  { key: 'medium', color: '#FBBF24', icon: 'meh' },
  { key: 'hard', color: '#F87171', icon: 'skull' },
];

export default function AISelectScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [playerName, setPlayerName] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState<'X' | 'O'>('X');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium');

  const aiSymbol: 'X' | 'O' = selectedSymbol === 'X' ? 'O' : 'X';

  const handleStart = () => {
    if (!playerName.trim()) return;
    dispatch(resetPlayers());
    dispatch(setPlayer({ playerNumber: 1, name: playerName.trim(), symbol: selectedSymbol }));
    dispatch(setPlayer({ playerNumber: 2, name: 'IA', symbol: aiSymbol }));
    dispatch(setGameMode('ai'));
    dispatch(setAiSymbol(aiSymbol));
    dispatch(setDifficulty(selectedDifficulty));
    router.push('/(game)/play');
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
          <FontAwesome5
            name="robot"
            size={isLargeScreen ? 28 : 20}
            color="#F472B6"
            style={{ marginHorizontal: 8 }}
          />
          <Text style={[styles.symbol, styles.symbolO]}>O</Text>
        </View>

        <BlurView intensity={60} tint="dark" style={styles.glassBox}>
          <Text style={styles.sectionLabel}>{t('yourName')}</Text>
          <TextInput
            style={styles.input}
            value={playerName}
            onChangeText={setPlayerName}
            placeholder={t('namePlaceholder')}
            placeholderTextColor="rgba(255,255,255,0.4)"
            autoCapitalize="words"
          />

          <Text style={[styles.sectionLabel, { marginTop: 12 }]}>{t('chooseYourSymbol')}</Text>
          <View style={styles.symbolRow}>
            {(['X', 'O'] as const).map((sym) => (
              <TouchableOpacity
                key={sym}
                style={[
                  styles.symbolCard,
                  selectedSymbol === sym && {
                    borderColor: sym === 'X' ? '#818CF8' : '#F472B6',
                    backgroundColor:
                      sym === 'X' ? 'rgba(129,140,248,0.15)' : 'rgba(244,114,182,0.15)',
                  },
                ]}
                onPress={() => setSelectedSymbol(sym)}>
                <Text style={[styles.symbolText, { color: sym === 'X' ? '#818CF8' : '#F472B6' }]}>
                  {sym}
                </Text>
                {selectedSymbol === sym && (
                  <FontAwesome5
                    name="check-circle"
                    size={14}
                    color={sym === 'X' ? '#818CF8' : '#F472B6'}
                    style={styles.checkIcon}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.sectionLabel, { marginTop: 20 }]}>{t('chooseDifficulty')}</Text>
          <View style={styles.difficultyList}>
            {DIFFICULTIES.map(({ key, color, icon }) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.difficultyCard,
                  selectedDifficulty === key && {
                    borderColor: color,
                    backgroundColor: `${color}18`,
                  },
                ]}
                onPress={() => setSelectedDifficulty(key)}>
                <View style={[styles.difficultyIcon, { backgroundColor: `${color}22` }]}>
                  <FontAwesome5 name={icon} size={18} color={color} />
                </View>
                <View style={styles.difficultyInfo}>
                  <Text style={[styles.difficultyTitle, selectedDifficulty === key && { color }]}>
                    {t(key)}
                  </Text>
                  <Text style={styles.difficultyDesc}>
                    {t(`${key}Desc` as 'easyDesc' | 'mediumDesc' | 'hardDesc')}
                  </Text>
                </View>
                {selectedDifficulty === key && (
                  <FontAwesome5 name="check-circle" size={16} color={color} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.startButton, !playerName.trim() && styles.startButtonDisabled]}
            onPress={handleStart}
            disabled={!playerName.trim()}>
            <LinearGradient
              colors={['#6366F1', '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.startButtonGradient}>
              <FontAwesome5 name="robot" size={16} color="#fff" style={{ marginRight: 8 }} />
              <Text style={styles.startButtonText}>{t('playVsAI')}</Text>
            </LinearGradient>
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
  sectionLabel: {
    fontFamily: 'ChakraPetch-SemiBold',
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1,
    marginBottom: 10,
  },
  symbolRow: {
    flexDirection: 'row',
    gap: 12,
  },
  symbolCard: {
    flex: 1,
    height: 72,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolText: {
    fontFamily: 'PressStart2P',
    fontSize: 26,
  },
  checkIcon: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  difficultyList: {
    gap: 10,
  },
  difficultyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    padding: 12,
    gap: 12,
  },
  difficultyIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  difficultyInfo: { flex: 1 },
  difficultyTitle: {
    fontFamily: 'ChakraPetch-Bold',
    fontSize: 14,
    color: '#fff',
    marginBottom: 2,
  },
  difficultyDesc: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    color: '#fff',
    borderRadius: 10,
    padding: 12,
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 15,
    width: '100%',
    marginBottom: 4,
  },
  startButton: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  startButtonDisabled: {
    opacity: 0.4,
  },
  startButtonGradient: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 15,
    color: '#fff',
    letterSpacing: 1,
  },
});

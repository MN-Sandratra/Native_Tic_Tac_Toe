import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { FontAwesome5 } from '@expo/vector-icons';
import Svg, { Rect, Path, G, ClipPath, Defs } from 'react-native-svg';
import { useAppDispatch } from '@/store/store.hook';
import { setLanguage } from '@/store/slices/settingsSlice';
import { useTranslation } from '@/hooks/useTranslation';
import { Lang } from '@/i18n/translations';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

const FrenchFlag = () => (
  <Svg viewBox="0 0 3 2" width={36} height={24} style={flagStyles.flag}>
    <Rect width="1" height="2" fill="#002395" />
    <Rect x="1" width="1" height="2" fill="#EDEDED" />
    <Rect x="2" width="1" height="2" fill="#ED2939" />
  </Svg>
);

// Simplified but accurate Union Jack
const UKFlag = () => (
  <Svg viewBox="0 0 60 30" width={36} height={18} style={flagStyles.flag}>
    <Defs>
      <ClipPath id="clip">
        <Rect width="60" height="30" rx="2" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#clip)">
      {/* Background */}
      <Rect width="60" height="30" fill="#012169" />
      {/* St Andrew's cross — white diagonals */}
      <Path d="M0,0 L60,30" stroke="#fff" strokeWidth="6" />
      <Path d="M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      {/* St Patrick's cross — red diagonals (offset, upper/lower quarters) */}
      <Path d="M0,0 L30,15" stroke="#C8102E" strokeWidth="4" />
      <Path d="M60,0 L30,15" stroke="#C8102E" strokeWidth="4" />
      <Path d="M0,30 L30,15" stroke="#C8102E" strokeWidth="4" />
      <Path d="M60,30 L30,15" stroke="#C8102E" strokeWidth="4" />
      {/* St George's cross — white */}
      <Rect x="25" width="10" height="30" fill="#fff" />
      <Rect y="10" width="60" height="10" fill="#fff" />
      {/* St George's cross — red */}
      <Rect x="27" width="6" height="30" fill="#C8102E" />
      <Rect y="12" width="60" height="6" fill="#C8102E" />
    </G>
  </Svg>
);

const LANGUAGES: { code: Lang; Flag: React.ComponentType; label: string }[] = [
  { code: 'en', Flag: UKFlag, label: 'English' },
  { code: 'fr', Flag: FrenchFlag, label: 'Français' },
];

export function SettingsModal({ visible, onClose }: SettingsModalProps) {
  const dispatch = useAppDispatch();
  const { t, language } = useTranslation();

  const handleSelect = (lang: Lang) => {
    dispatch(setLanguage(lang));
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill}>
        <View style={styles.overlay}>
          <View style={styles.card}>
            <View style={styles.header}>
              <Text style={styles.title}>{t('settings')}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <FontAwesome5 name="times" size={16} color="rgba(255,255,255,0.6)" />
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionLabel}>{t('language')}</Text>
            <View style={styles.langRow}>
              {LANGUAGES.map(({ code, Flag, label }) => (
                <TouchableOpacity
                  key={code}
                  style={[styles.langBtn, language === code && styles.langBtnActive]}
                  onPress={() => handleSelect(code)}>
                  <Flag />
                  <Text style={[styles.langLabel, language === code && styles.langLabelActive]}>
                    {label}
                  </Text>
                  {language === code && (
                    <FontAwesome5
                      name="check"
                      size={11}
                      color="#818CF8"
                      style={{ marginLeft: 2 }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </BlurView>
    </Modal>
  );
}

const flagStyles = StyleSheet.create({
  flag: {
    borderRadius: 3,
    overflow: 'hidden',
  },
});

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
      },
      android: { elevation: 10 },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'ChakraPetch-Bold',
    fontSize: 18,
    color: '#fff',
    letterSpacing: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionLabel: {
    fontFamily: 'ChakraPetch-SemiBold',
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 1,
    marginBottom: 10,
  },
  langRow: {
    flexDirection: 'row',
    gap: 10,
  },
  langBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1.5,
    borderColor: 'transparent',
    gap: 8,
  },
  langBtnActive: {
    borderColor: '#818CF8',
    backgroundColor: 'rgba(129,140,248,0.12)',
  },
  langLabel: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
  },
  langLabelActive: {
    color: '#fff',
  },
});

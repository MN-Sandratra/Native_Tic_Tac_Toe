import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppDispatch } from '@/store/store.hook';
import { setLanguage } from '@/store/slices/settingsSlice';
import { useTranslation } from '@/hooks/useTranslation';
import { Lang } from '@/i18n/translations';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

const LANGUAGES: { code: Lang; flag: string; label: string }[] = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
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
              {LANGUAGES.map(({ code, flag, label }) => (
                <TouchableOpacity
                  key={code}
                  style={[styles.langBtn, language === code && styles.langBtnActive]}
                  onPress={() => handleSelect(code)}>
                  <Text style={styles.flag}>{flag}</Text>
                  <Text style={[styles.langLabel, language === code && styles.langLabelActive]}>
                    {label}
                  </Text>
                  {language === code && (
                    <FontAwesome5
                      name="check"
                      size={12}
                      color="#818CF8"
                      style={{ marginLeft: 4 }}
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
    gap: 6,
  },
  langBtnActive: {
    borderColor: '#818CF8',
    backgroundColor: 'rgba(129,140,248,0.12)',
  },
  flag: {
    fontSize: 20,
  },
  langLabel: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
  },
  langLabelActive: {
    color: '#fff',
  },
});

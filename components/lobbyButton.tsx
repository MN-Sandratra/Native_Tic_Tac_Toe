import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 768;

interface LobbyButtonProps {
  onPress: () => void;
  loading: boolean;
  icon: React.ReactNode;
  children: React.ReactNode;
  style?: object;
}

export default function LobbyButton({
  onPress,
  loading,
  icon,
  children,
  style = {},
}: LobbyButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.menuButton, styles.glassButton, style]}
      onPress={onPress}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          {icon}
          <Text style={styles.menuText}>{children}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    backgroundColor: 'rgba(129,140,248,0.10)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 48,
    marginHorizontal: 4,
    flexDirection: 'row',
  },
  glassButton: {
    borderWidth: 1.2,
    borderColor: '#818CF8',
  },
  menuText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: isLargeScreen ? 15 : 13,
    color: '#fff',
    marginLeft: 6,
  },
});

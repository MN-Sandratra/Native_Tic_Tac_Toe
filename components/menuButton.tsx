import { useIsLargeScreen } from '@/hooks/useIsLargeScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MenuButtonProps {
  icon: string;
  iconColor: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

export const MenuButton = ({ icon, iconColor, title, subtitle, onPress }: MenuButtonProps) => {
  const isLargeScreen = useIsLargeScreen();

  return (
    <TouchableOpacity style={styles.menuButton} onPress={onPress}>
      <View style={styles.buttonContent}>
        <View style={styles.iconContainer}>
          <FontAwesome5 name={icon} size={20} color={iconColor} />
        </View>
        <View style={styles.buttonTextContainer}>
          <Text style={[styles.menuText, { fontSize: isLargeScreen ? 16 : 14 }]}>{title}</Text>
          <Text style={[styles.buttonSubtext, { fontSize: isLargeScreen ? 12 : 10 }]}>
            {subtitle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    color: '#fff',
    marginBottom: 2,
  },
  buttonSubtext: {
    fontFamily: 'SpaceGrotesk-Medium',
    color: 'rgba(255, 255, 255, 0.6)',
  },
});

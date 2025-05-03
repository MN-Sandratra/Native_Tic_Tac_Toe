import { View, Text, StyleSheet } from 'react-native';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <View style={styles.footer}>
      <Text style={styles.copyright}>© {currentYear} Tic Tac Toe - Sandratra</Text>
      <Text style={styles.version}>v1.0.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: { padding: 20, alignItems: 'center' },
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

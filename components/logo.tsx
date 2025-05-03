import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 768;

export const Logo = () => (
  <View style={styles.logoContainer}>
    <View style={styles.logoBox}>
      <Text style={[styles.symbol, styles.symbolX]}>X</Text>
      <Text style={[styles.symbol, styles.symbolO]}>O</Text>
    </View>
    <Text style={styles.logoText}>TIC TAC TOE</Text>
  </View>
);

const styles = StyleSheet.create({
  logoContainer: { alignItems: 'center' },
  logoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  symbol: {
    fontFamily: 'PressStart2P',
    fontSize: isLargeScreen ? 48 : 36,
    marginHorizontal: 8,
  },
  symbolX: { color: '#818CF8' },
  symbolO: { color: '#F472B6' },
  logoText: {
    fontFamily: 'ChakraPetch-Bold',
    fontSize: isLargeScreen ? 24 : 20,
    color: '#fff',
    letterSpacing: 4,
  },
});

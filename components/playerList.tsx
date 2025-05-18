import FontAwesome5 from '@expo/vector-icons/build/FontAwesome5';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface PlayerListProps {
  players: string[];
}

export const PlayerList = ({ players }: PlayerListProps) => {
  return (
    <FlatList
      data={players}
      keyExtractor={(item) => item}
      renderItem={({ item, index }) => (
        <Animated.View
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(200)}
          style={[styles.playerCard, index === 0 ? styles.hostCard : null]}>
          <FontAwesome5 name="user" size={16} color="#fff" style={styles.playerIcon} />
          <View style={styles.nameWrapper}>
            <Text style={styles.playerName} numberOfLines={1} ellipsizeMode="tail">
              {item}
            </Text>
            {index === 0 && <Text style={styles.hostLabel}>Host</Text>}
          </View>
        </Animated.View>
      )}
      style={{ marginBottom: 18, width: '100%' }}
      contentContainerStyle={{ alignItems: 'center' }}
    />
  );
};

const styles = StyleSheet.create({
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.09)',
    borderRadius: 8,
    padding: 8,
    marginVertical: 2,
    width: 230,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  nameWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  playerName: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 14,
    color: '#fff',
  },
  hostCard: {
    borderWidth: 1,
    borderColor: '#818CF8',
    backgroundColor: 'rgba(129,140,248,0.13)',
  },
  hostLabel: {
    backgroundColor: '#818CF8',
    color: '#fff',
    fontFamily: 'ChakraPetch-Bold',
    fontSize: 10,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 1,
    overflow: 'hidden',
  },
  playerIcon: {
    marginRight: 8,
  },
});

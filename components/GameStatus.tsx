import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '@/store/store.hook';

export const GameStatus = () => {
  const { currentPlayer, winner, isGameOver } = useAppSelector((state) => state.game);

  const getMessage = () => {
    if (winner) return `Joueur ${winner} a gagné !`;

    if (isGameOver) return "Match nul !";
    
    return `Au tour du joueur ${currentPlayer}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{getMessage()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
}); 
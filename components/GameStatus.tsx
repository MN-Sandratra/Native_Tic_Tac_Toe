import { View, Text, StyleSheet } from "react-native";
import { useAppSelector } from "@/store/store.hook";

export const GameStatus = () => {
  const { currentPlayer, winner, isGameOver } = useAppSelector(
    (state) => state.game
  );
  const { player1, player2 } = useAppSelector((state) => state.players);

  const getMessage = () => {
    if (winner) {
      if (winner === "draw") {
        return "It's a Draw!";
      }
      const winningPlayer =
        winner === player1?.symbol ? player1.name : player2?.name;
      return `${winningPlayer} Wins!`;
    }

    if (isGameOver) {
      return "Match nul !";
    }

    const currentPlayerName =
      currentPlayer === player1?.symbol ? player1.name : player2?.name;
    return `${currentPlayerName}'s Turn`;
  };

  const getStatusColor = () => {
    if (winner === "draw") {
      return "#FCD34D"; // Yellow for draw
    }
    
    return currentPlayer === "X" ? "#818CF8" : "#F472B6"; // Current player color
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          {
            color: getStatusColor(),
          },
        ]}
      >
        {getMessage()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
  },
  text: {
    fontFamily: "ChakraPetch-Bold",
    fontSize: 24,
    textAlign: "center",
  },
});

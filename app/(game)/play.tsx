import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/store/store.hook';
import { makeMove, resetGame, setWinner } from '@/store/slices/gameSlice';
import { resetPlayers } from '@/store/slices/playerSlice';
import { useEffect, useState } from 'react';
import { BlurView } from 'expo-blur';

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Lignes
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Colonnes
  [0, 4, 8],
  [2, 4, 6], // Diagonales
];

export default function PlayScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const gameState = useAppSelector((state) => state.game) || {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isGameOver: false,
  };
  const { board, currentPlayer, winner, isGameOver } = gameState;
  const { player1, player2 } = useAppSelector((state) => state.players);

  const [showExitDialog, setShowExitDialog] = useState(false);

  useEffect(() => {
    if (!player1 || !player2) {
      router.replace('/(game)/player-select');
    }
  }, [player1, player2]);

  const handleBack = () => {
    setShowExitDialog(true);
  };

  const handleExitConfirm = () => {
    dispatch(resetPlayers());
    dispatch(resetGame());
    router.replace('/(home)');
  };

  const getCurrentPlayerInfo = () => {
    if (currentPlayer === player1?.symbol) return { player: player1, color: '#818CF8' };
    if (currentPlayer === player2?.symbol) return { player: player2, color: '#F472B6' };
    return { player: null, color: '#fff' };
  };

  const checkWinner = () => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (board.every((cell) => cell !== null)) {
      return 'draw';
    }
    return null;
  };

  useEffect(() => {
    const result = checkWinner();
    if (result && result !== 'draw') {
      dispatch(setWinner(result));
    } else if (result === 'draw') {
      dispatch(setWinner('draw'));
    }
  }, [board]);

  const handleCellPress = (index: number) => {
    if (!board[index] && !winner && !isGameOver) {
      dispatch(makeMove(index));
    }
  };

  const handleRestart = () => {
    dispatch(resetGame());
  };

  const getGameStatus = () => {
    if (isGameOver) {
      if (winner === 'draw') {
        return "It's a Draw!";
      }

      const winningPlayer = winner === player1?.symbol ? player1?.name : player2?.name;
      return `${winningPlayer} Wins!`;
    }
    const currentPlayerName = currentPlayer === player1?.symbol ? player1?.name : player2?.name;
    return `${currentPlayerName}'s Turn`;
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F172A', '#1E293B']} style={StyleSheet.absoluteFill} />

      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <FontAwesome5 name="arrow-left" size={20} color="#fff" />
      </TouchableOpacity>

      <View style={styles.gameContainer}>
        <View style={styles.header}>
          <View style={styles.playersContainer}>
            <View
              style={[
                styles.playerCard,
                currentPlayer === 'X' && !isGameOver && styles.activePlayer,
              ]}>
              <Text style={styles.playerName}>{player1?.name}</Text>
              <View style={[styles.symbolBadge, { backgroundColor: 'rgba(129, 140, 248, 0.2)' }]}>
                <Text style={[styles.symbolText, { color: '#818CF8' }]}>X</Text>
              </View>
            </View>

            <View style={styles.vsContainer}>
              <Text style={styles.vsText}>VS</Text>
            </View>

            <View
              style={[
                styles.playerCard,
                currentPlayer === 'O' && !isGameOver && styles.activePlayer,
              ]}>
              <Text style={styles.playerName}>{player2?.name}</Text>
              <View style={[styles.symbolBadge, { backgroundColor: 'rgba(244, 114, 182, 0.2)' }]}>
                <Text style={[styles.symbolText, { color: '#F472B6' }]}>O</Text>
              </View>
            </View>
          </View>

          {!isGameOver && (
            <Text
              style={[styles.turnStatus, { color: currentPlayer === 'X' ? '#818CF8' : '#F472B6' }]}>
              {getGameStatus()}
            </Text>
          )}
        </View>

        <View style={styles.board}>
          {board.map((cell, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.cell,
                {
                  borderTopWidth: index < 3 ? 0 : 2,
                  borderLeftWidth: index % 3 === 0 ? 0 : 2,
                  borderRightWidth: 0,
                  borderBottomWidth: 0,
                },
              ]}
              onPress={() => handleCellPress(index)}
              disabled={!!cell || isGameOver}>
              {cell && (
                <Text
                  style={[
                    styles.cellText,
                    {
                      color: cell === 'X' ? '#818CF8' : '#F472B6',
                      transform: [{ scale: 1.2 }],
                    },
                  ]}>
                  {cell}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Game Over Modal */}
      {isGameOver && (
        <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {winner === 'draw' ? "It's a Draw!" : 'Victory!'}
              </Text>

              {winner !== 'draw' && (
                <View style={styles.winnerInfo}>
                  <Text style={styles.winnerName}>
                    {winner === 'X' ? player1?.name : player2?.name}
                  </Text>
                  <View
                    style={[
                      styles.symbolBadge,
                      {
                        backgroundColor:
                          winner === 'X' ? 'rgba(129, 140, 248, 0.2)' : 'rgba(244, 114, 182, 0.2)',
                        transform: [{ scale: 1.5 }],
                      },
                    ]}>
                    <Text
                      style={[
                        styles.symbolText,
                        { color: winner === 'X' ? '#818CF8' : '#F472B6' },
                      ]}>
                      {winner}
                    </Text>
                  </View>
                </View>
              )}

              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.restartButton]}
                  onPress={handleRestart}>
                  <FontAwesome5 name="redo" size={20} color="#fff" style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>PLAY AGAIN</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.menuButton]}
                  onPress={() => {
                    dispatch(resetGame());
                    dispatch(resetPlayers());
                    router.replace('/(home)');
                  }}>
                  <FontAwesome5 name="home" size={20} color="#fff" style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>MENU</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </BlurView>
      )}

      {showExitDialog && (
        <View style={styles.dialogOverlay}>
          <View style={styles.dialog}>
            <Text style={styles.dialogTitle}>Quitter la partie ?</Text>
            <Text style={styles.dialogText}>
              Voulez-vous vraiment quitter ? La partie sera perdue.
            </Text>
            <View style={styles.dialogButtons}>
              <TouchableOpacity
                style={[styles.dialogButton, styles.cancelButton]}
                onPress={() => setShowExitDialog(false)}>
                <Text style={styles.dialogButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.dialogButton, styles.confirmButton]}
                onPress={handleExitConfirm}>
                <Text style={styles.dialogButtonText}>Quitter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  gameContainer: {
    flex: 1,
    paddingTop: 80,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  playersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  board: {
    width: '100%',
    aspectRatio: 1,
    maxWidth: 400,
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 15,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  turnStatus: {
    fontFamily: 'ChakraPetch-Bold',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
  },
  playerCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activePlayer: {
    borderColor: '#818CF8',
    backgroundColor: 'rgba(129, 140, 248, 0.1)',
  },
  playerName: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  symbolBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolText: {
    fontFamily: 'PressStart2P',
    fontSize: 20,
  },
  vsContainer: {
    paddingHorizontal: 15,
  },
  vsText: {
    fontFamily: 'ChakraPetch-Bold',
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16,
  },
  cell: {
    width: '33.33%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
  },
  cellText: {
    fontFamily: 'PressStart2P',
    fontSize: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  dialogOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  dialog: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxWidth: 300,
  },
  dialogTitle: {
    fontFamily: 'ChakraPetch-Bold',
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  dialogText: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
    textAlign: 'center',
  },
  dialogButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dialogButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  confirmButton: {
    backgroundColor: '#EF4444',
  },
  dialogButtonText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    fontFamily: 'ChakraPetch-Bold',
    fontSize: 32,
    color: '#fff',
    marginBottom: 20,
  },
  winnerInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  winnerName: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 15,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 12,
    minWidth: 150,
    justifyContent: 'center',
  },
  restartButton: {
    backgroundColor: '#818CF8',
  },
  menuButton: {
    backgroundColor: '#F472B6',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 16,
    color: '#fff',
  },
});

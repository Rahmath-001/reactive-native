import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Board from "./Board";
import { updatePlayerScore } from "./playerUtils";

const Game = ({ player1, player2, setGameStarted }) => {
  const initialBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const [board, setBoard] = useState(initialBoard);
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState("");

  useEffect(() => {
    checkWinner();
  }, [board]);

  const handlePress = (rowIndex, cellIndex) => {
    if (board[rowIndex][cellIndex] === "" && !winner) {
      const newBoard = [...board];
      newBoard[rowIndex][cellIndex] = player;
      setBoard(newBoard);
      setPlayer(player === "X" ? "O" : "X");
    }
  };

  const checkWinner = () => {
    //check rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] !== "" &&
        board[i][0] === board[i][1] &&
        board[i][0] === board[i][2]
      ) {
        setWinner(board[i][0]);
        break;
      }
    }

    //check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] !== "" &&
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i]
      ) {
        setWinner(board[0][i]);
        break;
      }
    }

    //check diagonals
    if (
      board[0][0] !== "" &&
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2]
    ) {
      setWinner(board[0][0]);
    } else if (
      board[0][2] !== "" &&
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0]
    ) {
      setWinner(board[0][2]);
    }
  };

  const resetBoard = () => {
    setBoard(initialBoard);
    setPlayer("X");
    setWinner("");
  };

  useEffect(() => {
    if (winner) {
      let winnerName;
      if (winner === "X") {
        winnerName = player1;
      } else if (winner === "O") {
        winnerName = player2;
      }
      updatePlayerScore(winnerName); 
      Alert.alert(`Player ${winnerName} won!!`, " ", [
        { text: "OK", onPress: resetBoard },
      ]);
    }
  }, [winner, player1, player2]);

  useEffect(() => {
    if (!winner) {
      const isBoardFull = board.every((row) =>
        row.every((cell) => cell !== "")
      );
      if (isBoardFull) {
        Alert.alert(`It's a tie!!`, " ", [{ text: "OK", onPress: resetBoard }]);
      }
    }
  }, [board]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Board board={board} onPress={handlePress} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={resetBoard}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => setGameStarted && setGameStarted(false)}
        >
          <Text style={styles.goBackButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom:130,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center", 
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  resetButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  goBackButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
  },
  goBackButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

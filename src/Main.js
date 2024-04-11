import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, Button, Text, Modal, TouchableOpacity, FlatList } from "react-native";
import Game from "./Game";
import { LinearGradient } from "expo-linear-gradient";
import { readPlayers } from "./playerUtils";

export default function Main() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [showHighScore, setShowHighScore] = useState(false);
  const [playersData, setPlayersData] = useState([]);



  useEffect(() => {
    // Load player data when the component mounts
    loadPlayersData();
  }, []);

  const loadPlayersData = async () => {
    try {
      const data = await readPlayers();
      setPlayersData(data.players);
    } catch (error) {
      console.error('Error loading players data:', error);
    }
  };


  const handleStartGame = () => {
    if (player1.trim() !== "" && player2.trim() !== "") {
      // Update state to indicate game has started
      setGameStarted(true);
    }
  };

  const handleShowHighScore = () => {
    setShowHighScore(true);
  };

  const handleCloseHighScore = () => {
    setShowHighScore(false);
  };

  return (
    <LinearGradient colors={["#e67e22", "#3498db"]} style={styles.container}>
      <View style={styles.overlay}>
        {!gameStarted ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Player 1 Name"
              onChangeText={setPlayer1}
              value={player1}
            />
            <TextInput
              style={styles.input}
              placeholder="Player 2 Name"
              onChangeText={setPlayer2}
              value={player2}
            />
            <Button title="Start Game" onPress={handleStartGame} />
            <TouchableOpacity onPress={handleShowHighScore}>
              <Text style={styles.highScoreButton}>High Score</Text>
            </TouchableOpacity>
          </>
        ) : null}
      </View>
      <Modal visible={showHighScore} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>High Score</Text>
          <TouchableOpacity onPress={handleCloseHighScore}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
          <FlatList
            data={playersData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.playerScore}>{item.name}: {item.score}</Text>
            )}
          />
        </View>
      </Modal>
      {gameStarted && (
        <Game
          player1={player1}
          player2={player2}
          setGameStarted={setGameStarted}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 200,
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  highScoreButton: {
    fontSize: 20,
    color: "#fff",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 18,
    color: "blue",
    marginBottom: 10,
  },
  playerScore: {
    fontSize: 18,
    marginBottom: 5,
  },
});
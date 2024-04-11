// playerUtils.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const PLAYERS_KEY = 'players';

const readPlayers = async () => {
  try {
    const playersData = await AsyncStorage.getItem(PLAYERS_KEY);
    return playersData ? JSON.parse(playersData) : { players: [] };
  } catch (error) {
    console.error('Error reading players data:', error);
    return { players: [] };
  }
};

const writePlayers = async (players) => {
  try {
    await AsyncStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
    console.log('Players data updated successfully.');
  } catch (error) {
    console.error('Error writing players data:', error);
  }
};

const updatePlayerScore = async (playerName) => {
  try {
    const players = await readPlayers();
    const playerIndex = players.players.findIndex(player => player.name === playerName);
    if (playerIndex !== -1) {
      players.players[playerIndex].score += 1;
    } else {
      players.players.push({ name: playerName, score: 1 });
    }
    await writePlayers(players);
  } catch (error) {
    console.error('Error updating player score:', error);
  }
};

export { readPlayers, updatePlayerScore };

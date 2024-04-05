import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Game from './src/Game';
import { LinearGradient } from 'expo-linear-gradient';


export default function App() {

  return (

    <LinearGradient 
    colors={['#3498db','#ffffff']}
    style={styles.container}
    >
        <View style={styles.overlay}>
      <Game/>
    </View>
    </LinearGradient>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay:{
    flex:1,
    backgroundColor:'rgba(255,255,255,0.1)',
    justifyContent:'center',
    alignItems:'center'
  }
 
});

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const Board=({board,onPress})=>{
    return(
        <View style={styles.board}>
            {board.map((row,rowIndex)=>(
                <View key={rowIndex} style={styles.row}>
                    {
                        row.map((cell,cellIndex)=>(
                            <TouchableOpacity
                                key={cellIndex}
                                style={styles.cell}
                                onPress={()=> onPress(rowIndex,cellIndex)}
                            >
                                <Text style={styles.cellText}>
                                    {cell}
                                </Text>

                            </TouchableOpacity>
                        ))
                    }
                </View>
            ))}
        </View>
    )
}

export default Board;

const styles = StyleSheet.create({
 board:{
    marginTop:20,
 },
 cell:{
    width:100,
    height:100,
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center',
 },
 row:{
    flexDirection:'row',
 },
 cellText:{
    fontSize:36,
 }
   
  });
  
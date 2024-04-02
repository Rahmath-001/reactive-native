import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {

  const [currentQuestion,setCurrentQuestion] = useState(0);
  const [score, setScore]= useState(0);
  const [showscore, setShowScore]= useState(false);
  

  const quizData = [
    {
      question : 'What is the capital City of India?',
      options:['Chandigarh', 'Goa', 'Delhi', 'Shimla'],
      answer:'Delhi'
    },
    {
      question : 'What is the largest animal',
      options:['Elephant', 'Whale', 'giraffe', 'rat'],
      answer:'Whale'
    }
  ]

  const handleAnswer= (selectedAnswer)=>{
    const answer = quizData[currentQuestion]?.answer;
    if (answer === selectedAnswer){
      setScore((prevscore)=> prevscore+1);
    }
    const nextQuestion = currentQuestion+1;
    if(nextQuestion < quizData.length){
      setCurrentQuestion(nextQuestion)
    }else{
      setShowScore(true);
    }
  }

  const handleRestart =()=>{
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false)
  }

  return (
    <View style={styles.container}>
      {showscore? <View>
        <Text style={styles.optionStyle}>{score}</Text>
        <TouchableOpacity style={styles.optionContainer} onPress={handleRestart}>
            <Text style={styles.resetButton} >Restart</Text>
        </TouchableOpacity>
      </View> :
      <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{quizData[currentQuestion]?.question}</Text>
          {quizData[currentQuestion]?.options.map((items)=>{
              return <TouchableOpacity onPress={()=>handleAnswer(items)} style={styles.optionContainer}>
                  <Text style={styles.optionStyle}>{items}</Text>
              </TouchableOpacity>
          })}
      </View>
       }
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionContainer:{
    backgroundColor: '@DDDDD',
    padding:10,
    margin:10,
    borderRadius:5,
  },
  optionStyle:{
    color: 'green',
    padding:5,
    alignSelf:'center',
    fontSize:18,
  },
  optionContainer:{
    borderColor:'black',
    borderWidth:2,
    marginTop:15,
  },
  questionText:{
    fontSize:24,
  },
  resetButton:{
    fontSize:18,
    paddingHorizontal:10,
  },
});

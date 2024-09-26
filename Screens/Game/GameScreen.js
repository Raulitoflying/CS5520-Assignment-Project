import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Image } from 'react-native';

const GameScreen = ({ navigation }) => {
  const [started, setStarted] = useState(false);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(4);
  const [timer, setTimer] = useState(60);
  const [chosenNumber, setChosenNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [hintUsed, setHintUsed] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    let interval;
    if (started && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      handleGameOver('Time is up!');
    }
    return () => clearInterval(interval);
  }, [started, timer]);

  const handleStart = () => {
    setStarted(true);
  };

  const handleHint = () => {
    if (!hintUsed) {
      setHintUsed(true);
      Alert.alert('Hint', `The number is ${chosenNumber % 2 === 0 ? 'even' : 'odd'}.`);
    } else {
      Alert.alert('Hint', 'You have already used your hint.');
    }
  };

  const handleSubmitGuess = () => {
    const parsedGuess = parseInt(guess, 10);
    if (isNaN(parsedGuess) || parsedGuess < 1 || parsedGuess > 100) {
      Alert.alert('Invalid Input', 'Please enter a number between 1 and 100.');
      return;
    }

    if (parsedGuess === chosenNumber) {
      handleWin();
    } else {
      setAttempts((prevAttempts) => prevAttempts - 1);
      setFeedback(parsedGuess < chosenNumber ? 'Guess higher!' : 'Guess lower!');
      if (attempts - 1 === 0) {
        handleGameOver('You are out of attempts!');
      }
    }
  };

  const handleWin = () => {
    Alert.alert('Congratulations!', `You guessed the number in ${4 - attempts + 1} attempts.`);
    navigation.navigate('GameOver', { status: 'win', attempts: 4 - attempts + 1, chosenNumber });
  };

  const handleGameOver = (reason) => {
    Alert.alert('Game Over', reason);
    navigation.navigate('GameOver', { status: 'lose', reason });
  };

  const handleNewGame = () => {
    setStarted(false);
    setGuess('');
    setAttempts(4);
    setTimer(60);
    setChosenNumber(Math.floor(Math.random() * 100) + 1);
    setHintUsed(false);
    setFeedback('');
  };

  return (
    <View style={styles.container}>
      {!started ? (
        <Button title="Start" onPress={handleStart} />
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter your guess"
            value={guess}
            onChangeText={setGuess}
            keyboardType="numeric"
          />
          <Text>Timer: {timer}s</Text>
          <Text>Attempts left: {attempts}</Text>
          <Button title="Use a hint" onPress={handleHint} />
          <Button title="Submit guess" onPress={handleSubmitGuess} />
          {feedback ? <Text>{feedback}</Text> : null}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
  },
});

export default GameScreen;
import { Alert, Button, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import Card from '../components/Card'
import ModalText from '../components/ModalText'
import { colors, commonStyles } from '../components/Color'
import CustomButton from '../components/CustomButton'
import HintText from '../components/HintText'

export default function Game({handleRestart, lastDigit}) {
  const [status, setStatus] = useState('initiating');
  const [chosenNumber, setChosenNumber] = useState(0);
  const [number, setNumber] = useState('');
  const [hintUsed, setHintUsed] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [time, setTime] = useState(60);
  const timerRef = useRef(null);

  // set a timer through the React hook useEffect
  useEffect(() => {
    if (time <= 0) {
      clearInterval(timerRef.current);
      setStatus('over');
    }
  }, [time])

  // monitor the number of attempts through the React hook useEffect
  useEffect(() => {
    if (status === 'playing' && attempts > 0) {
      let isInvalid = false;
      if (!isNaN(number)) {
        const inputNumber = parseInt(number);
        if (inputNumber >= 1 && inputNumber <= 100 && inputNumber % lastDigit === 0) {
          if (inputNumber === chosenNumber) {
            clearInterval(timerRef.current);
            setStatus('correct');
          } else {
            if (attempts === 4) {
              clearInterval(timerRef.current);
              setStatus('over');
            } else {
              setStatus('wrong');
            }
          }
        } else {
          isInvalid = true;
        }
      } else {
        isInvalid = true;
      }
      if (isInvalid) {
        if (attempts === 4) {
          clearInterval(timerRef.current);
          setStatus('over');
        } else {
          Alert.alert('Invalid number!', `Number has to be a mutiply of ${lastDigit} between 1 and 100.`);
        }
      }
    }
  }, [attempts])

  const handleStart = () => {
    const numberList = [];
    for (let i = 1; i <= 100; i++) {
      if (i % lastDigit === 0) {
        numberList.push(i);
      }
    }
    setChosenNumber(numberList[Math.floor(Math.random() * numberList.length)]);
    clearInterval(timerRef.current);
    setTime(60);
    timerRef.current = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000)
    setStatus('playing');
  }

  const handleSubmit = () => {
    setAttempts(prevAttempts => prevAttempts + 1);
  }

  const handleTryAgain = () => {
    setNumber('');
    setStatus('playing');
  }

  const handleEnd = () => {
    clearInterval(timerRef.current);
    setStatus('over');
  }

  const handleNewGame = () => {
    setNumber('');
    setAttempts(0);
    setHintUsed(false);
    handleStart();
  }

  const handleHint = () => {
    if (!hintUsed) {
      setHintUsed(true);
      Alert.alert(`The number is between ${chosenNumber < 50 ? '1 and 49' : '50 and 100'}.`);
    } else {
      Alert.alert('Hint', 'You have already used your hint.');
    }
  }

  // According to different status, show different content of the card.
  const Content = () => {
    switch (status) {
      case 'initiating':
        return (
          <View style={styles.container}>
            <ModalText>Guess a number between 1 and 100</ModalText>
            <ModalText>that is multiply of {lastDigit}</ModalText>
            <CustomButton title='Start' onPress={handleStart} />
          </View>
        );
      case 'correct':
        return (
          <View style={styles.container}>
            <ModalText>You guessed correct!</ModalText>
            <ModalText>Attempts used: {attempts}</ModalText>
            <ModalText>The number was: {chosenNumber !== undefined && chosenNumber !== null ? chosenNumber.toString() : 'N/A'}</ModalText>
            <Image style={styles.image} source={{uri: `https://picsum.photos/id/${chosenNumber}/100/100`}} />
            <CustomButton title='New Game' onPress={handleNewGame} />
          </View>
        );
      case 'wrong':
        return (
          <View style={styles.container}>
            <ModalText>You didn't guess correct!</ModalText>
            <ModalText>You should guess {parseInt(number) > chosenNumber ? 'lower' : 'higher'}.</ModalText>
            <View style={[styles.btns, styles.container]}>
              <CustomButton title='Try Again' onPress={handleTryAgain} />
              <CustomButton title='End the game' onPress={handleEnd} />
            </View>
          </View>
        );
      case 'over':
        return (
          <View style={styles.container}>
            <ModalText>The game is over!</ModalText>
            <Image style={styles.image} source={require('../assets/sad_smiley.png')} />
            <ModalText>{(time <= 0 && "You are out of time") || (attempts >= 4 && "You are out of attempts")}</ModalText>
            <ModalText>The number was: {chosenNumber !== undefined && chosenNumber !== null ? chosenNumber.toString() : 'N/A'}</ModalText>
            <CustomButton title='New Game' onPress={handleNewGame} />
          </View>
        );
      default:
        return null;
    }
  }

  return (
    <View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title='Restart' onPress={handleRestart} />
        </View>
      </View>
      <Card>
        {status === 'playing' ?
          (
            <View style={styles.container}>
              <ModalText>Guess a number between 1 & 100</ModalText>
              <ModalText>that is multiply of {lastDigit}</ModalText>
              <TextInput
                keyboardType='default'
                style={[styles.input, commonStyles.input]}
                selectionColor={colors.lightBlue}
                textAlign='center'
                value={number}
                onChangeText={newNumber => setNumber(newNumber)}
              />
              <View style={[styles.hint, styles.container]}>
              {hintUsed && (
                <Text style={styles.hintText}>
                  {`The number is between ${chosenNumber < 50 ? '1 and 49' : '50 and 100'}.`}
                </Text>
              )}
              </View>
              <HintText>Attempts left: {4 - attempts}</HintText>
              <HintText>Timer: {time}</HintText>
              <View style={[styles.btns, styles.container]}>
              <CustomButton
                title='Use a hint'
                onPress={handleHint}
                disabled={hintUsed}
              />
                <CustomButton title='Submit guess' onPress={handleSubmit} />
              </View>
            </View>
          )
          : <Content />
        }
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  buttonContainer: {
    width: 324,
    position: 'relative',
    marginBottom: 80,
  },
  button: {
    position: 'absolute',
    right: -28,
  },
  input: {
    width: 60,
  },
  hint: {
    height: 28,
    marginTop: 20,
    marginBottom: 15,
  },
  hintText: {
    fontSize: 18,
  },
  btns: {
    marginTop: 36,
    gap: 8,
  },
  image: {
    width: 120,
    height: 120,
    marginVertical: 20,
  },
})
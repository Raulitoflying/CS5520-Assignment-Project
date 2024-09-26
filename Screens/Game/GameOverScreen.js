import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

const GameOverScreen = ({ route, navigation }) => {
  const { status, attempts, chosenNumber, reason } = route.params;

  const handleNewGame = () => {
    navigation.navigate('Game');
  };

  return (
    <View style={styles.container}>
      {status === 'win' ? (
        <>
          <Text>Congratulations! You guessed the number in {attempts} attempts.</Text>
          <Image source={{ uri: `https://picsum.photos/id/${chosenNumber}/100/100` }} style={styles.image} />
        </>
      ) : (
        <>
          <Text>The game is over</Text>
          <Image source={require('../../assets/sad_smiley.png')} style={styles.image} />
          <Text>{reason}</Text>
        </>
      )}
      <Button title="New Game" onPress={handleNewGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
});

export default GameOverScreen;
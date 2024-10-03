import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Game from './Screens/Game';
import Start from './Screens/Start';
import { commonStyles } from './Components/Color';
import Background from './Components/Background';

const App = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [lastDigit, setLastDigit] = useState(0);

  const handleConfirmRegister = (number) => {
    setLastDigit(number);
    setIsRegistered(true);
  };

  const handleRestart = () => {
    setLastDigit(0);
    setIsRegistered(false);
  };

  return (
    <View style={commonStyles.container}>
      <Background>
        {isRegistered ? (
          <Game handleRestart={handleRestart} lastDigit={lastDigit} />
        ) : (
          <Start handleConfirmRegister={handleConfirmRegister} />
        )}
      </Background>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
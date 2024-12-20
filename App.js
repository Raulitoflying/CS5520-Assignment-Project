import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Game from './screens/Game';
import Start from './screens/Start';
import { commonStyles } from './components/Color';
import Background from './components/Background';

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
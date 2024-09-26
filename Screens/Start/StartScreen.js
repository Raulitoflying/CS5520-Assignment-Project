import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import InputField from '../../Components/InputField';
import CheckBox from '../../Components/CheckBox';
import Button from '../../Components/Button';
import ConfirmScreen from '../Confirm/ConfirmScreen';
import GameScreen from '../Game/GameScreen';



const StartScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isRobot, setIsRobot] = useState(false);
  const [canRegister, setCanRegister] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validateName = (value) => value.length > 1 && !/\d/.test(value);
  const validateEmail = (value) => /\S+@\S+\.\S+/.test(value);
  const validatePhone = (value) => /^[2-9]\d{8}[2-9]$/.test(value);

  useEffect(() => {
    setCanRegister(isRobot && validateName(name) && validateEmail(email) && validatePhone(phone));
  }, [name, email, phone, isRobot]);

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setIsRobot(false);
  };

  const handleRegister = () => {
    if (validateName(name) && validateEmail(email) && validatePhone(phone)) {
      setShowConfirm(true);
    } else {
      Alert.alert('Invalid Input', 'Please check your inputs and try again.');
    }
  }; 

  const handleEdit = () => {
    setShowConfirm(false);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    navigation.navigate('GameScreen'); // Adjust the route name if necessary
  };

  const userInfo = { name, email, phone };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <View style={styles.card}>
        <InputField
          label="Name"
          value={name}
          onChangeText={setName}
          validate={validateName}
          errorText="Please enter a valid name"
        />
        <InputField
          label="Email address"
          value={email}
          onChangeText={setEmail}
          validate={validateEmail}
          errorText="Please enter a valid email"
        />
        <InputField
          label="Phone Number:"
          value={phone}
          onChangeText={setPhone}
          validate={validatePhone}
          errorText="Please enter a valid 10-digit phone number"
        />
        <CheckBox
          label="I am not a robot"
          value={isRobot}
          onValueChange={setIsRobot}
        />
        <View style={styles.buttonContainer}>
          <Button title="Reset" onPress={handleReset} color="red" />
          <Button
            title="Register"
            onPress={handleRegister}
            disabled={!canRegister}
            color="blue" />
          <ConfirmScreen
          visible={showConfirm}
          userInfo={userInfo}
          onEdit={handleEdit}
          onConfirm={handleConfirm}
        />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87CEFA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#A9A9A9',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default StartScreen;
import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../components/Color'
import Card from '../components/Card';
import Input from '../components/Input';
import Checkbox from 'expo-checkbox';
import CustomButton from '../components/CustomButton';
import Confirm from './Confirm';

export default function Start({handleConfirmRegister}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isChecked, setChecked] = useState(false);

  // AI-assisted tool acknowledgement: The following three regular expressions are generated by chatgpt.
  const rules = {
    name: /^[a-zA-Z\s]{2,}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^\d{9}[2-9]$/,
  }

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setChecked(false);
  }

  const handleRegister = () => {
    // check if the inputs are invalid
    if (name.match(rules.name) && email.match(rules.email) && phone.match(rules.phone)) {
      setIsModalVisible(true);
    } else {
      Alert.alert('Invalid input', 'Check the input values');
    }
  }

  const handleGoBack = () => {
    setIsModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Card>
        <Input
          label="Name"
          text={name}
          setText={setName}
          rule={rules.name}
          errorText="Please enter a valid name"
        />
        <Input
          label="Email address"
          text={email}
          setText={setEmail}
          rule={rules.email}
          errorText="Please enter a valid email"
        />
        <Input
          label="Phone number"
          text={phone}
          setText={setPhone}
          rule={rules.phone}
          errorText="Please enter a valid phone number"
        />
        <View style={styles.checkbox}>
          <Checkbox value={isChecked} onValueChange={setChecked} />
          <Text style={styles.checkboxText}>I am not a robot</Text>
        </View>
        <View style={styles.buttons}>
          <CustomButton title="Reset" color={colors.plum} onPress={handleReset} />
          <CustomButton title="Register" disabled={!isChecked} onPress={handleRegister} />
        </View>
      </Card>
      <Confirm
        visible={isModalVisible}
        name={name}
        email={email}
        phone={phone}
        handleGoBack={handleGoBack}
        handleConfirmRegister={handleConfirmRegister}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 20,
  },
  checkbox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },
  checkboxText: {
    color: colors.bluishViolet,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  }
})
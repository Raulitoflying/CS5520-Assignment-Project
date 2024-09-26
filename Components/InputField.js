import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputField = ({ label, value, onChangeText, validate, errorText }) => {
  const [error, setError] = useState('');

  useEffect(() => {
    if (value && !validate(value)) {
      setError(errorText);
    } else {
      setError('');
    }
  }, [value, validate, errorText]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'purple',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'purple',
    fontSize: 16,
    paddingVertical: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default InputField;
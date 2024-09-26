import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ExpoCheckbox from 'expo-checkbox';

const CheckBox = ({ label, value, onValueChange }) => {
  return (
    <View style={styles.section}>
      <ExpoCheckbox
        style={styles.checkbox}
        value={value}
        onValueChange={onValueChange}
        color={value ? '' : undefined}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    margin: 8,
  },
  label: {
    fontSize: 16,
    color: 'purple',
  },
});

export default CheckBox;
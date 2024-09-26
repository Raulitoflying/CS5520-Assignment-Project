import React from 'react';
import { View, Text, StyleSheet, Modal, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ConfirmScreen = ({ visible, userInfo, onEdit, onConfirm }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.4)']}
        style={styles.gradient}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Confirm Your Information</Text>
          <Text style={styles.info}>Name: {userInfo.name}</Text>
          <Text style={styles.info}>Email: {userInfo.email}</Text>
          <Text style={styles.info}>Phone: {userInfo.phone}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Go Back" color= 'red' onPress={onEdit} />
            <Button title="Continue" onPress={onConfirm} />
          </View>
        </View>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default ConfirmScreen;
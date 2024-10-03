import { StyleSheet, TextInput, View, Animated } from 'react-native';
import React, { useState } from 'react';
import ModalText from './ModalText';
import HintText from './HintText';
import { colors } from '../components/Color';

export default function Input({ label, text, setText, rule, errorText }) {
  const [isFocused, setIsFocused] = useState(false);
  const animatedValue = useState(new Animated.Value(0))[0];

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!text) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const labelStyle = {
    position: 'absolute',
    left: 8,
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 0],
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.gray, colors.primary],
    }),
  };

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, isFocused && styles.focusedInput]}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          selectionColor={colors.primary}
        />
      </View>
      {text?.length > 0 && !text?.match(rule) && (
        <HintText style={styles.errorText}>{errorText}</HintText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 24,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
    height: 56,
  },
  focusedInput: {
    borderColor: colors.primary,
  },
  input: {
    fontSize: 16,
    color: colors.darkGray,
    paddingTop: 8,
  },
  errorText: {
    marginTop: 4,
    color: colors.error,
  },
});
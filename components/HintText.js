import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { colors } from '../components/Color'

export default function HintText({children}) {
  return (
    <Text style={styles.text}>{children}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    color: colors.darkGray,
    fontSize: 18,
  }
})
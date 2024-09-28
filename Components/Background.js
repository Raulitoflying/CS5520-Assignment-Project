import { StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { colors, commonStyles } from '../components/Color'

export default function Background({children, transparent}) {
  return (
    <LinearGradient
        style={[commonStyles.background, commonStyles.container]}
        colors={transparent ? [colors.transparentBabyBlue, colors.transparentSlateBlue] : [colors.babyBlue, colors.slateBlue]}
        locations={[0.1, 0.9]}
    >
        {children}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({})
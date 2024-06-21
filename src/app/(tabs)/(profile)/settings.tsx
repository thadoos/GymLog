import { View, Text, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
const settings = () => {
  const colorScheme = useColorScheme();
  return (
    <View style = {[styles.container, {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
      <Text>Settings</Text>
    </View>
  )
}

export default settings


const styles = StyleSheet.create({
  container:{
    flex: 1,
  }
})
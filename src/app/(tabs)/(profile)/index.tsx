import { View, Text, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'

const profile = () => {
  const colorScheme = useColorScheme();
  return (
    <View style = {[styles.container, {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
      <Text>Profile</Text>
    </View>
  )
}

export default profile

const styles = StyleSheet.create({
  container:{
    flex: 1,
    
  }
})
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import { useAppSettingStore } from '../../../store/appSettings'
const settings = () => {
  let currentTheme = useAppSettingStore(state => state.theme);
  const toggleTheme = useAppSettingStore(state => state.toggleTheme);
  
  return (
    <View style = {[styles.container, {backgroundColor: Colors[currentTheme ?? 'light'].background}]}>
      <Text style = {{color: Colors[currentTheme ?? 'light'].text}}>Current Theme: {currentTheme}</Text>
      <TouchableOpacity style = {styles.toggleThemeButton} onPress={toggleTheme}>

      </TouchableOpacity>
    </View>
  )
}

export default settings


const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  toggleThemeButton:{
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'red',
  }
})
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import { useAppSettingStore } from '../../../store/appSettings'
const profile = () => {
  const colorTheme = useAppSettingStore(state=>state.theme);
  return (
    <View style = {[styles.container, {backgroundColor: Colors[colorTheme].background}]}>
      
    </View>
  )
}

export default profile

const styles = StyleSheet.create({
  container:{
    flex: 1,
    
  }
})
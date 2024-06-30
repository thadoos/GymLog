import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Switch } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../../constants/Colors'
import { useAppSettingStore } from '../../../store/appSettings'
const settings = () => {
  const colorTheme = useAppSettingStore(state => state.theme);
  const toggleTheme = useAppSettingStore(state => state.toggleTheme);
  
  // const [isDarkMode, setDarkMode] = useState(colorTheme === "dark");
  // const toggleSwitch = () => {
  //   toggleTheme();
  //   setDarkMode(colorTheme === "dark");
  // }

  return (
    <View style = {[styles.container, {backgroundColor: Colors[colorTheme].background}]}>
      <View style={styles.profileEntry}>

        <Text style = {[styles.profileEntryText, {color: Colors[colorTheme].text}]}>Current Theme:</Text>
        <Switch
          trackColor={{false: '#fff', true: '#81b0ff'}}
          thumbColor={colorTheme === 'light' ? '#f5dd4b' : '#000'}
          // trackColor={{false: '#81b0ff', true: '#81b0ff'}}
          // thumbColor={colorTheme === 'light' ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#81b0ff"
          onValueChange={toggleTheme}
          value={colorTheme === 'light'}
          style={styles.toggleThemeButton}
        />

      </View>
    </View>
  )
}

export default settings


const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems:'center',
    paddingTop: 25,

  },
  profileEntry:{
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileEntryText:{
    fontSize: 20,
    fontWeight: '700',
  },
  toggleThemeButton:{
    
  }
})
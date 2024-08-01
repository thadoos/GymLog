import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RealmWorkoutLogProvider from '../../../providers/Realm'

import Colors from '../../../constants/Colors'
import { useAppSettingStore } from '../../../store/appSettings'

const TrainingHistory = () => {
  const colorTheme = useAppSettingStore(state=>state.theme);
  return (
    <RealmWorkoutLogProvider>
      <View style = {[styles.container, {backgroundColor: Colors[colorTheme].background}]}>
        
      </View>
    </RealmWorkoutLogProvider>
  )
}

export default TrainingHistory

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    
    // borderWidth: 1,
    // borderColor: 'red',
  },

})
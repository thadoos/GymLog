import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useWorkoutStore } from '../../../store/workoutState';


import Colors from '../../../constants/Colors';
import { useAppSettingStore } from '../../../store/appSettings';

const index = () => {
  const colorTheme = useAppSettingStore(state=>state.theme);
  const exerciseList = useWorkoutStore(state => state.workoutExercises)
  return (
    <View style = {[styles.container, {backgroundColor: Colors[colorTheme].background}]}>
      <Text style = {{fontSize: 14,}}>
        
        {JSON.stringify(exerciseList)}
      </Text>

    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container:{
    flex:1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',

  }

})
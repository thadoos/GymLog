import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import { useAppSettingStore } from '../../../store/appSettings'
import { useRouter } from 'expo-router'


const index = () => {
  const router = useRouter();
  const colorTheme = useAppSettingStore(state=>state.theme)

  return (
    <View style = {[styles.container, {backgroundColor: Colors[colorTheme].background}]}>
      <TouchableOpacity 
        style = {[styles.viewExerciseButton, {backgroundColor:Colors[colorTheme].homeRouteButtons}]}  
        onPress={() => router.push('TrainingHistory')}
      >
        <Text style={[styles.viewExercisesText, {color: Colors[colorTheme].text}]}>Training History</Text>
      </TouchableOpacity>


      <TouchableOpacity 
        style = {[styles.viewExerciseButton, {backgroundColor:Colors[colorTheme].homeRouteButtons}]}  
        onPress={() => router.push('ViewExercises')}
      >
        <Text style={[styles.viewExercisesText, {color: Colors[colorTheme].text}]}>View Exercises</Text>
      </TouchableOpacity>

      
      <TouchableOpacity 
        style = {[styles.viewExerciseButton, {backgroundColor:Colors[colorTheme].homeRouteButtons}]}  
        onPress={() => router.push('ViewExercises')}
      >
        <Text style={[styles.viewExercisesText, {color: Colors[colorTheme].text}]}>View Exercises</Text>
      </TouchableOpacity>
        
      {/* // WARN: To remove this secion below after testing the functions*/}
      <TouchableOpacity 
        style = {[styles.viewExerciseButton, {backgroundColor:Colors[colorTheme].homeRouteButtons}]}  
        onPress={() => router.push('ViewExercises')}
      >
        <Text style={[styles.viewExercisesText, {color: Colors[colorTheme].text}]}>Get all muscles</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style = {[styles.viewExerciseButton, {backgroundColor:Colors[colorTheme].homeRouteButtons}]}  
        onPress={() => router.push('ViewExercises')}
      >
        <Text style={[styles.viewExercisesText, {color: Colors[colorTheme].text}]}>Get all muscle groups</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style = {[styles.viewExerciseButton, {backgroundColor:Colors[colorTheme].homeRouteButtons}]}  
        onPress={() => {
          console.warn();
        }}
      >
        <Text style={[styles.viewExercisesText, {color: Colors[colorTheme].text}]}>Get all muscle groups with muscles</Text>
      </TouchableOpacity>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',

    // paddingBottom: 20,
  },
  viewExerciseButton:{
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 15,
    marginTop: 10,
  },
  viewExercisesText:{
    fontSize: 18,
    fontWeight: '600',

  }
})

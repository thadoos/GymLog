import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import { useAppSettingStore } from '../../../store/appSettings'
import { useRouter } from 'expo-router'

import { getAllMuscleGroupsWithMuscles, getAllMuscles, hardDeleteAllMusclesAndMuscleGroups } from '../../../models'

const index = () => {
  const router = useRouter();
  const colorTheme = useAppSettingStore(state=>state.theme)
  const setDoneFirstLoad = useAppSettingStore(state=>state.setDoneFirstLoad);

  

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
        
      {/* // NOTE: To remove this secion below after testing the functions*/}
      <TouchableOpacity 
        style = {[styles.viewExerciseButton, {backgroundColor:Colors[colorTheme].homeRouteButtons}]}  
        onPress={() => {
          hardDeleteAllMusclesAndMuscleGroups();
          setDoneFirstLoad(false);
        }}
      >
        <Text style={[styles.viewExercisesText, {color: Colors[colorTheme].text}]}>Remove muscles and muscle groups</Text>
      </TouchableOpacity>


      <TouchableOpacity 
        style = {[styles.viewExerciseButton, {backgroundColor:Colors[colorTheme].homeRouteButtons}]}  
        onPress={() => {
          const muscleGroupsWithMuscles = getAllMuscleGroupsWithMuscles();
          muscleGroupsWithMuscles.then(tempMuscle => {
            tempMuscle.forEach(muscleContainer => {
              console.log(muscleContainer.name)
              console.log(muscleContainer.muscles)
            })
          })
        }}
      >
        <Text style={[styles.viewExercisesText, {color: Colors[colorTheme].text}]}>Get all muscle groups with muscles</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style = {[styles.viewExerciseButton, {backgroundColor:Colors[colorTheme].homeRouteButtons}]}  
        onPress={() => {
          const allMusclesContainer = getAllMuscles();
          allMusclesContainer.then(muscleContainer => {
            muscleContainer.forEach(muscle => {
              console.log(muscle.name)
            })
          })
        }}
      >
        <Text style={[styles.viewExercisesText, {color: Colors[colorTheme].text}]}>Get all muscles</Text>
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

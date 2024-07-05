import { View, Text, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import ExerciseList from '../../../components/ExerciseList'
import Colors from '../../../constants/Colors'
import { useAppSettingStore } from '../../../store/appSettings'


const ViewExercises = () => {
  const colorTheme = useAppSettingStore(state=>state.theme);
  return (
    <View style = {[styles.container, {backgroundColor: Colors[colorTheme].background}]}>
      {/* This should be in another screen that is linked to this home page
          It will be the button where user can access list of exercises
      */}
      <ExerciseList 
        details={
          [
            {keyword:"Primary Muscle Group", description:"primaryGeneralMuscleGroup"},
            {keyword:"Secondary Muscle Group", description:"secondaryGeneralMuscleGroup"},
            {keyword:"Muscle Group", description:"primarySpecificMuscleGroup"},
            {keyword:"Equipment", description:"equipment"},
            {keyword:"Notes", description:"notes"},
          ]
        }
        onExercisePressAddExercise={false}
      />
    </View>
  )
}

export default ViewExercises

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    
    // borderWidth: 1,
    // borderColor: 'red',
  }
})
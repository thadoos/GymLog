import { View, Text, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import ExerciseList from '../../../components/ExerciseList'
import Colors from '../../../constants/Colors'


const ViewExercises = () => {
  const colorScheme = useColorScheme();
  return (
    <View style = {[styles.container, {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
      {/* This should be in another screen that is linked to this home page
          It will be the button where user can access list of exercises
      */}
      <ExerciseList 
        details={
          [
            {keyword:"Muscle Group", description:"muscleGroup"},
            {keyword:"Equipment", description:"equipment"},
            {keyword:"Notes", description:"notes"},
          ]
        }
      />
    </View>
  )
}

export default ViewExercises

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
  }
})
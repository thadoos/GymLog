import { View, Text, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import { useRouter } from 'expo-router'

const index = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <View style = {[styles.container, {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
      <TouchableOpacity 
        style = {[styles.viewExerciseButton, {backgroundColor:Colors[colorScheme ?? 'light'].exerciseBlockBackground}]}  
        onPress={() => router.push('ViewExercises')}
      >
        <Text style={styles.viewExercisesText}>Training History</Text>
      </TouchableOpacity>


      <TouchableOpacity 
        style = {[styles.viewExerciseButton, {backgroundColor:Colors[colorScheme ?? 'light'].exerciseBlockBackground}]}  
        onPress={() => router.push('ViewExercises')}
      >
        <Text style={styles.viewExercisesText}>View Exercises</Text>
      </TouchableOpacity>

      
      <TouchableOpacity 
        style = {[styles.viewExerciseButton, {backgroundColor:Colors[colorScheme ?? 'light'].exerciseBlockBackground}]}  
        onPress={() => router.push('ViewExercises')}
      >
        <Text style={styles.viewExercisesText}>View Exercises</Text>
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
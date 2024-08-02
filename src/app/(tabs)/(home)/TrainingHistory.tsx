import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RealmWorkoutLogProvider from '../../../providers/Realm'

import Colors from '../../../constants/Colors'
import { useAppSettingStore } from '../../../store/appSettings'
import { useQuery } from '@realm/react'
import { WorkoutLog } from '../../../models/WorkoutLog'

const TrainingHistory = () => {
  const colorTheme = useAppSettingStore(state=>state.theme);
  const workoutList = useQuery(WorkoutLog);
  return (
      <View style={{flex: 1, width: '100%',backgroundColor: Colors[colorTheme].background}}>
        <View style = {[styles.container, {}]}>
          {
            workoutList.map((workoutLog, index) => {
              return (
                <TouchableOpacity style={styles.workoutBlock} key={index}>
                  <Text style={styles.workoutName}>{workoutLog.workoutName}</Text>

                </TouchableOpacity>
              )
            })
          }
          
        </View>
      </View>
  )
}

export default TrainingHistory

const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: '90%',
    alignItems: 'center',
    
  },
  workoutBlock:{
    width: '100%',

  },
  workoutName:{

  },

})
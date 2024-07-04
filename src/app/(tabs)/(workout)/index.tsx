import { StyleSheet, Text, View, Modal, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useWorkoutStore } from '../../../store/workoutState';
import { useAppState } from '../../../store/appState';
import { Exercise } from '../../../store/interfaces';
import exercisesData from '../../../../assets/exercisesData.json';
import {CancelWorkoutModal} from '../../../components/Workout/CancelWorkoutModal';

import Colors from '../../../constants/Colors';
import { useAppSettingStore } from '../../../store/appSettings';

const index = () => {
  const colorTheme = useAppSettingStore(state=>state.theme);
  const exerciseList = useWorkoutStore(state => state.workoutExercises);
  const cancelWorkoutModalVisible = useAppState(state=>state.cancelWorkoutModalVisible);
  const router = useRouter();
  
  return (
    <View style = {[{flex: 1, backgroundColor: Colors[colorTheme].background}]}>
      <View style = {styles.container}>
        <FlatList
          ListFooterComponent={
            <TouchableOpacity style={[styles.addExerciseButton, {borderColor: Colors[colorTheme].iconDefault}]} onPress={()=>router.push('addExercise')}>
              <Ionicons name="add-outline" size = {25} color={Colors[colorTheme].iconDefault}/>
            </TouchableOpacity>
          }
          ListFooterComponentStyle={{
            alignSelf: 'center',
            paddingBottom: 10,
          }}
          style={{width: '100%'}}
          // estimatedItemSize={2}
          showsVerticalScrollIndicator={false}
          data={exerciseList}
          // keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.exerciseBlock, {backgroundColor: Colors[colorTheme].exerciseBlockBackground}]}>
              <Image style={styles.exerciseImage} source={require('../../../../assets/exerciseIcons/benchPress.png')} />
              <View style={styles.detailsBlock}>
                <Text style={[styles.exerciseName, {color: Colors[colorTheme].text}]}>
                  {item.name}
                </Text>
              </View>
            </View>

          )}

        />

        
      </View>
      {/* <Text style = {{fontSize: 14 }}>
        {JSON.stringify(exerciseList)}
      </Text> */}

      {cancelWorkoutModalVisible
        ? <CancelWorkoutModal/>
      : null
      }

    </View>
  )
}



export default index


const styles = StyleSheet.create({
  container:{
    alignSelf: 'center',
    // flex:1,
    width: '90%',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,

  },
  addExerciseButton:{
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 1,
    
  },
  exerciseBlock:{
    flexDirection: 'row',
    flex: 1,
    // width: '100%',
    // height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    // flexGrow: 1,
    paddingRight: 10,

  },
  exerciseImage:{
    width: 85,
    height: 85,
    marginRight: 25,
    padding: 5,
    borderRadius: 15,
  },
  detailsBlock:{
    flexDirection: 'column',    
    flex: 1,
    height: "100%",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

  },
  exerciseName:{
    fontSize: 20,
    fontWeight: '800',
  },

})
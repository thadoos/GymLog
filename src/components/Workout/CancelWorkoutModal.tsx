import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useWorkoutStore } from '../../store/workoutState';
import { useAppSettingStore } from '../../store/appSettings';
import { useAppState } from '../../store/appState';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors';

// TODO Improve styling

export const CancelWorkoutModal = () =>{
  const colorTheme = useAppSettingStore(state=>state.theme);
  const exerciseList = useWorkoutStore(state => state.workoutExercises);
  const resetWorkout = useWorkoutStore(state=>state.resetWorkout);
  const setCancelWorkoutModalVisible = useAppState(state=>state.setCancelWorkoutModalVisible);
  const cancelWorkoutModalVisible = useAppState(state=>state.cancelWorkoutModalVisible);
  const router = useRouter();
  return(
    <Modal 
            animationType='fade'
            transparent={true}
            visible={cancelWorkoutModalVisible}
            onRequestClose={()=>{
              setCancelWorkoutModalVisible(false);
            }}        
          >
            <BlurView experimentalBlurMethod='dimezisBlurView' intensity={30} style={styles.centeredView}>
              <View style={[styles.cancelWorkoutModalContainer, {backgroundColor: Colors[colorTheme].modalBackground}]}>
                <Text style={[styles.cancelWorkoutModalTitle, {color: Colors[colorTheme].text}]}>End Workout?</Text>
                <Text style={[styles.cancelWorkoutModalDesc, {color: Colors[colorTheme].text}]}>Would you like to end and delete the current workout?</Text>
                
                <View style={styles.cancelWorkoutModalButtonContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setCancelWorkoutModalVisible(false);
                    }}
                  >
                    <View style={[styles.cancelWorkoutModalButton, {borderColor: Colors[colorTheme].modalBorder}]}>
                      <Text style={[styles.cancelWorkoutModalButtonText, {color: Colors[colorTheme].text}]}>Dismiss</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setCancelWorkoutModalVisible(false);
                      resetWorkout();
                      router.navigate('(home)');
                    }}
                  >
                    <View style={[styles.cancelWorkoutModalButton, {borderColor: Colors[colorTheme].modalBorder}]}>
                      <Text style={[styles.cancelWorkoutModalButtonText, {color: Colors[colorTheme].text}]}>Confirm</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

            </BlurView>
      
          </Modal>
  )
}

// export default CancelWorkoutModal

const styles = StyleSheet.create({
  centeredView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelWorkoutModalContainer:{
    width: '70%',
    aspectRatio: 2/1.25,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 15,

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},

  },
  cancelWorkoutModalTitle:{
    fontSize: 20,
    fontWeight: '700',

  },
  cancelWorkoutModalDesc:{
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',

  },
  cancelWorkoutModalButtonContainer:{
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',


  },
  cancelWorkoutModalButton:{
    padding: 10,

    borderWidth: 1,
    // borderColor: 'black',
    borderRadius: 10,

  },
  cancelWorkoutModalButtonText:{
    fontSize: 16,
    fontWeight: '600',

  }
})
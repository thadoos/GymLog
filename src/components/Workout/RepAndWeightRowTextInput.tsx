import { View, TextInput, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import Colors from '../../constants/Colors';
import { useAppSettingStore } from '../../store/appSettings';
import { useWorkoutStore } from '../../store/workoutState';

import { Swipeable } from "react-native-gesture-handler";
import React from 'react';

interface SwipeableItemProps {
  // children: React.ReactNode;
  index: number, curSetIndex: number, reps: number, weight: number
}

export const RepAndWeightRowTextInput = ({index, curSetIndex, reps, weight} : SwipeableItemProps) => {
  const colorTheme = useAppSettingStore(state=>state.theme);
  const changeRepWithIndex = useWorkoutStore(state=>state.changeRepWithIndex);
  const changeWeightWithIndex = useWorkoutStore(state=>state.changeWeightWithIndex);
  const deleteSetFromExercise = useWorkoutStore(state=>state.deleteSetFromExercise);


  return(
    <View style={styles.container}>
      {/* <View style={styles.repWeightContainer}>
        

      </View>
      <View style={styles.repWeightContainer}>
        

      </View> */}
      <Text style={[styles.setNumberText, {color: Colors[colorTheme].text}]}>{curSetIndex + 1}</Text>
      <TextInput
          style={[styles.repTextInput, {color: Colors[colorTheme].text, backgroundColor: Colors[colorTheme].setsAndRepsBackground}]}
          selectTextOnFocus={true}
          placeholder='Reps'
          value={reps.toString()}
          keyboardType='decimal-pad'
          onChangeText={(newReps) => changeRepWithIndex(index, curSetIndex, Number(newReps))}
        />
      <TextInput
          style={[styles.weightTextInput, {color: Colors[colorTheme].text, backgroundColor: Colors[colorTheme].setsAndRepsBackground}]}
          selectTextOnFocus={true}
          placeholder='Weight'
          value={weight.toString()}
          keyboardType='decimal-pad'
          onChangeText={(newWeight) => changeWeightWithIndex(index, curSetIndex, Number(newWeight))}
        />
      
      <TouchableOpacity
        style={styles.deleteSetButton}
        onPress={() => deleteSetFromExercise(index, curSetIndex)}
      >
        <Ionicons name="close-circle-outline" size = {20} color={Colors[colorTheme].iconDefault}/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 7,
  },
  repTextInput:{
    // width: '47%',
    flex: 1,
    paddingVertical: 7,
    // height: 30,
    textAlign: 'center',
    borderRadius: 15,
    // borderWidth: 1,
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 7,
    
  },
  weightTextInput:{
    // width: '47%',
    flex: 1,
    paddingVertical: 7,
    // height: 30,
    textAlign: 'center',
    borderRadius: 15,
    // borderWidth: 1,
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 7,
  },
  deleteSetButton:{
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
  },
  repWeightContainer:{

  },
  setNumberText:{
    width: '15%',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
})

// ! Old Swipeable attempt - Implement later
export const RepAndWeightRowOld: React.FC<SwipeableItemProps> = ({index, curSetIndex, reps, weight}) => {
  const colorTheme = useAppSettingStore(state=>state.theme);
  const changeRepWithIndex = useWorkoutStore(state=>state.changeRepWithIndex);
  const changeWeightWithIndex = useWorkoutStore(state=>state.changeWeightWithIndex);

  const renderRightAction = (progess: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 300, 400],
      outputRange: [300, 300, 500],
      extrapolate: 'clamp',
    })
    return (
      <Animated.View style={[{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        transform: [{translateX: trans}]
      } ]}
        
      >
        <Text
          style={{
            color: '#40394a',
            paddingHorizontal: 10,
            fontWeight: '600',
            paddingVertical: 20,
          }}
        >
          Delete
        </Text>
      </Animated.View>
    )
  }

  return (
    <Swipeable renderRightActions={renderRightAction}>

      <View style={styles.container}>
        <TextInput
          style={[styles.repTextInput, {color: Colors[colorTheme].text, backgroundColor: Colors[colorTheme].setsAndRepsBackground}]}
          placeholder='Reps'
          value={reps.toString()}
          keyboardType='decimal-pad'
          onChangeText={(newReps) => changeRepWithIndex(index, curSetIndex, Number(newReps))}
          />
        <TextInput
          style={[styles.weightTextInput, {color: Colors[colorTheme].text, backgroundColor: Colors[colorTheme].setsAndRepsBackground}]}
          placeholder='Weight'
          value={weight.toString()}
          keyboardType='decimal-pad'
          onChangeText={(newWeight) => changeWeightWithIndex(index, curSetIndex, Number(newWeight))}
        />
      </View>
    </Swipeable>
  )
}


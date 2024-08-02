import { View, TextInput, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import Colors from '../../constants/Colors';
import { useAppSettingStore } from '../../store/appSettings';
import { useWorkoutStore } from '../../store/workoutState';

import { Swipeable } from "react-native-gesture-handler";
import React from 'react';

interface SwipeableItemProps {
  // children: React.ReactNode;
  curSetIndex: number, reps: number, weight: number
}

export const RepAndWeightRowText = ({curSetIndex, reps, weight} : SwipeableItemProps) => {
  const colorTheme = useAppSettingStore(state=>state.theme);


  return(
    <View style={styles.container}>
      <Text style={[styles.setNumberText, {color: Colors[colorTheme].text}]}>{curSetIndex + 1}</Text>
      <Text
          style={[styles.repTextInput, {color: Colors[colorTheme].text, backgroundColor: Colors[colorTheme].setsAndRepsBackground}]}
      >
        {reps.toString()}
      </Text>
      <Text
          style={[styles.weightTextInput, {color: Colors[colorTheme].text, backgroundColor: Colors[colorTheme].setsAndRepsBackground}]}
      >
        {weight.toString()}
      </Text>
      
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

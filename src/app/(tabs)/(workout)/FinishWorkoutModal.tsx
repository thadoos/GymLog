import { View, Text, StyleSheet, Modal } from 'react-native';
import { useState } from 'react';
import { useAppSettingStore } from '../../../store/appSettings';
import Colors from '../../../constants/Colors';
import { useRouter } from 'expo-router';


export default function FinishWorkoutModal(){
  const colorTheme = useAppSettingStore(state => state.theme);
  const router = useRouter();

  return(
    <View style = {[styles.container, {backgroundColor: Colors[colorTheme].background}]}>

    </View>


  );
}



const styles = StyleSheet.create({
  container:{
    flex: 1,
    
  }
})
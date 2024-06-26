import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


import Colors from '../../../constants/Colors';
import { useAppSettingStore } from '../../../store/appSettings';

const index = () => {
  const colorTheme = useAppSettingStore(state=>state.theme);
  return (
    <View style = {[styles.container, {backgroundColor: Colors[colorTheme].background}]}>
      

    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container:{
    flex:1,
    width: '100%',

  }

})
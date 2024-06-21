import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React from 'react'


import Colors from '../../../constants/Colors'

const index = () => {
  const colorScheme = useColorScheme();
  return (
    <View style = {[styles.container, {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
      

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
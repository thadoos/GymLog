import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const index = () => {
  return (
    <View style = {styles.container}>
      <Text>Home</Text>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#fff',
    flex: 1,
  }
})
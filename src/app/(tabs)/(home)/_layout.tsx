import { View, Text } from 'react-native'
import React from 'react'

import { Stack } from 'expo-router'
import Colors from '../../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';


const home_layout = () => {
  return (
    <Stack screenOptions={{headerShadowVisible:false}}>
      <Stack.Screen name="index" options={{
          title:"Home",
          // headerTransparent: true,
          headerStyle:{
            // backgroundColor: 'red',
            
            
          },
          headerTitleStyle:{
            // fontWeight: '800',
            // fontSize: 20,
          }
        }}
      />
      <Stack.Screen 
        name="ViewExercises"
        options={{
          title:"View Exercises",

        }}
      />
    </Stack>
  )
}

export default home_layout
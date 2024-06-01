import { View, Text } from 'react-native'
import React from 'react'

import { Stack } from 'expo-router'
import Colors from '../../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';


const home_layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
          title:"Home",
          headerShadowVisible: false,
          // headerTransparent: true,
          headerStyle:{
            // backgroundColor: 'red',
            
          }
        }}
      />
    </Stack>
  )
}

export default home_layout
import { View, Text } from 'react-native'
import React from 'react'

import { Stack } from 'expo-router'

export default function root_layout() {
  return (
    <Stack
      
      screenOptions={{

      }}
    >
      <Stack.Screen
        name='(tabs)'
        options={{
          headerShown:false
        }}
      />
    </Stack>
  )
}


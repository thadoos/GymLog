import { View, Text } from 'react-native'
import React from 'react'

import { Stack } from 'expo-router'
import RealmWorkoutLogProvider from '../providers/Realm'

export default function root_layout() {
  return (
    <RealmWorkoutLogProvider>
      <Stack
        
        screenOptions={{
          headerShown:false
        }}
      >
        {/* <Stack.Screen
          name='(tabs)'
          options={{
            headerShown:false
          }}
        /> */}
      </Stack>

    </RealmWorkoutLogProvider>
  )
}


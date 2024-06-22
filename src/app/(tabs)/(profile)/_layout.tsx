import { View, Text, TouchableOpacity, useColorScheme, StyleSheet } from 'react-native'
import React from 'react'

import { Stack, useRouter } from 'expo-router'
import Colors from '../../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';

const profile_layout = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  return (
    <Stack screenOptions={{
      // headerTransparent: true,
      headerShadowVisible: false,
      
    }}>
      <Stack.Screen name="index" 
        options={{
          title:"Profile",
          headerRight: () => <TouchableOpacity style = {styles.settingsButton} onPress={() => router.push('settings')}>
              <Ionicons name="settings-sharp" size = {27} color={Colors[colorScheme ?? "light"].text}/>
            </TouchableOpacity>
          
        }}
      />
      <Stack.Screen name="settings"
        options={{
          title: "Settings"
        }}
      />

    </Stack>
  )
}

export default profile_layout

const styles = StyleSheet.create({
  settingsButton:{
    
  }
})
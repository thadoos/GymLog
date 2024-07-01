import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useEffect, useLayoutEffect } from 'react'
import { Stack, useRouter, usePathname } from 'expo-router'
import Colors from '../../../constants/Colors'
import { useAppSettingStore } from '../../../store/appSettings'
import Ionicons from '@expo/vector-icons/Ionicons';

const profile_layout = () => {
  const router = useRouter();
  const colorTheme = useAppSettingStore(state => state.theme);
  return (
    <Stack screenOptions={{
      headerTitleAlign:"center",
      freezeOnBlur: false,
      // headerTransparent: true,
      headerShadowVisible: false,
      headerStyle:{
        backgroundColor: Colors[colorTheme].background,
      },
      headerTitleStyle:{
        color: Colors[colorTheme].text,
        fontWeight: '900',
      }
      
    }}>
      <Stack.Screen name="index" 
        options={{
          title:"Profile",
          headerRight: () => 
            <TouchableOpacity style = {styles.settingsButton} onPress={() => router.navigate('settings')}>
              <Ionicons name="settings-sharp" size = {25} color={Colors[colorTheme].iconDefault}/>
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
    alignSelf: 'center',
  }
})
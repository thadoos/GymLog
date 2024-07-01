import { View, Text } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { Stack, useNavigation, useRouter } from 'expo-router'
import Colors from '../../../constants/Colors'
import { useAppSettingStore } from '../../../store/appSettings'



const home_layout = () => {
  const colorTheme = useAppSettingStore(state => state.theme);
  const navigation = useNavigation();
  const router = useRouter();
  // useEffect(() => {
  //   // Update header options when theme changes
  //   navigation.setOptions({
  //     headerStyle: {
  //       backgroundColor: Colors[colorTheme].background,
  //     },
  //     headerTitleStyle: {
  //       color: Colors[colorTheme].text,
  //     },
  //   });
  // }, [colorTheme, navigation, router]);

  return (
    <Stack screenOptions={{
      headerShadowVisible:false, 
      headerTitleAlign:"center",
      headerStyle:{
        backgroundColor: Colors[colorTheme].background,
      },
      headerTitleStyle:{
        color: Colors[colorTheme].text,
        fontWeight: '900',
      },
      // headerBackTitleVisible: false,
      // headerBackTitleStyle:{
      //   color: Colors[colorTheme].text,
      // }
    }}>
      <Stack.Screen name="index" options={{
          title:"Home",
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

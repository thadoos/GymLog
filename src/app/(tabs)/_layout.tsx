import { View, Text  } from 'react-native'
import React, {useEffect} from 'react'

import { Tabs, useRouter, useNavigation } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomTabbar from '../../components/CustomTabbar';
import Colors from '../../constants/Colors';
import { useAppSettingStore } from '../../store/appSettings';

export default function tab_layout() {
  const colorTheme = useAppSettingStore(state=>state.theme);
  const router = useRouter();
  const navigation = useNavigation();
  return (
    <Tabs
      tabBar={props => <CustomTabbar {...props} />}
      screenOptions={{
        unmountOnBlur: true,
        headerShown:false,

        tabBarStyle:{
          backgroundColor: Colors[colorTheme].tabBar,
          borderTopWidth: 0,
          

        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[colorTheme].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorTheme].tabIconDefault,
      }}
    >
      <Tabs.Screen
        name="index" 
        options={{
          tabBarLabel: "notused",
          href:null,
        }}
      />
      <Tabs.Screen
        name="(home)"
        
        options={{
          title: "Home",
          tabBarLabel: "home",
          tabBarIcon:({color}) => (
            <Ionicons name="home" size = {28} color={color}/>
          )

        }}
      />
      <Tabs.Screen
        name="(workout)"
        options={{
          title: "Workout",
          tabBarLabel: "barbell",
          tabBarIcon:({color}) => (
            <Ionicons name="barbell" size = {28} color={color}/>
          )
        }}
      />

      <Tabs.Screen
        
        name="(profile)"
        options={{
          title:"Profile",
          tabBarLabel: "person",
          tabBarIcon:({color}) => (
            <Ionicons name="person" size = {28} color={color}/>
          )

        }}
      />
      
    </Tabs>
  )
}


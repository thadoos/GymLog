import { View, Text, useColorScheme,  } from 'react-native'
import React from 'react'

import { Tabs } from 'expo-router'
import Colors from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomTabbar from '../../components/CustomTabbar';


export default function tab_layout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      tabBar={props => <CustomTabbar {...props} />}
      screenOptions={{
        headerShown:false,

        tabBarStyle:{
          backgroundColor: Colors[colorScheme ?? 'light'].tabBar,
          borderTopWidth: 0,
          

        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabIconDefault,
      }}
    >
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
      {/* <Tabs.Screen
        name="addWorkout"
        options={{
          tabBarIcon:({color}) => (
            <View style={{
              marginBottom: 15,
              height:38,
              width:38,
              alignItems:'center',
              justifyContent:'center',
              backgroundColor: Colors[colorScheme ?? "light"].tabBarAddBackground,
              borderRadius: 19,

            }}>
              <Ionicons name="add-outline" size = {34} color={Colors[colorScheme ?? "light"].tabBarAddTint}/>
            </View>
          )
        }}
      /> */}
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
      <Tabs.Screen
        name="index" 
        options={{
          tabBarLabel: "notused",
          href:null,
        }}
      />
    </Tabs>
  )
}


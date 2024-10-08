  import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
  import { useState, useEffect } from 'react';
  import Ionicons from '@expo/vector-icons/Ionicons';
  import { BottomTabBarProps } from '@react-navigation/bottom-tabs'; 

  import Colors from '../constants/Colors';
  import { useAppSettingStore } from '../store/appSettings';
  import { useWorkoutStore } from '../store/workoutState';
  import { useRouter } from 'expo-router';

  type Icon = 'home' | 'barbell' | 'person' | 'alert' | 'add-outline';
  const validIcon : Icon[] = ['home' , 'barbell' , 'person' , 'alert', 'add-outline'];

  export default function CustomTabbar({ state, descriptors, navigation } : BottomTabBarProps){

    const colorTheme = useAppSettingStore(state => state.theme);
    const workoutActive: boolean = useWorkoutStore(state=>state.workoutActive);
    const startWorkout = useWorkoutStore(state=>state.startWorkout);
    const router = useRouter();
    

    return (
      <View style={[styles.container, {backgroundColor: Colors[colorTheme].background}]}>

        
        <View 
          style={ 
            [
              styles.tabbar, 
              Platform.OS === 'android' ? {
                borderWidth: 1,
                borderColor: Colors[colorTheme].shadow,
              } : null,
              {
                backgroundColor: Colors[colorTheme].background,
                shadowColor: Colors[colorTheme].shadow
              }
            ] 
          }
        >
          {
          state.routes.map((route, index) => {
            const { options } = descriptors[route.key];

            const label: Icon = options.tabBarLabel !== undefined && validIcon.includes(options.tabBarLabel as Icon)
              ? (options.tabBarLabel === "barbell" ? (workoutActive ? options.tabBarLabel as Icon : 'add-outline') : options.tabBarLabel as Icon)
              : 'alert';
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                // navigation.navigate(route.name, {screen: 'index'});
                router.navigate(route.name);
              }
            };

            const addExercise = () => {
              startWorkout();
              // navigation.navigate('(workout)', {screen: 'index'});
              router.navigate(route.name);
            }

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            if(label !== "alert" && ((workoutActive && label !== "add-outline") || (!workoutActive && label !== "barbell"))){
              return (
                <TouchableOpacity
                  key={route.name}
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={!workoutActive && label ==="add-outline" ? addExercise : onPress}
                  onLongPress={onLongPress}
                  style={[(label === "add-outline" 
                    ? ([styles.tabbarAddWorkoutButton, { borderColor: Colors[colorTheme].tabIconDefault }]) 
                    : (styles.tabbarButton)), 
                    {
                      // borderColor: Colors[colorTheme].tabIconDefault, 
                      // shadowColor: Colors[colorTheme].shadow,
                      // borderWidth: 1,

                    }]}
                >
                  
                  <Ionicons name={label} size = {30} 
                    color={isFocused 
                      ? Colors[colorTheme].focusedTabButton
                      : Colors[colorTheme].unfocusedTabButton
                    }
                  />
                  
                </TouchableOpacity>
              );
            }
          })}
        </View>
      </View>
    );

  }

  const styles = StyleSheet.create({
    container:{
      backgroundColor: 'white',
      position: 'relative',
      bottom: 0,
      width: '100%',
      height: 110,
      // paddingBottom: 30,
      paddingTop: 0,

      // borderColor: 'green',
      // borderWidth: 1,

      shadowColor: 'black',
      shadowOpacity: 0.2,
      shadowOffset: {height: -5, width: 0}

    },
    tabbar:{
      // position: 'relative',
      width: '60%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'center',
      paddingVertical: 15,
      paddingHorizontal: 25,

      borderRadius: 25,
      // borderWidth: 1, 
      // borderColor: 'black',
      shadowRadius: 5,
      shadowOpacity: 0.35,
      shadowOffset: { width: 0, height: 0 },
      marginTop: 20,
    },

    tabbarAndroid:{

      
    },
    tabbarButton:{

    },
    tabbarAddWorkoutButton:{
      width: 31,
      height: 31,
      borderRadius: 15.5,
      borderWidth: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },

  })

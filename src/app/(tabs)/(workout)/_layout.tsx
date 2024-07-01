import { TouchableOpacity, StyleSheet } from "react-native";
import { useEffect } from "react";
import { Stack, useNavigation, useRouter } from "expo-router";
import Colors from '../../../constants/Colors'
import { useAppSettingStore } from '../../../store/appSettings'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useWorkoutStore } from "../../../store/workoutState";



export default function workout_stack(){
  const colorTheme = useAppSettingStore(state => state.theme);
  const navigation = useNavigation();
  const router = useRouter();
  let resetWorkout = useWorkoutStore(state => state.resetWorkout);

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

  return(
    <Stack screenOptions={{
      headerShadowVisible:false, 
      headerTitleAlign:"center",
      headerStyle:{
        backgroundColor: Colors[colorTheme].background,
        
      },
      headerTitleStyle:{
        color: Colors[colorTheme].text,
        fontWeight: '900',
      }
    }}>
      <Stack.Screen name="index" options={{
        title:"Workout",
        // headerTransparent: true,
        headerLeft: () => 
          <TouchableOpacity style = {styles.addExerciseButton} onPress={() => {
            // TODO This should eventually be changed to lead to cancel workout confirmation modal
            router.navigate('(home)');
            resetWorkout();
            // router.push('addExercise');

          }}>
            <Ionicons name="close" size = {25} color={Colors[colorTheme].iconDefault}/>
          </TouchableOpacity>
      }}/>

      <Stack.Screen name="addExercise" 
        options={{
          title: "Add Exercise",

        }}
      />
    </Stack>
  )
}

const styles = StyleSheet.create({
  addExerciseButton: {
    alignSelf: 'center',
  }
})
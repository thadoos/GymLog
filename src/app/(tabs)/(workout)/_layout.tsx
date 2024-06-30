import { TouchableOpacity, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import Colors from '../../../constants/Colors'
import { useAppSettingStore } from '../../../store/appSettings'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";



export default function workout_stack(){
  const colorTheme = useAppSettingStore(state => state.theme);
  const router = useRouter();

  return(
    <Stack screenOptions={{headerShadowVisible:false, 
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
        headerTransparent: true,
        headerRight: () => 
          <TouchableOpacity style = {styles.addExerciseButton} onPress={() => router.push('addExercise')}>
            <Ionicons name="add-outline" size = {25} color={Colors[colorTheme].iconDefault}/>
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
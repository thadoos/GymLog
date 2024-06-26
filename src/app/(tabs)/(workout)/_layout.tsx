import { Stack } from "expo-router";
import Colors from '../../../constants/Colors'
import { useAppSettingStore } from '../../../store/appSettings'


export default function workout_stack(){
  const colorTheme = useAppSettingStore(state => state.theme);
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
      }}/>
    </Stack>
  )
}
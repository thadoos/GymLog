import { Stack } from "expo-router";


export default function workout_stack(){
  return(
    <Stack>
      <Stack.Screen name="index" options={{
        title:"Start Workout",
        headerTransparent: true,
      }}/>
    </Stack>
  )
}
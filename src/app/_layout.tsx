import React, { useEffect }from 'react'
import { Stack } from 'expo-router'

import { handleFirstLaunchLoadData } from '../models'


import { useAppSettingStore } from '../store/appSettings'
import muscleAndMuscleGroupData from '../../assets/muscleAndMuscleGroupData.json'

export default function root_layout() {
  const { doneFirstLoad, setDoneFirstLoad } = useAppSettingStore();

  useEffect(() => { console.warn(doneFirstLoad)
    if(doneFirstLoad) {
      console.warn("First load had already been done before");
      setDoneFirstLoad(false);
    } else {
      console.warn("Executing first load");
      handleFirstLaunchLoadData();
      setDoneFirstLoad(true);
    }
  }, [])



  return (
    <Stack
      screenOptions={{
        headerShown:false
      }}
    >
      {/* <Stack.Screen
        name='(tabs)'
        options={{
          headerShown:false
        }}
      /> */}
    </Stack>

  )
}


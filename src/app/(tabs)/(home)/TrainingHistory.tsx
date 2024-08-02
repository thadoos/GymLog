import { FlatList, TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RealmWorkoutLogProvider from '../../../providers/Realm'

import Colors from '../../../constants/Colors'
import { useAppSettingStore } from '../../../store/appSettings'
import { useQuery } from '@realm/react'
import { WorkoutLog } from '../../../models/WorkoutLog'


interface TextBlockProps {
  keyword: string,
  text: string
}
const TextBlock = ({keyword, text}: TextBlockProps) => {
  const colorTheme = useAppSettingStore(state=>state.theme);
  return (
    <View style={[styles.textBlock, {}]}>
      <Text style={[styles.keywordText, {color: Colors[colorTheme].text}]}>
        {keyword}: 
      </Text>
      <Text style={[styles.descriptionText, {color: Colors[colorTheme].text}]}>
        {text}
      </Text>


    </View>
  )
}

const getDuration = (timeDiff: number) : string => {
  let stringDuration = "";
  let hour = Math.floor(timeDiff / 100 / 60 / 60);
  timeDiff -= hour * 60 * 60 * 100;
  let mins = Math.floor(timeDiff / 100 / 60)
  stringDuration = hour + " hours " + mins + " mins" 

  return stringDuration;
}

const TrainingHistory = () => {
  const colorTheme = useAppSettingStore(state=>state.theme);
  const workoutList = useQuery(WorkoutLog, workoutLogs =>{
    return workoutLogs.sorted('timeStart')
  });
  return (
      <View style={{flex: 1, alignItems:'center', width: '100%',backgroundColor: Colors[colorTheme].background}}>
        <View style = {styles.container}>
          <FlatList
            style={styles.workoutFlatList}
            data={workoutList}
            showsVerticalScrollIndicator={false}
            keyExtractor={(workoutLog)=>workoutLog._id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity style={[styles.workoutBlock, {backgroundColor: Colors[colorTheme].exerciseBlockBackground}]}>
                <Text style={[styles.workoutName, {color: Colors[colorTheme].text}]}>{item.workoutName}</Text>
                <TextBlock keyword="Date of Workout" text={item.timeStart.toUTCString()}/>

                <TextBlock keyword="Duration" text={getDuration(item.workoutDuration)}/>

                {/* <TextBlock style={[styles.workoutName, {color: Colors[colorTheme].text}]}>{item.timeStart.toUTCString()}</TextBlock> */}

              </TouchableOpacity>

            )}
          />
          
        </View>
      </View>
  )
}

export default TrainingHistory

const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: '90%',
    flexDirection: 'column',
  },
  workoutFlatList:{
    alignSelf: 'center',
    width:'100%',
  },
  workoutBlock:{
    width: '100%',
    marginBottom: 10,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,

  },
  workoutName:{
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },



  textBlock: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
  },
  keywordText:{
    fontSize: 16,
    fontWeight: '600',
    marginRight: 7,
  },
  descriptionText:{
    fontSize: 16,
    fontWeight: '200',
  },
})
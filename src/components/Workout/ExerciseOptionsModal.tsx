import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Exercise, ExerciseDetailsTitles } from '../../store/interfaces';
import exercisesData from '../../../assets/exercisesData.json';
import { ExerciseDetailLine, ExerciseDetailOptions } from '../ExerciseList';

import { useAppState } from '../../store/appState';
import { useAppSettingStore } from '../../store/appSettings';
import Colors from '../../constants/Colors';
import { useWorkoutStore } from '../../store/workoutState';

interface ExerciseOptionsModalProps {
  index: number,
}

const noRenderKeys : Array<ExerciseDetailOptions> = ["imageName", "id"]

// TODO Needs to be restyled nicer
export const ExerciseOptionsModal = ({index}:ExerciseOptionsModalProps) => {
  const colorTheme = useAppSettingStore(state=>state.theme);
  const exerciseOptionsModalVisible = useAppState(state=>state.exerciseOptionsModalVisible);
  const setExerciseOptionsModalVisible = useAppState(state=>state.setExerciseOptionsModalVisible);
  const deleteExercise = useWorkoutStore(state=>state.deleteExercise);

  const id = useWorkoutStore(state=>state.workoutExercises[index].id)

  return(
    <Modal 
      animationType='fade'
      transparent={true}
      visible={exerciseOptionsModalVisible !== -1}
      onRequestClose={()=>{
        setExerciseOptionsModalVisible(-1);
      }}
    >
      <BlurView experimentalBlurMethod='dimezisBlurView' intensity={30} style={styles.centeredView}>
        <View style={[styles.container, {backgroundColor: Colors[colorTheme].modalBackground}]}>
          
          <TouchableOpacity 
            style={styles.closeModalButton}
            onPress={() => (setExerciseOptionsModalVisible(-1))}
          >
            <Ionicons name="close" size = {25} color={Colors[colorTheme].iconDefault}/>
          </TouchableOpacity>

          <Text style={[styles.exerciseName, {color: Colors[colorTheme].text}]}>
            {exercisesData.exercises[id].name}
          </Text>

          {
            Object.entries(exercisesData.exercises[id]).filter(([key, value]) => !noRenderKeys.includes(key as ExerciseDetailOptions)).map(([key, value]) => (
              <ExerciseDetailLine
                keyword={ExerciseDetailsTitles[key as ExerciseDetailOptions]}
                description={key as ExerciseDetailOptions}
                item={exercisesData.exercises[id]}
              />
              // <Text key={key}>
              //   {key}: {Array.isArray(value) ? value.join(', ') : value.toString()}
              // </Text>
            ))
          }


          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.bottomButton, {}]}>
              <Ionicons name="arrow-redo-outline" size = {25} color={Colors[colorTheme].iconDefault}/>
              <Text style={[styles.buttonText, {color: Colors[colorTheme].text}]}>
                Change Exercise
              </Text>

            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.bottomButton, {backgroundColor: Colors[colorTheme].tintDark}]}
              onPress={() => {
                deleteExercise(index);
                setExerciseOptionsModalVisible(-1);
              }}
            >
              <Ionicons name="close" size = {25} color={Colors[colorTheme].iconDefault}/>
              <Text style={[styles.buttonText, {color: Colors[colorTheme].text}]}>
                Delete Exercise
              </Text>

            </TouchableOpacity>

          </View>
        </View>

        

      </BlurView>
    </Modal>
  )
}
const styles = StyleSheet.create({
  centeredView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container:{
    width: '80%',
    // height: '70%',
    borderRadius: 15,
    
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 15,
    paddingTop: 25,

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
  },
  closeModalButton:{
    // width: 50,
    // height: 50,
    alignItems: 'center',
    justifyContent:'center',
    padding: 7,
    // backgroundColor: 'red',
    position: 'absolute',
    right: 5,
    top: 5,
  },
  exerciseName:{
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 20,
    textAlign: 'left',
    alignSelf: 'flex-start',

  },
  buttonContainer:{
    marginTop: 20,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 1,
  },
  bottomButton:{
    flex: 1,
    // width: '47%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,

  },
  buttonText:{
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '600',

  },
})
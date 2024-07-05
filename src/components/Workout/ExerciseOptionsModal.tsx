import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';

import { useAppState } from '../../store/appState';
import { useAppSettingStore } from '../../store/appSettings';
import Colors from '../../constants/Colors';


export const ExerciseOptionsModal = () => {
  const colorTheme = useAppSettingStore(state=>state.theme);
  const exerciseOptionsModalVisible = useAppState(state=>state.exerciseOptionsModalVisible);
  const setExerciseOptionsModalVisible = useAppState(state=>state.setExerciseOptionsModalVisible);

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

          </TouchableOpacity>
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
    height: '80%',
  },
  closeModalButton:{
    width: 50,
    height: 50,
    backgroundColor: 'red',
  },
})
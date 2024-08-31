import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import Ionicons from '@expo/vector-icons/Ionicons';
import NewExerciseDetailLine from "./NewExerciseDetailLine";
import Exercise from "../models/Exercise";
import { useAppState } from "../store/appState";
import Colors from "../constants/Colors";
import { useAppSettingStore } from "../store/appSettings";

const FullExerciseDetailsPopUp = () => {
  const exercise = useAppState(
    (state) => state.fullExerciseDetailsPopupVisible,
  );
  const setFullExerciseDetailsPopupVisible = useAppState(
    (state) => state.setFullExerciseDetailsPopupVisible,
  );
  const { theme } = useAppSettingStore();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={exercise !== null}
      onRequestClose={() => {
        setFullExerciseDetailsPopupVisible(null);
      }}
    >
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        intensity={30}
        style={styles.centeredView}
      >
        <View
          style={[
            styles.mainContainer,
            { backgroundColor: Colors[theme].modalBackground },
          ]}
        >
          <View style={styles.topRow}>
            <Text style={[styles.nameText, { color: Colors[theme].text }]}>
              {exercise.name}
            </Text>
            
            <TouchableOpacity 
              style={styles.closeModalButton}
              onPress={() => (setFullExerciseDetailsPopupVisible(null))}
            >
              <Ionicons name="close" size = {25} color={Colors[theme].iconDefault}/>
            </TouchableOpacity>
          </View>
          <Text style={[styles.mediumText, { color: Colors[theme].text }]}>
            {exercise.isTwoSideWeight
              ? "Indicated weight is for both sides combined"
              : "Indicated weight is just for one side"}
          </Text>

          <NewExerciseDetailLine descriptor="Notes" value={exercise.note} />
        </View>
      </BlurView>
    </Modal>
  );
};

export default FullExerciseDetailsPopUp;

const styles = StyleSheet.create({
  centeredView: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    width: "85%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
  },
  topRow:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  nameText: {
    fontSize: 20,
    fontWeight: "800",
  },
  closeModalButton:{
    alignItems: 'center',
    justifyContent:'center',
  },
  mediumText: {
    fontSize: 14,
    fontWeight: "500",
  },
  lightText: {
    fontSize: 14,
    fontWeight: "300",
  },
});

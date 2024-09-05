import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppSettingStore } from "../../../store/appSettings";
import Colors from "../../../constants/Colors";
import { useWorkoutStore } from "../../../store/workoutState";
import EnhancedExerciseFlatList from "../../../components/EnhancedExerciseFlatList";
import { useAppState } from "../../../store/appState";
import EnhancedExerciseDetailsModal from "../../../components/EnhancedExerciseDetailsModal";

const onExercisePress = () => {};
const AddExerciseScreen = () => {
  const colorTheme = useAppSettingStore((state) => state.theme);
  const addExercise = useWorkoutStore((state) => state.addExercise);
  const {
    fullExerciseDetailsPopupVisible,
    setFullExerciseDetailsPopupVisible,
  } = useAppState();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorTheme].background },
      ]}
    >
      <View style={styles.subContainer}>
        <EnhancedExerciseFlatList showExpandExerciseInfoButton={true} />

        {fullExerciseDetailsPopupVisible !== null ? (
          <EnhancedExerciseDetailsModal
            exercise={fullExerciseDetailsPopupVisible}
          />
        ) : null}
      </View>
    </View>
  );
};

export default AddExerciseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  subContainer: {
    width: "90%",
    flex: 1,
  },
});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppSettingStore } from "../../../store/appSettings";
import Colors from "../../../constants/Colors";
import ExerciseList from "../../../components/ExerciseList";
import { useWorkoutStore } from "../../../store/workoutState";
import EnhancedExerciseFlatList from "../../../components/EnhancedExerciseFlatList";

const addExercise = () => {
  const colorTheme = useAppSettingStore((state) => state.theme);
  const addExercise = useWorkoutStore((state) => state.addExercise);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorTheme].background },
      ]}
    >
      <View style={styles.subContainer}>
        <EnhancedExerciseFlatList />
      </View>
    </View>
  );
};

// <ExerciseList
//   details={
//     [
//       {keyword:"Primary Muscle Group", description:"primaryGeneralMuscleGroup"},
//       {keyword:"Secondary Muscle Group", description:"secondaryGeneralMuscleGroup"},
//       {keyword:"Primary Specific Muscle Group", description:"primarySpecificMuscleGroup"},
//     ]
//   }
//   onExercisePressAddExercise={true} //(exerciseID: number)=>addExercise
// />
export default addExercise;

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

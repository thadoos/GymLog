import { View, Text, StyleSheet, useColorScheme } from "react-native";
import React from "react";
import ExerciseList from "../../../components/ExerciseList";
import Colors from "../../../constants/Colors";
import { useAppSettingStore } from "../../../store/appSettings";
import NewExerciseList from "../../../components/NewExerciseList";
import EnhancedExerciseFlatList from "../../../components/EnhancedExercise";

const ViewExercises = () => {
  const { theme } = useAppSettingStore();
  return (
    <View
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      {/* // TODO: Should add an option to toggle whether to show just name or with all details.*/}
      {/* // !  Perhaps the block will not open a separate thing but just extend at the bottom to show the details */}
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
//       {keyword:"Muscle Group", description:"primarySpecificMuscleGroup"},
//       {keyword:"Equipment", description:"equipment"},
//       {keyword:"Notes", description:"notes"},
//     ]
//   }
//   onExercisePressAddExercise={false}
// />
export default ViewExercises;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    // borderWidth: 1,
    // borderColor: "red",
  },
  subContainer: {
    width: "90%",
    flex: 1,
  },
});


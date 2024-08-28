import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Exercise from "../models/Exercise";
import Colors from "../constants/Colors";
import { useAppSettingStore } from "../store/appSettings";
import NewExerciseDetailLine from "./NewExerciseDetailLine";

interface newExerciseDetailBlockProps {
  exercise: Exercise;
  options: string[]; // NOTE: This is an array of "keywords" that should be shown, e.g. name, notes, primary muscles, etc.
}

const NewExerciseDetailBlock = ({
  exercise,
  options,
}: newExerciseDetailBlockProps) => {
  const { theme } = useAppSettingStore();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[theme].exerciseBlockBackground },
      ]}
    >
      <Text style={styles.exerciseNameText}>{exercise.name}</Text>

      {options.map((option) => (
        <NewExerciseDetailLine descriptor={option} value={exercise[option]} />
      ))}

      <Text style={styles.exerciseDetailsKeyword}>
        {exercise.isTwoSideWeight}
      </Text>
    </View>
  );
};

export default NewExerciseDetailBlock;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  exerciseNameText: {
    fontSize: 20,
    fontWeight: "800",
  },
  exerciseDetailsKeyword: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 3,
    marginRight: 5,
  },
});

import React from "react";
import { useAppSettingStore } from "../store/appSettings";
import Colors from "../constants/Colors";
import { compose, withObservables } from "@nozbe/watermelondb/react";
import { database } from "../models";
import Exercise from "../models/Exercise";
import { Text, View } from "react-native";
import TypeModel from "../models/TypeModel";
import { getExerciseTypeFromExercise } from "../models";

interface ExerciseTypeTextProps {
  exercise: Exercise;
  exerciseType: TypeModel;
}
const ExerciseTypeText: React.FC<ExerciseTypeTextProps> = ({
  exercise,
  exerciseType,
}: ExerciseTypeTextProps) => {
  const { theme } = useAppSettingStore();
  console.log(getExerciseTypeFromExercise(exercise));
  console.log(exercise);
  console.log("Exercise Type");
  console.log(exerciseType);

  return (
    <View>
      <Text>{exerciseType.name}</Text>
    </View>
  );
};

const enhanceOld = withObservables(["exercise"], ({ exercise }) => ({
  exercise,
  exerciseType: exercise.exerciseType,
}));

const enhance = compose(
  withObservables(["exercise"], ({ exercise }) => ({
    exercise,
    exerciseType: exercise.exerciseType,
  })),
  withObservables(["exerciseType"], ({ exerciseType }) => ({
    exerciseType: exerciseType.name,
  })),
);
const EnhancedExerciseTypeText = enhanceOld(ExerciseTypeText);
export default EnhancedExerciseTypeText;

import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface newExerciseDetailLineProps {
  option: string;
  value: string | string[];
}
const NewExerciseDetailLine = ({
  option,
  value,
}: newExerciseDetailLineProps) => {
  return (
    <View>
      <Text>NewExerciseDetailLine</Text>
    </View>
  );
};

export default NewExerciseDetailLine;

const styles = StyleSheet.create({});

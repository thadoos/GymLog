import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface newExerciseDetailLineProps {
  descriptor: string;
  value: string | string[];
}
const NewExerciseDetailLine = ({
  descriptor,
  value,
}: newExerciseDetailLineProps) => {
  return (
    <View style={[styles.textRowContainer]}>
      <Text style={styles.descText}></Text>
      <Text style={styles.valueText}>
        {Array.isArray(descriptor) ? (value as string[]).join(", ") : value}
      </Text>
    </View>
  );
};

export default NewExerciseDetailLine;

const styles = StyleSheet.create({
  textRowContainer: {
    width: "100%",
    marginTop: 3,
    marginRight: 5,
  },
  descText: {
    fontSize: 14,
    fontWeight: "700",
  },
  valueText: {
    fontSize: 14,
    fontWeight: "300",
  },
});

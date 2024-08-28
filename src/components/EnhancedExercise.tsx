import React from "react";
import { FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAppSettingStore } from "../store/appSettings";
import Colors from "../constants/Colors";
import { withObservables } from "@nozbe/watermelondb/react";
import { database } from "../models";
import Exercise from "../models/Exercise";

interface ExerciseListProps {
  exercises: Exercise[];
}
const ExerciseFlatList: React.FC<ExerciseListProps> = ({
  exercises,
}: ExerciseListProps) => {
  const { theme } = useAppSettingStore();

  return (
    <FlatList
      style={[styles.flatList]}
      data={exercises}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.exerciseButton,
            { backgroundColor: Colors[theme].exerciseBlockBackground },
          ]}
        >
          <Text
            style={[styles.exerciseNameText, { color: Colors[theme].text }]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

const enhance = withObservables(["exercises"], () => ({
  exercises: database.get<Exercise>("exercises").query().observe(),
}));
const EnhancedExerciseFlatList = enhance(ExerciseFlatList);
export default EnhancedExerciseFlatList;

const styles = StyleSheet.create({
  flatList: {
    width: "100%",
    flex: 1,
  },
  exerciseButton: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 5,
    borderRadius: 10,
  },
  exerciseNameText: {
    fontSize: 18,
    fontWeight: "800",
  },
});

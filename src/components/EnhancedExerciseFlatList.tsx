import React from "react";
import { FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppSettingStore } from "../store/appSettings";
import Colors from "../constants/Colors";
import { withObservables } from "@nozbe/watermelondb/react";
import { database } from "../models";
import Exercise from "../models/Exercise";
import { useAppState } from "../store/appState";

interface ExerciseListProps {
  exercises: Exercise[];
  onExercisePress: (exercise: Exercise) => void;
  showExpandExerciseInfoButton: boolean;
}
const ExerciseFlatList: React.FC<ExerciseListProps> = ({
  exercises,
  onExercisePress,
  showExpandExerciseInfoButton,
}: ExerciseListProps) => {
  const { theme } = useAppSettingStore();
  const {
    fullExerciseDetailsPopupVisible,
    setFullExerciseDetailsPopupVisible,
  } = useAppState();

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
          onPress={() => onExercisePress(item)}
        >
          <Text
            style={[styles.exerciseNameText, { color: Colors[theme].text }]}
          >
            {item.name}
          </Text>

          {showExpandExerciseInfoButton ? (
            <TouchableOpacity
              style={[
                styles.expandExerciseInfoButton,
                { borderColor: Colors[theme].textInputBorder },
              ]}
              onPress={() => setFullExerciseDetailsPopupVisible(item)}
            >
              <Ionicons
                name="help"
                size={25}
                color={Colors[theme].iconDefault}
              />
            </TouchableOpacity>
          ) : null}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 5,
    borderRadius: 10,
  },
  exerciseNameText: {
    fontSize: 18,
    fontWeight: "800",
    flex: 1,
  },
  expandExerciseInfoButton: {
    width: 30,
    height: 30,
    aspectRatio: 1,
    borderRadius: 15,
    borderWidth: 1,
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});

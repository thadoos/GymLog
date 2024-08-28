import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";

import Colors from "../constants/Colors";
import { useAppSettingStore } from "../store/appSettings";
import { useWorkoutStore } from "../store/workoutState";
import { useRouter } from "expo-router";
import Exercise from "../models/Exercise";
import { getAllExercises } from "../models";

const NewExerciseList = () => {
  const { theme } = useAppSettingStore();

  let exerciseModels: Exercise[];
  getAllExercises()
    .then((exerciseEntries) => (exerciseModels = exerciseEntries))
    .then((_) => console.log(exerciseModels));

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: Colors[theme].background,
      }}
    >
      <View style={[styles.container, {}]}>
        <FlatList
          style={[styles.flatList]}
          data={exerciseModels}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id}
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
      </View>
    </View>
  );
};

export default NewExerciseList;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",

    borderColor: "red",
    borderWidth: 1,
  },
  flatList: {
    width: "100%",
    flex: 1,
    borderColor: "green",
    borderWidth: 1,
  },
  exerciseButton: {
    width: "100%",
    paddingVertical: 7,
    paddingHorizontal: 15,

    borderColor: "blue",
    borderWidth: 1,
  },
  exerciseNameText: {
    fontSize: 18,
    fontWeight: "800",
  },
});

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../../../constants/Colors";
import { useAppSettingStore } from "../../../store/appSettings";
import { useRouter } from "expo-router";

import {
  getAllExerciseTypes,
  getAllMuscleGroupsWithMuscles,
  getAllMuscles,
  getAllEquipment,
  getAllExercises,
  resetMuscleGroupsAndMuscles,
  resetExerciseTypes,
  resetAllWatermelonDB,
} from "../../../models";

const index = () => {
  const router = useRouter();
  const colorTheme = useAppSettingStore((state) => state.theme);
  const setDoneFirstLoad = useAppSettingStore(
    (state) => state.setDoneFirstLoad,
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorTheme].background },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.viewExerciseButton,
          { backgroundColor: Colors[colorTheme].homeRouteButtons },
        ]}
        onPress={() => router.push("TrainingHistory")}
      >
        <Text
          style={[styles.viewExercisesText, { color: Colors[colorTheme].text }]}
        >
          Training History
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.viewExerciseButton,
          { backgroundColor: Colors[colorTheme].homeRouteButtons },
        ]}
        onPress={() => router.push("ViewExercises")}
      >
        <Text
          style={[styles.viewExercisesText, { color: Colors[colorTheme].text }]}
        >
          View Exercises
        </Text>
      </TouchableOpacity>

      {/* // NOTE: To remove this secion below after testing the functions*/}
      <TouchableOpacity
        style={[
          styles.viewExerciseButton,
          { backgroundColor: Colors[colorTheme].homeRouteButtons },
        ]}
        onPress={() => {
          resetAllWatermelonDB();
          setDoneFirstLoad(false);
        }}
      >
        <Text
          style={[styles.viewExercisesText, { color: Colors[colorTheme].text }]}
        >
          Reset watermelonDB
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.viewExerciseButton,
          { backgroundColor: Colors[colorTheme].homeRouteButtons },
        ]}
        onPress={() => {
          const muscleGroupsWithMuscles = getAllMuscleGroupsWithMuscles();
          muscleGroupsWithMuscles.then((tempMuscle) => {
            tempMuscle.forEach((muscleContainer) => {
              console.log(muscleContainer.name);
              console.log(muscleContainer.muscles);
            });
          });
        }}
      >
        <Text
          style={[styles.viewExercisesText, { color: Colors[colorTheme].text }]}
        >
          Get all muscle groups with muscles
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.viewExerciseButton,
          { backgroundColor: Colors[colorTheme].homeRouteButtons },
        ]}
        onPress={() => {
          const allMusclesContainer = getAllMuscles();
          allMusclesContainer.then((muscleContainer) => {
            muscleContainer.forEach((muscle) => {
              console.log(muscle.name);
            });
          });
        }}
      >
        <Text
          style={[styles.viewExercisesText, { color: Colors[colorTheme].text }]}
        >
          Get all muscles
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.viewExerciseButton,
          { backgroundColor: Colors[colorTheme].homeRouteButtons },
        ]}
        onPress={() => {
          const allTypesContainer = getAllExerciseTypes();
          allTypesContainer.then((typeContainer) => {
            typeContainer.forEach((type) => {
              console.log(type.name);
            });
          });
        }}
      >
        <Text
          style={[styles.viewExercisesText, { color: Colors[colorTheme].text }]}
        >
          Get exercise types
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.viewExerciseButton,
          { backgroundColor: Colors[colorTheme].homeRouteButtons },
        ]}
        onPress={() => {
          const allEquipmentContainer = getAllEquipment();
          allEquipmentContainer.then((equipmentContainer) => {
            equipmentContainer.forEach((equipment) => {
              console.log(equipment.name);
            });
          });
        }}
      >
        <Text
          style={[styles.viewExercisesText, { color: Colors[colorTheme].text }]}
        >
          Get equipment
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.viewExerciseButton,
          { backgroundColor: Colors[colorTheme].homeRouteButtons },
        ]}
        onPress={() => {
          const allExerciseContainer = getAllExercises();
          allExerciseContainer.then((exerciseContainer) => {
            exerciseContainer.forEach((exercise) => {
              exercise.equipment.fetch().then((exerciseEquipment) => {
                console.log(exercise.name + " : " + exerciseEquipment.name);
              });
            });
          });
        }}
      >
        <Text
          style={[styles.viewExercisesText, { color: Colors[colorTheme].text }]}
        >
          Get exercises
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    // paddingBottom: 20,
  },
  viewExerciseButton: {
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginTop: 10,
  },
  viewExercisesText: {
    fontSize: 18,
    fontWeight: "600",
  },
});

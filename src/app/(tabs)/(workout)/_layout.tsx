import { TouchableOpacity, StyleSheet, Modal, Text } from "react-native";
import { useState } from "react";
import { Link, Stack, useRouter } from "expo-router";
import Colors from "../../../constants/Colors";
import { useAppSettingStore } from "../../../store/appSettings";
import { useAppState } from "../../../store/appState";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useWorkoutStore } from "../../../store/workoutState";

// import { useRealm } from "@realm/react";

export default function workout_stack() {
  const colorTheme = useAppSettingStore((state) => state.theme);
  const router = useRouter();
  const setCancelWorkoutModalVisible = useAppState(
    (state) => state.setCancelWorkoutModalVisible,
  );
  // const endAndLogWorkout = useWorkoutStore(state => state.endAndLogWorkout);
  const {
    workoutName,
    workoutDescription,
    timeStart,
    timeEnd,
    workoutExercises,
    endAndLogWorkout,
  } = useWorkoutStore();

  // const realm = useRealm();

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: Colors[colorTheme].background,
        },
        headerTitleStyle: {
          color: Colors[colorTheme].text,
          fontWeight: "900",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Workout",
          // headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              style={styles.addExerciseButton}
              onPress={() => {
                setCancelWorkoutModalVisible(true);
              }}
            >
              <Ionicons
                name="close"
                size={25}
                color={Colors[colorTheme].iconDefault}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.addExerciseButton}
              onPress={() => {
                router.push("FinishWorkoutModal");
              }}
            >
              <Ionicons
                name="checkmark"
                size={25}
                color={Colors[colorTheme].iconDefault}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="AddExerciseScreen"
        options={{
          title: "Add Exercise",
        }}
      />

      <Stack.Screen
        name="FinishWorkoutModal"
        options={{
          title: "Finish Workout",
          presentation: "modal",

          headerLeft: () => (
            <Link href="../">
              <Ionicons
                name="close"
                size={25}
                color={Colors[colorTheme].iconDefault}
              />
            </Link>
          ),

          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                const endTime = new Date();
                console.log(workoutExercises);
                router.navigate("(home)");
                // realm.write(() => {
                //   realm.create('WorkoutLog', {
                //     workoutName: workoutName,
                //     workoutDescription: workoutDescription,
                //     timeStart: timeStart,
                //     timeEnd: endTime,
                //     workoutDuration: Math.floor(endTime.getTime() - timeStart.getTime()),
                //     workoutExercises: workoutExercises,
                //   })
                // })
                endAndLogWorkout();
              }}
            >
              <Ionicons
                name="checkmark"
                size={25}
                color={Colors[colorTheme].iconDefault}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  addExerciseButton: {
    alignSelf: "center",
  },
  cancelWorkoutModalContainer: {
    width: "65%",
    aspectRatio: 2 / 1,
  },
  cancelWorkoutModalTitle: {
    fontSize: 20,
    fontWeight: "900",
  },
});

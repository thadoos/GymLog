import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../../constants/Colors";
import { useAppSettingStore } from "../../../store/appSettings";
import { useWorkoutStore } from "../../../store/workoutState";

const profile = () => {
  const colorTheme = useAppSettingStore((state) => state.theme);
  const workoutActive: boolean = useWorkoutStore((state) => workoutActive);
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorTheme].background },
      ]}
    >
      <Text style={{ fontSize: 14 }}>Workout Active: {workoutActive}</Text>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});


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

const NewExerciseList = () => {
  // const theme = useAppSettingStore(state=>state.theme)
  const { theme } = useAppSettingStore();

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: Colors[theme].background,
      }}
    >
      <View style={[styles.container]}></View>{" "}
    </View>
  );
};

export default NewExerciseList;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

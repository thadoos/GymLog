import { View, Text, StyleSheet, useColorScheme } from "react-native";
import React from "react";
import Colors from "../../../constants/Colors";
import { useAppSettingStore } from "../../../store/appSettings";
import EnhancedExerciseFlatList from "../../../components/EnhancedExerciseFlatList";
import { useAppState } from "../../../store/appState";
import EnhancedExerciseDetailsModal from "../../../components/EnhancedExerciseDetailsModal";

const ViewExercises = () => {
  const { theme } = useAppSettingStore();
  const {
    fullExerciseDetailsPopupVisible,
    setFullExerciseDetailsPopupVisible,
  } = useAppState();
  return (
    <View
      style={[styles.container, { backgroundColor: Colors[theme].background }]}
    >
      {/* // TODO: Should add an option to toggle whether to show just name or with all details.*/}
      {/* // !  Perhaps the block will not open a separate thing but just extend at the bottom to show the details */}
      <View style={styles.subContainer}>
        <EnhancedExerciseFlatList
          onExercisePress={setFullExerciseDetailsPopupVisible}
          showExpandExerciseInfoButton={false}
        />

        {fullExerciseDetailsPopupVisible !== null ? (
          <EnhancedExerciseDetailsModal
            exercise={fullExerciseDetailsPopupVisible}
          />
        ) : null}
      </View>
    </View>
  );
};

export default ViewExercises;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  subContainer: {
    width: "90%",
    flex: 1,
  },
});

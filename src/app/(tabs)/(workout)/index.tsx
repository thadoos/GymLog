import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";

import { RepAndWeightRowTextInput } from "../../../components/Workout/RepAndWeightRowTextInput";

import { CancelWorkoutModal } from "../../../components/Workout/CancelWorkoutModal";
import { ExerciseOptionsModal } from "../../../components/Workout/ExerciseOptionsModal";

import Colors from "../../../constants/Colors";
import { useWorkoutStore, exerciseMap } from "../../../store/workoutState";
import { useAppSettingStore } from "../../../store/appSettings";
import { useAppState } from "../../../store/appState";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const getExerciseName = (id: number): string => {
  return exerciseMap.get(id)?.name ?? "Cannot Fetch";
};
export const getExerciseTwoSided = (id: number): boolean => {
  return exerciseMap.get(id)?.twoSided ?? true;
};

export const getExerciseNotes = (id: number): string => {
  return exerciseMap.get(id)?.notes ?? "";
};

const index = () => {
  const colorTheme = useAppSettingStore((state) => state.theme);
  const exerciseList = useWorkoutStore((state) => state.workoutExercises);
  const changeRepWithIndex = useWorkoutStore(
    (state) => state.changeRepWithIndex,
  );
  const changeWeightWithIndex = useWorkoutStore(
    (state) => state.changeWeightWithIndex,
  );
  const addSetToExercise = useWorkoutStore((state) => state.addSetToExercise);

  const cancelWorkoutModalVisible = useAppState(
    (state) => state.cancelWorkoutModalVisible,
  );
  const exerciseOptionsModalVisible = useAppState(
    (state) => state.exerciseOptionsModalVisible,
  );
  const setExerciseOptionsModalVisible = useAppState(
    (state) => state.setExerciseOptionsModalVisible,
  );
  const router = useRouter();

  return (
    <View style={[{ flex: 1, backgroundColor: Colors[colorTheme].background }]}>
      <View style={styles.container}>
        <FlatList
          ListFooterComponent={
            <TouchableOpacity
              style={[
                styles.addExerciseButton,
                {
                  backgroundColor: Colors[colorTheme].addExerciseButton,
                  borderColor: Colors[colorTheme].iconDefault,
                },
              ]}
              onPress={() => router.push("AddExerciseScreen")}
            >
              <Ionicons
                name="add-outline"
                size={25}
                color={Colors[colorTheme].iconDefault}
              />
              <Text
                style={[
                  styles.addExerciseText,
                  { color: Colors[colorTheme].text },
                ]}
              >
                Add Exercise
              </Text>
            </TouchableOpacity>
          }
          ListFooterComponentStyle={{
            alignSelf: "center",
            paddingBottom: 10,
          }}
          style={{ width: "100%" }}
          // estimatedItemSize={2}
          showsVerticalScrollIndicator={false}
          data={exerciseList}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.exerciseBlock,
                { backgroundColor: Colors[colorTheme].exerciseBlockBackground },
              ]}
            >
              <View style={styles.topBarContainer}>
                {/* <Image style={styles.exerciseImage} source={require('../../../../assets/exerciseIcons/benchPress.png')} /> */}
                <View style={styles.topBarDetailsBlock}>
                  <Text
                    style={[
                      styles.exerciseName,
                      { color: Colors[colorTheme].text },
                    ]}
                  >
                    {getExerciseName(item.id)}
                  </Text>
                  {getExerciseTwoSided(item.id) ? null : (
                    <Text
                      style={[
                        styles.exerciseDesc,
                        { color: Colors[colorTheme].text },
                      ]}
                    >
                      Enter Weight for One Side
                    </Text>
                  )}
                  {getExerciseNotes(item.id) !== "" ? (
                    <View style={[styles.exerciseDetailBlock]}>
                      <Text
                        style={[
                          styles.exerciseDetailsKeyword,
                          { color: Colors[colorTheme].text },
                        ]}
                      >
                        Notes:
                      </Text>
                      <Text
                        style={[
                          styles.exerciseDetailsDesc,
                          { color: Colors[colorTheme].text },
                        ]}
                      >
                        {getExerciseNotes(item.id)}
                      </Text>
                    </View>
                  ) : null}
                </View>

                <TouchableOpacity
                  style={styles.exerciseOptionsButton}
                  onPress={() => {
                    setExerciseOptionsModalVisible(index);
                  }}
                >
                  <Ionicons
                    name="menu"
                    size={25}
                    color={Colors[colorTheme].iconDefault}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.detailsBlock}>
                <View
                  style={[
                    styles.setRepsWeightHeaderContainer,
                    { borderColor: Colors[colorTheme].text },
                  ]}
                >
                  <Text
                    style={[
                      styles.setHeader,
                      { color: Colors[colorTheme].text },
                    ]}
                  >
                    SET
                  </Text>
                  <Text
                    style={[
                      styles.repsWeightHeader,
                      { color: Colors[colorTheme].text },
                    ]}
                  >
                    REPS
                  </Text>
                  <Text
                    style={[
                      styles.repsWeightHeader,
                      { color: Colors[colorTheme].text },
                    ]}
                  >
                    WEIGHT (kg)
                  </Text>

                  <View style={styles.invisibileHeaderCell}></View>
                </View>

                {item.sets.map(({ reps, weight }, curSetIndex) => (
                  <RepAndWeightRowTextInput
                    key={curSetIndex}
                    index={index}
                    curSetIndex={curSetIndex}
                    reps={reps}
                    weight={weight}
                  />
                ))}

                <TouchableOpacity
                  style={[
                    styles.addSetButton,
                    { backgroundColor: Colors[colorTheme].addExerciseButton },
                  ]}
                  onPress={() => addSetToExercise(index)}
                >
                  <Ionicons
                    name="add-outline"
                    size={25}
                    color={Colors[colorTheme].iconDefault}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      {cancelWorkoutModalVisible ? <CancelWorkoutModal /> : null}
      {exerciseOptionsModalVisible !== -1 ? <ExerciseOptionsModal /> : null}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    // flex:1,
    width: "90%",
    // justifyContent: 'space-between',
    alignItems: "center",
    paddingVertical: 10,
  },
  addExerciseButton: {
    flexDirection: "row",
    // width: '50%',
    // height: 30,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    // borderWidth: 1,
  },
  addExerciseText: {
    marginLeft: 10,
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "700",
    // textAlign: 'center',
  },
  exerciseBlock: {
    flexDirection: "column",
    // flex: 1,
    // width: '100%',
    // height: '100%',
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    // flexGrow: 1,
    // paddingRight: 10,
  },
  exerciseImage: {
    width: 85,
    height: 85,
    marginRight: 25,
    padding: 5,
    borderRadius: 15,
  },
  topBarContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 15,

    justifyContent: "space-between",
    alignItems: "center",
    // borderWidth: 1,
  },
  topBarDetailsBlock: {
    flexDirection: "column",
    // width: '100%',
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  exerciseName: {
    fontSize: 20,
    fontWeight: "800",
  },
  exerciseDesc: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: "300",
  },

  exerciseOptionsButton: {
    marginLeft: 10,
    // alignSelf: 'flex-start'
  },
  exerciseDetailBlock: {
    width: "100%",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },

  exerciseDetailsKeyword: {
    fontSize: 14,
    fontWeight: "700",
    // marginTop: 3,
    // marginRight: 5,
  },
  exerciseDetailsDesc: {
    width: "100%",
    fontSize: 14,
    fontWeight: "300",
    marginTop: 3,
  },
  detailsBlock: {
    flexDirection: "column",
    flex: 1,
    // height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  setRepsWeightHeaderContainer: {
    flexDirection: "row",
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  setHeader: {
    width: "15%",
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  repsWeightBorderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderLeftWidth: 1,
  },
  repsWeightHeader: {
    flex: 1,
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
  invisibileHeaderCell: {
    width: "10%",
  },

  addSetButton: {
    // padding: 7,
    marginTop: 10,
    width: 35,
    height: 35,
    borderRadius: 18,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});


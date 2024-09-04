import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
import Ionicons from "@expo/vector-icons/Ionicons";
import NewExerciseDetailLine from "./NewExerciseDetailLine";
import { useAppState } from "../store/appState";
import Colors from "../constants/Colors";
import { useAppSettingStore } from "../store/appSettings";

import { of as of$ } from "rxjs";
import { switchMap } from "rxjs/operators";
import { compose, withObservables } from "@nozbe/watermelondb/react";
import Exercise from "../models/Exercise";
import TypeModel from "../models/TypeModel";
import Muscle from "../models/Muscle";
import MuscleGroup from "../models/MuscleGroup";
import Equipment from "../models/Equipment";
import ExerciseMuscle from "../models/ExerciseMuscle";
import ExerciseMuscleGroup from "../models/ExerciseMuscleGroup";
import { Relation } from "@nozbe/watermelondb";

interface ExerciseDetailLineProps {
  keyword: string;
  description: string;
}
const ExerciseDetailLine = ({
  keyword,
  description,
}: ExerciseDetailLineProps) => {
  const { theme } = useAppSettingStore();

  return (
    <View style={styles.detailLineContainer}>
      <Text style={[styles.keywordText, { color: Colors[theme].text }]}>
        {keyword}:
      </Text>
      <Text style={[styles.descText, { color: Colors[theme].text }]}>
        {description}
      </Text>
    </View>
  );
};

interface ExerciseDetailsModalProps {
  exercise: Exercise;
  exerciseType: TypeModel;
  equipment: Equipment;
  muscleRecords: Muscle[];
  muscleGroupRecords: MuscleGroup[];
}
const ExerciseDetailsModal = ({
  exercise,
  exerciseType,
  equipment,
  muscleRecords,
  muscleGroupRecords,
}: ExerciseDetailsModalProps) => {
  const { theme } = useAppSettingStore();
  const setFullExerciseDetailsPopupVisible = useAppState(
    (state) => state.setFullExerciseDetailsPopupVisible,
  );

  var primaryMuscleGroups: Map<string, string[]> = new Map();
  var secondaryMuscleGroups: Map<string, string[]> = new Map();

  for (const muscleRecord of muscleRecords) {
    if (muscleRecord.isPrimary) {
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={exercise !== null}
      onRequestClose={() => {
        setFullExerciseDetailsPopupVisible(null);
      }}
    >
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        intensity={30}
        style={styles.centeredView}
      >
        <View
          style={[
            styles.mainContainer,
            { backgroundColor: Colors[theme].modalBackground },
          ]}
        >
          <View style={styles.topRow}>
            <Text style={[styles.nameText, { color: Colors[theme].text }]}>
              {exercise.name}
            </Text>

            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setFullExerciseDetailsPopupVisible(null)}
            >
              <Ionicons
                name="close"
                size={25}
                color={Colors[theme].iconDefault}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.detailLineContainer}>
            <Text style={[styles.descText, { color: Colors[theme].text }]}>
              {exercise.isTwoSideWeight
                ? "Indicated weight is for both sides combined"
                : "Indicated weight is just for one side"}
            </Text>
          </View>

          <ExerciseDetailLine
            keyword={"Type"}
            description={exerciseType.name}
          />
          <ExerciseDetailLine
            keyword={"Equipment"}
            description={equipment.name}
          />
        </View>
      </BlurView>
    </Modal>
  );
};

const enhance = compose(
  withObservables(["exercise"], ({ exercise }) => ({
    exercise,
    exerciseType: exercise.exerciseType,
    equipment: exercise.equipment,
    // exerciseMuscles: exercise.exerciseMuscles,
    // exerciseMuscleGroups: exercise.exerciseMuscleGroups,
    muscles: exercise.muscles,
    muscleGroups: exercise.muscleGroups,
    // muscles: exercise.exerciseMuscles
    //   .observe()
    //   .pipe(
    //     switchMap((exerciseMuscle: ExerciseMuscle) =>
    //       exerciseMuscle.muscle.observe(),
    //     ),
    //   ),
    // muscleGroups: exercise.exerciseMuscles
    //   .observe()
    //   .pipe(
    //     switchMap((exerciseMuscleGroup: ExerciseMuscleGroup) =>
    //       exerciseMuscleGroup.muscleGroup.observe(),
    //     ),
    //   ),
  })),
  // withObservables(
  //   ["exerciseMuscles", "exerciseMuscleGroups"],
  //   ({ exerciseMuscles, exerciseMuscleGroups }) => ({
  //     muscles: exerciseMuscles.muscle,
  //     muscleGroups: exerciseMuscleGroups.muscleGroup,
  //   }),
  // ),
);
const EnhancedExerciseDetailsModal = enhance(ExerciseDetailsModal);
export default EnhancedExerciseDetailsModal;

const styles = StyleSheet.create({
  centeredView: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    width: "85%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
  },
  topRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "800",
    flex: 1,
  },
  closeModalButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  detailLineContainer: {
    width: "100%",
    flexDirection: "row",
    borderColor: "red",
    marginBottom: 5,
  },
  keywordText: {
    fontSize: 16,
    fontWeight: "700",
    marginRight: 10,
  },
  descText: {
    fontSize: 16,
    fontWeight: "300",
  },
});

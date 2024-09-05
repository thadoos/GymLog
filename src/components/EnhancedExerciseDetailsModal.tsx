import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BlurView } from "expo-blur";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppState } from "../store/appState";
import Colors from "../constants/Colors";
import { useAppSettingStore } from "../store/appSettings";

import { compose, withObservables } from "@nozbe/watermelondb/react";
import Exercise from "../models/Exercise";
import TypeModel from "../models/TypeModel";
import Muscle from "../models/Muscle";
import MuscleGroup from "../models/MuscleGroup";
import Equipment from "../models/Equipment";
import { getMuscleGroupFromMuscle } from "../models";

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

const SubMuscleView = ({ arrayToUse }) => {
  const { theme } = useAppSettingStore();
  return (
    <FlatList
      scrollEnabled={false}
      style={styles.muscleBlockFlatList}
      data={arrayToUse}
      renderItem={({ item }) => (
        <View style={styles.muscleBlock}>
          <Text
            style={[styles.muscleGroupNameText, { color: Colors[theme].text }]}
          >
            {item[0]}
          </Text>
          <FlatList
            scrollEnabled={false}
            style={styles.subMuscleBlock}
            data={item[1]}
            renderItem={({ item }) => (
              <Text
                style={[styles.muscleNameText, { color: Colors[theme].text }]}
              >
                {item}
              </Text>
            )}
          />
        </View>
      )}
    />
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

  const [primaryMusclesArray, setPrimaryMusclesArray] = useState([]);
  const [secondaryMusclesArray, setSecondaryMusclesArray] = useState([]);

  // useEffect(() => {
  //   setPrimaryMusclesArray(Array.from(primaryMuscleGroups));
  //   console.log(primaryMusclesArray);
  // }, [primaryMuscleGroups]);
  //
  // useEffect(() => {
  //   setSecondaryMusclesArray(Array.from(secondaryMuscleGroups));
  //   console.log(secondaryMusclesArray);
  // }, [secondaryMuscleGroups]);

  useEffect(() => {
    const sortData = async () => {
      const promises = muscleRecords.map(async (muscleRecord) => {
        const muscleGroupName = await getMuscleGroupFromMuscle(muscleRecord);
        if (muscleRecord.isPrimary) {
          if (primaryMuscleGroups.has(muscleGroupName)) {
            let tempArr = primaryMuscleGroups.get(muscleGroupName);
            tempArr.push(muscleRecord.name);
          } else {
            primaryMuscleGroups.set(muscleGroupName, [muscleRecord.name]);
          }
        } else {
          if (secondaryMuscleGroups.has(muscleGroupName)) {
            let tempArr = secondaryMuscleGroups.get(muscleGroupName);
            tempArr.push(muscleRecord.name);
          } else {
            secondaryMuscleGroups.set(muscleGroupName, [muscleRecord.name]);
          }
        }
      });
      await Promise.all(promises);
    };
    const prepData = async () => {
      await sortData();
      setPrimaryMusclesArray(Array.from(primaryMuscleGroups));
      setSecondaryMusclesArray(Array.from(secondaryMuscleGroups));
    };
    prepData();
  }, []);

  // useEffect(() => {
  //   console.log(primaryMusclesArray);
  // }, [primaryMusclesArray]);
  // useEffect(() => {
  //   console.log(secondaryMusclesArray);
  // }, [secondaryMusclesArray]);

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
            {
              backgroundColor: Colors[theme].modalBackground,
              shadowColor: Colors[theme].shadow,
            },
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

          <View
            style={[
              styles.mainMuscleContainer,
              {
                backgroundColor: Colors[theme].modalBackground,
                shadowColor: Colors[theme].shadow,
              },
              ,
            ]}
          >
            <Text
              style={[
                styles.muscleBlockHeaderText,
                { color: Colors[theme].text },
              ]}
            >
              Muscles Used
            </Text>
            <View style={styles.subMuscleContainer}>
              <SubMuscleView arrayToUse={primaryMusclesArray} />
              <SubMuscleView arrayToUse={secondaryMusclesArray} />
            </View>
          </View>

          {exercise.note !== "" ? (
            <View
              style={[
                styles.notesContainer,
                {
                  backgroundColor: Colors[theme].modalBackground,
                  shadowColor: Colors[theme].shadow,
                },
              ]}
            >
              <Text
                style={[
                  styles.keywordText,
                  {
                    color: Colors[theme].text,
                    marginBottom: 5,
                  },
                ]}
              >
                Notes
              </Text>
              <ScrollView style={[styles.notesScrollView, {}]}>
                <Text style={[styles.notesText, { color: Colors[theme].text }]}>
                  {exercise.note}
                </Text>
              </ScrollView>
            </View>
          ) : null}
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
    muscleRecords: exercise.muscles,
    muscleGroupRecords: exercise.muscleGroups,
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
    borderRadius: 20,
    shadowRadius: 5,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 0 },
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
  mainMuscleContainer: {
    flexDirection: "column",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    shadowRadius: 5,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 0 },
  },
  subMuscleContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  muscleBlockFlatList: {
    width: "48%",
  },
  muscleBlock: {
    width: "100%",
  },
  muscleBlockHeaderText: {
    fontSize: 18,
    fontWeight: "700",
    textDecorationLine: "underline",
    marginBottom: 5,
  },
  subMuscleBlock: {
    paddingLeft: 15,
  },
  muscleGroupNameText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 5,
  },
  muscleNameText: {
    fontSize: 16,
    fontWeight: "300",
  },
  notesContainer: {
    width: "100%",
    // NOTE: Not sure whether to limit the maxHeight or not
    // maxHeight: 150,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    shadowRadius: 5,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 0 },
  },
  notesScrollView: {
    width: "100%",
  },
  notesText: {
    fontSize: 16,
    fontWeight: "300",
  },
});

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import exercisesData from "../../assets/exercisesData.json";
import Colors from "../constants/Colors";
import { useAppSettingStore } from "../store/appSettings";
import { useWorkoutStore } from "../store/workoutState";
import { useRouter } from "expo-router";
import { ExerciseDetail } from "../store/oldInterfaces";

// TODO: Remove this component completely

// TODO: Clean this - move it somewhere else. Things in question up till next TODO
export type ExerciseDetailOptions =
  | "id"
  | "name"
  | "twoSided"
  | "imageName"
  | "type"
  | "primaryGeneralMuscleGroup"
  | "secondaryGeneralMuscleGroup"
  | "primarySpecificMuscleGroup"
  | "secondarySpecificMuscleGroup"
  | "equipment"
  | "notes";

const ExerciseListOptions: string[] = [
  "primarySpecificMuscleGroup",
  "secondarySpecificMuscleGroup",
  "notes",
];

interface ExerciseDetailProps {
  keyword: string;
  description: ExerciseDetailOptions;
  item: ExerciseDetail;
}

interface ExerciseListProps {
  details: Array<{ keyword: string; description: ExerciseDetailOptions }>;
  onExercisePressAddExercise: boolean;
}
// TODO: Up to here

export const ExerciseDetailLine = ({
  keyword,
  description,
  item,
}: ExerciseDetailProps) => {
  let colorTheme = useAppSettingStore((state) => state.theme);
  return (
    <View
      style={[
        styles.exerciseDetailBlock,
        {
          flexDirection: ExerciseListOptions.includes(description)
            ? "column"
            : "row",
          flexWrap: ExerciseListOptions.includes(description)
            ? "wrap"
            : "nowrap",
        },
      ]}
    >
      <Text
        style={[
          styles.exerciseDetailsKeyword,
          { color: Colors[colorTheme].text },
        ]}
      >
        {keyword}:
      </Text>

      {Array.isArray(item[description]) ? (
        <Text
          style={[
            styles.exerciseDetailsDesc,
            { color: Colors[colorTheme].text },
          ]}
        >
          {(item[description] as string[]).join(", ")}
        </Text>
      ) : (
        <Text
          style={[
            styles.exerciseDetailsDesc,
            { color: Colors[colorTheme].text },
          ]}
        >
          {item[description]}
        </Text>
      )}
    </View>
  );
};

export default function ExerciseList({
  details,
  onExercisePressAddExercise,
}: ExerciseListProps) {
  let colorTheme = useAppSettingStore((state) => state.theme);

  let addExercise = useWorkoutStore((state) => state.addExercise);
  const router = useRouter();

  let addExerciseButtonHandler = (exerciseID: number) => {
    addExercise(exerciseID);
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Can replace FlatList with FlashList - Just need to include the estimatedItemSize. Previous problem was FlashList not re-rendering when theme change*/}
      {/* TODO Add animation to the scrolling */}
      <FlatList
        // estimatedItemSize={2}
        showsVerticalScrollIndicator={false}
        data={exercisesData.exercises}
        // keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          // onExercisePress && onExercisePress(item.id)
          <TouchableOpacity
            onPress={() => {
              onExercisePressAddExercise
                ? addExerciseButtonHandler(item.id)
                : null;
            }}
            key={item.id}
            style={[
              styles.exerciseBlock,
              { backgroundColor: Colors[colorTheme].exerciseBlockBackground },
            ]}
          >
            {/* <Image style={styles.exerciseImage} source={require('../../assets/exerciseIcons/benchPress.png')} /> */}
            <View style={styles.detailsBlock}>
              <Text
                style={[
                  styles.exerciseName,
                  { color: Colors[colorTheme].text },
                ]}
              >
                {item.name}
              </Text>

              {details.map(({ keyword, description }) => {
                return item[description] !== "" ? (
                  <ExerciseDetailLine
                    key={description}
                    keyword={keyword}
                    description={description}
                    item={item}
                  />
                ) : null;
                // return <ExerciseDetailLine keyword={keyword} description={item[description as keyof typeof item]} />
              })}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    // paddingTop: 20,
  },

  exerciseBlock: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    flexDirection: "row",
    flexGrow: 1,
    paddingRight: 10,
  },
  exerciseImage: {
    width: 85,
    height: 85,
    marginRight: 25,
    padding: 5,
    borderRadius: 15,
  },
  detailsBlock: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    flex: 1,
    flexGrow: 1,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: "800",
  },

  exerciseDetailBlock: {
    width: "100%",
  },

  exerciseDetailsKeyword: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 3,
    marginRight: 5,
  },
  exerciseDetailsDescListContainer: {
    flexDirection: "column",
  },

  exerciseDetailsDesc: {
    width: "100%",
    fontSize: 14,
    fontWeight: "300",
    marginTop: 3,
  },
});

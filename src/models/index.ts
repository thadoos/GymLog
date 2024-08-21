import { Database } from "@nozbe/watermelondb";
import { Platform } from "react-native";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import schema from "./schema";
import migrations from "./migrations";
import Equipment from "./Equipment";
import Exercise from "./Exercise";
import ExerciseMuscle from "./ExerciseMuscle";
import ExerciseMuscleGroup from "./ExerciseMuscleGroup";
import Muscle from "./Muscle";
import MuscleGroup from "./MuscleGroup";
import Set from "./Set";
import User from "./User";
import Workout from "./Workout";
import WorkoutExercise from "./WorkoutExercise";
import TypeModel from "./TypeModel";

import muscleAndMuscleGroupData from "../../assets/muscleAndMuscleGroupData.json";
import exerciseTypes from "../../assets/exerciseTypes.json";
import { useAppSettingStore } from "../store/appSettings";

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  migrations,
  // (optional database name or file system path)
  // dbName: 'myapp',
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  jsi: true /* Platform.OS === 'ios' */,
  // (optional, but you should implement this method)
  onSetUpError: (error) => {
    console.warn("WatermelonDB setup error");
    // Database failed to load -- offer the user to reload the app or log out
  },
});

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [
    TypeModel,
    Equipment,
    Exercise,
    ExerciseMuscle,
    ExerciseMuscleGroup,
    Muscle,
    MuscleGroup,
    Set,
    User,
    Workout,
    WorkoutExercise,
  ],
});

export const handleFirstLaunchLoadData = () => {
  loadDefaultMuscleGroupsWithMuscles();
  loadDefaultTypes();
};

export const loadDefaultMuscleGroupsWithMuscles = async () => {
  try {
    await database.write(async () => {
      // NOTE: Muscle Group and muscle init
      for (const muscleGroupWithMuscle of muscleAndMuscleGroupData.muscleGroups) {
        console.log(muscleGroupWithMuscle.name);
        const newMuscleGroup = await database
          .get<MuscleGroup>("muscle_groups")
          .create((muscleGroup: MuscleGroup) => {
            muscleGroup.name = muscleGroupWithMuscle.name;
            muscleGroup.isPrimary = true;
          });

        for (const muscleEntry of muscleGroupWithMuscle.muscles) {
          console.log("Muscle: " + muscleEntry);
          await database.get<Muscle>("muscles").create((muscle: Muscle) => {
            muscle.name = muscleEntry;
            muscle.isPrimary = true;
            muscle.muscleGroup.set(newMuscleGroup);
          });
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export const loadDefaultTypes = async () => {
  try {
    await database.write(async () => {
      for (const exerciseType of exerciseTypes.types) {
        await database.get<TypeModel>("types").create((type: TypeModel) => {
          type.name = exerciseType;
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export const resetAllWatermelonDB = () => {
  resetMuscleGroupsAndMuscles();
  resetExerciseTypes();
};

export const resetMuscles = async () => {
  await database.write(async () => {
    const allmuscles = await database.get<Muscle>("muscles").query().fetch();
    await database.batch(
      ...allmuscles.map((muscle) => muscle.prepareDestroyPermanently()),
    );
  });
};

export const resetMuscleGroups = async () => {
  await database.write(async () => {
    const allMuscleGroups = await database
      .get<MuscleGroup>("muscle_groups")
      .query()
      .fetch();
    await database.batch(
      ...allMuscleGroups.map((muscleGroup) =>
        muscleGroup.prepareDestroyPermanently(),
      ),
    );
  });
};

export const resetMuscleGroupsAndMuscles = () => {
  resetMuscles();
  resetMuscleGroups();
  console.warn("Removed all muscles and muscle groups");
};

export const resetExerciseTypes = async () => {
  await database.write(async () => {
    const allExerciseTypes = await database
      .get<TypeModel>("types")
      .query()
      .fetch();
    await database.batch(
      ...allExerciseTypes.map((exerciseType) =>
        exerciseType.prepareDestroyPermanently(),
      ),
    );
  });
};

export async function getAllMuscles() {
  const musclesCollection = database.get<Muscle>("muscles");
  const allMuscles = await musclesCollection.query().fetch();
  return allMuscles;
}

export async function getAllMuscleGroups() {
  const muscleGroupsCollection = database.get<MuscleGroup>("muscle_groups");
  const allMuscleGroups = await muscleGroupsCollection.query().fetch();
  return allMuscleGroups;
}

export async function getAllMuscleGroupsWithMuscles() {
  const muscleGroups = await getAllMuscleGroups();
  console.log(muscleGroups);

  const muscleGroupWithMuscle = await Promise.all(
    muscleGroups.map(async (group) => {
      const muscles = await group.muscles.fetch();
      return {
        id: group.id,
        name: group.name,
        muscles: muscles.map((muscle) => ({
          id: muscle.id,
          name: muscle.name,
        })),
      };
    }),
  );

  return muscleGroupWithMuscle;
}

export async function getAllExerciseTypes() {
  const typeCollection = database.get<TypeModel>("types");
  const allExerciseTypes = await typeCollection.query().fetch();
  return allExerciseTypes;
}

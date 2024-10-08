import { Database, Q } from "@nozbe/watermelondb";
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
import equipmentData from "../../assets/equipmentList.json";
import exerciseData from "../../assets/WatermelonDBExerciseData.json";
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
export const database = new Database({
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

// NOTE: General Purpose Functions
export function handleFirstLaunchLoadData() {
  loadDefaultMuscleGroupsWithMuscles();
  loadDefaultTypes();
  loadDefaultEquipment();
  loadDefaultExercises();
}

export function resetAllWatermelonDB() {
  resetMuscleGroupsAndMuscles();
  resetExerciseTypes();
  resetEquipment();
  resetExercises();
}

// NOTE: Muscle Groups and Muscles
export async function loadDefaultMuscleGroupsWithMuscles() {
  try {
    await database.write(async () => {
      // Muscle Group and muscle init
      for (const isPrimaryToUse of [true, false]) {
        for (const muscleGroupWithMuscle of muscleAndMuscleGroupData.muscleGroups) {
          // console.log(muscleGroupWithMuscle.name);
          const newMuscleGroup = await database
            .get<MuscleGroup>("muscle_groups")
            .create((muscleGroup: MuscleGroup) => {
              muscleGroup.name = muscleGroupWithMuscle.name;
              muscleGroup.isPrimary = isPrimaryToUse;
            });
          // Muscle init for each muscle group
          for (const muscleEntry of muscleGroupWithMuscle.muscles) {
            // console.log("Muscle: " + muscleEntry);
            await database.get<Muscle>("muscles").create((muscle: Muscle) => {
              muscle.name = muscleEntry;
              muscle.isPrimary = isPrimaryToUse;
              muscle.muscleGroup.set(newMuscleGroup);
            });
          }
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
}

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

export async function getMuscleGroupFromMuscle(muscle: Muscle) {
  let name = "";
  await muscle.muscleGroup
    .fetch()
    .catch((error) => console.error(error))
    .then((mg) => {
      if (mg) {
        name = mg.name;
      }
    });

  return name;
}

export async function getAllMuscleGroupsWithMuscles() {
  const muscleGroups = await getAllMuscleGroups();

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

export async function getMuscleIdFromName(muscleName: string): Promise<string> {
  try {
    const muscleObjects = await database
      .get<Muscle>("muscles")
      .query(Q.where("name", muscleName))
      .fetch();
    if (muscleObjects.length != 1) {
      console.error("Muscle not found");
      return "";
    }
    return muscleObjects[0].id;
  } catch (error) {
    console.error(error);
  }
}

export async function getMuscleGroupIdFromName(muscleGroupName: string) {
  try {
    const muscleGroupObjects = await database
      .get<MuscleGroup>("muscle_groups")
      .query(Q.where("name", muscleGroupName))
      .fetch();
    if (muscleGroupObjects.length != 1) {
      console.error("Muscle not found");
      return "";
    }
    return muscleGroupObjects[0].id;
  } catch (error) {
    console.error(error);
  }
}

export function resetMuscleGroupsAndMuscles() {
  resetMuscles();
  resetMuscleGroups();
  console.warn("Resetted muscle groups and muscle");
}

export async function resetMuscles() {
  await database.write(async () => {
    const allmuscles = await database.get<Muscle>("muscles").query().fetch();
    await database.batch(
      ...allmuscles.map((muscle) => muscle.prepareDestroyPermanently()),
    );
  });
}

export async function resetMuscleGroups() {
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
}

// NOTE: Exercise Type
export async function loadDefaultTypes() {
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
}

export async function getAllExerciseTypes() {
  const typeCollection = database.get<TypeModel>("types");
  const allExerciseTypes = await typeCollection.query().fetch();
  return allExerciseTypes;
}

// TODO: Maybe remove this function, don't think it will be used
export function getExerciseTypeFromExercise(exercise: Exercise): string {
  let exerciseType = "";
  const exerciseTypeObject = exercise.exerciseType
    .fetch()
    .then(
      (exerciseTypeEntry: TypeModel) => (exerciseType = exerciseTypeEntry.name),
    );
  // console.log("Exercise Type: " + exerciseType);
  return exerciseType;
}

export async function resetExerciseTypes() {
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
}

// NOTE: Equipment
export async function loadDefaultEquipment() {
  try {
    await database.write(async () => {
      for (const equipmentEntry of equipmentData.equipment) {
        await database
          .get<Equipment>("equipments")
          .create((equipment: Equipment) => {
            equipment.name = equipmentEntry;
          });
      }
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getAllEquipment() {
  const equipmentCollection = database.get<Equipment>("equipments");
  const equipmentList = await equipmentCollection.query().fetch();
  return equipmentList;
}

export async function resetEquipment() {
  await database.write(async () => {
    const allEquipment = await database
      .get<Equipment>("equipments")
      .query()
      .fetch();
    await database.batch(
      ...allEquipment.map((equipmentEntry) =>
        equipmentEntry.prepareDestroyPermanently(),
      ),
    );
  });
}

// NOTE: ExerciseMuscle
export async function loadExerciseMuscle(
  exercise: Exercise,
  muscleName: string,
  isPrimary: boolean,
) {
  try {
    const muscle = await database
      .get<Muscle>("muscles")
      .query(
        Q.and(Q.where("name", muscleName), Q.where("is_primary", isPrimary)),
      )

      .fetch()
      .catch((error) => {
        console.error(error);
      });

    database.write(async () => {
      await database
        .get<ExerciseMuscle>("exercise_muscles")
        .create((newExerciseMuscle: ExerciseMuscle) => {
          newExerciseMuscle.exercise.set(exercise);
          newExerciseMuscle.muscle.set(muscle[0]);
          // newExerciseMuscle.isPrimary = isPrimary;
        });
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getAllExerciseMuscles() {
  return await database.get<ExerciseMuscle>("exercise_muscles").query().fetch();
}

export async function getExercisesFromPrimaryMuscleName(muscleNames: string[]) {
  let muscleIDs: string[];
  muscleNames.forEach((muscleName) =>
    getMuscleIdFromName(muscleName).then((muscleID) =>
      muscleIDs.push(muscleID),
    ),
  );

  const foundExercises = await database
    .get<Exercise>("exercises")
    .query(
      Q.and(
        muscleIDs.map((muscleID) =>
          Q.on("exercise_muscles", "muscle_id", muscleID),
        ),
      ),
    )
    .fetch();

  return foundExercises;
}

export async function getExercisesFromPrimaryMuscleIDs(
  muscleIDs: string[],
): Promise<Exercise[]> {
  // const exerciseMuscleList = getAllExerciseMuscles();
  // const exerciseList = getAllExercises();

  // const muscleQueries = muscleIDs.map((muscleID) => {
  //   Q.on('exercise_muscles', 'muscle_id', muscleID)
  // })

  const foundExercises = await database
    .get<Exercise>("exercises")
    .query(
      Q.and(
        muscleIDs.map((muscleID) =>
          Q.on("exercise_muscles", "muscle_id", muscleID),
        ),
      ),
    )
    .fetch();

  return foundExercises;
}

// NOTE: ExerciseMuscleGroup
export async function loadExerciseMuscleGroup(
  exercise: Exercise,
  muscleGroupName: string,
  isPrimary: boolean,
) {
  try {
    const muscleGroup = await database
      .get<MuscleGroup>("muscle_groups")
      .query(
        Q.and(
          Q.where("name", muscleGroupName),
          Q.where("is_primary", isPrimary),
        ),
      )
      .fetch()
      .catch((error) => {
        console.error(error);
      });

    database.write(async () => {
      await database
        .get<ExerciseMuscleGroup>("exercise_muscle_groups")
        .create((newExerciseMuscleGroup: ExerciseMuscleGroup) => {
          newExerciseMuscleGroup.exercise.set(exercise);
          newExerciseMuscleGroup.muscleGroup.set(muscleGroup[0]);
          // newExerciseMuscleGroup.isPrimary = isPrimary;
        });
    });
  } catch (error) {
    console.error(error);
  }
}

// NOTE: Exercise
export async function loadDefaultExercises() {
  try {
    database.write(async () => {
      for (const exerciseEntry of exerciseData.exercises) {
        var equipmentRecord: Equipment;
        await database
          .get<Equipment>("equipments")
          .query(Q.where("name", exerciseEntry.equipment))
          .fetch()
          .catch((error) => console.error("Equipment Error: " + error))
          .then((equipmentRecords) => (equipmentRecord = equipmentRecords[0]));

        var typeRecord: TypeModel;
        await database
          .get<TypeModel>("types")
          .query(Q.where("name", exerciseEntry.type))
          .fetch()
          .catch((error) => console.error("TYPE ERROR: " + error))
          .then((typeRecords) => (typeRecord = typeRecords[0]));

        const newExercise = await database
          .get<Exercise>("exercises")
          .create((exercise) => {
            exercise.name = exerciseEntry.name;
            exercise.isTwoSideWeight = exerciseEntry.twoSided;
            exercise.note = exerciseEntry.notes;
            exercise.equipment.set(equipmentRecord);
            exercise.exerciseType.set(typeRecord);
          })
          .catch((error) => {
            console.error(error);
          });

        if (newExercise) {
          // Initialise ExerciseMuscleGroup
          for (const muscleGroupEntry of exerciseEntry.muscleGroups) {
            loadExerciseMuscleGroup(
              newExercise,
              muscleGroupEntry.name,
              muscleGroupEntry.isPrimary,
            );
          }

          // Initialise ExerciseMuscle
          for (const muscleEntry of exerciseEntry.muscles) {
            loadExerciseMuscle(
              newExercise,
              muscleEntry.name,
              muscleEntry.isPrimary,
            );
          }
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
}

export async function resetExercises() {
  const allExercises = await database
    .get<Exercise>("exercises")
    .query()
    .fetch();
  await database.batch(
    ...allExercises.map((exerciseEntry) =>
      exerciseEntry.prepareDestroyPermanently(),
    ),
  );
}

export async function getAllExercises() {
  return await database.get<Exercise>("exercises").query().fetch();
}

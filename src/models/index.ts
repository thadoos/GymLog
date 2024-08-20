import { Platform } from 'react-native'
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import schema from './schema'
import migrations from './migrations'
import Equipment from './Equipment'
import Exercise from './Exercise'
import ExerciseMuscle from './ExerciseMuscle'
import ExerciseMuscleGroup from './ExerciseMuscleGroup'
import Muscle from './Muscle'
import MuscleGroup from './MuscleGroup'
import Set from './Set'
import User from './User'
import Workout from './Workout'
import WorkoutExercise from './WorkoutExercise'

import muscleAndMuscleGroupData from '../../assets/muscleAndMuscleGroupData.json'
import { useAppSettingStore } from '../store/appSettings'

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  migrations,
  // (optional database name or file system path)
  // dbName: 'myapp',
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  jsi: true, /* Platform.OS === 'ios' */
  // (optional, but you should implement this method)
  onSetUpError: error => {
    // Database failed to load -- offer the user to reload the app or log out
  }
})

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [
    Equipment,
    Exercise,
    ExerciseMuscle,
    ExerciseMuscleGroup,
    Muscle,
    MuscleGroup,
    Set,
    User,
    Workout,
    WorkoutExercise
  ],
})


export const handleFirstLaunchLoadData = async () => {
  await database.write(async () => {
    muscleAndMuscleGroupData.muscleGroups.map(async (muscleGroupWithMuscle) => {
      const newMuscleGroup = await database.get<MuscleGroup>('muscle_groups').create((muscleGroup: MuscleGroup)=> {
        muscleGroup.name = muscleGroupWithMuscle.name
        muscleGroup.isPrimary = true
      })

      muscleGroupWithMuscle.muscles.map(async muscleEntry => {
        await database.get<Muscle>('muscle').create((muscle: Muscle) => {
          muscle.name = muscleEntry
          muscle.isPrimary = true
          muscle.muscleGroup.set(newMuscleGroup)
        })
      })
    })
  })
}

export const hardDeleteAllMuscles = async () => {
  await database.write(async () => {
    const allmuscles = await database.get<Muscle>('muscles').query().fetch()
    await database.batch(
      ...allmuscles.map(muscle => muscle.prepareDestroyPermanently())
    )
  })
}

export const hardDeleteAllMuscleGroups = async () => {
  await database.write(async () => {
    const allMuscleGroups = await database.get<MuscleGroup>('muscle_groups').query().fetch()
    await database.batch(
      ...allMuscleGroups.map(muscleGroup => muscleGroup.prepareDestroyPermanently())
    )
  })
}

export const hardDeleteAllMusclesAndMuscleGroups = () => {
  hardDeleteAllMuscles();
  hardDeleteAllMuscleGroups();
  console.warn("Removed all muscles and muscle groups");
}

export async function getAllMuscles(){
  const musclesCollection = database.get<Muscle>('muscles');
  const allMuscles = await musclesCollection.query().fetch();
  return allMuscles;
}

export async function getAllMuscleGroups(){
  const muscleGroupsCollection = database.get<MuscleGroup>('muscle_groups');
  const allMuscleGroups = await muscleGroupsCollection.query().fetch();
  return allMuscleGroups;
}

export async function getAllMuscleGroupsWithMuscles(){
  const muscleGroups = await getAllMuscleGroups();

  const muscleGroupWithMuscle = await Promise.all(
    muscleGroups.map(async (group) => {
      const muscles = await group.muscles.fetch()
      return {
        id: group.id,
        name: group.name,
        muscles: muscles.map(muscle => ({
          id: muscle.id,
          name: muscle.name,
        }))
      }
    })
  )

  return muscleGroupWithMuscle;
}

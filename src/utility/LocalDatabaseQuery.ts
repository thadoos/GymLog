import { Database, Q } from '@nozbe/watermelondb'

import Muscle from '../models/Muscle'
import MuscleGroup from '../models/MuscleGroup'


export async function getAllMuscles(database: Database){
  const musclesCollection = database.get<Muscle>('muscles');
  const allMuscles = await musclesCollection.query().fetch();
  return allMuscles;
}

export async function getAllMuscleGroups(database: Database){
  const muscleGroupsCollection = database.get<MuscleGroup>('muscle_groups');
  const allMuscleGroups = await muscleGroupsCollection.query().fetch();
  return allMuscleGroups;
}

export async function getAllMuscleGroupsWithMuscles(database: Database){
  const muscleGroups = await getAllMuscleGroups(database);

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

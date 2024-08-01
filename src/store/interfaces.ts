

export interface Exercise {
  id: number,
  // name: string,
  sets: Array<WorkoutBasicSet>,
  // sets: Array<WorkoutBasicSet | WorkoutSuperSet>, // TODO Implement superset later
  restStartTime: number,
  restEndTime: number,
  restDuration: number,
}

export interface WorkoutBasicSet {
  reps: number,
  weight: number,
  done: boolean,
}

export interface WorkoutSuperSet {
  // FIXME Not quite right, need to fix
  superset: Array<WorkoutBasicSet>,
}

export type ExerciseDetail = {
  id: number,
  name: string,
  imageName: string,
  type: string,
  twoSided: boolean,
  primaryGeneralMuscleGroup: Array<string>,
  secondaryGeneralMuscleGroup: Array<string>,
  primarySpecificMuscleGroup: Array<string>,
  secondarySpecificMuscleGroup: Array<string>,
  equipment: string,
  notes: string,
}

export const ExerciseDetailsTitles={
  "id": "ID",
  "name": "Name",
  "imageName": "Image Name",
  "type": "Exercise Type",
  "twoSided": "Weight on Both Sides",
  "primaryGeneralMuscleGroup": "General Primary Muscle Group",
  "secondaryGeneralMuscleGroup": "General Secondary Muscle Group",
  "primarySpecificMuscleGroup": "Specific Primary Muscle Group",
  "secondarySpecificMuscleGroup": "Specific Secondary Muscle Group",
  "equipment": "Equipment",
  "notes": "Notes",
}

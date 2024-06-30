

export interface Exercise {
  id: number,
  // name: string,
  sets: {[setNumber: number]: Array<WorkoutBasicSet | WorkoutSuperSet>},
}

export interface WorkoutBasicSet {
  reps: number,
  weight: number,
}

export interface WorkoutSuperSet {
  superset: Array<WorkoutBasicSet>,
}


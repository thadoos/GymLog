interface Workout {
  exercisesDone: Array<Exercise>,
  timeTaken: number,
  
}

interface Exercise {
  id: number,
  name: string,
  sets: Array<WorkoutBasicSet | WorkoutSuperSet>,
}

interface WorkoutBasicSet {
  reps: number,
  weight: number,
}

interface WorkoutSuperSet {
  superset: Array<WorkoutBasicSet>,
}


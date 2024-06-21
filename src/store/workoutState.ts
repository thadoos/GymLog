import { create } from 'zustand';
import { Exercise, WorkoutSuperSet } from './interfaces';

export interface WorkoutState {
  workoutName: String,
  workoutDescription: string,
  timeTaken: number,
  exercisesDone: Array<Exercise>,

  setWorkoutName: (workoutName: string) => void,
  setWorkoutDescription: (workoutDescription: string) => void,
  addExercise: (exerciseID: number) => void,
  deleteExercise: (exerciseID: number, setNumber: number) => void,
  addSetToExercise: (reps: number, weight: number) => void,
  addSupersetToExercise: (superset: WorkoutSuperSet) => void,
  setTimeTaken: (timeTaken: number) => void,

}

const useWorkoutStore = create<WorkoutState>((set) => ({
  workoutName: "",
  workoutDescription: "",
  timeTaken: 0,
  exercisesDone: [],

  setWorkoutName: (workoutName: string) => set({ workoutName }),
  setWorkoutDescription: (workoutDescription: string) => set({ workoutDescription }),
  addExercise: (exerciseID: number) => set((state) => {
    return{
      
    }
  }),
  deleteExercise: (exerciseID: number, setNumber: number) => set((state) => {
    return{
      
    }
  }),
  addSetToExercise: (reps: number, weight: number) => set((state) => {
    return{
      
    }
  }),
  addSupersetToExercise: (superset: WorkoutSuperSet) => set((state) => {
    return{
      
    }
  }),
  setTimeTaken: (timeTaken: number) => set((state) => {
    return{
      
    }
  }),

}))

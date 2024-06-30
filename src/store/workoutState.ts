import { Exercise, WorkoutBasicSet, WorkoutSuperSet } from './interfaces';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import zustandStorage from './mmkv';

export interface WorkoutState {
  workoutName: String,
  workoutDescription: string,
  timeStart: number,
  workoutDuration: number,
  workoutExercises: Array<Exercise>,
  workoutActive: boolean,

  setWorkoutName: (workoutName: string) => void,
  setWorkoutDescription: (workoutDescription: string) => void,
  startWorkout: () => void,
  addExercise: (exerciseID: number) => void,
  deleteExercise: (exerciseID: number, setNumber: number) => void,
  addSetToExercise: (reps: number, weight: number) => void,
  addSupersetToExercise: (superset: WorkoutSuperSet) => void,
  setTimeTaken: (timeTaken: number) => void,
  resetWorkout: () => void,

}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      workoutName: "",
      workoutDescription: "",
      timeStart: 0,
      workoutDuration: 0,
      workoutExercises: [],
      workoutActive: false,

      setWorkoutName: (workoutName: string) => set({ workoutName }),
      setWorkoutDescription: (workoutDescription: string) => set({ workoutDescription }),
      addExercise: (exerciseID: number) => {set((state) => ({
        workoutExercises: state.workoutExercises.concat([{
          id: exerciseID,
          sets: {},
        }])
        
      }))},
      startWorkout: () => set((state)=>({workoutActive: true})),
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
      resetWorkout: () => set((state) => ({
        workoutName: "",
        workoutDescription: "",
        timeStart: 0,
        workoutDuration: 0,
        workoutExercises: [],
        workoutActive: false,
      })),
    }),
    {
      name: 'runningWorkoutDetails',
      storage: createJSONStorage(() => zustandStorage)
    }
  )
)

// const useWorkoutStore = create<WorkoutState>((set) => ({
//   workoutName: "",
//   workoutDescription: "",
//   timeTaken: 0,
//   exercisesDone: [],

//   setWorkoutName: (workoutName: string) => set({ workoutName }),
//   setWorkoutDescription: (workoutDescription: string) => set({ workoutDescription }),
//   addExercise: (exerciseID: number) => set((state) => {
//     return{
      
//     }
//   }),
//   deleteExercise: (exerciseID: number, setNumber: number) => set((state) => {
//     return{
      
//     }
//   }),
//   addSetToExercise: (reps: number, weight: number) => set((state) => {
//     return{
      
//     }
//   }),
//   addSupersetToExercise: (superset: WorkoutSuperSet) => set((state) => {
//     return{
      
//     }
//   }),
//   setTimeTaken: (timeTaken: number) => set((state) => {
//     return{
      
//     }
//   }),

// }))

import { Exercise, WorkoutBasicSet, WorkoutSuperSet } from './interfaces';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import zustandStorage from './mmkv';
import exercisesData from '../../assets/exercisesData.json';
import { ExerciseDetail } from './interfaces';

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
  deleteExercise: (index: number) => void,
  addSetToExercise: (exerciseIndex: number) => void,
  changeRepWithIndex: (exerciseIndex: number, setIndex: number, newReps: number) => void,
  changeWeightWithIndex: (exerciseIndex: number, setIndex: number, newWeight: number) => void,

  addSupersetToExercise: (superset: WorkoutSuperSet) => void,
  setTimeTaken: (timeTaken: number) => void,
  resetWorkout: () => void,
  endAndLogWorkout: () => void,


}
// Maps all exercise IDs to their object
export const exerciseMap = new Map(exercisesData.exercises.map((ex: ExerciseDetail) => [ex.id, ex]));

// const getExerciseName = (id: number) : string => {
//   return exerciseMap.get(id)?.name ?? "Cannot Fetch";
// }


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
          // name: getExerciseName(exerciseID),
          sets: [{reps: 0, weight: 0, done: false}], //TODO Perhaps make it set the default numbers to the same as from last set
        }])
        
      }))},
      startWorkout: () => set((state)=>({workoutActive: true})),
      deleteExercise: (index: number) => set((state) => {
        return{
          workoutExercises: state.workoutExercises.filter((obj, stateIndex) => stateIndex !== index)
        }
      }),
      addSetToExercise: (exerciseIndex: number) => set((state) => {
        const oldExercises = [...state.workoutExercises];
        const lastSet = oldExercises[exerciseIndex].sets[oldExercises[exerciseIndex].sets.length-1]
        oldExercises[exerciseIndex].sets.push({reps: lastSet.reps, weight: lastSet.weight, done: false});
        return{
          workoutExercises: oldExercises,
        }
      }),
      changeRepWithIndex: (exerciseIndex: number, setIndex: number, newReps: number) => set((state) => {
        var oldExercise = [...state.workoutExercises];
        oldExercise[exerciseIndex].sets[setIndex].reps = newReps;

        return {
          workoutExercises: oldExercise,
        }
        
      }),
      changeWeightWithIndex: (exerciseIndex: number, setIndex: number, newWeight: number) => set((state) => {
        var oldExercise = [...state.workoutExercises];
        oldExercise[exerciseIndex].sets[setIndex].weight = newWeight;

        return {
          workoutExercises: oldExercise,
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
      endAndLogWorkout: () => set((state) => ({
        // TODO Add the workout to online database
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

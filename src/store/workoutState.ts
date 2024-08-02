import { Exercise, WorkoutBasicSet, WorkoutSuperSet } from './interfaces';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import zustandStorage from './mmkv';
import exercisesData from '../../assets/exercisesData.json';
import { ExerciseDetail } from './interfaces';
import { useRealm } from '@realm/react';
import { WorkoutLog } from '../models/WorkoutLog';

export interface WorkoutState {
  workoutName: string,
  workoutDescription: string,
  timeStart: Date,
  timeEnd: Date, // ? Might not need this. Just have this found where the realm object is created
  workoutDuration: number,
  workoutExercises: Array<Exercise>,
  workoutActive: boolean,

  setWorkoutName: (workoutName: string) => void,
  setWorkoutDescription: (workoutDescription: string) => void,
  startWorkout: () => void,

  addExercise: (exerciseID: number) => void,
  deleteExercise: (index: number) => void,
  
  addSetToExercise: (exerciseIndex: number) => void,
  deleteSetFromExercise: (exerciseIndex: number, setIndex: number) => void,
  changeRepWithIndex: (exerciseIndex: number, setIndex: number, newReps: number) => void,
  changeWeightWithIndex: (exerciseIndex: number, setIndex: number, newWeight: number) => void,

  addSupersetToExercise: (superset: WorkoutSuperSet) => void,
  setTimeTaken: (timeTaken: number) => void,
  setTimeStart: () => void,
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
      timeStart: new Date(),
      timeEnd: new Date(),
      workoutDuration: 0,
      workoutExercises: [],
      workoutActive: false, // This won't be saved to the database.

      setWorkoutName: (workoutName: string) => set({ workoutName }),
      setWorkoutDescription: (workoutDescription: string) => set({ workoutDescription }),
      addExercise: (exerciseID: number) => set((state) => ({
        workoutExercises: state.workoutExercises.concat([{
          id: exerciseID,
          restStartTime: new Date(),
          restEndTime: new Date(),
          restDuration: 0,
          // name: getExerciseName(exerciseID),
          sets: [{reps: 0, weight: 0, done: false}], // TODO Perhaps make it set the default numbers to the same as from last set
        }])
        
      })),
      startWorkout: () => set((state)=>({workoutActive: true, timeStart: new Date()})),
      deleteExercise: (index: number) => set((state) => {
        return{
          workoutExercises: state.workoutExercises.filter((obj, stateIndex) => stateIndex !== index)
        }
      }),
      addSetToExercise: (exerciseIndex: number) => set((state) => {
        const oldExercises = [...state.workoutExercises];
        if(oldExercises[exerciseIndex].sets.length > 0){
          const lastSet = oldExercises[exerciseIndex].sets[oldExercises[exerciseIndex].sets.length-1];
          oldExercises[exerciseIndex].sets.push({reps: lastSet.reps, weight: lastSet.weight, done: false});
        }else{
          oldExercises[exerciseIndex].sets.push({reps: 0, weight: 0, done: false});
        }
        return{
          workoutExercises: oldExercises,
        }
      }),
      deleteSetFromExercise: (exerciseIndex: number, setIndex: number) => set((state) => {
        const oldExercises = [...state.workoutExercises];
        oldExercises[exerciseIndex].sets.splice(setIndex, 1);
        // oldExercises[exerciseIndex].sets = oldExercises[exerciseIndex].sets.filter((ex, index) => index !== setIndex);
        return {
          workoutExercises: oldExercises,
        }
      }),
      changeRepWithIndex: (exerciseIndex: number, setIndex: number, newReps: number) => set((state) => {
        const oldExercises = [...state.workoutExercises];
        oldExercises[exerciseIndex].sets[setIndex].reps = newReps;
        return {
          workoutExercises: oldExercises,
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
        // TODO To implement
        return{
          
        }
      }),
      setTimeTaken: (timeTaken: number) => set((state) => {
        // TODO To implement
        return{
          
        }
      }),
      setTimeStart: () => set((state) => ({
        timeStart: new Date()
      })),
      resetWorkout: () => set((state) => ({
        workoutName: "",
        workoutDescription: "",
        timeStart: new Date(),
        workoutDuration: 0,
        workoutExercises: [],
        workoutActive: false,
      })),
      endAndLogWorkout: () => {
        // const realm = useRealm();
        // TODO Add the workout to (online) database
        set((state) => {
          // realm.write(() => {
          //   realm.create('WorkoutLog', {
          //     workoutName: state.workoutName,
          //     workoutDescription: state.workoutDescription,
          //     timeStart: state.timeStart,
          //     timeEnd: state.timeEnd,
          //     workoutDuration: Math.floor(state.timeEnd - state.timeEnd),
          //     workoutExercises: state.workoutExercises,
          //   })
          // })

        return({
          workoutName: "",
          workoutDescription: "",
          timeStart: new Date(),
          workoutDuration: 0,
          workoutExercises: [],
          workoutActive: false,
        })
      })},


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

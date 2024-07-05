import { create } from 'zustand';

interface AppState{
  cancelWorkoutModalVisible: boolean,
  setCancelWorkoutModalVisible: (active: boolean) => void,

  exerciseOptionsModalVisible: number,
  setExerciseOptionsModalVisible: (index: number) => void,
}

export const useAppState = create<AppState>((set)=>({
  cancelWorkoutModalVisible: false,
  setCancelWorkoutModalVisible: (active) => set((state) => ({
    cancelWorkoutModalVisible: active,
  })),

  exerciseOptionsModalVisible: -1,
  setExerciseOptionsModalVisible: (index: number) => set((state) => ({
    exerciseOptionsModalVisible: index
  })),

})

)
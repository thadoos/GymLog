import { create } from 'zustand';

interface AppState{
  cancelWorkoutModalVisible: boolean,
  setCancelWorkoutModalVisible: (active: boolean) => void,
}

export const useAppState = create<AppState>((set)=>({
  cancelWorkoutModalVisible: false,
  setCancelWorkoutModalVisible: (active) => set((state) => ({
    cancelWorkoutModalVisible: active,
  }))

})

)
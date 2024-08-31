import { create } from "zustand";
import Exercise from "../models/Exercise";

interface AppState {
  cancelWorkoutModalVisible: boolean;
  setCancelWorkoutModalVisible: (active: boolean) => void;

  exerciseOptionsModalVisible: number;
  setExerciseOptionsModalVisible: (index: number) => void;

  fullExerciseDetailsPopupVisible: Exercise;
  setFullExerciseDetailsPopupVisible: (exercise: Exercise) => void;
}

export const useAppState = create<AppState>((set) => ({
  cancelWorkoutModalVisible: false,
  setCancelWorkoutModalVisible: (active) =>
    set((state) => ({
      cancelWorkoutModalVisible: active,
    })),

  exerciseOptionsModalVisible: -1,
  setExerciseOptionsModalVisible: (index: number) =>
    set((state) => ({
      exerciseOptionsModalVisible: index,
    })),

  fullExerciseDetailsPopupVisible: null,
  setFullExerciseDetailsPopupVisible: (exercise: Exercise) =>
    set((state) => ({
      fullExerciseDetailsPopupVisible: exercise,
    })),
}));


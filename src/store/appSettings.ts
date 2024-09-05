import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import zustandStorage from "./mmkv";

type Theme = "light" | "dark";
interface AppSettingState {
  userId: string;
  setUserId: (newUserId: string) => void;
  doneFirstLoad: boolean;
  setDoneFirstLoad: (boolSet: boolean) => void;
  theme: Theme;
  toggleTheme: () => void;
}

// const useAppSettingStore = create<appSettingState>((set) => ({
//   theme: 'light',
//   toggleTheme: (theme: string) => set({theme}),
// }))

export const useAppSettingStore = create<AppSettingState>()(
  persist(
    (set, get) => ({
      userId: "",
      setUserId: (newUserId: string) => set((state) => ({ userId: newUserId })),
      doneFirstLoad: false,
      setDoneFirstLoad: (boolSet: boolean) =>
        set((state) => ({ doneFirstLoad: boolSet })),
      theme: "light",
      // toggleTheme: () => set({theme: theme === 'light' ? 'dark' : 'light'}),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
    }),
    {
      name: "appSettingStorage",
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

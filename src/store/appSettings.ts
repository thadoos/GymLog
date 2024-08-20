import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import zustandStorage from './mmkv';

type Theme = 'light' | 'dark';
interface AppSettingState {
  user_id: string,
  doneFirstLoad: boolean,
  setDoneFirstLoad: (boolSet: boolean) => void,
  theme: Theme,
  toggleTheme: () => void,
}

// const useAppSettingStore = create<appSettingState>((set) => ({
//   theme: 'light',
//   toggleTheme: (theme: string) => set({theme}),
// }))

export const useAppSettingStore = create<AppSettingState>()(
  persist(
    (set, get) => ({
      user_id: 'abc',
      doneFirstLoad: false,
      setDoneFirstLoad: (boolSet: boolean) => set((state) => ({ doneFirstLoad: boolSet})),
      theme: 'light',
      // toggleTheme: () => set({theme: theme === 'light' ? 'dark' : 'light'}),
      toggleTheme: () => set((state) => ({theme: state.theme === 'light' ? 'dark' : 'light'}))
    }),
    {
      name: 'appSettingStorage',
      storage: createJSONStorage(() => zustandStorage)
    }
  )
)

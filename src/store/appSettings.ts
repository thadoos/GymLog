import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import zustandStorage from './mmkv';

type Theme = 'light' | 'dark';
interface AppSettingState {
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
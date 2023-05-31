import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

export interface ThemeStore {
  darkMode: boolean;
}

export interface ThemeStoreMutations {
  toggleDarkMode: () => void;
  resetStore: () => void;
}

const initialStore: ThemeStore = {
  // darkMode: !!JSON.parse(localStorage.getItem('darkMode') as string),
  darkMode: false,
};
const store = proxy<ThemeStore>({
  ...initialStore,
});
const mutations: ThemeStoreMutations = {
  toggleDarkMode: () => {
    store.darkMode = !store.darkMode;
    // localStorage.setItem('darkMode', JSON.stringify(!store.darkMode));
  },
  resetStore: () => {
    store.darkMode = initialStore.darkMode;
  },
};

export const themeStoreMutations = mutations;
export const initialThemeStore = initialStore;
export const themeStore = store;

devtools(themeStore);

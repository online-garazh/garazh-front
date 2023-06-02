import omit from 'lodash/omit';
import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

export enum UiElementNames {
  USER_SIDEBAR = 'USER_SIDEBAR',
}

export interface UiStore {
  active: {
    [key in UiElementNames]?: boolean;
  };
}

export interface UiStoreMutations {
  resetStore: () => void;
  toggleUi: (uiElem: UiElementNames) => void;
}

const initialStore: UiStore = {
  active: {
    [UiElementNames.USER_SIDEBAR]: true,
  },
};
const store = proxy<UiStore>({
  ...initialStore,
});
const mutations: UiStoreMutations = {
  toggleUi: (uiElem) => {
    if (uiElem in store.active) store.active = omit(store.active, [uiElem]);
    else store.active = { ...store.active, [uiElem]: true };
  },
  resetStore: () => {
    store.active = initialStore.active;
  },
};

export const uiStoreMutations = mutations;
export const initialUiStore = initialStore;
export const uiStore = store;

devtools(uiStore);

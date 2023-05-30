import { proxy } from 'valtio';
import { devtools } from 'valtio/utils';

export enum SimpleModalNames {}

export type ModalNameType = SimpleModalNames | null;

export interface SimpleModalState {
  modalName: ModalNameType;
  modalData: Record<string, unknown> | null;
}

export interface ModalStore {
  simpleModalState: SimpleModalState;
}

export interface ModalStoreMutations {
  closeSimpleModal: () => void;
  openSimpleModal: ({ data, name }: { data?: Record<string, unknown>; name: ModalNameType }) => void;
  resetStore: () => void;
}

const initialStore: ModalStore = {
  simpleModalState: {
    modalName: null,
    modalData: null,
  },
};
const store = proxy<ModalStore>({
  ...initialStore,
});
const mutations: ModalStoreMutations = {
  closeSimpleModal: () => {
    store.simpleModalState = initialStore.simpleModalState;
  },
  openSimpleModal: ({ data, name }) => {
    store.simpleModalState = {
      modalName: name,
      modalData: data || store.simpleModalState.modalData,
    };
  },
  resetStore: () => {
    store.simpleModalState = initialStore.simpleModalState;
  },
};

export const modalStoreMutations = mutations;
export const initialModalStore = initialStore;
export const modalStore = store;

devtools(modalStore);

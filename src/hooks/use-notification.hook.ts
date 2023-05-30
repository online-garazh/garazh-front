// For more documentation please see: https://notistack.com/
import { useSnackbar, type SnackbarKey, type OptionsObject } from 'notistack';

export enum NotificationVariants {
  SUCCESS = 'success',
  DEFAULT = 'default',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
}

type CallbackType = (message: string, options?: Partial<OptionsObject>) => SnackbarKey;

type ReturnType = {
  addSuccessMessage: CallbackType;
  addWarningMessage: CallbackType;
  addDefaultMessage: CallbackType;
  deleteAllMessages: () => void;
  addErrorMessage: CallbackType;
  addInfoMessage: CallbackType;
  deleteMessage: (id: SnackbarKey) => void;
};

export const useNotification = (): ReturnType => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const addSuccessMessage: ReturnType['addSuccessMessage'] = (message, options) =>
    enqueueSnackbar(message, { variant: NotificationVariants.SUCCESS, ...options });
  const addErrorMessage: ReturnType['addErrorMessage'] = (message, options) =>
    enqueueSnackbar(message, { variant: NotificationVariants.ERROR, ...options });
  const addWarningMessage: ReturnType['addWarningMessage'] = (message, options) =>
    enqueueSnackbar(message, { variant: NotificationVariants.WARNING, ...options });
  const addInfoMessage: ReturnType['addInfoMessage'] = (message, options) =>
    enqueueSnackbar(message, { variant: NotificationVariants.INFO, ...options });
  const addDefaultMessage: ReturnType['addDefaultMessage'] = (message, options) =>
    enqueueSnackbar(message, { variant: NotificationVariants.DEFAULT, ...options });
  const deleteMessage = (id: SnackbarKey): void => {
    closeSnackbar(id);
  };
  const deleteAllMessages = (): void => {
    closeSnackbar();
  };

  return {
    addSuccessMessage,
    addWarningMessage,
    addDefaultMessage,
    deleteAllMessages,
    addErrorMessage,
    addInfoMessage,
    deleteMessage,
  };
};

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';
import { type MouseEvent } from 'react';

import { type UiILocators } from '~/constants/ui-locators.constant';

type Props = {
  toggleBool: () => void;
  boolValue: boolean;
  id: UiILocators;
};

export function PasswordIcon(props: Props) {
  const { toggleBool, boolValue } = props;
  const mouseDownHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <IconButton onClick={toggleBool} onMouseDown={mouseDownHandler}>
      {boolValue ? <VisibilityOffIcon color="tertiary" /> : <VisibilityIcon color="tertiary" />}
    </IconButton>
  );
}

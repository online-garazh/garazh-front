import ArrowUpward from '@mui/icons-material/ArrowUpward';
import { Button } from '@mui/material';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { useState } from 'react';

import { UiILocators } from '~/constants/ui-locators.constant';

type Props = {
  visiblePosition?: number;
  id?: UiILocators;
};

type Position = {
  x: number;
  y: number;
};

export function ButtonUp(props: Props) {
  const { visiblePosition = 300, id = UiILocators.BUTTON_UP } = props;
  const [visible, setVisible] = useState(false);
  const scrollUpHandler = (): void => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  };

  useScrollPosition(({ currPos }: { currPos: Position }) => {
    setVisible(currPos.y <= -visiblePosition);
  }, []);

  return (
    <Button
      onClick={scrollUpHandler}
      variant="contained"
      size="medium"
      sx={({ transitions }) => ({
        pointerEvents: 'none',
        transition: transitions.create('opacity', {
          duration: transitions.duration.enteringScreen,
          easing: transitions.easing.sharp,
        }),
        display: 'none',
        opacity: 0,
        height: 40,
        width: 40,
        ...(visible && {
          pointerEvents: 'auto',
          display: 'block',
          opacity: 1,
          cursor: 'pointer',
        }),
      })}
      id={id}
    >
      <ArrowUpward fontSize="medium" />
    </Button>
  );
}

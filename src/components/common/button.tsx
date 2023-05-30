import { Button as MuiButton, type ButtonProps as MuiButtonProps, Box } from '@mui/material';

import { Loader } from '~/components/common/loader';
import { type UiILocators } from '~/constants/ui-locators.constant';

export type Props = MuiButtonProps & {
  isLoading?: boolean;
  id?: UiILocators;
};

export function Button(props: Props) {
  const {
    isLoading = false,
    children,
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    id,
    ...muiProps
  } = props;

  return (
    <MuiButton variant={variant} color={color} size={size} id={id} {...muiProps}>
      {isLoading && (
        <Box
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            display: 'flex',
            bottom: 0,
            height: '100%',
            width: '100%',
            right: 0,
            left: 0,
            top: 0,
          }}
        >
          <Loader
            size="2rem"
            sx={({ palette }) => ({
              ...(color !== 'inherit' && {
                color: variant === 'contained' ? palette[color].contrastText : palette[color].main,
              }),
            })}
          />
        </Box>
      )}

      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          opacity: isLoading ? 0 : 1,
        }}
      >
        {children}
      </Box>
    </MuiButton>
  );
}

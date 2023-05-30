import { InfoOutlined } from '@mui/icons-material';
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  Typography,
  type FormControlProps,
  type InputLabelProps,
} from '@mui/material';
import { useMemo, type ReactNode } from 'react';

export type Props = {
  FormControlProps?: FormControlProps;
  InputLabelProps?: InputLabelProps;
  errorMessage?: string | null;
  hideLabel?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  children?: ReactNode;
  noHelper?: boolean;
  labelId?: string;
  error?: boolean;
  label: string;
  id?: string;
};

export function UiFieldLayout(props: Props) {
  const {
    FormControlProps = {},
    InputLabelProps = {},
    errorMessage,
    hideLabel = false,
    disabled = false,
    required = false,
    noHelper = false,
    children,
    labelId,
    label,
    error = false,
    id,
  } = props;
  const displayError = useMemo(() => !noHelper && !!errorMessage, [errorMessage, noHelper]);
  const noMarginBottom = useMemo(() => displayError || noHelper, [displayError, noHelper]);

  return (
    <FormControl
      fullWidth
      disabled={disabled}
      error={error}
      sx={{
        position: 'relative',
        maxWidth: '100%',
        ...(!noMarginBottom && {
          mb: 3.75,
        }),
      }}
      {...FormControlProps}
    >
      {label && !hideLabel && (
        <Box
          sx={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <InputLabel
            disableAnimation
            disabled={disabled}
            variant="standard"
            htmlFor={id}
            error={error}
            id={labelId}
            {...InputLabelProps}
            sx={({ palette }) => ({
              marginBottom: 0.5,
              fontWeight: 300,
              transform: 'none',
              position: 'relative',
              fontSize: '0.875rem',
              display: 'block',
              cursor: 'pointer',
              color: palette.text.primary,
              flex: 1,
            })}
          >
            {label}
          </InputLabel>

          {required && <Typography variant="caption">Oбов&apos;язкове</Typography>}
        </Box>
      )}

      {children}

      {displayError && (
        <Box
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            height: 30,
          }}
        >
          <InfoOutlined
            color="error"
            sx={({ spacing }) => ({
              fontSize: '1rem',
              margin: spacing(0.25, 0, 0, 0),
            })}
          />

          <FormHelperText
            disabled={disabled}
            required={required}
            error={error}
            sx={({ spacing }) => ({
              lineHeight: '0.75rem',
              overflow: 'visible',
              fontSize: '0.75rem',
              height: 26,
              margin: spacing(0.5, 0, 0, 0.5),
            })}
          >
            {errorMessage}
          </FormHelperText>
        </Box>
      )}
    </FormControl>
  );
}

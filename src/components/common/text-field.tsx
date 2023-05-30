import {
  type InputProps,
  InputAdornment,
  OutlinedInput,
  type TextFieldProps as MUITextFieldProps,
} from '@mui/material';
import noop from 'lodash/noop';
import { useState, useEffect, type ReactNode, forwardRef, type FocusEvent } from 'react';

import { UiFieldLayout, type Props as UiFieldLayoutProps } from '~/components/layouts/ui-field-layout';

export type Props = Pick<
  InputProps,
  'id' | 'name' | 'type' | 'sx' | 'size' | 'rows' | 'disabled' | 'required' | 'value' | 'readOnly'
> &
  Pick<MUITextFieldProps, 'onChange' | 'onBlur' | 'onFocus' | 'onKeyDown' | 'onClick'> &
  UiFieldLayoutProps & {
    alwaysShowAdornment?: boolean;
    errorMessage?: string;
    InputProps?: InputProps;
    prefix?: ReactNode;
    suffix?: ReactNode;
    id: string;
  };

export const TextField = forwardRef(function TextFieldRef(props: Props, ref) {
  const {
    alwaysShowAdornment = false,
    FormControlProps = {},
    InputLabelProps = {},
    errorMessage = '',
    InputProps = {},
    hideLabel,
    onKeyDown = noop,
    fullWidth = false,
    noHelper,
    readOnly,
    disabled = false,
    required = false,
    onChange = noop,
    onFocus = noop,
    onClick = noop,
    onBlur = noop,
    prefix,
    suffix,
    label,
    value,
    error = false,
    name,
    type = 'text',
    size = 'medium',
    rows,
    id,
    sx,
  } = props;
  const [showAdornment, setShowAdornment] = useState(false);
  const [focused, setFocused] = useState(false);
  const handleFocus = (event: FocusEvent<HTMLInputElement>): void => {
    setFocused(true);

    onFocus(event);
  };
  const handleBlur = (event: FocusEvent<HTMLInputElement>): void => {
    setFocused(false);

    onBlur(event);
  };

  useEffect(() => {
    if (focused || !!value) setShowAdornment(true);
    else setShowAdornment(false);
  }, [focused, value]);

  return (
    <UiFieldLayout
      FormControlProps={FormControlProps}
      InputLabelProps={{ ...InputLabelProps }}
      errorMessage={errorMessage}
      hideLabel={hideLabel}
      fullWidth={fullWidth}
      noHelper={noHelper}
      disabled={disabled}
      required={required}
      error={error}
      label={label}
      id={id}
    >
      <OutlinedInput
        autoComplete="off"
        multiline={Boolean(rows)}
        onKeyDown={onKeyDown}
        onChange={onChange}
        readOnly={readOnly}
        disabled={disabled}
        inputRef={ref}
        onFocus={handleFocus}
        onClick={onClick}
        onBlur={handleBlur}
        value={value}
        error={error}
        name={name}
        type={type}
        size={size}
        rows={rows}
        id={id}
        sx={sx}
        {...InputProps}
        startAdornment={
          prefix && (alwaysShowAdornment || showAdornment) && <InputAdornment position="start">{prefix}</InputAdornment>
        }
        endAdornment={
          suffix && (alwaysShowAdornment || showAdornment) && <InputAdornment position="end">{suffix}</InputAdornment>
        }
      />
    </UiFieldLayout>
  );
});

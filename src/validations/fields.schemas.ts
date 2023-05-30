import { z } from 'zod';

import { ResolverErrors } from '~/constants/errors.constant';
import { PASSWORD_REGEXP } from '~/constants/regexps.constant';

const nickname = () =>
  z
    .string()
    .min(1, { message: ResolverErrors.requiredField })
    .max(18, { message: 'Поле має містити не більше 18 символів' })
    .trim();
const password = () =>
  z
    .string()
    .min(1, { message: ResolverErrors.requiredField })
    .regex(PASSWORD_REGEXP, { message: 'Введіть дійсний пароль' });
const email = () =>
  z
    .string()
    .min(1, { message: ResolverErrors.requiredField })
    .max(18, { message: 'Поле має містити не більше 18 символів' })
    .email({ message: 'Введіть дійсну електронну пошту' })
    .trim();

export const fieldsSchemas = {
  confirmPassword: password,
  password,
  nickname,
  email,
};

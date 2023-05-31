import { z } from 'zod';

import { ResolverErrors } from '~/constants/errors.constant';
import { PASSWORD_REGEXP } from '~/constants/regexps.constant';

const nickname = () =>
  z.string().min(1, { message: ResolverErrors.requiredField }).max(18, { message: ResolverErrors.max18Field }).trim();
const password = () =>
  z
    .string()
    .min(1, { message: ResolverErrors.requiredField })
    .regex(PASSWORD_REGEXP, { message: ResolverErrors.validPasswordField });
const email = () =>
  z
    .string()
    .min(1, { message: ResolverErrors.requiredField })
    .max(18, { message: ResolverErrors.max18Field })
    .email({ message: ResolverErrors.validEmailField })
    .trim();

export const fieldsSchemas = {
  confirmPassword: password,
  password,
  nickname,
  email,
};

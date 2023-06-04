import { z } from 'zod';

import { ResolverErrors } from '~/constants/errors.constant';
import { PASSWORD_REGEXP } from '~/constants/regexps.constant';

const firstName = () =>
  z.string().min(1, { message: ResolverErrors.requiredField }).max(18, { message: ResolverErrors.max18Field }).trim();
const lastName = () =>
  z.string().min(1, { message: ResolverErrors.requiredField }).max(18, { message: ResolverErrors.max18Field }).trim();
const nickName = () =>
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
    .max(50, { message: ResolverErrors.max50Field })
    .email({ message: ResolverErrors.validEmailField })
    .trim();

export const fieldsSchemas = {
  confirmPassword: password,
  firstName,
  lastName,
  password,
  nickName,
  email,
};

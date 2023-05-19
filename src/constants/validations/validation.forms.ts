import { ErrorsResolver } from '@/constants/errors';
import { z } from 'zod';

export const signupValidationForm = () =>
  z.object({
    nickname: z.string().min(1, ErrorsResolver.requiredField),
    email: z.string().min(1, ErrorsResolver.requiredField),
    password: z.string().min(1, ErrorsResolver.requiredField),
  });

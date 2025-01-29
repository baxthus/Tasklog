import { z } from 'zod';

export const passwordSchema = z
  .string({
    required_error: 'Password is required',
  })
  .min(10, 'Password must be at least 10 characters long')
  .max(100, 'Password is too long')
  .refine(password => /[A-Z]/.test(password), {
    message: 'Password must contain at least one uppercase letter',
  })
  .refine(password => /[a-z]/.test(password), {
    message: 'Password must contain at least one lowercase letter',
  })
  .refine(password => /[0-9]/.test(password), {
    message: 'Password must contain at least one number',
  })
  .refine(password => /[!@#$%^&*()_+=[\]{};'`:"\\|,.<>/?-]/.test(password), {
    message: 'Password must contain at least one special character',
  });

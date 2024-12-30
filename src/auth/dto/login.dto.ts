import { z } from 'zod';

export const loginDtoSchema = z.object({
  email: z
    .string({ message: 'Email is required' })
    .email({ message: 'Invalid email format' }),
  password: z
    .string({ message: 'Password is required' })
    .max(50, {
      message: 'Password must be at most 50 characters long',
    }),
});

export type LoginDto = z.infer<typeof loginDtoSchema>;

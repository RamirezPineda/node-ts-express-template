import { z } from 'zod';

export const userCreateDtoSchema = z
  .object({
    email: z
      .string({ message: 'Email is required' })
      .email({ message: 'Invalid email format' }),
    name: z
      .string({ message: 'Name is required' })
      .min(3, {
        message: 'Name must be at least 3 characters long',
      })
      .max(50, {
        message: 'Name must be at most 50 characters long',
      }),
    password: z
      .string({ message: 'Password is required' })
      .min(8, {
        message: 'Password must be at least 8 characters long',
      })
      .max(50, {
        message: 'Password must be at most 50 characters long',
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            'Password must have at least one uppercase letter, one lowercase letter, one number, and one special character',
        },
      ),
  })
  .strict();

export type UserCreateDto = z.infer<typeof userCreateDtoSchema>;

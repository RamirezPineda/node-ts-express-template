import { z } from 'zod';
import { userCreateDtoSchema } from './user-create.dto';

export const userUpdateDtoSchema = userCreateDtoSchema.partial();

export type UserUpdateDto = z.infer<typeof userUpdateDtoSchema>;

export const userEnableOrDisableDtoSchema = z
  .object({
    isActive: z
      .boolean({ message: 'is active is required' })
  })
  .strict();

export type UserEnableOrDisableDto = z.infer<typeof userEnableOrDisableDtoSchema>;

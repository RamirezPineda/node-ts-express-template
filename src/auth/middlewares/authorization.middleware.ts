import type { NextFunction, Request, Response } from 'express';

import { ResponseError, handlerErrors } from '@/common/utils';
import { type User } from '@/users/entities/user.entity';
import { ROLE } from '@/common/constants';

export const authorization = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body.payload as Omit<User, 'password'>;
    if (user.role !== ROLE.ADMIN) {
      throw new ResponseError({
        messages: ['You do not have authorization to access this resource'],
        error: 'unauthorized',
      });
    }
    next();
  } catch (error) {
    handlerErrors(res, error);
  }
};

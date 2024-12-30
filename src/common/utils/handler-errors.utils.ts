import { Response } from 'express';
import { ZodError } from 'zod';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

import { ResponseError } from '@/common/utils';
import { HttpStatusMessage } from '@/common/constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handlerErrors = (res: Response, error: any) => {
  if (error instanceof ResponseError) {
    return res.status(error.errorInfo.statusCode ?? 400).json(error.errorInfo);
  }

  const reponseError = new ResponseError({ messages: [] });

  if (error instanceof ZodError) {
    const messagesError = error.issues.map((issue) => issue.message);
    reponseError.errorInfo.messages = messagesError;
    return res.status(400).json(reponseError.errorInfo);
  }

  reponseError.errorInfo.error = HttpStatusMessage.UNAUTHORIZED;
  if (error instanceof TokenExpiredError) {
    reponseError.errorInfo.messages = ['Expired token'];
    return res.status(401).json(reponseError.errorInfo);
  }

  if (error instanceof JsonWebTokenError) {
    reponseError.errorInfo.messages = ['Invalid token'];
    return res.status(401).json(reponseError.errorInfo);
  }

  reponseError.errorInfo.statusCode = 500;
  reponseError.errorInfo.messages = ['Internal Server Error'];
  reponseError.errorInfo.error = HttpStatusMessage.INTERNAL_SERVER_ERROR;
  return res.status(500).json(reponseError.errorInfo);
};

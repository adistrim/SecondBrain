import { NextFunction, Request, Response } from 'express';
import { UserSelect } from '../db/types';
import {z} from 'zod';

const signinInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
});

export const validateSigninInput = (input: UserSelect) => {
  return signinInputSchema.safeParse(input);
};

export function validateSigninInputMiddleware(req: Request, res: Response, next: NextFunction) {
  const validationResult = validateSigninInput(req.body);

  if (!validationResult.success) {
    res.status(400).json({ error: "Bad request" });
    return
  }

  next();
};

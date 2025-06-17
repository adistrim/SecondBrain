import { NextFunction, Request, Response } from 'express';
import { UserSelect } from 'src/db/types';
import { z } from 'zod';

const signupInputSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  password: z.string().min(8).max(100),
});

export const validateSignupInput = (input: UserSelect) => {
  return signupInputSchema.safeParse(input);
};

export function validateSignupInputMiddleware(req: Request, res: Response, next: NextFunction) {
  const validationResult = validateSignupInput(req.body);

  if (!validationResult.success) {
    res.status(400).json({ message: "Bad request" });
    return;
  }

  next();
}

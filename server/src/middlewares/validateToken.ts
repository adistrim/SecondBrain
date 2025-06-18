import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET } from '../config';

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export default function validateToken( req: AuthenticatedRequest,res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return
  }

  try {
    const decoded = verify(token, SECRET);
    if (typeof decoded === 'object' && decoded !== null) {
      req.userId = decoded.id as string;
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
      return
    }
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
    return
  }
}

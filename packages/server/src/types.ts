import { Request, Response } from 'express';
import User from './User.entity';

export interface Context {
  req: Request;
  res: Response;
  user?: User;
}

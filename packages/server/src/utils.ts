import { Request } from 'express';
import jwt from 'jsonwebtoken';
import oAuth2Client from './oAuth2Client';
import User from './User.entity';

export const authenticateWithGoogle = async (idToken: string) => {
  try {
    const loginTicket = await oAuth2Client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_ID,
    });

    const payload = loginTicket.getPayload();

    if (!payload) return undefined;

    const user = await User.findOne({ where: { googleId: payload.sub } });

    if (user) return user;

    return await User.create({
      googleId: payload.sub,
    }).save();
  } catch (error) {
    return undefined;
  }
};

export const getUser = async (req: Request) => {
  const bearerHeader = req.headers.authorization;

  if (bearerHeader) {
    const [, accesToken] = bearerHeader.split(' ');

    try {
      const payload = jwt.verify(
        accesToken,
        process.env.SECRET || 'gCtvpTciwl/nPSvvWQrqn+kIXB7A/SpvRXX5CtfJNDI=',
      );

      const user = await User.findOne((payload as any).userId);

      return user;
    } catch (err) {
      return undefined;
    }
  }
  return undefined;
};

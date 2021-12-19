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
      name: payload.name,
      googleId: payload.sub,
    }).save();
  } catch (error) {
    return undefined;
  }
};

export const createAccesToken = async (user: User) => {
  const payload = {
    userId: user.id,
    tokenVersion: user.tokenVersion,
  };

  return jwt.sign(
    payload,
    process.env.SECRET || 'gCtvpTciwl/nPSvvWQrqn+kIXB7A/SpvRXX5CtfJNDI=',
  );
};

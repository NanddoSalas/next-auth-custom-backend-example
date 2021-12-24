import { ForbiddenError } from 'apollo-server-core';
import jwt from 'jsonwebtoken';
import { createMethodDecorator } from 'type-graphql';
import { Context } from './types';

export function AdapterOnly() {
  return createMethodDecorator<Context>(async ({ context }, next) => {
    const [, token] = context.req.headers.authorization?.split(' ') || '';

    try {
      const payload = jwt.verify(
        token,
        process.env.SECRET || 'gCtvpTciwl/nPSvvWQrqn+kIXB7A/SpvRXX5CtfJNDI=',
      ) as any;

      if (payload?.role === 'adapter') return next();
    } catch (error) {}

    throw new ForbiddenError('');
  });
}

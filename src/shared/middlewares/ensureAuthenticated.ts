import { preHandlerHookHandler } from 'fastify';
import { verify } from 'jsonwebtoken';

import { DefaultUserRepository } from '../../modules/user/repositories/implementations/DefaultUserRepository';
import AppError from '../errors/AppError';
import { JWT_SECRET_TOKEN } from '../helpers/environment';

const ensureAuthenticated: preHandlerHookHandler = async request => {
  const token = request.headers.authorization;

  if (!token) throw new AppError('Missing token');

  const { email } = verify(token, JWT_SECRET_TOKEN) as { email: string };

  const userRepository = new DefaultUserRepository();

  const user = await userRepository.findByEmail(String(email));

  if (!user) throw new AppError('User does not exists');
};

export { ensureAuthenticated };

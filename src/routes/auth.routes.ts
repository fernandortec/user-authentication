import { FastifyPluginCallback, FastifyPluginOptions } from 'fastify';

import { AuthenticateUserController } from '../modules/user/useCases/AuthenticateUser/AuthenticateUserController';
import { CreateUserController } from '../modules/user/useCases/CreateUser/CreateUserController';
import { ReAuthenticateUserController } from '../modules/user/useCases/ReAuthenticateUser/ReAuthenticateUserController';

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const reAuthenticateUserController = new ReAuthenticateUserController();

const authRoutes: FastifyPluginCallback<FastifyPluginOptions> = (
  server,
  _options,
  done
) => {
  server.post('/', createUserController.handleRequest);
  server.put('/auth', authenticateUserController.handleRequest);
  server.put('/auth/refresh', reAuthenticateUserController.handleRequest);

  done();
};

export { authRoutes };

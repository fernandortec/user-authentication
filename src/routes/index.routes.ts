import { FastifyPluginCallback, FastifyPluginOptions } from 'fastify';

import { authRoutes } from './auth.routes';
import { userRoutes } from './user.routes';

const indexRouter: FastifyPluginCallback<FastifyPluginOptions> = (
  server,
  _options,
  done
) => {
  server.register(userRoutes, { prefix: 'users' });
  server.register(authRoutes, { prefix: 'users' });

  done();
};

export { indexRouter };

import { FastifyPluginCallback, FastifyPluginOptions } from 'fastify';

import { FindByEmailController } from '../modules/user/useCases/FindByEmail/FindByEmailController';
import { ensureAuthenticated } from '../shared/middlewares/ensureAuthenticated';

const findByEmailController = new FindByEmailController();

const userRoutes: FastifyPluginCallback<FastifyPluginOptions> = (
  server,
  _options,
  done
) => {
  server.addHook('preHandler', ensureAuthenticated);

  server.get('/email/:email', findByEmailController.handleRequest);

  done();
};

export { userRoutes };

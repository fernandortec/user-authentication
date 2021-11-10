import { FastifyReply, FastifyRequest } from 'fastify';
import { connect } from 'mongoose';

import { app } from './app';
import { MONGO_DB_URL } from './shared/helpers/environment';

const startServer = async () => {
  app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.send({ message: 'Server is running' });
  });

  await connect(MONGO_DB_URL);

  await app.listen(process.env.PORT || 3000);
};

startServer();

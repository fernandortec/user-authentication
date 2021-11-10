import Fastify from 'fastify';

import 'reflect-metadata';
import { indexRouter } from './routes/index.routes';
import './shared/container';
import AppError from './shared/errors/AppError';

const app = Fastify();

app.register(indexRouter);

app.setErrorHandler((err, request, reply) => {
  if (err instanceof AppError) {
    reply.status(err.statusCode).send({
      status: 'error',
      statusCode: err.statusCode,
      message: err.message
    });
  }
  reply.status(500).send({
    status: 'error',
    message: `Internal Server Error ${err.message}`
  });
});

export { app };

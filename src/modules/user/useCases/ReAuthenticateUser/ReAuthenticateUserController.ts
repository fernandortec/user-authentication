import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';

import { ReAuthenticateUserUseCase } from './ReAuthenticateUserUseCase';

class ReAuthenticateUserController {
  async handleRequest(
    request: FastifyRequest<{ Querystring: { refreshToken: string } }>,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const { refreshToken } = request.query;

    const reAuthenticateUserUseCase = container.resolve(
      ReAuthenticateUserUseCase
    );

    const tokens = await reAuthenticateUserUseCase.reAuthenticateUser(
      refreshToken
    );

    return reply.send(tokens);
  }
}

export { ReAuthenticateUserController };

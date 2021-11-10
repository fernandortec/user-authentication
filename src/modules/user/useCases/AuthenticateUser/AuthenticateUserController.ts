import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  async handleRequest(
    request: FastifyRequest<{ Body: { email: string; password: string } }>,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const { email, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const tokens = await authenticateUserUseCase.authenticateUser(
      email,
      password
    );

    return reply.send(tokens);
  }
}

export { AuthenticateUserController };

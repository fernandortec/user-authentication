import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handleRequest(
    request: FastifyRequest<{ Body: { email: string; password: string } }>,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const createUserUseCase = container.resolve(CreateUserUseCase);

    const { email, password } = request.body;

    const user = await createUserUseCase.createUser({ email, password });

    return reply.send(user);
  }
}

export { CreateUserController };

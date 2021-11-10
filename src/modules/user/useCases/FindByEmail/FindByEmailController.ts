import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';

import { FindByEmailUseCase } from './FIndByEmailUseCase';

class FindByEmailController {
  async handleRequest(
    request: FastifyRequest<{ Params: { email: string } }>,
    reply: FastifyReply
  ): Promise<FastifyReply> {
    const { email } = request.params;

    const findByEmailUseCase = container.resolve(FindByEmailUseCase);

    const user = await findByEmailUseCase.findByEmail(email);

    return reply.send(user);
  }
}
export { FindByEmailController };

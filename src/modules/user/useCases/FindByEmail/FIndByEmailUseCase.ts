import { inject, injectable } from 'tsyringe';

import { User } from '../../entities/User';
import { UserRepository } from '../../repositories/UserRepository';

@injectable()
class FindByEmailUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository
  ) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    return user;
  }
}

export { FindByEmailUseCase };

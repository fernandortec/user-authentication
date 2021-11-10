import { inject, injectable } from 'tsyringe';

import { CreateUserDTO } from '../../DTOs/CreateUserDTO';
import { User } from '../../entities/User';
import { UserRepository } from '../../repositories/UserRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository
  ) {}

  async createUser({ email, password }: CreateUserDTO): Promise<User> {
    const user = await this.userRepository.create({ email, password });

    return user;
  }
}

export { CreateUserUseCase };

import { DefaultCryptographyRepository } from '../../../../shared/container/providers/Cryptography/implementations/DefaultCryptographyRepository';
import { CreateUserDTO } from '../../DTOs/CreateUserDTO';
import { User, UserModel } from '../../entities/User';
import { UserRepository } from '../UserRepository';

class DefaultUserRepository implements UserRepository {
  constructor(
    private userModel = UserModel,
    private cryptography = new DefaultCryptographyRepository()
  ) {}

  async create({ email, password }: CreateUserDTO): Promise<User> {
    const hashedPassword = await this.cryptography.encrypt(password);

    const user = await this.userModel.create({
      email,
      password: hashedPassword
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    return user;
  }
}

export { DefaultUserRepository };

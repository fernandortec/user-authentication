import { CreateUserDTO } from '../DTOs/CreateUserDTO';
import { User } from '../entities/User';

interface UserRepository {
  create({ email, password }: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
}

export { UserRepository };

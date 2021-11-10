import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { CryptographyRepository } from '../../../../shared/container/providers/Cryptography/CryptographyRepository';
import AppError from '../../../../shared/errors/AppError';
import {
  JWT_SECRET_REFRESH_TOKEN,
  JWT_SECRET_TOKEN
} from '../../../../shared/helpers/environment';
import { AuthenticateUserDTO } from '../../DTOs/AuthenticateUserDTO';
import { UserRepository } from '../../repositories/UserRepository';

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,
    @inject('CryptographyRepository')
    private cryptographyRepository: CryptographyRepository
  ) {}

  async authenticateUser(
    email: string,
    password: string
  ): Promise<AuthenticateUserDTO> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AppError('User does not exists');

    const isUserSignedIn = await this.cryptographyRepository.compare(
      password,
      user.password
    );

    if (!isUserSignedIn) throw new AppError('Login information invalid');

    const accessToken = sign({ email }, JWT_SECRET_TOKEN, {
      expiresIn: '7d'
    });

    const refreshToken = sign({ email }, JWT_SECRET_REFRESH_TOKEN, {
      expiresIn: '15d'
    });

    return {
      email,
      accessToken,
      refreshToken
    };
  }
}

export { AuthenticateUserUseCase };

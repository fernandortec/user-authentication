import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../shared/errors/AppError';
import {
  JWT_SECRET_REFRESH_TOKEN,
  JWT_SECRET_TOKEN
} from '../../../../shared/helpers/environment';
import { AuthenticateUserDTO } from '../../DTOs/AuthenticateUserDTO';
import { UserRepository } from '../../repositories/UserRepository';

@injectable()
class ReAuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository
  ) {}

  async reAuthenticateUser(refreshToken: string): Promise<AuthenticateUserDTO> {
    const { email } = verify(refreshToken, JWT_SECRET_REFRESH_TOKEN) as {
      email: string;
    };

    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError('Invalid user');

    const newAccessToken = sign({ email }, JWT_SECRET_TOKEN, {
      expiresIn: '7d'
    });

    const newRefreshToken = sign({ email }, JWT_SECRET_REFRESH_TOKEN, {
      expiresIn: '15d'
    });

    return {
      email,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    };
  }
}

export { ReAuthenticateUserUseCase };

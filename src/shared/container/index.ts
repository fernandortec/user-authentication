import { container } from 'tsyringe';

import { DefaultUserRepository } from '../../modules/user/repositories/implementations/DefaultUserRepository';
import { UserRepository } from '../../modules/user/repositories/UserRepository';
import { CryptographyRepository } from './providers/Cryptography/CryptographyRepository';
import { DefaultCryptographyRepository } from './providers/Cryptography/implementations/DefaultCryptographyRepository';

container.registerSingleton<UserRepository>(
  'UserRepository',
  DefaultUserRepository
);

container.registerSingleton<CryptographyRepository>(
  'CryptographyRepository',
  DefaultCryptographyRepository
);

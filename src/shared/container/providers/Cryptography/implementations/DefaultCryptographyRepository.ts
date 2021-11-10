import { genSalt, hash, compare } from 'bcrypt';

import { CryptographyRepository } from '../CryptographyRepository';

class DefaultCryptographyRepository implements CryptographyRepository {
  encrypt = (text: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      genSalt(8, (err, salt) => {
        if (err) reject(err);

        hash(text, salt, (err, hash) => {
          if (err) reject(err);

          resolve(hash);
        });
      });
    });
  };

  compare = (text: string, hashedText: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      compare(text, hashedText, (err, res) => {
        if (err) reject(err.message);

        if (res) {
          resolve(true);
        }

        resolve(false);
      });
    });
  };
}

export { DefaultCryptographyRepository };

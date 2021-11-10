interface CryptographyRepository {
  encrypt(text: string): Promise<string>;
  compare(text: string, hashedText: string): Promise<boolean>;
}

export { CryptographyRepository };

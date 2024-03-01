import bcrypt from 'bcrypt';

const SALT_LENGTH = 10;

async function hashGenerator(plain: string) {
  return bcrypt.hash(plain, SALT_LENGTH);
}

async function hashComparer(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

export const bcryptHasher = {
  hashGenerator,
  hashComparer
};
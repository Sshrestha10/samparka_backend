import bcrypt from  'bcryptjs';

export const passwordService = {
  hashPassword(password) {
    return bcrypt.hash(password, 10);
  },
  comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  },
};

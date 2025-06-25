import { userRepository } from '../../../core/database/mongoDB/repositories/user.repository.js';

export async function logoutUser(userId) {
  // Clear tokens for this user
  return userRepository.clearTokens(userId);
}

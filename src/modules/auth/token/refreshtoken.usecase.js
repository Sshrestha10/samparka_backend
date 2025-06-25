import { userRepository } from '../../../core/database/mongoDB/repositories/user.repository.js';
import { tokenService } from '../../../core/services/token.service.js';

export async function refreshTokenUsecase(refreshToken) {
  if (!refreshToken) {
    const err = new Error('Refresh token required');
    err.statusCode = 400;
    throw err;
  }

  const decoded = tokenService.verifyRefresh(refreshToken);

  const user = await userRepository.findByEmail(decoded.email);
  if (!user || user.tokens.refresh !== refreshToken) {
    const err = new Error('Invalid or expired refresh token');
    err.statusCode = 401;
    throw err;
  }

  // ✅ Only generate new access token
  const access = tokenService.generateAccessToken({
    userId: user._id,
    email: user.email
  });

  return {
    access,
    refresh: refreshToken // Return the same one (no rotation)
  };
}

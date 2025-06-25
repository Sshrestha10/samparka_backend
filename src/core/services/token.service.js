import jwt from 'jsonwebtoken';
import config from '../../config/config';

const ACCESS_SECRET =config.accessSecret;
const REFRESH_SECRET = config.refreshSecret;


export const tokenService = {
  generateAccessToken(payload) {
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15m' });
  },

  generateRefreshToken(payload) {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
  },

  generateTokens(payload) {
    return {
      access: this.generateAccessToken(payload),
      refresh: this.generateRefreshToken(payload)
    };
  },

  verifyRefresh(token) {
    return jwt.verify(token, REFRESH_SECRET);
  }
};
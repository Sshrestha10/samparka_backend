import { refreshTokenUsecase } from './refreshtoken.usecase.js';

export async function refreshTokenController(req, res, next) {
  try {
    const { refreshToken } = req.body;
    const tokens = await refreshTokenUsecase(refreshToken);
    return res.status(200).json({ tokens });
  } catch (error) {
    next(error);
  }
}

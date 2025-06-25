import { logoutUser } from './logout.usecase.js';

export async function logoutController(req, res, next) {
  try {
    const { userId } = req.user;
    await logoutUser(userId);
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
}

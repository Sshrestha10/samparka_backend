import { acceptInviteUsecase } from './acceptInvite.usecase.js';

export async function acceptInviteController(req, res, next) {
  try {
    const { workspaceId } = req.params;
    const userId = req.user.userId;

    const result = await acceptInviteUsecase({ userId, workspaceId });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

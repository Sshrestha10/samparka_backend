import { declineInviteUsecase } from './declineInvite.usecase.js';

export async function declineInviteController(req, res, next) {
  try {
    const { workspaceId } = req.params;
    const userId = req.user.userId;

    const result = await declineInviteUsecase({ userId, workspaceId });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

import { leaveWorkspaceUsecase } from './leaveWorkspace.usecase.js';

export async function leaveWorkspaceController(req, res, next) {
  try {
    const { workspaceId } = req.params;
    const userId = req.user.userId;

    const result = await leaveWorkspaceUsecase({ userId, workspaceId });
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

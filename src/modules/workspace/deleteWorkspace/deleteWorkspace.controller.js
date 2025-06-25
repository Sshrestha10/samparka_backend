import { deleteWorkspaceUsecase } from './deleteWorkspace.usecase.js';

export async function deleteWorkspaceController(req, res, next) {
  try {
    const { workspaceId } = req.params;
    const userId = req.user.userId;

    const result = await deleteWorkspaceUsecase({ userId, workspaceId });
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
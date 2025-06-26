import { getWorkspaceDetailsUsecase } from './getWorkspaceDetails.usecase.js';

export async function getWorkspaceDetailsController(req, res, next) {
  try {
    const { workspaceId } = req.params;
    const data = await getWorkspaceDetailsUsecase({ workspaceId });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

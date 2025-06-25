import { getDMsUsecase } from "./getDM.usecase";

export async function getDMsController(req, res, next) {
  try {
    const userId = req.user.userId;
    const { workspaceId, recipientId } = req.params;

    const { threadId, messages } = await getDMsUsecase({ workspaceId, userId, recipientId });

    res.status(200).json({ threadId, messages });
  } catch (err) {
    next(err);
  }
}

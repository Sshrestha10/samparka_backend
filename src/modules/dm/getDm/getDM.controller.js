import { getDMsUsecase } from './getDM.usecase.js';

export async function getDMsController(req, res, next) {
  try {
    const userId = req.user.userId;
    const { workspaceId, recipientId } = req.params;

    const { threadId, recipient, messages } = await getDMsUsecase({
      workspaceId,
      userId,
      otherUserId: recipientId
    });

    res.status(200).json({ threadId, recipient, messages });
  } catch (err) {
    next(err);
  }
}

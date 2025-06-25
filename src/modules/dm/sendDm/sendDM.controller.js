import { sendDMUsecase } from './sendDM.usecase';
import config from "../../../config/config";

export async function sendDirectMessageController(req, res, next) {
  try {
    const senderId = req.user.userId;
    const { workspaceId, recipientId } = req.body;
    const files  = (req.files || []).map(f => f.path);

    const { message, threadId } = await sendDMUsecase({
      workspaceId,
      senderId,
      recipientId,
      content: req.body.content || '',
      files
    });

      const messageWithUrls = {
      ...message.toObject(),
      files: message.files.map(file => `http://${config.ip}:${config.port}/${file}`)
    };

    res.status(201).json({ threadId, message: messageWithUrls });
  } catch (err) {
    next(err);
  }
}

import { sendDMUsecase } from './sendDM.usecase.js';
import config from '../../../config/config.js';

export async function sendDirectMessageController(req, res, next) {
  try {
    const senderId = req.user.userId;
    const { workspaceId, recipientId, content = '' } = req.body;
    const files = (req.files || []).map(f => f.path);

    const { threadId, message } = await sendDMUsecase({
      workspaceId,
      senderId,
      recipientId,
      content,
      files
    });

    const messageWithUrls = {
      ...message.toObject(),
      files: message.files.map(f => `http://${config.ip}:${config.port}/${f}`)
    };

    res.status(201).json({ threadId, message: messageWithUrls });
  } catch (err) {
    next(err);
  }
}

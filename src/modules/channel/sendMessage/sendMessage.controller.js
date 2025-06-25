import { sendMessageUsecase } from './sendMessage.usecase.js';
import { messageRepository } from '../../../core/database/mongoDB/repositories/message.repository.js';
import config from "../../../config/config";

export async function sendMessageController(req, res) {
  try {
    const { channelId } = req.params;
    const senderId = req.user?.userId || req.user?._id;
    const { content } = req.body;

    const files = req.files?.map(file => file.path) || [];

    const message = await sendMessageUsecase({ channelId, senderId, content, files });
    const formatted = {
          ...message.toObject(),
          files: message.files.map(file => `http://${config.ip}:${config.port}/${file}`)
        };
    res.status(201).json(formatted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getChannelMessagesController(req, res) {
  try {
    const { channelId } = req.params;
    const messages = await messageRepository.getMessagesByChannel(channelId);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

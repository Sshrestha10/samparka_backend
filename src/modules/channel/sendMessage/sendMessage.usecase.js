import { messageRepository } from '../../../core/database/mongoDB/repositories/message.repository.js';

export async function sendMessageUsecase({ channelId, senderId, content, files = [] }) {
  if (!content && (!files || files.length === 0)) {
    throw new Error('Cannot send empty message');
  }

  const message = await messageRepository.createMessage({
    channelId,
    sender: senderId,
    content,
    files
  });

  return message;
}

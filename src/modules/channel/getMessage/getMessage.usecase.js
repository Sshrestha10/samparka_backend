// usecases/message/getChannelMessages.usecase.js
import { messageRepository } from '../../../core/database/mongoDB/repositories/message.repository.js';
import { channelRepository } from '../../../core/database/mongoDB/repositories/channel.repository.js';

export async function getChannelMessagesUsecase({ userId, channelId }) {
  // Check if channel exists
  const channel = await channelRepository.findById(channelId);
  if (!channel) throw new Error('Channel not found');

  // Optional: Check if user is part of the channel's workspace
  const isMember = channel.members?.includes(userId); // if channel has member list
  // You may also check at the workspace level if needed

  // Fetch messages ordered oldest to newest
  const messages = await messageRepository.getMessagesByChannel(channelId);

  return messages;
}

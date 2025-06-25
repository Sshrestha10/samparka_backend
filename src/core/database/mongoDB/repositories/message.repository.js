import { Message } from '../models/message.model.js';

export const messageRepository = {
  async createMessage(data) {
    return await new Message(data).save();
  },

  async getMessagesByChannel(channelId) {
    return Message.find({ channelId })
      .sort({ createdAt: 1 }) // oldest first
      .populate('sender', 'name email');
  }
};

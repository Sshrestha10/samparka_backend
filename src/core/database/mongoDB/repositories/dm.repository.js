import mongoose from 'mongoose';
import { DirectMessage } from '../models/directMessage.model.js';
import { DirectMessageThread } from '../models/directMessage.thread.model.js';

export const dmRepository = {
  async findOrCreateThread({ workspaceId, userId, recipientId }) {
    const userA = new mongoose.Types.ObjectId(userId);
    const userB = new mongoose.Types.ObjectId(recipientId);

    const members = [userA, userB].sort();

    let thread = await DirectMessageThread.findOne({
      workspaceId,
      members: { $all: members, $size: 2 }
    });

    if (!thread) {
      thread = new DirectMessageThread({
        workspaceId,
        members
      });
      await thread.save();
    }

    return thread;
  },

  async getMessagesByThread(threadId) {
    return DirectMessage.find({ threadId })
      .populate('sender', 'name email')
      .sort({ createdAt: 1 });
  }
};
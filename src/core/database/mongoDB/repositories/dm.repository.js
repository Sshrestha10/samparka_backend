import mongoose from 'mongoose';
import { DirectMessage } from '../models/directMessage.model.js';
import { DirectMessageThread } from '../models/directMessage.thread.model.js';

export const dmRepository = {
 async findThread({ workspaceId, userA, userB }) {
  if (userA.toString() === userB.toString()) {
    // Self-DM
    return DirectMessageThread.findOne({
      workspaceId,
      participants: [userA]
    });
  }

  // Two-person DM
  return DirectMessageThread.findOne({
    workspaceId,
    participants: { $all: [userA, userB], $size: 2 }
  });
},

async createThread({ workspaceId, participants }) {
  return DirectMessageThread.create({
    workspaceId,
    participants
  });
}
,
  async saveMessage({ threadId, sender, content, files }) {
    return DirectMessage.create({
      threadId,
      sender,
      content,
      files
    });
  },

  async getMessagesByThread(threadId) {
    return DirectMessage.find({ threadId })
      .populate('sender', 'name email')
      .sort({ createdAt: 1 });
  }
};

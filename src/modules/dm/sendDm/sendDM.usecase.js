import { DirectMessageThread } from '../../../core/database/mongoDB/models/directMessage.thread.model.js';
import { DirectMessage } from '../../../core/database/mongoDB/models/directMessage.model.js';

export async function sendDMUsecase({ workspaceId, senderId, recipientId, content = '', files = [] }) {
  if (!content.trim() && files.length === 0) {
    throw new Error('Cannot send empty message');
  }

  // Find or create thread
  let thread = await DirectMessageThread.findOne({
    workspaceId,
    participants: { $all: [senderId, recipientId] }
  });

  if (!thread) {
    thread = await DirectMessageThread.create({
      workspaceId,
      participants: [senderId, recipientId]
    });
  }

  // Save message
  const message = await DirectMessage.create({
    threadId: thread._id,
    sender: senderId,
    content,
    files
  });

  return { threadId: thread._id, message };
}

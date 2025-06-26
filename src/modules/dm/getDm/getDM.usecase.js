import { dmRepository } from "../../../core/database/mongoDB/repositories/dm.repository.js";
import { User } from '../../../core/database/mongoDB/models/user.model.js';
import { Workspace } from '../../../core/database/mongoDB/models/workspace.model.js';
import { DirectMessageThread } from "../../../core/database/mongoDB/models/directMessage.thread.model.js";

export async function getDMsUsecase({ workspaceId, userId, otherUserId }) {
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) throw new Error('Workspace not found');
const user = await User.findById(userId);
  const otherUser = await User.findById(otherUserId);

  if (!user) throw new Error('Authenticated user not found');
  if (!otherUser) throw new Error('Recipient user not found');

  const isUserMember = workspace.members.some(m =>
    (m.userId?.toString() === userId.toString() || m.email === user.email) &&
    m.accepted === true
  );

  const isOtherUserMember = workspace.members.some(m =>
    (m.userId?.toString() === otherUserId.toString() || m.email === otherUser.email) &&
    m.accepted === true
  );

  if (!isUserMember || !isOtherUserMember) {
    throw new Error('Both users must be accepted members of the workspace');
  }

  // const thread = await dmRepository.findThread({ workspaceId, userA: userId, userB: otherUserId });
let thread;
if (userId === otherUserId) {
  thread = await DirectMessageThread.findOne({
    workspaceId,
    participants: [userId]
  });
} else {
  thread = await DirectMessageThread.findOne({
    workspaceId,
    participants: { $all: [userId, otherUserId], $size: 2 }
  });
}

  if (!thread) {
    return { threadId: null, recipient: null, messages: [] };
  }

  const messages = await dmRepository.getMessagesByThread(thread._id);

  const recipientId = userId === otherUserId ? userId : otherUserId;
  const recipient = await User.findById(recipientId).select('name email');

  return { threadId: thread._id, recipient, messages };
}
import { dmRepository } from '../../../core/database/mongoDB/repositories/dm.repository.js';
import { Workspace } from '../../../core/database/mongoDB/models/workspace.model.js';
import { User } from '../../../core/database/mongoDB/models/user.model.js';

export async function sendDMUsecase({ workspaceId, senderId, recipientId, content, files }) {
  if (!content.trim() && files.length === 0) {
    throw new Error('Cannot send empty message');
  }

  // Validate workspace membership
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) throw new Error('Workspace not found');
  
const senderUser = await User.findById(senderId);
const recipientUser = await User.findById(recipientId);

const isSenderMember = workspace.members.some(m =>
  (m.userId?.toString() === senderId.toString() || m.email === senderUser.email) && m.accepted === true
);

const isRecipientMember = workspace.members.some(m =>
  (m.userId?.toString() === recipientId.toString() || m.email === recipientUser.email) && m.accepted === true
);


if (!isSenderMember || !isRecipientMember) {
  throw new Error('Both users must be accepted members of the workspace');
}



  // Reuse or create thread
const thread = await dmRepository.findThread({ workspaceId, userA: senderId, userB: recipientId });

if (!thread) {
  const participants = senderId === recipientId
    ? [senderId]
    : [senderId, recipientId];

  thread = await dmRepository.createThread({ workspaceId, participants });
}

  const message = await dmRepository.saveMessage({
    threadId: thread._id,
    sender: senderId,
    content,
    files
  });

  return { threadId: thread._id, message };
}

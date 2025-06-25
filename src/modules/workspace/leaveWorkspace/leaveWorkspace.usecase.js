import { workspaceRepository } from '../../../core/database/mongoDB/repositories/workspace.repository.js';
import { userRepository } from '../../../core/database/mongoDB/repositories/user.repository.js';

export async function leaveWorkspaceUsecase({ userId, workspaceId }) {
  const user = await userRepository.findById(userId);
  if (!user) throw new Error('User not found');

  const workspace = await workspaceRepository.findById(workspaceId);
  if (!workspace) throw new Error('Workspace not found');

  const member = workspace.members.find(m => m.email === user.email);
  if (!member) throw new Error('You are not part of the workspace');
  if (!member.accepted) throw new Error('You have not accepted the workspace yet');
  if ( member.removed) {
  throw new Error('You are not an active member of this workspace');
}
  if (member.role === 'admin') throw new Error('Admin must delete the workspace instead of leaving');

  // Mark as removed
  await userRepository.markWorkspaceRemoved(userId, workspaceId);
  await workspaceRepository.markUserAsRemoved(workspaceId, user.email);

  return { message: 'Successfully left the workspace' };
}

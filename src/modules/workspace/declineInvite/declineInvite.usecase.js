import { workspaceRepository } from '../../../core/database/mongoDB/repositories/workspace.repository.js';
import { userRepository } from '../../../core/database/mongoDB/repositories/user.repository.js';

export async function declineInviteUsecase({ userId, workspaceId }) {
  const user = await userRepository.findById(userId);
  if (!user) throw new Error('User not found');

  const workspace = await workspaceRepository.findById(workspaceId);
  if (!workspace) throw new Error('Workspace not found');

  const member = workspace.members.find(m => m.email === user.email);
  if (!member) throw new Error('You are not invited to this workspace');
  if (member.accepted) throw new Error('Already accepted. Use leave workspace instead');

  await workspaceRepository.removeMemberFromWorkspace(workspaceId, user.email);
  await userRepository.removeWorkspaceFromUser(userId, workspaceId);

  return { message: 'You declined the workspace invite' };
}
import { workspaceRepository } from '../../../core/database/mongoDB/repositories/workspace.repository.js';
import { userRepository } from '../../../core/database/mongoDB/repositories/user.repository.js';

export async function acceptInviteUsecase({ userId, workspaceId }) {
  const user = await userRepository.findById(userId);
  if (!user) throw new Error('User not found');

  await workspaceRepository.acceptInviteForUser(workspaceId, user.email);
  await userRepository.markWorkspaceAccepted(userId, workspaceId);

  return { message: 'Workspace invitation accepted successfully' };
}
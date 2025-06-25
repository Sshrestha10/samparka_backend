import { workspaceRepository } from '../../../core/database/mongoDB/repositories/workspace.repository.js';
import { userRepository } from '../../../core/database/mongoDB/repositories/user.repository.js';

export async function deleteWorkspaceUsecase({ userId, workspaceId }) {
  const user = await userRepository.findById(userId);
  if (!user) throw new Error('User not found');

  const workspace = await workspaceRepository.findById(workspaceId);
  if (!workspace) throw new Error('Workspace not found');

  const member = workspace.members.find(
    m =>
      (m.userId && m.userId.toString() === userId) ||
      (m.email && m.email === user.email)
  );

  if (!member) throw new Error('You are not part of this workspace');
  if (!member.accepted) throw new Error('You have not accepted this workspace');
  if (member.role !== 'admin') throw new Error('Only admin can delete the workspace');

  await workspaceRepository.deleteWorkspace(workspaceId);
  await userRepository.removeWorkspaceFromAllUsers(workspaceId);

  return { message: 'Workspace deleted successfully' };
}
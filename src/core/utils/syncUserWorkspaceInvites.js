import { workspaceRepository } from '../database/mongoDB/repositories/workspace.repository.js';
import { userRepository } from '../database/mongoDB/repositories/user.repository.js';

export async function syncUserWorkspaceInvites(user) {
  // 1. Fetch workspaces where user is invited but hasn't accepted
  const invitedWorkspaces = await workspaceRepository.findWhereMemberEmailNotAccepted(user.email);

  // 2. Add each workspace to user.workspaces[] if not already added
  for (const workspace of invitedWorkspaces) {
    const member = workspace.members.find(m => m.email === user.email);

    // Check if already in user.workspaces
    const alreadyExists = user.workspaces.some(w => w.workspaceId.toString() === workspace._id.toString());
    if (!alreadyExists) {
      await userRepository.addWorkspaceToUser(user._id, {
        workspaceId: workspace._id,
        workspaceName: workspace.name,
        memberType: member.role,
        department: member.department,
        accepted: false,
        removed: false
      });
    }
  }

  // 3. Reload updated user
  return await userRepository.findById(user._id);
}
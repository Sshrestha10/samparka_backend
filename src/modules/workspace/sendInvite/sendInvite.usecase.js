import { workspaceRepository } from '../../../core/database/mongoDB/repositories/workspace.repository.js';
import { userRepository } from '../../../core/database/mongoDB/repositories/user.repository.js';
import { DEPARTMENTS } from '../../../core/constants/department.enum.js';

export async function inviteUserToWorkspace({ invitedByUser, workspaceId, invites = [] }) {
  const workspace = await workspaceRepository.findById(workspaceId);
  if (!workspace) {
    const err = new Error('Workspace not found');
    err.statusCode = 404;
    throw err;
  }

  // Ensure inviter is admin/manager
  const inviterRole = workspace.members.find(
    m => m.email === invitedByUser.email && ['admin', 'manager'].includes(m.role)
  );
  if (!inviterRole) {
    const err = new Error('Only admin or manager can invite members');
    err.statusCode = 403;
    throw err;
  }

  const validDepartments = Object.values(DEPARTMENTS);
  const addedMembers = [];

  for (const invite of invites) {
    const { email, role = 'member', department = 'IT' } = invite;
    const normalizedDept = department.toUpperCase().trim();

    if (!validDepartments.includes(normalizedDept)) {
      throw new Error(`Invalid department: ${department}`);
    }

    const existingMember = workspace.members.find(m => m.email === email);

    if (existingMember) {
      // ✅ Handle Reinvitation
      if (existingMember.removed || !existingMember.accepted) {
        existingMember.role = role;
        existingMember.department = normalizedDept;
        existingMember.accepted = false;
        existingMember.removed = false;
        existingMember.joinedAt = new Date();
      } else {
        continue; // Already active member, skip
      }
    } else {
      // ➕ Add new member
      workspace.members.push({
        email,
        role,
        department: normalizedDept,
        accepted: false,
        removed: false,
        joinedAt: new Date()
      });
    }

    // Update or Add in user document
    const invitedUser = await userRepository.findByEmail(email);
    if (invitedUser) {
      const wsRef = invitedUser.workspaces.find(
        w => w.workspaceId.toString() === workspaceId.toString()
      );

      if (wsRef) {
        wsRef.memberType = role;
        wsRef.department = normalizedDept;
        wsRef.accepted = false;
        wsRef.removed = false;
      } else {
        invitedUser.workspaces.push({
          workspaceId: workspace._id,
          workspaceName: workspace.name,
          memberType: role,
          department: normalizedDept,
          accepted: false,
          removed: false
        });
      }

      await invitedUser.save();
    }

    addedMembers.push({ email, role, department: normalizedDept });
  }

  await workspace.save();

  return { message: 'Members invited successfully', members: addedMembers };
}
import { Workspace } from '../../../core/database/mongoDB/models/workspace.model.js';
import { userRepository } from '../../../core/database/mongoDB/repositories/user.repository.js';
import { DEPARTMENTS } from '../../../core/constants/department.enum.js';

export async function createWorkspace({ name, createdByUser, invites = [], department = 'IT' }) {
  const existing = await Workspace.findOne({ name });
  if (existing) {
    const err = new Error('Workspace already exists');
    err.statusCode = 409;
    throw err;
  }

  const normalizedDepartment = department?.toUpperCase().trim();
  const validDepartments = Object.values(DEPARTMENTS);

  if (!validDepartments.includes(normalizedDepartment)) {
    const err = new Error(
      `Invalid department. Must be one of: ${validDepartments.join(', ')}`
    );
    err.statusCode = 400;
    throw err;
  }

  const members = [
    {
      userId: createdByUser._id,
      email: createdByUser.email,
      name: createdByUser.name,
      role: 'admin',
      department: normalizedDepartment,
      accepted: true,
    },
    ...invites.map(inv => {
      const inviteDept = inv.department?.toUpperCase().trim() || normalizedDepartment;

      if (!validDepartments.includes(inviteDept)) {
        throw new Error(
          `Invalid department for invited user ${inv.email}. Must be one of: ${validDepartments.join(', ')}`
        );
      }

      return {
        email: inv.email,
        role: inv.role || 'member',
        department: inviteDept,
        accepted: false,
      };
    })
  ];

  const workspace = await Workspace.create({
    name,
    createdBy: createdByUser._id,
    members
  });

  await userRepository.addWorkspaceToUser(createdByUser._id, {
    workspaceId: workspace._id,
    workspaceName: workspace.name,
    memberType: 'admin',
    accepted: true
  });

  // Populate user names if needed (for frontend display)
  const enrichedMembers = await Promise.all(
    workspace.members.map(async (member) => {
      if (!member.userId) return member;

      const user = await userRepository.findById(member.userId);
      return {
        ...member.toObject(),
        name: user?.name || member.name || null,
      };
    })
  );

  return {
    _id: workspace._id,
    name: workspace.name,
    createdBy: workspace.createdBy,
    members: enrichedMembers,
    createdAt: workspace.createdAt,
    updatedAt: workspace.updatedAt,
  };
}

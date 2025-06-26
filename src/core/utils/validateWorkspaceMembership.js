import mongoose from 'mongoose';
import { Workspace } from "../database/mongoDB/models/workspace.model.js";

export async function validateActiveMembership(workspaceId, userId) {
  if (!workspaceId || !mongoose.Types.ObjectId.isValid(workspaceId)) {
    throw new Error('Invalid workspaceId');
  }

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid userId');
  }

  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) throw new Error('Workspace not found');

  const isMember = workspace.members.some(
    (m) => m.userId?.toString() === userId.toString() && m.accepted === true && m.removed === false
  );

  if (!isMember) throw new Error('User is not an active member of the workspace');

  return workspace;
}
export async function validateWorkspace(workspaceId, ) {
  if (!workspaceId || !mongoose.Types.ObjectId.isValid(workspaceId)) {
    throw new Error('Invalid workspaceId');
  }


  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) throw new Error('Workspace not found');

  return workspace;
}

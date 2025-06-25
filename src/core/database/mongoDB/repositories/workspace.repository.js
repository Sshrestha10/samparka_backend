import { Workspace } from '../models/workspace.model.js';

export const workspaceRepository = {
  findById: (id) => Workspace.findById(id),
  create: (data) => Workspace.create(data),
  findByName: (name) => Workspace.findOne({ name }),
  addMember: async (workspaceId, member) => {
    return Workspace.updateOne(
      { _id: workspaceId },
      { $push: { members: member } }
    );
  },
  async findWhereMemberEmailNotAccepted(email) {
    return Workspace.find({
      members: {
        $elemMatch: {
          email,
          accepted: false
        }
      }
    });
  },
  async acceptInviteForUser(workspaceId, email) {
    return Workspace.updateOne(
      { _id: workspaceId, 'members.email': email },
      { $set: { 'members.$.accepted': true } }
    );
  },

  async markUserAsRemoved(workspaceId, email) {
    return Workspace.updateOne(
      { _id: workspaceId, 'members.email': email },
      { $set: { 'members.$.removed': true } }
    );
  },

  async removeMemberFromWorkspace(workspaceId, email) {
    return Workspace.findByIdAndUpdate(
      workspaceId,
      { $pull: { members: { email } } },
      { new: true }
    );
  },

  async deleteWorkspace(workspaceId) {
    return Workspace.findByIdAndDelete(workspaceId);
  }

};

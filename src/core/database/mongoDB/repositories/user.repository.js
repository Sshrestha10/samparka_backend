import { User } from '../models/user.model.js';
export const userRepository = {
  async findByEmail(email) {
    return User.findOne({ email });
  },
    async findById(id) {
    return User.findById(id);
  },
  async createUser(userData) {
    const user = new User(userData);
    return user.save();
  },
  async addWorkspaceToUser(userId, workspaceMember) {
    return User.findByIdAndUpdate(
      userId,
      { $push: { workspaces: workspaceMember } },
      { new: true }
    );
  },
  async  clearTokens(userId) {
  return await User.findByIdAndUpdate(userId, { tokens: { access: '', refresh: '' } });
},

async  markWorkspaceAccepted(userId, workspaceId) {
  return User.updateOne(
    { _id: userId, 'workspaces.workspaceId': workspaceId },
    { $set: { 'workspaces.$.accepted': true } }
  );
},
async markWorkspaceRemoved(userId, workspaceId) {
  return User.updateOne(
    { _id: userId, 'workspaces.workspaceId': workspaceId },
    { $set: { 'workspaces.$.removed': true } }
  );
},
async  removeWorkspaceFromUser(userId, workspaceId) {
  return User.findByIdAndUpdate(
    userId,
    { $pull: { workspaces: { workspaceId } } },
    { new: true }
  );
},
async removeWorkspaceFromAllUsers(workspaceId) {
  return User.updateMany(
    {},
    { $pull: { workspaces: { workspaceId } } }
  );
}


};